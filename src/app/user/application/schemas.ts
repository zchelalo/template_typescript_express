import { z } from 'zod'
import { translateText } from 'src/utils/translation'

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: translateText('validations:invalid_email') }),
  password: z.string().min(8)
})