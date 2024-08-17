import { UserEntity } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'

const users: UserEntity[] = [
  {
    id: '1',
    name: 'John One',
    email: 'johnone@email.com',
    password: '12345678',
  },
  {
    id: '2',
    name: 'John Two',
    email: 'johntwo@email.com',
    password: '12345678',
  },
  {
    id: '3',
    name: 'John Three',
    email: 'johnthree@email.com',
    password: '12345678',
  },
]

export class MemoryRepository implements UserRepository {
  async getUserById(id: string): Promise<UserEntity | null> {
    const userObtained = users.find(user => user.id === id)
    return userObtained || null
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const userObtained = users.find(user => user.email === email)
    return userObtained || null
  }

  async getUsers(offset: number, limit: number): Promise<UserEntity[] | null> {
    const usersObtained = users.slice(offset, offset + limit)
    return usersObtained
  }

  async count(): Promise<number> {
    return users.length
  }

  async createUser(userData: UserEntity): Promise<UserEntity> {
    users.push(userData)
    return userData
  }
}