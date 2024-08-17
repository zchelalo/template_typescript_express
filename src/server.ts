import express from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import { responseMiddleware } from './middlewares/response'
import { logRequestMiddleware } from './middlewares/log_request'
import { logErrors, unknownErrorHandler, customErrorHandler } from './middlewares/error'

import { router as userRouter } from './app/user/infrastructure/router'

const app = express()

const whitelist = ['http://localhost:5173']
app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.includes(origin as string) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  },
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(logRequestMiddleware)
app.use(responseMiddleware)

app.use('/api', userRouter)

app.use(logErrors)
app.use(customErrorHandler)
app.use(unknownErrorHandler)

export { app }