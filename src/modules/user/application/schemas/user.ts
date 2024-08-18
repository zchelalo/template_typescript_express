import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8)
})

export const getUserSchema = z.object({
  id: z.string().uuid()
})