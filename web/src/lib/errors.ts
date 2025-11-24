export class APIError extends Error {
    status: number;
    details?: any;
  
    constructor(message: string, status = 400, details?: any) {
      super(message);
      this.status = status;
      this.details = details;
    }
  }
  
  export function fail(status: number, message: string, details?: any) {
    return new APIError(message, status, details);
  }
  