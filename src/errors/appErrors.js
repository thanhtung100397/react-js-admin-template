
export class InvalidAuthInfoError extends Error {
  constructor(errorField, errorMessage) {
    super(`Invalid Auth Info: ${errorField} ${errorMessage}`);
    this.errorField = errorField;
    this.errorMessage = errorMessage
  }
}