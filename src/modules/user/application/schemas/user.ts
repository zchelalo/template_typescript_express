import { z } from 'zod'

/**
 * User schema
 * 
 * Represents the validation schema for create a User object.
 * 
 * @param {string} name - The name of the user, must be a string, must be at least 3 characters.
 * @param {string} email - The email of the user, must be a valid email format.
 * @param {string} password - The password of the user, must be at least 8 characters.
 */
export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8)
})

/**
 * User schema
 * 
 * Represents the validation schema for get a User object.
 * 
 * @param {string} id - The id of the user, must be a valid uuid.
 */
export const getUserSchema = z.object({
  id: z.string().uuid()
})