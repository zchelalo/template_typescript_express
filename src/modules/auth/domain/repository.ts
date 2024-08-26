/**
 * AuthRepository interface.
 * 
 * This interface defines the contract for a repository that manages the authentication of AuthEntity objects.
 * 
 * @interface AuthRepository
*/
export interface AuthRepository {
  /**
   * Retrieves a token by the user ID and the token.
   * 
   * @param {string} id - The ID of the user.
   * @param {string} tokenValue - The token of the user.
   * @returns {Promise<string>} A promise that resolves to a string of the token.
  */
  getTokenByUserIdAndValue(id: string, tokenValue: string): Promise<string>

  /**
   * Saves a new token.
   * 
   * @param {string} id - The ID of the token.
   * @param {string} tokenValue - The token of the user.
   * @param {string} userId - The ID of the user.
   * @param {string} tokenTypeId - The type of the token.
   * @returns {Promise<void>} A promise that resolves to void.
  */
  saveToken(id: string, tokenValue: string, userId: string, tokenTypeId: string): Promise<void>

  /**
   * Revokes a token by the User ID and the token value.
   * 
   * @param {string} id - The ID of the user.
   * @param {string} tokenValue - The token of the user.
   * @returns {Promise<void>} A promise that resolves to void.
  */
  revokeTokenByUserIdAndValue(id: string, tokenValue: string): Promise<void>

  /**
   * Retrieves a token type ID by the key.
   * 
   * @param {string} key - The key of the token type.
   * @returns {Promise<string>} A promise that resolves to a string of the token.
  */
  getTokenTypeIdByKey(key: string): Promise<string>
}