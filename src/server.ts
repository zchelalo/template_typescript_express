import express from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import { responseMiddleware } from './middlewares/response'

import { router as userRouter } from './app/user/infrastructure/router'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(responseMiddleware)

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

app.use('/api', userRouter)

export { app }