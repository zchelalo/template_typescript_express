import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

export enum Type {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'params'
}

export function validateData(schema: z.ZodObject<any, any>, type: Type) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type])
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')}: ${issue.message}`,
        }))
        res.sendError({
          status: 400,
          message: 'invalid data',
          details: errorMessages
        })
      } else {
        res.sendError({
          status: 500,
          message: 'internal server error',
          details: null
        })
      }
    }
  }
}