import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { serverEnv } from '../utils/env/server';
import * as schema from './routes/schema';

const client = postgres(serverEnv.DATABASE_URL);

export const db = drizzle(client, { schema, logger: import.meta.env.DEV });
