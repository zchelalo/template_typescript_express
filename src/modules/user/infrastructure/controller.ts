import { Request, Response, NextFunction } from 'express'
import { UserUseCase } from '../application/use_cases/user'
import { Meta } from 'src/helpers/meta'

/**
 * UserController class.
 * 
 * This class handles HTTP requests related to user operations, such as retrieving user data, creating new users, and handling pagination.
*/
export class UserController {
  /**
   * An instance of the UserUseCase class, which contains the business logic.
   * @private
  */
  private readonly useCase: UserUseCase

  /**
   * Creates an instance of UserController.
   * 
   * @param {UserUseCase} useCase - The use case instance for handling user-related operations.
  */
  constructor(useCase: UserUseCase) {
    this.useCase = useCase
  }

  /**
   * Handles the request to get a user by their ID.
   * 
   * @param {Request} req - The Express request object, containing the user ID in params.
   * @param {Response} res - The Express response object, used to send the user data.
   * @param {NextFunction} next - The Express next function, used to pass errors to the error handler.
   * @returns {Promise<void>} A promise that resolves to void.
  */
  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = await this.useCase.getUserById(id)
      res.sendSuccess({ status: 200, message: 'success', data: user, meta: null })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handles the request to get a list of users with pagination.
   * 
   * @param {Request} req - The Express request object, containing pagination data.
   * @param {Response} res - The Express response object, used to send the list of users.
   * @param {NextFunction} next - The Express next function, used to pass errors to the error handler.
   * @returns {Promise<void>} A promise that resolves to void.
  */
  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pagination = req.pagination
      const count = await this.useCase.count()
      const meta = new Meta({
        page: pagination?.page ? pagination.page : 0,
        perPage: pagination?.limit ? pagination.limit : 0,
        total: count,
        pagLimitDef: Number(process.env.PAGINATION_LIMIT_DEFAULT)
      })

      const users = await this.useCase.getUsers(meta.getOffset(), meta.getLimit())

      res.sendSuccess({ status: 200, message: 'success', data: users, meta: meta })
    } catch (error) {
      next(error)
    }
  }


  /**
   * Handles the request to create a new user.
   * 
   * @param {Request} req - The Express request object, containing the new user data in the body.
   * @param {Response} res - The Express response object, used to send the created user data.
   * @param {NextFunction} next - The Express next function, used to pass errors to the error handler.
   * @returns {Promise<void>} A promise that resolves to void.
  */
  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.body
      const userCreated = await this.useCase.createUser(user)
      res.sendSuccess({ status: 201, message: 'success', data: userCreated, meta: null })
    } catch (error) {
      next(error)
    }
  }
}