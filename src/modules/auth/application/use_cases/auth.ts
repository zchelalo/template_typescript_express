import { AuthRepository } from '../../domain/repository'
import { UserRepository } from 'src/modules/user/domain/repository'
import { UserValue } from 'src/modules/user/domain/value'

import { DTOAuthResponse } from '../dtos/auth_response'
import { signInSchema, signOutSchema, signUpSchema, tokenSchema } from '../schemas/auth'

import { createJWT, TokenType, verifyJWT } from 'src/utils/jwt'
import { UnauthorizedError } from 'src/helpers/errors/custom_error'

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
   * @throws {UnauthorizedError} If the email or password is incorrect.
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

  /**
   * @function signUp
   * @description Sign up a user.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns {Promise<DTOAuthResponse>} A promise that resolves to the DTOAuthResponse.
   * @example
   * ```ts
   * const name = 'test'
   * const email = 'test@email.com'
   * const password = '12345678'
   * const authData = await authUseCase.signUp(name, email, password)
   * ```
  */
  public async signUp(name: string, email: string, password: string): Promise<DTOAuthResponse> {
    signUpSchema.parse({ name, email, password })

    const newUser = new UserValue(name, email, password)
    const userCreated = await this.userRepository.createUser(newUser)

    const accessToken = await createJWT({ sub: userCreated.id }, TokenType.ACCESS)
    const refreshToken = await createJWT({ sub: userCreated.id }, TokenType.REFRESH)

    const tokenTypeId = await this.authRepository.getTokenTypeIdByKey('refresh')
    const newToken = new TokenValue(refreshToken, userCreated.id, tokenTypeId)
    await this.authRepository.saveToken(newToken.id, newToken.token, newToken.userId, newToken.tokenTypeId)

    const authValue = new DTOAuthResponse({
      accessToken,
      refreshToken,
      user: userCreated
    })

    return authValue
  }

  /**
   * @function signOut
   * @description Sign out a user.
   * @param userId - The id of the user.
   * @param refreshToken - The refresh token of the user.
   * @returns {Promise<void>} A promise that resolves to the void.
   * @throws {UnauthorizedError} If the refresh token is invalid.
   * @example
   * ```ts
   * const userId = '938d6f5b-b4a6-4669-a514-ddb3a23621fc'
   * const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
   * await authUseCase.signOut(userId, refreshToken)
   * ```
  */
  public async signOut(userId: string, refreshToken: string): Promise<void> {
    signOutSchema.parse({ userId, refreshToken })

    const payload = await verifyJWT(refreshToken, TokenType.REFRESH)
    if (!payload) {
      throw new UnauthorizedError()
    }

    await this.authRepository.revokeTokenByUserIdAndValue(payload.sub as string, refreshToken)
  }

  /**
   * @function refreshAccessToken
   * @description Refresh the access token of a user.
   * @param refreshToken - The refresh token of the user.
   * @returns {Promise<{ token: string, userId: string }>} A promise that resolves to the new access token and the user id.
   * @throws {UnauthorizedError} If the refresh token is invalid.
   * @example
   * ```ts
   * const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZDgwNzQwNi1hNTQzLTRlMWYtYjAxOS1jOGIwNWQ1OGM1OWIiLCJpYXQiOjE3MjQ2MzExMjksImV4cCI6MTcyNTkyNzEyOX0.l7WXdoTopPRqeK-TNIgJtCoR863Yot5cJC-jV3v6DwJtrvH9wjqGFPHpgo00z4d9jCbMTEBnUfv2NkFCk4ecPt4YTledruAuxQoULk3NqoaXhn4wlKhQj7w14ngldir_pud4SxXJnfaw_zd1xg6Gd7rDH-LAWUYaNyvs8qt2CRra7pnBA6tBUvrO58HYReJRQU-GQP9PWRmRC4G8H3tpnGEybn4NcNCn-rO-PIgABZ1I3Len1y8ibKMrz53Rc1PTUTInD96RORM5zp5c06qkyUjW9AThFQwmYP9Yzo4z3fBsuvqQFha31lWoqzP5LNk2iOHECuequuLPThtNWdsRyw'
   * const accessData = await authUseCase.refreshAccessToken(refreshToken)
   * ```
  */
  public async refreshAccessToken(refreshToken: string): Promise<{ token: string, userId: string }> {
    tokenSchema.parse({ token: refreshToken })

    const payload = await verifyJWT(refreshToken, TokenType.REFRESH)
    if (!payload) {
      throw new UnauthorizedError()
    }

    await this.authRepository.getTokenByUserIdAndValue(payload.sub as string, refreshToken)

    const accessToken = await createJWT({ sub: payload.sub }, TokenType.ACCESS)

    return {
      token: accessToken,
      userId: payload.sub as string
    }
  }
}