import { Batch, Kafka, KafkaMessage, logLevel } from "kafkajs";
import { LogManager } from "../../managers/LogManager";
import { Message } from "../handlers/HandlerContext";
import { PromiseGenericResult, err, ok } from "../shared/result";
import * as Sentry from "@sentry/node";

let kafka;
const KAFKA_CREDS = JSON.parse(process.env.KAFKA_CREDS ?? "{}");
const KAFKA_ENABLED = (KAFKA_CREDS?.KAFKA_ENABLED ?? "false") === "true";
const KAFKA_BROKER = KAFKA_CREDS?.UPSTASH_KAFKA_BROKER;
const KAFKA_USERNAME = KAFKA_CREDS?.UPSTASH_KAFKA_USERNAME;
const KAFKA_PASSWORD = KAFKA_CREDS?.UPSTASH_KAFKA_PASSWORD;

if (KAFKA_ENABLED && KAFKA_BROKER && KAFKA_USERNAME && KAFKA_PASSWORD) {
  kafka = new Kafka({
    brokers: [KAFKA_BROKER],
    sasl: {
      mechanism: "scram-sha-512",
      username: KAFKA_USERNAME,
      password: KAFKA_PASSWORD,
    },
    ssl: true,
    logLevel: logLevel.ERROR,
  });
} else {
  if (!KAFKA_ENABLED) {
    Sentry.captureMessage("Kafka is disabled. Check environment variables.");
    console.log("Kafka is disabled.");
  } else {
    // Check which environment variables are missing
    console.error("Required Kafka environment variables are not set.");

    if (!KAFKA_BROKER) {
      console.error("KAFKA_BROKER is missing.");
      Sentry.captureMessage("KAFKA_BROKER is missing.");
    }
    if (!KAFKA_USERNAME) {
      console.error("KAFKA_USERNAME is missing.");
      Sentry.captureMessage("KAFKA_USERNAME is missing.");
    }
    if (!KAFKA_PASSWORD) {
      console.error("KAFKA_PASSWORD is missing.");
      Sentry.captureMessage("KAFKA_PASSWORD is missing.");
    }
  }
}

// Average message is 1kB, so we can set minBytes to 1kB and maxBytes to 10kB
const consumer = kafka?.consumer({
  groupId: "jawn-consumer",
  minBytes: 1000, // 1 kB
  maxBytes: 10_000_000, // 10 kB
});

process.on("exit", async () => {
  await consumer?.stop();
  await consumer?.disconnect();
  console.log("Consumer disconnected.");
});

export const consume = async () => {
  if (KAFKA_ENABLED && !consumer) {
    console.error("Failed to create Kafka consumer");
    return;
  }

  let retryDelay = 100;
  const maxDelay = 30000;

  while (true) {
    try {
      await consumer?.connect();
      console.log("Successfully connected to Kafka");
      break;
    } catch (error: any) {
      console.error(`Failed to connect to Kafka: ${error.message}`);
      console.log(`Retrying in ${retryDelay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retryDelay = Math.min(retryDelay * 2, maxDelay); // Exponential backoff with a cap
    }
  }

  await consumer?.connect();
  await consumer?.subscribe({
    topic: "request-response-logs-prod",
    fromBeginning: true,
  });

  await consumer?.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({
      batch,
      resolveOffset,
      heartbeat,
      commitOffsetsIfNecessary,
    }) => {
      const consumeResult = await consumeBatch(batch);

      if (consumeResult.error) {
        console.error("Failed to consume batch", consumeResult.error);

        // TODO: Best way to handle this?
        return;
      } else {
        resolveOffset(batch.messages[batch.messages.length - 1].offset);
        await commitOffsetsIfNecessary();
        await heartbeat();
      }
    },
  });
};

async function consumeBatch(batch: Batch): PromiseGenericResult<string> {
  const lastOffset = batch.lastOffset();
  const batchId = `${batch.partition}-${batch.firstOffset()}-${lastOffset}`;

  console.log(
    `Received batch with ${
      batch.messages.length
    } messages. Offset: ${batch.firstOffset()}`
  );

  const messages: Message[] = [];
  for (const message of batch.messages) {
    if (message.value) {
      try {
        const kafkaValue = JSON.parse(message.value.toString());
        const parsedMsg = JSON.parse(kafkaValue.value) as Message;
        messages.push(mapMessageDates(parsedMsg));
      } catch (error) {
        return err(`Failed to parse message: ${error}`);
      }
    } else {
      // TODO: Should we skip or fail the batch?
      return err("Message value is empty");
    }
  }

  const logManager = new LogManager();

  try {
    await logManager.processLogEntries(messages, {
      batchId,
      partition: batch.partition,
      lastOffset: lastOffset,
      messageCount: batch.messages.length,
    });
    return ok(batchId);
  } catch (error) {
    // TODO: Should we skip or fail the batch?
    Sentry.captureException(error, {
      tags: {
        type: "ConsumeError",
        topic: "request-response-logs-prod",
      },
      extra: {
        batchId: batch.partition,
        partition: batch.partition,
        offset: batch.messages[0].offset,
        messageCount: batch.messages.length,
      },
    });
    return err(`Failed to process batch ${batchId}, error: ${error}`);
  }
}

function mapMessageDates(message: Message): Message {
  return {
    ...message,
    log: {
      ...message.log,
      request: {
        ...message.log.request,
        requestCreatedAt: new Date(message.log.request.requestCreatedAt),
      },
      response: {
        ...message.log.response,
        responseCreatedAt: new Date(message.log.response.responseCreatedAt),
      },
    },
  };
}

const dlqConsumer = kafka?.consumer({
  groupId: "jawn-consumer-local-01",
  minBytes: 1000, // 1 kB
  maxBytes: 5000, // 10 kB
});

process.on("exit", async () => {
  await dlqConsumer?.stop();
  await dlqConsumer?.disconnect();
  console.log("DLQ Consumer disconnected.");
});

export const consumeDlq = async () => {
  if (KAFKA_ENABLED && !dlqConsumer) {
    console.error("Failed to create Kafka dlq consumer");
    return;
  }

  let retryDelay = 100;
  const maxDelay = 30000;

  while (true) {
    try {
      await dlqConsumer?.connect();
      console.log("Successfully connected to DLQ Kafka");
      break;
    } catch (error: any) {
      console.error(`Failed to connect to DLQ Kafka: ${error.message}`);
      console.log(`Retrying in ${retryDelay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retryDelay = Math.min(retryDelay * 2, maxDelay); // Exponential backoff with a cap
    }
  }

  await dlqConsumer?.connect();
  await dlqConsumer?.subscribe({
    topic: "request-response-logs-prod-dlq",
    fromBeginning: true,
  });

  await dlqConsumer?.run({
    eachBatchAutoResolve: true,
    eachMessage: async ({ message, partition, heartbeat }) => {
      const consumeResult = await consumeDlqMessage(
        message.key?.toString() ?? "unknown",
        message,
        partition
      );

      if (consumeResult.error) {
        console.error("Failed to consume message", consumeResult.error);
      } else {
        await heartbeat();
      }
    },
  });
};

async function consumeDlqMessage(
  messageId: string,
  message: KafkaMessage,
  partition: number
): PromiseGenericResult<string> {
  console.log(`Received message with offset: ${message.offset}`);

  const messages: Message[] = [];
  if (message.value) {
    try {
      const kafkaValue = JSON.parse(message.value.toString());
      messages.push(mapMessageDates(kafkaValue));
    } catch (error) {
      return err(`Failed to parse message: ${error}`);
    }
  } else {
    return err("Message value is empty");
  }

  const logManager = new LogManager();

  try {
    await logManager.processLogEntries(messages, {
      batchId: messageId,
      partition: partition,
      lastOffset: message.offset,
      messageCount: 1,
    });
    return ok(message.offset.toString());
  } catch (error) {
    // TODO: Should we skip or fail the batch?
    Sentry.captureException(error, {
      tags: {
        type: "ConsumeError",
        topic: "request-response-logs-prod-dlq",
      },
      extra: {
        messageId: messageId,
        partition: partition,
        offset: message.offset,
        messageCount: 1,
      },
    });

    return err(`Failed to process message ${messageId}, error: ${error}`);
  }
}
