

export class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
}
