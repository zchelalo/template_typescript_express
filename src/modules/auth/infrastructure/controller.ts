import { Request, Response, NextFunction } from 'express'
import { AuthUseCase } from '../application/use_cases/auth'

import { cookieNames } from 'src/config/constants'
import { durationToMilliseconds } from 'src/utils/time_converter'
import { tokenExpiration, TokenType } from 'src/utils/jwt'

/**
 * AuthController class.
 * 
 * This class handles HTTP requests related to auth operations, such as signing in, signing up and signing out.
*/
export class AuthController {
  /**
   * An instance of the AuthUseCase class, which contains the business logic.
   * @private
  */
  private readonly useCase: AuthUseCase

  /**
   * Creates an instance of AuthController.
   * 
   * @param {AuthUseCase} useCase - The use case instance for handling auth-related operations.
  */
  constructor(useCase: AuthUseCase) {
    this.useCase = useCase
  }

  /**
   * Handles the request to sign in a user.
   * 
   * @param {Request} req - The Express request object, containing the sign up data.
   * @param {Response} res - The Express response object, used to send the user data.
   * @param {NextFunction} next - The Express next function, used to pass errors to the error handler.
   * @returns {Promise<void>} A promise that resolves to void.
  */
  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.body
      const userCreated = await this.useCase.signIn(user.email, user.password)

      // Both cookies are with the same expiration time because if the access token expires, the refresh token will be used to generate a new one. 
      res.cookie(cookieNames.ACCESS_TOKEN, userCreated.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: durationToMilliseconds(tokenExpiration[TokenType.REFRESH])
      })

      res.cookie(cookieNames.REFRESH_TOKEN, userCreated.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: durationToMilliseconds(tokenExpiration[TokenType.REFRESH])
      })

      res.sendSuccess({ status: 200, message: 'success', data: {
        user: userCreated.user
      }, meta: null })
    } catch (error) {
      next(error)
    }
  }
}