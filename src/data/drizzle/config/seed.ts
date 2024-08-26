import '../../../config'
import { db } from './orm'
import * as schema from '../schemas'
import { logger } from 'src/helpers/logger'
import { v4 } from 'uuid'

async function main() {
  logger.info('seeding started')

  const tokenTypes = await db.select().from(schema.tokenType)
  if (tokenTypes.length === 0) {
    const types = ['refresh', 'recover', 'verify']
    for (const type of types) {
      await db.insert(schema.tokenType).values({
        id: v4(),
        key: type
      })
    }
  }
}

main()
  .then(() => {
    logger.info('seeding finished')
    process.exit(0)
  })
  .catch((error) => {
    logger.error(error)
    process.exit(1)
  })