import { NextFunction, Request, Response } from 'express'
import { CustomError } from 'src/helpers/errors/custom_error'
import { logger } from 'src/helpers/logger'

export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  next(err)
}

export const unknownErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.sendError({
    status: 500,
    message: err.message,
    details: null
  })
}

export const customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.sendError({
      status: err.statusCode,
      message: err.message,
      details: null
    })
  } else {
    next(err)
  }
}