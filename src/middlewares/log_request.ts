// src/middlewares/someMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import { logger } from 'src/helpers/logger'

/**
 * Logs the incoming request and the response status code. This middleware must be used before any other middleware that sends a response.
 * 
 * @param {Request} req - The Express request object, containing the request method and the request URL.
 * @param {Response} res - The Express response object, used to log the response status code.
 * @param {NextFunction} next - The Express next function, used to pass the control to the next middleware.
 * @returns {void} A promise that resolves to void.
 * @example
 * ```ts
 * const router = Router()
 * router.use(logRequestMiddleware)
 * router.get('/users', controller.getUsers)
 * ```
*/
export const logRequestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  logger.info(`Incoming request: ${req.method} ${req.url}`)
  res.on('finish', () => {
    logger.info(`Response: ${res.statusCode}`)
  })
  next()
}