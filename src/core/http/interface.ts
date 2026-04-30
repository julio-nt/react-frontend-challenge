export interface ApiErrorResponse {
  error: {
    code: number;
    message: string;
    errors: {
      messaage: string;
      domain: string;
      reason: string;
    }[];
  };
}
