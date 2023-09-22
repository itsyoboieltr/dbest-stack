import { Elysia } from 'elysia';
import hello from './routes/hello';

export const app = new Elysia({ prefix: '/api' }).use(hello);

export type App = typeof app;
