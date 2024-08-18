import { Request, Response, NextFunction } from 'express'
import { UserUseCase } from '../application/use_cases/user'
import { Meta } from 'src/helpers/meta'

export class UserController {
  private readonly useCase: UserUseCase

  constructor(useCase: UserUseCase) {
    this.useCase = useCase
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const user = await this.useCase.getUserById(id)
      res.sendSuccess({ status: 200, message: 'success', data: user, meta: null })
    } catch (error) {
      next(error)
    }
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
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

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body
      const userCreated = await this.useCase.createUser(user)
      res.sendSuccess({ status: 201, message: 'success', data: userCreated, meta: null })
    } catch (error) {
      next(error)
    }
  }
}