import express from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import { responseMiddleware } from './middlewares/response'
import { logRequestMiddleware } from './middlewares/log_request'
import { logErrors, unknownErrorHandler, customErrorHandler } from './middlewares/error'

import { router as userRouter } from './modules/user/infrastructure/router'

import { ForbiddenError } from './helpers/errors/custom_error'

import { serve, setup } from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(logRequestMiddleware)
app.use(responseMiddleware)

const whitelist = ['http://localhost:5173']
app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.includes(origin as string) || !origin) {
      callback(null, true)
    } else {
      callback(new ForbiddenError())
    }
  },
  credentials: true
}))

app.use('/api', userRouter)

app.use('/docs', serve, setup(swaggerSpec))

app.use(logErrors)
app.use(customErrorHandler)
app.use(unknownErrorHandler)

export { app }