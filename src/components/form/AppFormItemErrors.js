
export class TransformValueError extends Error {
  constructor(cause) {
    super('TRANSFORM VALUE ERROR');
    this.cause = cause;
  }
}

export class ValidateValueError extends Error {
  constructor(cause) {
    super('VALIDATE VALUE ERROR');
    this.cause = cause;
  }
}

export class TriggerValidationError extends Error {
  constructor(cause) {
    super('TRIGGER VALIDATION ERROR');
    this.cause = cause;
  }
}