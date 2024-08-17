import { Request, Response, NextFunction } from 'express'
import { Pagination } from '../utils/pagination'

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query
  req.pagination = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10)
  } as Pagination
  next()
}