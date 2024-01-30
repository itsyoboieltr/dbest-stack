import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';
import { sql } from 'drizzle-orm';

export const db = drizzle(new Database(':memory:'), {
  schema,
  logger: import.meta.env.DEV,
});

db.run(
  sql`CREATE TABLE IF NOT EXISTS todo (id TEXT PRIMARY KEY, data TEXT NOT NULL);`
);
