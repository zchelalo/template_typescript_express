import { Router } from 'express'
import { PostgresRepository } from './repositories/postgres'
import { MemoryRepository } from './repositories/memory'
import { UserUseCase } from '../application/use_cases/user'
import { UserController } from './controller'
import { paginationMiddleware } from 'src/middlewares/pagination'
import { validateData, Type } from 'src/middlewares/validator'
import { createUserSchema, getUserSchema } from '../application/schemas/user'

const router = Router()

const repository = process.env.NODE_ENV === 'test' ? new MemoryRepository() : new PostgresRepository()
const useCase = new UserUseCase(repository)
const userController = new UserController(useCase)

router.get('/users', paginationMiddleware, userController.getUsers)
router.get('/users/:id', validateData(getUserSchema, Type.PARAMS), userController.getUserById)
router.post('/users', validateData(createUserSchema, Type.BODY), userController.createUser)

export { router }