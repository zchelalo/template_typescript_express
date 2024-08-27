import jwt from 'jsonwebtoken'
import fs from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

/**
 * Token types for JWT
 * @enum
 */
export enum TokenType {
  /**
   * Access token
   */
  ACCESS = 'access',

  /**
   * Refresh token
   */
  REFRESH = 'refresh',

  /**
   * Verify token. Used for email verification
   */
  VERIFY = 'verify',

  /**
   * Recover token. Used for password recovery
   */
  RECOVER = 'recover'
}

/**
 * Certificate types for JWT
 * @enum
 */
enum certType {
  PRIVATE = 'private',
  PUBLIC = 'public'
}

/**
 * Paths to the certificates used for JWT
 */
const tokenPaths = {
  access: {
    private: '../../certs/private_access.pem',
    public: '../../certs/public_access.pem'
  },
  refresh: {
    private: '../../certs/private_refresh.pem',
    public: '../../certs/public_refresh.pem'
  },
  verify: {
    private: '../../certs/private_verify.pem',
    public: '../../certs/public_verify.pem'
  },
  recover: {
    private: '../../certs/private_recover.pem',
    public: '../../certs/public_recover.pem'
  }
}

/**
 * Expiration times for the tokens
 */
export const tokenExpiration = {
  access: `${process.env.ACCESS_TOKEN_DURATION_IN_MINUTES}m`,
  refresh: `${process.env.REFRESH_TOKEN_DURATION_IN_DAYS}d`,
  verify: '',
  recover: `${process.env.RECOVER_TOKEN_DURATION_IN_MINUTES}m`
}

/**
 * Create a JWT token
 * @param {jwt.JwtPayload} payload - Payload for the JWT token
 * @param {TokenType} type - Type of the token
 * @returns {Promise<string>} The JWT token
 */
export const createJWT = async (payload: jwt.JwtPayload, type: TokenType): Promise<string> => {
  const certPath = tokenPaths[type][certType.PRIVATE]
  const fullPath = join(dirname(fileURLToPath(import.meta.url)), certPath)
  const secret = await fs.readFile(fullPath, 'utf-8')
  const options: jwt.SignOptions = {
    algorithm: 'RS256',
    expiresIn: tokenExpiration[type]
  }
  const token = jwt.sign(payload, secret, options)
  return token
}

/**
 * Verify a JWT token
 * @param {string} token - The JWT token
 * @param {TokenType} type - Type of the token
 * @returns {Promise<jwt.JwtPayload>} The payload of the JWT token
 */
export const verifyJWT = async (token: string, type: TokenType): Promise<jwt.JwtPayload> => {
  const certPath = tokenPaths[type][certType.PUBLIC]
  const fullPath = join(dirname(fileURLToPath(import.meta.url)), certPath)
  const secret = await fs.readFile(fullPath, 'utf-8')
  const options: jwt.VerifyOptions = {
    algorithms: ['RS256']
  }
  const payload = jwt.verify(token, secret, options) as jwt.JwtPayload
  return payload
}