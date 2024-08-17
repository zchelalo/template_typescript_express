import { UserEntity } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle'
import { user } from 'src/data/drizzle/schema'
import { count, eq } from 'drizzle-orm'
import { BadRequestError, DatabaseError, NotFoundError } from 'src/helpers/errors/custom_error'

export class PostgresRepository implements UserRepository {
  async getUserById(id: string): Promise<UserEntity> {
    const userObtained = await db.select().from(user).where(eq(user.id, id)).limit(1)
    if (userObtained.length === 0) {
      throw new NotFoundError(`user with id '${id}'`)
    }
    return userObtained[0]
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const userObtained = await db.select().from(user).where(eq(user.email, email)).limit(1)
    if (userObtained.length === 0) {
      throw new NotFoundError(`user with email '${email}'`)
    }
    return userObtained[0]
  }

  async getUsers(offset: number, limit: number): Promise<UserEntity[]> {
    const usersObtained = await db.select().from(user).offset(offset).limit(limit)
    if (usersObtained.length === 0) {
      throw new NotFoundError('users')
    }
    return usersObtained

  }

  async count(): Promise<number> {
    const usersCount = await db.select({ count: count() }).from(user)
    return usersCount[0].count

  }

  async createUser(userData: UserEntity): Promise<UserEntity> {
    const userObtained = await db.select().from(user).where(eq(user.email, userData.email)).limit(1)
    if (userObtained.length > 0) {
      throw new BadRequestError(`user with email '${userData.email}' already exists`)
    }

    const userCreated = await db.insert(user).values(userData).returning()
    if (userCreated.length === 0) {
      throw new DatabaseError('user not created')
    }
    return userCreated[0]
  }
}