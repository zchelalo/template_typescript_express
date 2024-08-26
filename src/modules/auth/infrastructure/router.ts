import { Router } from 'express'

import { PostgresRepository as UserPostgresRepository } from 'src/modules/user/infrastructure/repositories/postgres'
import { PostgresRepository as AuthPostgresRepository } from './repositories/postgres'
import { AuthUseCase } from '../application/use_cases/auth'
import { AuthController } from './controller'

import { validateData, Type } from 'src/middlewares/validator'
import { signInSchema } from '../application/schemas/auth'

const router = Router()

const authRepository = new AuthPostgresRepository()
const userRepository = new UserPostgresRepository()
const useCase = new AuthUseCase(authRepository, userRepository)
const authController = new AuthController(useCase)

router.post('/auth/sign-in', validateData(signInSchema, Type.BODY), authController.signIn)

export { router }