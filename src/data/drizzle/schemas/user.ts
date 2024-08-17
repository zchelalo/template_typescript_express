import { pgTable, varchar, timestamp, text, boolean, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 100 }).notNull(),
  recoveryToken: text('recovery_token'),
  verifyToken: text('verify_token'),
  verified: boolean('verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})