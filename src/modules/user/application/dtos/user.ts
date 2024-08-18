import { UserValue } from '../../domain/value'

export class UserDTO {
  id: string;
  name: string;
  email: string;

  constructor({ id, name, email }: UserValue) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}