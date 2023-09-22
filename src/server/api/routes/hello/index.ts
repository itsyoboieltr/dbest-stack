import { eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { db } from '~/server/db';
import {
  hello,
  helloInsertSchema,
  helloSelectSchema,
} from '~/server/db/schemas';

export default new Elysia({ prefix: '/hello' })
  .get(
    '',
    async () => {
      const data = await db.query.hello.findMany();
      return data;
    },
    { response: t.Array(helloSelectSchema) }
  )
  .post(
    '',
    async ({ body }) => {
      const data = await db.insert(hello).values(body).returning();
      return data[0];
    },
    { body: helloInsertSchema, response: helloSelectSchema }
  )
  .delete(
    '/:id',
    async ({ params }) => {
      const data = await db
        .delete(hello)
        .where(eq(hello.id, params.id))
        .returning();
      return data[0];
    },
    { params: t.Pick(helloSelectSchema, ['id']), response: helloSelectSchema }
  );
