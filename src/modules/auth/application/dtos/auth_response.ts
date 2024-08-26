import { DTOUserResponse } from 'src/modules/user/application/dtos/user_response'
import { AuthValue } from '../../domain/value'

/**
 * Data Transfer Object for Auth Response.
 * 
 * This class is responsible for transferring user data between different parts of the application or across application boundaries.
*/
export class DTOAuthResponse {
  /**
   * The access token of the user.
  */
  accessToken: string

  /**
   * The refresh token of the user.
  */
  refreshToken: string

  /**
   * The information of the user.
  */
  user: DTOUserResponse

  /**
   * Creates an instance of DTOAuthResponse.
   * 
   * @param {AuthValue} user - The auth value object from the domain layer.
  */
  constructor({ accessToken, refreshToken, user }: AuthValue) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.user = new DTOUserResponse(user)
  }
}