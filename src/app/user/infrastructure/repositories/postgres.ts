import { UserEntity } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'
import { db } from 'src/data/drizzle'
import { user } from 'src/data/drizzle/schema'
import { count, eq } from 'drizzle-orm'

export class PostgresRepository implements UserRepository {
  async getUserById(id: string): Promise<UserEntity | null> {
    const userObtained = await db.select().from(user).where(eq(user.id, id)).limit(1)
    return userObtained[0]
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const userObtained = await db.select().from(user).where(eq(user.email, email)).limit(1)
    return userObtained[0]
  }

  async getUsers(offset: number, limit: number): Promise<UserEntity[] | null> {
    const usersObtained = await db.select().from(user).offset(offset).limit(limit)
    return usersObtained
  }

  async count(): Promise<number> {
    const usersCount = await db.select({ count: count() }).from(user)
    return usersCount[0].count
  }

  async createUser(userData: UserEntity): Promise<UserEntity> {
    const userCreated = await db.insert(user).values(userData).returning()
    return userCreated[0]
  }
}