type JsonValue = string | number | boolean | null | JsonArray | JsonObject;
interface JsonArray extends Array<JsonValue> {}
interface JsonObject { [key: string]: JsonValue; }

/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/v1/user/query": {
    post: operations["GetUsers"];
  };
  "/v1/request/query": {
    post: operations["GetRequests"];
  };
  "/v1/request/{requestId}/feedback": {
    post: operations["FeedbackRequest"];
  };
  "/v1/request/{requestId}/property": {
    put: operations["PutProperty"];
  };
  "/v1/prompt/query": {
    post: operations["GetPrompts"];
  };
  "/v1/prompt/{promptId}/query": {
    post: operations["GetPrompt"];
  };
  "/v1/prompt/version/{promptVersionId}/subversion": {
    post: operations["CreateSubversion"];
  };
  "/v1/prompt/{promptId}/versions/query": {
    post: operations["GetPromptVersions"];
  };
  "/v1/experiment/dataset": {
    post: operations["AddDataset"];
  };
  "/v1/experiment/dataset/random": {
    post: operations["AddRandomDataset"];
  };
  "/v1/experiment/dataset/{datasetId}/query": {
    post: operations["GetDataset"];
  };
  "/v1/experiment/dataset/{datasetId}/mutate": {
    post: operations["MutateDataset"];
  };
  "/v1/experiment": {
    post: operations["CreateNewExperiment"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    "ResultSuccess__count-number--prompt_tokens-number--completion_tokens-number--user_id-string--cost_usd-number_-Array_": {
      data: {
          /** Format: double */
          cost_usd: number;
          user_id: string;
          /** Format: double */
          completion_tokens: number;
          /** Format: double */
          prompt_tokens: number;
          /** Format: double */
          count: number;
        }[];
      /** @enum {number|null} */
      error: null;
    };
    ResultError_string_: {
      /** @enum {number|null} */
      data: null;
      error: string;
    };
    "Result__count-number--prompt_tokens-number--completion_tokens-number--user_id-string--cost_usd-number_-Array.string_": components["schemas"]["ResultSuccess__count-number--prompt_tokens-number--completion_tokens-number--user_id-string--cost_usd-number_-Array_"] | components["schemas"]["ResultError_string_"];
    UserQueryParams: {
      userIds?: string[];
      timeFilter?: {
        /** Format: double */
        endTimeUnixSeconds: number;
        /** Format: double */
        startTimeUnixSeconds: number;
      };
    };
Json: JsonObject;
    /** @enum {string} */
    Provider: "OPENAI" | "ANTHROPIC" | "TOGETHERAI" | "GROQ" | "GOOGLE" | "CUSTOM";
    /** @enum {string} */
    LlmType: "chat" | "completion";
    FunctionCall: {
      name?: string;
      arguments?: Record<string, never>;
    };
    Message: {
      role?: string;
      content?: string;
      function_call?: components["schemas"]["FunctionCall"];
    };
    Request: {
      llm_type?: components["schemas"]["LlmType"];
      model?: string;
      provider?: string;
      prompt?: string | null;
      /** Format: double */
      max_tokens?: number | null;
      /** Format: double */
      temperature?: number | null;
      /** Format: double */
      top_p?: number | null;
      /** Format: double */
      n?: number | null;
      stream?: boolean | null;
      stop?: string | null;
      /** Format: double */
      presence_penalty?: number | null;
      /** Format: double */
      frequency_penalty?: number | null;
      /** Format: double */
      logprobs?: number | null;
      /** Format: double */
      best_of?: number | null;
      logit_bias?: Record<string, unknown> | null;
      user?: string | null;
      messages?: components["schemas"]["Message"][] | null;
      tooLarge?: boolean;
      heliconeMessage?: string;
    };
    /** @description Construct a type with a set of properties K of type T */
    "Record_number.string_": {
      [key: string]: string;
    };
    ErrorInfo: {
      code?: string | null;
      message?: string | null;
    };
    Response: {
      completions?: components["schemas"]["Record_number.string_"] | null;
      message?: components["schemas"]["Message"] | null;
      error?: components["schemas"]["ErrorInfo"] | null;
      model?: string | null;
      tooLarge?: boolean;
      heliconeMessage?: string;
    };
    LlmSchema: {
      request: components["schemas"]["Request"];
      response?: components["schemas"]["Response"] | null;
    };
    /** @description Construct a type with a set of properties K of type T */
    "Record_string.string_": {
      [key: string]: string;
    };
    HeliconeRequest: {
      /** @example Happy */
      response_id: string;
      response_created_at: string;
      response_body?: unknown;
      /** Format: double */
      response_status: number;
      response_model: string | null;
      request_id: string;
      request_model: string | null;
      model_override: string | null;
      request_created_at: string;
      request_body: unknown;
      request_path: string;
      request_user_id: string | null;
      request_properties: {
        [key: string]: components["schemas"]["Json"];
      } | null;
      request_feedback: {
        [key: string]: components["schemas"]["Json"];
      } | null;
      helicone_user: string | null;
      prompt_name: string | null;
      prompt_regex: string | null;
      key_name: string;
      /** Format: double */
      delay_ms: number | null;
      /** Format: double */
      time_to_first_token: number | null;
      /** Format: double */
      total_tokens: number | null;
      /** Format: double */
      prompt_tokens: number | null;
      /** Format: double */
      completion_tokens: number | null;
      provider: components["schemas"]["Provider"];
      node_id: string | null;
      feedback_created_at?: string | null;
      feedback_id?: string | null;
      feedback_rating?: boolean | null;
      signed_body_url?: string | null;
      llmSchema: components["schemas"]["LlmSchema"] | null;
      country_code: string | null;
      asset_ids: string[] | null;
      asset_urls: components["schemas"]["Record_string.string_"] | null;
    };
    "ResultSuccess_HeliconeRequest-Array_": {
      data: components["schemas"]["HeliconeRequest"][];
      /** @enum {number|null} */
      error: null;
    };
    "Result_HeliconeRequest-Array.string_": components["schemas"]["ResultSuccess_HeliconeRequest-Array_"] | components["schemas"]["ResultError_string_"];
    /** @description Make all properties in T optional */
    Partial_TextOperators_: {
      "not-equals"?: string;
      equals?: string;
      like?: string;
      ilike?: string;
      contains?: string;
      "not-contains"?: string;
    };
    /** @description Make all properties in T optional */
    Partial_TimestampOperators_: {
      gte?: string;
      lte?: string;
      lt?: string;
      gt?: string;
    };
    /** @description Make all properties in T optional */
    Partial_NumberOperators_: {
      /** Format: double */
      "not-equals"?: number;
      /** Format: double */
      equals?: number;
      /** Format: double */
      gte?: number;
      /** Format: double */
      lte?: number;
      /** Format: double */
      lt?: number;
      /** Format: double */
      gt?: number;
    };
    /** @description Make all properties in T optional */
    Partial_UserMetricsToOperators_: {
      user_id?: components["schemas"]["Partial_TextOperators_"];
      last_active?: components["schemas"]["Partial_TimestampOperators_"];
      total_requests?: components["schemas"]["Partial_NumberOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_UserApiKeysTableToOperators_: {
      api_key_hash?: components["schemas"]["Partial_TextOperators_"];
      api_key_name?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_ResponseTableToOperators_: {
      body_tokens?: components["schemas"]["Partial_NumberOperators_"];
      body_model?: components["schemas"]["Partial_TextOperators_"];
      body_completion?: components["schemas"]["Partial_TextOperators_"];
      status?: components["schemas"]["Partial_NumberOperators_"];
      model?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_RequestTableToOperators_: {
      prompt?: components["schemas"]["Partial_TextOperators_"];
      created_at?: components["schemas"]["Partial_TimestampOperators_"];
      user_id?: components["schemas"]["Partial_TextOperators_"];
      auth_hash?: components["schemas"]["Partial_TextOperators_"];
      org_id?: components["schemas"]["Partial_TextOperators_"];
      id?: components["schemas"]["Partial_TextOperators_"];
      node_id?: components["schemas"]["Partial_TextOperators_"];
      model?: components["schemas"]["Partial_TextOperators_"];
      modelOverride?: components["schemas"]["Partial_TextOperators_"];
      path?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_BooleanOperators_: {
      equals?: boolean;
    };
    /** @description Make all properties in T optional */
    Partial_FeedbackTableToOperators_: {
      id?: components["schemas"]["Partial_NumberOperators_"];
      created_at?: components["schemas"]["Partial_TimestampOperators_"];
      rating?: components["schemas"]["Partial_BooleanOperators_"];
      response_id?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_PropertiesTableToOperators_: {
      auth_hash?: components["schemas"]["Partial_TextOperators_"];
      key?: components["schemas"]["Partial_TextOperators_"];
      value?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_TimestampOperatorsTyped_: {
      /** Format: date-time */
      gte?: string;
      /** Format: date-time */
      lte?: string;
      /** Format: date-time */
      lt?: string;
      /** Format: date-time */
      gt?: string;
    };
    /** @description Make all properties in T optional */
    Partial_RequestResponseLogToOperators_: {
      latency?: components["schemas"]["Partial_NumberOperators_"];
      status?: components["schemas"]["Partial_NumberOperators_"];
      request_created_at?: components["schemas"]["Partial_TimestampOperatorsTyped_"];
      response_created_at?: components["schemas"]["Partial_TimestampOperatorsTyped_"];
      auth_hash?: components["schemas"]["Partial_TextOperators_"];
      model?: components["schemas"]["Partial_TextOperators_"];
      user_id?: components["schemas"]["Partial_TextOperators_"];
      organization_id?: components["schemas"]["Partial_TextOperators_"];
      node_id?: components["schemas"]["Partial_TextOperators_"];
      job_id?: components["schemas"]["Partial_TextOperators_"];
      threat?: components["schemas"]["Partial_BooleanOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_UserViewToOperators_: {
      user_id?: components["schemas"]["Partial_TextOperators_"];
      active_for?: components["schemas"]["Partial_NumberOperators_"];
      first_active?: components["schemas"]["Partial_TimestampOperators_"];
      last_active?: components["schemas"]["Partial_TimestampOperators_"];
      total_requests?: components["schemas"]["Partial_NumberOperators_"];
      average_requests_per_day_active?: components["schemas"]["Partial_NumberOperators_"];
      average_tokens_per_request?: components["schemas"]["Partial_NumberOperators_"];
      total_completion_tokens?: components["schemas"]["Partial_NumberOperators_"];
      total_prompt_token?: components["schemas"]["Partial_NumberOperators_"];
      cost?: components["schemas"]["Partial_NumberOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_PropertiesCopyV2ToOperators_: {
      key?: components["schemas"]["Partial_TextOperators_"];
      value?: components["schemas"]["Partial_TextOperators_"];
      organization_id?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_PropertyWithResponseV1ToOperators_: {
      property_key?: components["schemas"]["Partial_TextOperators_"];
      property_value?: components["schemas"]["Partial_TextOperators_"];
      request_created_at?: components["schemas"]["Partial_TimestampOperatorsTyped_"];
      organization_id?: components["schemas"]["Partial_TextOperators_"];
      threat?: components["schemas"]["Partial_BooleanOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_JobToOperators_: {
      id?: components["schemas"]["Partial_TextOperators_"];
      name?: components["schemas"]["Partial_TextOperators_"];
      description?: components["schemas"]["Partial_TextOperators_"];
      status?: components["schemas"]["Partial_TextOperators_"];
      created_at?: components["schemas"]["Partial_TimestampOperators_"];
      updated_at?: components["schemas"]["Partial_TimestampOperators_"];
      timeout_seconds?: components["schemas"]["Partial_NumberOperators_"];
      custom_properties?: {
        [key: string]: components["schemas"]["Partial_TextOperators_"];
      };
      org_id?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_NodesToOperators_: {
      id?: components["schemas"]["Partial_TextOperators_"];
      name?: components["schemas"]["Partial_TextOperators_"];
      description?: components["schemas"]["Partial_TextOperators_"];
      job_id?: components["schemas"]["Partial_TextOperators_"];
      status?: components["schemas"]["Partial_TextOperators_"];
      created_at?: components["schemas"]["Partial_TimestampOperators_"];
      updated_at?: components["schemas"]["Partial_TimestampOperators_"];
      timeout_seconds?: components["schemas"]["Partial_NumberOperators_"];
      custom_properties?: {
        [key: string]: components["schemas"]["Partial_TextOperators_"];
      };
      org_id?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_CacheHitsTableToOperators_: {
      organization_id?: components["schemas"]["Partial_TextOperators_"];
      request_id?: components["schemas"]["Partial_TextOperators_"];
      latency?: components["schemas"]["Partial_NumberOperators_"];
      completion_tokens?: components["schemas"]["Partial_NumberOperators_"];
      prompt_tokens?: components["schemas"]["Partial_NumberOperators_"];
      created_at?: components["schemas"]["Partial_TimestampOperatorsTyped_"];
    };
    /** @description Make all properties in T optional */
    Partial_RateLimitTableToOperators_: {
      organization_id?: components["schemas"]["Partial_TextOperators_"];
      created_at?: components["schemas"]["Partial_TimestampOperatorsTyped_"];
    };
    /** @description Make all properties in T optional */
    Partial_PromptToOperators_: {
      id?: components["schemas"]["Partial_TextOperators_"];
      user_defined_id?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_PromptVersionsToOperators_: {
      minor_version?: components["schemas"]["Partial_NumberOperators_"];
      major_version?: components["schemas"]["Partial_NumberOperators_"];
      id?: components["schemas"]["Partial_TextOperators_"];
      prompt_v2?: components["schemas"]["Partial_TextOperators_"];
    };
    /** @description Make all properties in T optional */
    Partial_TablesAndViews_: {
      user_metrics?: components["schemas"]["Partial_UserMetricsToOperators_"];
      user_api_keys?: components["schemas"]["Partial_UserApiKeysTableToOperators_"];
      response?: components["schemas"]["Partial_ResponseTableToOperators_"];
      request?: components["schemas"]["Partial_RequestTableToOperators_"];
      feedback?: components["schemas"]["Partial_FeedbackTableToOperators_"];
      properties_table?: components["schemas"]["Partial_PropertiesTableToOperators_"];
      request_response_log?: components["schemas"]["Partial_RequestResponseLogToOperators_"];
      users_view?: components["schemas"]["Partial_UserViewToOperators_"];
      properties_v3?: components["schemas"]["Partial_PropertiesCopyV2ToOperators_"];
      property_with_response_v1?: components["schemas"]["Partial_PropertyWithResponseV1ToOperators_"];
      job?: components["schemas"]["Partial_JobToOperators_"];
      job_node?: components["schemas"]["Partial_NodesToOperators_"];
      cache_hits?: components["schemas"]["Partial_CacheHitsTableToOperators_"];
      rate_limit_log?: components["schemas"]["Partial_RateLimitTableToOperators_"];
      properties?: {
        [key: string]: components["schemas"]["Partial_TextOperators_"];
      };
      values?: {
        [key: string]: components["schemas"]["Partial_TextOperators_"];
      };
      prompt_v2?: components["schemas"]["Partial_PromptToOperators_"];
      prompts_versions?: components["schemas"]["Partial_PromptVersionsToOperators_"];
    };
    SingleKey_TablesAndViews_: components["schemas"]["Partial_TablesAndViews_"];
    FilterLeaf: components["schemas"]["SingleKey_TablesAndViews_"];
    FilterNode: components["schemas"]["FilterLeaf"] | components["schemas"]["FilterBranch"] | "all";
    FilterBranch: {
      left: components["schemas"]["FilterNode"];
      /** @enum {string} */
      operator: "or" | "and";
      right: components["schemas"]["FilterNode"];
    };
    /** @enum {string} */
    SortDirection: "asc" | "desc";
    SortLeafRequest: {
      created_at?: components["schemas"]["SortDirection"];
      cache_created_at?: components["schemas"]["SortDirection"];
      latency?: components["schemas"]["SortDirection"];
      last_active?: components["schemas"]["SortDirection"];
      total_tokens?: components["schemas"]["SortDirection"];
      completion_tokens?: components["schemas"]["SortDirection"];
      prompt_tokens?: components["schemas"]["SortDirection"];
      user_id?: components["schemas"]["SortDirection"];
      body_model?: components["schemas"]["SortDirection"];
      is_cached?: components["schemas"]["SortDirection"];
      request_prompt?: components["schemas"]["SortDirection"];
      response_text?: components["schemas"]["SortDirection"];
      properties?: {
        [key: string]: components["schemas"]["SortDirection"];
      };
      values?: {
        [key: string]: components["schemas"]["SortDirection"];
      };
    };
    RequestQueryParams: {
      filter: components["schemas"]["FilterNode"];
      /** Format: double */
      offset?: number;
      /** Format: double */
      limit?: number;
      sort?: components["schemas"]["SortLeafRequest"];
      isCached?: boolean;
      includeInputs?: boolean;
    };
    ResultSuccess_null_: {
      /** @enum {number|null} */
      data: null;
      /** @enum {number|null} */
      error: null;
    };
    "Result_null.string_": components["schemas"]["ResultSuccess_null_"] | components["schemas"]["ResultError_string_"];
    PromptsResult: {
      id: string;
      user_defined_id: string;
      description: string;
      pretty_name: string;
      /** Format: double */
      major_version: number;
    };
    "ResultSuccess_PromptsResult-Array_": {
      data: components["schemas"]["PromptsResult"][];
      /** @enum {number|null} */
      error: null;
    };
    "Result_PromptsResult-Array.string_": components["schemas"]["ResultSuccess_PromptsResult-Array_"] | components["schemas"]["ResultError_string_"];
    PromptsQueryParams: {
      filter: components["schemas"]["FilterNode"];
    };
    PromptResult: {
      id: string;
      user_defined_id: string;
      description: string;
      pretty_name: string;
      /** Format: double */
      major_version: number;
      latest_version_id: string;
      latest_model_used: string;
      created_at: string;
      last_used: string;
      versions: string[];
    };
    ResultSuccess_PromptResult_: {
      data: components["schemas"]["PromptResult"];
      /** @enum {number|null} */
      error: null;
    };
    "Result_PromptResult.string_": components["schemas"]["ResultSuccess_PromptResult_"] | components["schemas"]["ResultError_string_"];
    PromptQueryParams: {
      timeFilter: {
        end: string;
        start: string;
      };
    };
    PromptVersionResult: {
      id: string;
      /** Format: double */
      minor_version: number;
      /** Format: double */
      major_version: number;
      helicone_template: string;
      prompt_v2: string;
      model: string;
    };
    ResultSuccess_PromptVersionResult_: {
      data: components["schemas"]["PromptVersionResult"];
      /** @enum {number|null} */
      error: null;
    };
    "Result_PromptVersionResult.string_": components["schemas"]["ResultSuccess_PromptVersionResult_"] | components["schemas"]["ResultError_string_"];
    PromptCreateSubversionParams: {
      newHeliconeTemplate: unknown;
    };
    "ResultSuccess_PromptVersionResult-Array_": {
      data: components["schemas"]["PromptVersionResult"][];
      /** @enum {number|null} */
      error: null;
    };
    "Result_PromptVersionResult-Array.string_": components["schemas"]["ResultSuccess_PromptVersionResult-Array_"] | components["schemas"]["ResultError_string_"];
    NewDatasetParams: {
      datasetName: string;
      requestIds: string[];
    };
    RandomDatasetParams: {
      datasetName: string;
      filter: components["schemas"]["FilterNode"];
      /** Format: double */
      offset?: number;
      /** Format: double */
      limit?: number;
    };
    "ResultSuccess___-Array_": {
      data: Record<string, never>[];
      /** @enum {number|null} */
      error: null;
    };
    "Result___-Array.string_": components["schemas"]["ResultSuccess___-Array_"] | components["schemas"]["ResultError_string_"];
    "ResultSuccess__experimentId-string__": {
      data: {
        experimentId: string;
      };
      /** @enum {number|null} */
      error: null;
    };
    "Result__experimentId-string_.string_": components["schemas"]["ResultSuccess__experimentId-string__"] | components["schemas"]["ResultError_string_"];
    NewExperimentParams: {
      datasetId: string;
      promptVersion: string;
      model: string;
    };
  };
  responses: {
  };
  parameters: {
  };
  requestBodies: {
  };
  headers: {
  };
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  GetUsers: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserQueryParams"];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result__count-number--prompt_tokens-number--completion_tokens-number--user_id-string--cost_usd-number_-Array.string_"];
        };
      };
    };
  };
  GetRequests: {
    /** @description Request query filters */
    requestBody: {
      content: {
        /**
         * @example {
         *   "filter": "all",
         *   "isCached": false,
         *   "limit": 10,
         *   "offset": 0,
         *   "sort": {
         *     "created_at": "desc"
         *   }
         * }
         */
        "application/json": components["schemas"]["RequestQueryParams"];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_HeliconeRequest-Array.string_"];
        };
      };
    };
  };
  FeedbackRequest: {
    parameters: {
      path: {
        requestId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": {
          rating: boolean;
        };
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_null.string_"];
        };
      };
    };
  };
  PutProperty: {
    parameters: {
      path: {
        requestId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": {
          value: string;
          key: string;
        };
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_null.string_"];
        };
      };
    };
  };
  GetPrompts: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["PromptsQueryParams"];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_PromptsResult-Array.string_"];
        };
      };
    };
  };
  GetPrompt: {
    parameters: {
      path: {
        promptId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PromptQueryParams"];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_PromptResult.string_"];
        };
      };
    };
  };
  CreateSubversion: {
    parameters: {
      path: {
        promptVersionId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PromptCreateSubversionParams"];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_PromptVersionResult.string_"];
        };
      };
    };
  };
  GetPromptVersions: {
    parameters: {
      path: {
        promptId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": Record<string, never>;
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_PromptVersionResult-Array.string_"];
        };
      };
    };
  };
  AddDataset: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["NewDatasetParams"];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_null.string_"];
        };
      };
    };
  };
  AddRandomDataset: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RandomDatasetParams"];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result_null.string_"];
        };
      };
    };
  };
  GetDataset: {
    requestBody: {
      content: {
        "application/json": Record<string, never>;
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result___-Array.string_"];
        };
      };
    };
  };
  MutateDataset: {
    requestBody: {
      content: {
        "application/json": {
          removeRequests: string[];
          addRequests: string[];
        };
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result___-Array.string_"];
        };
      };
    };
  };
  CreateNewExperiment: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["NewExperimentParams"];
      };
    };
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["Result__experimentId-string_.string_"];
        };
      };
    };
  };
}
