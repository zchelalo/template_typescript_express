import { v4 as uuid } from 'uuid'
import { UserEntity } from './entity'

/**
 * UserValue class.
 * 
 * This class implements the UserEntity interface and represents a value object for a User. It automatically generates a UUID for the user upon creation.
 * 
 * @implements {UserEntity}
*/
export class UserValue implements UserEntity {
  /**
   * The unique identifier of the user.
   * @type {string}
  */
  id: string

  /**
   * The name of the user.
   * @type {string}
  */
  name: string

  /**
   * The email address of the user.
   * @type {string}
  */
  email: string

  /**
   * The password of the user, stored as a hashed string.
   * @type {string}
  */
  password: string

  /**
   * Creates a new UserValue instance.
   * 
   * @param {string} name - The name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
  */
  constructor(name: string, email: string, password: string) {
    this.id = uuid()
    this.name = name
    this.email = email
    this.password = password
  }
}