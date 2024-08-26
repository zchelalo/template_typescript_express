import jwt from 'jsonwebtoken'
import fs from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
  VERIFY = 'verify',
  RECOVER = 'recover'
}

enum certType {
  PRIVATE = 'private',
  PUBLIC = 'public'
}

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

export const tokenExpiration = {
  access: `${process.env.ACCESS_TOKEN_DURATION_IN_MINUTES}m`,
  refresh: `${process.env.REFRESH_TOKEN_DURATION_IN_DAYS}d`,
  verify: '',
  recover: `${process.env.RECOVER_TOKEN_DURATION_IN_MINUTES}m`
}

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