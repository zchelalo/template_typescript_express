import { UserEntity } from './entity'

export interface UserRepository {
  getUserById(uuid: string): Promise<UserEntity | null>
  getUserByEmail(email: string): Promise<UserEntity | null>
  getUsers(offset: number, limit: number): Promise<UserEntity[] | null>
  count(): Promise<number>
  createUser(user: UserEntity): Promise<UserEntity>
}