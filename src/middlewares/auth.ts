import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { cookieNames } from 'src/config/constants'
import { tokenExpiration, TokenType, verifyJWT } from 'src/utils/jwt'
import { durationToMilliseconds } from 'src/utils/time_converter'

import { PostgresRepository as AuthPostgresRepository } from 'src/modules/auth/infrastructure/repositories/postgres'
import { PostgresRepository as UserPostgresRepository } from 'src/modules/user/infrastructure/repositories/postgres'
import { AuthUseCase } from 'src/modules/auth/application/use_cases/auth'

const authRepository = new AuthPostgresRepository()
const userRepository = new UserPostgresRepository()
const useCase = new AuthUseCase(authRepository, userRepository)

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[cookieNames.ACCESS_TOKEN]

  try {
    const payload = await verifyJWT(token, TokenType.ACCESS)
    req.user = payload.sub
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const refreshToken = req.cookies[cookieNames.REFRESH_TOKEN]
      if (!refreshToken) {
        return res.sendError({ status: 401, message: 'unauthorized', details: { message: 'refresh token is missing' } })
      }

      try {
        const newTokens = await useCase.refreshAccessToken(refreshToken)
        res.cookie(cookieNames.ACCESS_TOKEN, newTokens.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          maxAge: durationToMilliseconds(tokenExpiration[TokenType.REFRESH])
        })

        if (newTokens.refreshToken) {
          res.cookie(cookieNames.REFRESH_TOKEN, newTokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: durationToMilliseconds(tokenExpiration[TokenType.REFRESH])
          })
        }

        req.user = newTokens.userId

        return next()
      } catch (error) {
        return next(error)
      }
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.sendError({ status: 401, message: 'unauthorized', details: { message: error.message } })
    }

    next(error)
  }
}