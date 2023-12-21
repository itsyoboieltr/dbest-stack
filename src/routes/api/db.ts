import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { serverEnv } from '../../utils/env/server';
import * as schema from './schema';

export const db = drizzle(postgres(serverEnv.DATABASE_URL), {
  schema,
  logger: import.meta.env.DEV,
});
