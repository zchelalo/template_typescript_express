// src/middlewares/someMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import { logger } from 'src/helpers/logger'

export const logRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`)
  res.on('finish', () => {
    logger.info(`Response: ${res.statusCode}`)
  })
  next()
}