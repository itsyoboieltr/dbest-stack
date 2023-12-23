import { createId } from '@paralleldrive/cuid2';
import { t } from 'elysia';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const hello = pgTable('hello', {
  id: text('id').primaryKey().$defaultFn(createId),
  data: text('data').notNull(),
});

const insertSchema = createInsertSchema(hello, {
  data: t.String({ minLength: 1, default: '' }),
});
export const helloInsertSchema = t.Omit(insertSchema, ['id']);
export type HelloInsert = typeof helloInsertSchema.static;

export const helloSelectSchema = createSelectSchema(hello);
export type HelloSelect = typeof helloSelectSchema.static;
