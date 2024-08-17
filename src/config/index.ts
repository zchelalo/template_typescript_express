import { config as configEnv } from 'dotenv'
import { z } from 'zod'

configEnv({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

/**
 * Environment variables
 */
const envVars = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),

  PAGINATION_LIMIT_DEFAULT: Number(process.env.PAGINATION_LIMIT_DEFAULT),

  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,

  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_PORT: Number(process.env.EMAIL_PORT),
  EMAIL_SECURE: process.env.EMAIL_SECURE === true,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  ACCESS_TOKEN_EXPIRATION_MINUTES: Number(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES),
  REFRESH_TOKEN_EXPIRATION_DAYS: Number(process.env.REFRESH_TOKEN_EXPIRATION_DAYS),
  RECOVERY_TOKEN_EXPIRATION_MINUTES: Number(process.env.RECOVERY_TOKEN_EXPIRATION_MINUTES)
}

/**
 * Environment variables schema
 */
const config = z.object({
  NODE_ENV: z.string(),
  PORT: z.number().int(),

  PAGINATION_LIMIT_DEFAULT: z.number().int(),

  DB_HOST: z.string(),
  DB_PORT: z.number().int(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),

  EMAIL_SERVER: z.string(),
  EMAIL_PORT: z.number().int(),
  EMAIL_SECURE: z.boolean(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),

  ACCESS_TOKEN_EXPIRATION_MINUTES: z.number().int(),
  REFRESH_TOKEN_EXPIRATION_DAYS: z.number().int(),
  RECOVERY_TOKEN_EXPIRATION_MINUTES: z.number().int()
})

/**
 * Validate environment variables
 */
config.parse(envVars)

/**
 * Declare global namespace for environment variables.
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof config> {}
  }
}