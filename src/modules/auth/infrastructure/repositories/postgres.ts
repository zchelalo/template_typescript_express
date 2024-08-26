import { AuthRepository } from '../../domain/repository'
import { TokenTypeValue, TokenValue } from '../../domain/value'

import { db } from 'src/data/drizzle/config/orm'
import { token, tokenType } from 'src/data/drizzle/schemas'
import { eq, and } from 'drizzle-orm'

import { NotFoundError } from 'src/helpers/errors/custom_error'

/**
 * PostgresRepository class.
 * 
 * This class implements the AuthRepository interface to provide methods for interacting with the PostgreSQL database.
 * 
 * @implements {AuthRepository}
*/
export class PostgresRepository implements AuthRepository {
  async getTokenByUserIdAndValue(id: string, tokenValue: string): Promise<TokenValue> {
    const tokenObtained = await db
      .select({
        id: token.id,
        token: token.token,
        userId: token.userId,
        tokenTypeId: token.tokenTypeId
      })
      .from(token)
      .where(and(
        eq(token.userId, id),
        eq(token.token, tokenValue)
      ))
      .limit(1)

    if (!tokenObtained.length) {
      throw new NotFoundError('token')
    }

    return tokenObtained[0]
  }

  async saveToken(id: string, tokenValue: string, userId: string, tokenTypeId: string): Promise<void> {
    await db
      .insert(token)
      .values({
        id,
        token: tokenValue,
        userId,
        tokenTypeId
      })
  }

  async revokeTokenByUserIdAndValue(id: string, tokenValue: string): Promise<void> {
    const tokenObtained = await db
      .select({
        tokenValue: token.token
      })
      .from(token)
      .where(and(
        eq(token.userId, id),
        eq(token.token, tokenValue)
      ))
      .limit(1)

    if (!tokenObtained.length) {
      throw new NotFoundError('token')
    }

    await db
      .delete(token)
      .where(and(
        eq(token.userId, id), eq(token.token, tokenValue)
      ))
  }

  async getTokenTypeIdByKey(key: string): Promise<TokenTypeValue> {
    const tokenTypeObtained = await db
      .select({
        id: tokenType.id,
        key: tokenType.key
      })
      .from(tokenType)
      .where(eq(tokenType.key, key))
      .limit(1)

    if (!tokenTypeObtained.length) {
      throw new NotFoundError('token type')
    }

    return tokenTypeObtained[0]
  }
}