import { Router } from 'express'
import { PostgresRepository } from './repositories/postgres'
import { UserUseCase } from '../application/use_cases/user'
import { UserController } from './controller'
import { paginationMiddleware } from 'src/middlewares/pagination'
import { validateData, Type } from 'src/middlewares/validator'
import { createUserSchema, getUserSchema } from '../application/schemas/user'
// import { MemoryRepository } from './repositories/memory'

const router = Router()

// const memoryRepository = new MemoryRepository()
const postgresRepository = new PostgresRepository()
const useCase = new UserUseCase(postgresRepository)
const userController = new UserController(useCase)

router.get('/users', paginationMiddleware, userController.getUsers)
router.get('/users/:id', validateData(getUserSchema, Type.PARAMS), userController.getUserById)
router.post('/users', validateData(createUserSchema, Type.BODY), userController.createUser)

export { router }