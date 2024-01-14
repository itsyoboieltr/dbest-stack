import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { String, Omit } from '@sinclair/typebox/type';

export const hello = pgTable('hello', {
  id: text('id').primaryKey().$defaultFn(createId),
  data: text('data').notNull(),
});

const insertSchema = createInsertSchema(hello, {
  data: String({ minLength: 1, default: '' }),
});
export const helloInsertSchema = Omit(insertSchema, ['id']);
export type HelloInsert = typeof helloInsertSchema.static;

export const helloSelectSchema = createSelectSchema(hello);
export type HelloSelect = typeof helloSelectSchema.static;
