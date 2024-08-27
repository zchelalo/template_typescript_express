import { Router } from 'express'

import { PostgresRepository as UserPostgresRepository } from 'src/modules/user/infrastructure/repositories/postgres'
import { PostgresRepository as AuthPostgresRepository } from './repositories/postgres'
import { AuthUseCase } from '../application/use_cases/auth'
import { AuthController } from './controller'

import { authMiddleware } from 'src/middlewares/auth'
import { validateData, Type } from 'src/middlewares/validator'
import { signInSchema } from '../application/schemas/auth'
import { createUserSchema } from 'src/modules/user/application/schemas/user'

const router = Router()

const authRepository = new AuthPostgresRepository()
const userRepository = new UserPostgresRepository()
const useCase = new AuthUseCase(authRepository, userRepository)
const authController = new AuthController(useCase)

router.post('/auth/sign-in', validateData(signInSchema, Type.BODY), authController.signIn)
router.post('/auth/sign-up', validateData(createUserSchema, Type.BODY), authController.signUp)
router.post('/auth/sign-out', authMiddleware, authController.signOut)

export { router }