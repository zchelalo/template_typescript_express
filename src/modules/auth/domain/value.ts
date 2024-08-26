import { UserEntity } from 'src/modules/user/domain/entity'
import { AuthEntity } from './entity'

import { v4 } from 'uuid'

/**
 * AuthValue class.
 * 
 * This class implements the AuthEntity interface and represents a value object for a Auth object.
 * 
 * @implements {UserEntity}
*/
export class AuthValue implements AuthEntity {
  /**
   * The access token of the user.
   * @type {string}
  */
  readonly accessToken: string

  /**
   * The refresh token of the user.
   * @type {string}
  */
  readonly refreshToken: string

  /**
   * The information of the user.
   * @type {UserEntity}
  */
  readonly user: UserEntity

  /**
   * Creates a new AuthValue instance.
   * 
   * @param {string} accessToken - The access token of the user.
   * @param {string} refreshToken - The refresh token of the user.
   * @param {UserEntity} user - The information of the user.
  */
  constructor(accessToken: string, refreshToken: string, user: UserEntity) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.user = user
  }
}

/**
 * TokenValue class.
 * 
 * This class represents a value object for a Token object.
 * 
*/
export class TokenValue {
  /**
   * The id of the token.
  */
  readonly id: string

  /**
   * The value of the token.
  */
  readonly token: string

  /**
   * The user id of the token.
  */
  readonly userId: string

  /**
   * The token type id of the token.
  */
  readonly tokenTypeId: string

  /**
   * Creates a new TokenValue instance.
   * @param {string} token - The value of the token.
   * @param {string} userId - The user id of the token.
   * @param {string} tokenTypeId - The token type id of the token.
  */
  constructor(token: string, userId: string, tokenTypeId: string) {
    this.id = v4()
    this.token = token
    this.userId = userId
    this.tokenTypeId = tokenTypeId
  }
}

/**
 * TokenTypeValue class.
 * 
 * This class represents a value object for a TokenType object.
 * 
*/
export class TokenTypeValue {
  /**
   * The id of the token type.
  */
  readonly id: string

  /**
   * The value of the key of the token type.
  */
  readonly key: string

  /**
   * Creates a new TokenTypeValue instance.
   * @param {string} key - The key of the token type.
  */
  constructor(key: string) {
    this.id = v4()
    this.key = key
  }
}