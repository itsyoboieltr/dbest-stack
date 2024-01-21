import { eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { db } from '~/routes/api/db';
import { todo, todoInsertSchema, todoSelectSchema } from './schema';

export const todoRoute = new Elysia({ prefix: '/todo' })
  .get('', async () => await db.select().from(todo))
  .post('', async ({ body }) => await db.insert(todo).values(body), {
    body: todoInsertSchema,
  })
  .delete(
    '/:id',
    async ({ params }) => await db.delete(todo).where(eq(todo.id, params.id)),
    { params: t.Pick(todoSelectSchema, ['id']) }
  );
