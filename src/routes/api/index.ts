import { Elysia, t } from 'elysia';
import { todoRoute } from './todo';
import { jwt } from '@elysiajs/jwt';

export const app = new Elysia({ prefix: '/api' })
  .use(jwt({ secret: 'very secret', schema: t.Object({ id: t.String() }) }))
  .use(todoRoute)
  .compile();

export type App = typeof app;
