import { AuthRepository } from '../../domain/repository'
import { UserRepository } from 'src/modules/user/domain/repository'

import { DTOAuthResponse } from '../dtos/auth_response'
import { signInSchema, tokenSchema } from '../schemas/auth'

import { createJWT, TokenType, verifyJWT } from 'src/utils/jwt'
import { NotFoundError, UnauthorizedError } from 'src/helpers/errors/custom_error'

import bcrypt from 'bcrypt'
import { TokenValue } from '../../domain/value'

/**
 * Create a new Auth Use Case.
 * Provides methods to interact with Auth data including signing in, signing up, and signing out.
 * 
 * This class is part of the application layer in the hexagonal architecture and relies on a UserRepository to access and manipulate user data and an AuthRepository to access and manipulate tokens data.
 * 
 * The `DTOAuthResponse` is used within these methods and is documented in their respective modules.
 * 
 * @example
 * ```ts
 * const userRepository = new UserPostgresRepository()
 * const authUseCase = new AuthUseCase(userRepository)
 * ```
 */
export class AuthUseCase {
  /**
   * @private
   * @property {AuthRepository} authRepository - The repository used to interact with tokens data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly authRepository: AuthRepository

  /**
   * @private
   * @property {UserRepository} userRepository - The repository used to interact with user data.
   * This repository is injected via the constructor to decouple the data access layer from the application logic.
  */
  private readonly userRepository: UserRepository

  /**
   * Creates an instance of AuthUseCase.
   * 
   * @param {AuthRepository} authRepository - The repository that provides access to user data.
   * @param {UserRepository} userRepository - The repository that provides access to user data.
   * The repositories are injected to allow for greater flexibility and easier testing.
  */
  constructor(authRepository: AuthRepository, userRepository: UserRepository) {
    this.authRepository = authRepository
    this.userRepository = userRepository
  }

  /**
   * @function signIn
   * @description Sign in a user.
   * @param email - Email of user.
   * @param password - Password of user.
   * @returns {Promise<DTOAuthResponse>} A promise that resolves to the DTOAuthResponse.
   * @example
   * ```ts
   * const email = 'test@email.com'
   * const password = '12345678'
   * const authData = await authUseCase.signIn(email, password)
   * ```
  */
  public async signIn(email: string, password: string): Promise<DTOAuthResponse> {
    signInSchema.parse({ email, password })

    const userObtained = await this.userRepository.getUserByEmail(email)
    if (!userObtained) {
      throw new NotFoundError('user')
    }

    const isPasswordMatch = await bcrypt.compare(password, userObtained.password)
    if (!isPasswordMatch) {
      throw new UnauthorizedError()
    }

    const accessToken = await createJWT({ sub: userObtained.id }, TokenType.ACCESS)
    const refreshToken = await createJWT({ sub: userObtained.id }, TokenType.REFRESH)

    const tokenTypeId = await this.authRepository.getTokenTypeIdByKey('refresh')
    const newToken = new TokenValue(refreshToken, userObtained.id, tokenTypeId)
    await this.authRepository.saveToken(newToken.id, newToken.token, newToken.userId, newToken.tokenTypeId)

    const authValue = new DTOAuthResponse({
      accessToken,
      refreshToken,
      user: userObtained
    })

    return authValue
  }

  public async signUp(name: string, email: string, password: string): Promise<DTOAuthResponse> {
    throw new Error('Method not implemented.')
  }

  public async signOut(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async refreshAccessToken(refreshToken: string): Promise<{ token: string, userId: string }> {
    tokenSchema.parse({ token: refreshToken })

    const payload = await verifyJWT(refreshToken, TokenType.REFRESH)
    if (!payload) {
      throw new UnauthorizedError()
    }

    const tokenObtained = await this.authRepository.getTokenByUserIdAndValue(payload.sub as string, refreshToken)
    if (!tokenObtained) {
      throw new UnauthorizedError()
    }

    const accessToken = await createJWT({ sub: payload.sub }, TokenType.ACCESS)
    return {
      token: accessToken,
      userId: payload.sub as string
    }
  }

  public async existsToken(userId: string, token: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}