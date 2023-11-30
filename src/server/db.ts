import { count } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { serverEnv } from '../utils/env/server';
import * as schema from './routes/schema';

const client = postgres(serverEnv.DATABASE_URL);

export const db = drizzle(client, { schema, logger: true });

const [hello] = await db.select({ count: count() }).from(schema.hello);

if (!hello?.count)
  await db.insert(schema.hello).values({ data: 'Hello from the DBEST stack!' });
