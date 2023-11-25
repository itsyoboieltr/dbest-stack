import { Elysia } from 'elysia';
import hello from './routes/hello/route';

export const app = new Elysia({ prefix: '/api' }).use(hello);

export type App = typeof app;
