/**
 *
 * DO NOT EDIT THIS FILE UNLESS IT IS IN /costs
 */

interface TextOperator {
  operator: "equals" | "startsWith" | "includes";
  value: string;
}

export interface ModelRow {
  model: TextOperator;
  cost: {
    prompt_token: number;
    completion_token: number;
  };
  targetUrl?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}
