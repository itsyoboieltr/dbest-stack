import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';
import { serverEnv } from '../../utils/env/server';

const client = postgres(serverEnv.DATABASE_URL);

export const db = drizzle(client, { schema, logger: true });

const result = await db.select().from(schema.hello);

if (!result.length)
  await db.insert(schema.hello).values({ data: 'Hello from the SETD stack!' });
