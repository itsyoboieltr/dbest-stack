import type { Config } from 'drizzle-kit';
import { serverEnv } from '~/utils/env/server';

export default {
  schema: './src/server/db/schemas/**/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: { connectionString: serverEnv.database.url },
} satisfies Config;
