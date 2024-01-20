import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { Type as t } from '@sinclair/typebox/type';

export const todo = pgTable('todo', {
  id: text('id').primaryKey().$defaultFn(createId),
  data: text('data').notNull(),
});

const insertSchema = createInsertSchema(todo, {
  data: t.String({ minLength: 1, default: '' }),
});
export const todoInsertSchema = t.Omit(insertSchema, ['id']);
export type TodoInsert = typeof todoInsertSchema.static;

export const todoSelectSchema = createSelectSchema(todo);
export type TodoSelect = typeof todoSelectSchema.static;
