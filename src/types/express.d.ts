import { Pagination } from '../utils/pagination'
import { SuccessResponse, ErrorResponse } from 'src/utils/response'

declare global {
  namespace Express {
    interface Request {
      pagination?: Pagination
    }
    interface Response {
      sendSuccess(response: SuccessResponse): this
      sendError(response: ErrorResponse): this
    }
  }
}