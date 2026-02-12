export class APIError extends Error {
    status: number;
    details?: unknown;

    constructor(message: string, status = 400, details?: unknown) {
      super(message);
      this.status = status;
      this.details = details;
    }
  }

  export function fail(status: number, message: string, details?: unknown) {
    return new APIError(message, status, details);
  }
  