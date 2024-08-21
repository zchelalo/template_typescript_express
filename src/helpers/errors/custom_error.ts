export class CustomError extends Error {
  public statusCode: number
  
  constructor(statusCode: number = 500, message: string) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(400, `Bad request: ${message}`) // 400 Bad Request
  }
}

export class UnauthorizedError extends CustomError {
  constructor() {
    super(401, 'Unauthorized') // 401 Unauthorized
  }
}

export class ForbiddenError extends CustomError {
  constructor() {
    super(403, 'Forbidden') // 403 Forbidden
  }
}

export class NotFoundError extends CustomError {
  constructor(resource: string) {
    super(404, `${resource} not found`) // 404 Not Found
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(409, `Conflict: ${message}`) // 409 Conflict
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string) {
    super(500, `Database error: ${message}`) // 500 Internal Server Error
  }
}