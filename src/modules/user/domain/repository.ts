import { UserEntity } from './entity'

export interface UserRepository {
  getUserById(uuid: string): Promise<UserEntity>
  getUserByEmail(email: string): Promise<UserEntity>
  getUsers(offset: number, limit: number): Promise<UserEntity[]>
  count(): Promise<number>
  createUser(user: UserEntity): Promise<UserEntity>
}