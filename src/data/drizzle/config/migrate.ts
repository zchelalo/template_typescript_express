import '../../../config'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db } from './orm'

await migrate(db, { migrationsFolder: './src/data/drizzle/migrations' })