import { v4 as uuid } from 'uuid'
import { UserEntity } from './entity'

export class UserValue implements UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor({ name, email, password }: UserEntity) {
    this.id = uuid()
    this.name = name
    this.email = email
    this.password = password
  }
}