import { UserEntity } from '../domain/entity'
import { UserRepository } from '../domain/repository'
import { UserValue } from '../domain/value'
import { UserDTO } from './dto'

export class UserUseCase {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async getUserById(id: string): Promise<UserDTO | null> {
    const userObtained = await this.userRepository.getUserById(id)
    if (!userObtained) return null
    return new UserDTO(userObtained)
  }

  public async getUserByEmail(email: string): Promise<UserDTO | null> {
    const userObtained = await this.userRepository.getUserByEmail(email)
    if (!userObtained) return null
    return new UserDTO(userObtained)
  }

  public async getUsers(offset: number, limit: number): Promise<UserDTO[] | null> {
    const usersObtained = await this.userRepository.getUsers(offset, limit)
    if (!usersObtained) return null
    return usersObtained.map(user => new UserDTO(user))
  }

  public async count(): Promise<number> {
    return this.userRepository.count()
  }

  public async createUser(user: UserEntity): Promise<UserDTO> {
    const userValue = new UserValue(user)
    const userCreated = await this.userRepository.createUser(userValue)
    return new UserDTO(userCreated)
  }
}