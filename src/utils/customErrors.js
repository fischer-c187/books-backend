import { HttpStatusCodes } from './httpStatusCodes.js';

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class NotFoundError extends CustomError {
  constructor(resource) {
    super(`Resource ${resource} not found.`);
    this.statusCode = HttpStatusCodes.NOT_FOUND;
  }
}

class DatabaseError extends CustomError {
  constructor(error) {
    super(`Database Error: ${error.message}`);
    this.statusCode = HttpStatusCodes.INTERNAL_SERVER;
  }
}

class ValidationError extends CustomError {
  constructor(error) {
    super(`Validation error : ${error.message}`);
    this.statusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

class ConnectDatabaseError extends CustomError {
  constructor(error) {
    super(`Connect Database Error: ${error.message}`);
    this.statusCode = HttpStatusCodes.INTERNAL_SERVER;
  }
}

class CloudinaryError extends CustomError {
  constructor(message, status) {
    super(`cloudinary error : ${message}`);
    this.statusCode = status;
  }
}

class MulterError extends CustomError {
  constructor(errorMessage) {
    super(errorMessage);
    this.statusCode = HttpStatusCodes.UNSUPPORTED_MEDIA;
  }
}

export {
  NotFoundError,
  DatabaseError,
  ValidationError,
  ConnectDatabaseError,
  CloudinaryError,
  MulterError
};
