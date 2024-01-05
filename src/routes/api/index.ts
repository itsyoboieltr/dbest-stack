import { Elysia } from 'elysia';
import { helloRoute } from './hello';

export const app = new Elysia({ prefix: '/api' }).use(helloRoute).compile();

export type App = typeof app;
