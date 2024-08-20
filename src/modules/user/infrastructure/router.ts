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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users endpoints
 */

/** 
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUsersArray'
 */
router.get('/users', paginationMiddleware, userController.getUsers)

/** 
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         description: An user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUserObject'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseNotFound'
 */
router.get('/users/:id', validateData(getUserSchema, Type.PARAMS), userController.getUserById)

/** 
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestUserObject'
 *     responses:
 *       201:
 *         description: The user was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUserObject'
 */
router.post('/users', validateData(createUserSchema, Type.BODY), userController.createUser)

export { router }

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT authentication
 * 
 *   parameters:
 *     UserId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: User ID
 * 
 *   schemas:
 *     ResponseUsersArray:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code
 *         message:
 *           type: string
 *           description: Response message
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: Response data
 *         meta:
 *           type: object
 *           description: Metadata for the response
 *       required:
 *         - status
 *         - message
 *       example:
 *         status: 200
 *         message: sucess
 *         data: [
 *           {
 *             id: '123e4567-e89b-12d3-a456-426614174000',
 *             name: 'John Doe',
 *             email: 'johndoe@email.com'
 *           },
 *           {
 *             id: '213e4567-e89b-12d3-a456-426614174000',
 *             name: 'John Doe 2',
 *             email: 'johndoe2@email.com'
 *           }
 *         ]
 *         meta: {page: 1, perPage: 10, pageCount: 1, totalCount: 2}
 * 
 *     ResponseUserObject:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code
 *         message:
 *           type: string
 *           description: Response message
 *         data:
 *           $ref: '#/components/schemas/User'
 *           description: Response data
 *         meta:
 *           type: object
 *           description: Metadata for the response
 *       required:
 *         - status
 *         - message
 *       example:
 *         status: 200
 *         message: sucess
 *         data: {
 *           id: '123e4567-e89b-12d3-a456-426614174000',
 *           name: 'John Doe',
 *           email: 'johndoe@email.com'
 *         }
 *         meta: null
 *
 *     ResponseNotFound:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code
 *         message:
 *           type: string
 *           description: Response message
 *         details:
 *           type: object
 *           description: Response data
 *       required:
 *         - status
 *         - message
 *       example:
 *         status: 404
 *         message: resource not found
 *         details: null
 * 
 *     RequestUserObject:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user (must be at least 8 characters)
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         name: John Doe
 *         email: johndoe@email.com
 *         password: password123
 * 
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user (UUID)
 *           format: uuid
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *       required:
 *         - id
 *         - name
 *         - email
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: John Doe
 *         email: johndoe@email.com
 */
