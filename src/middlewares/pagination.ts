import { Request, Response, NextFunction } from 'express'
import { Pagination } from '../utils/pagination'

/**
 * This middleware extracts the page and limit query parameters from the request and sets them in the request object. The page parameter is used to determine the page number, and the limit parameter is used to determine the number of items per page. This middleware must be used before any other middleware that requires pagination.
 * 
 * @param {Request} req - The Express request object, containing the query parameters.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function, used to pass the control to the next middleware.
 * @returns {void} A promise that resolves to void.
 * @example
 * ```ts
 * const router = Router()
 * router.use(paginationMiddleware)
 * router.get('/users', controller.getUsers)
 * ```
*/
export const paginationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { page, limit } = req.query
  req.pagination = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10)
  } as Pagination
  next()
}