import { UserEntity } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'
import { UserValue } from '../../domain/value'
import { UserDTO } from '../dtos/user'

import bcrypt from 'bcrypt'

export class UserUseCase {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async getUserById(id: string): Promise<UserDTO> {
    const userObtained = await this.userRepository.getUserById(id)
    return new UserDTO(userObtained)
  }

  public async getUserByEmail(email: string): Promise<UserDTO> {
    const userObtained = await this.userRepository.getUserByEmail(email)
    return new UserDTO(userObtained)
  }

  public async getUsers(offset: number, limit: number): Promise<UserDTO[]> {
    const usersObtained = await this.userRepository.getUsers(offset, limit)
    return usersObtained.map(user => new UserDTO(user))
  }

  public async count(): Promise<number> {
    return this.userRepository.count()
  }

  public async createUser(user: UserEntity): Promise<UserDTO> {
    const password = await bcrypt.hash(user.password, 10)
    user.password = password
    const userValue = new UserValue(user)
    const userCreated = await this.userRepository.createUser(userValue)
    return new UserDTO(userCreated)
  }
}