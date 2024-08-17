import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: 'validations:invalid_email' }),
  password: z.string().min(8)
})