import { z } from 'zod'

/**
 * Sign in schema
 * 
 * Represents the validation schema for create a Sign In object.
 * 
 * @param {string} email - The email of the user, must be a valid email format.
 * @param {string} password - The password of the user, must be at least 8 characters.
 */
export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8)
})

/**
 * Sign up schema
 * 
 * Represents the validation schema for create a Sign Up object.
 * 
 * @param {string} name - The name of the user, must be a string, must be at least 3 characters.
 * @param {string} email - The email of the user, must be a valid email format.
 * @param {string} password - The password of the user, must be at least 8 characters.
 */
export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8)
})

/**
 * Token schema
 * 
 * Represents the validation schema for create a Token object.
 * 
 * @param {string} token - The token of the user, must be a string.
 */
export const tokenSchema = z.object({
  token: z.string()
})