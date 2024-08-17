import { Request, Response, NextFunction } from 'express'
import { SuccessResponse, ErrorResponse } from 'src/utils/response'

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = ({ status, message, data, meta }: SuccessResponse) => {
    res.status(status).json({
      status,
      message,
      data,
      meta
    })
    return res
  }

  res.sendError = ({ status, message, details }: ErrorResponse) => {
    res.status(status).json({
      status,
      message,
      details
    })
    return res
  }

  next()
}