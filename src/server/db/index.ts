import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';
import { serverEnv } from '../../utils/env/server';

const client = postgres(serverEnv.database.url);

export const db = drizzle(client, { schema, logger: true });

const count = (
  await db.select({ count: sql<number>`count(id)::int` }).from(schema.hello)
)[0].count;

if (!count)
  await db.insert(schema.hello).values({ data: 'Hello from the DBEST stack!' });
