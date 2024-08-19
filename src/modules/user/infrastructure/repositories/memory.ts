import { UserEntity } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'
import { NotFoundError } from 'src/helpers/errors/custom_error'

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
  async getUserById(id: string): Promise<UserEntity> {
    const userObtained = users.find(user => user.id === id)
    if (!userObtained) {
      throw new NotFoundError(`user with id ${id}`)
    }
    return userObtained
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const userObtained = users.find(user => user.email === email)
    if (!userObtained) {
      throw new NotFoundError(`user with email ${email}`)
    }
    return userObtained
  }

  async getUsers(offset: number, limit: number): Promise<UserEntity[]> {
    const usersObtained = users.slice(offset, offset + limit)
    if (usersObtained.length === 0) {
      throw new NotFoundError('users')
    }
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