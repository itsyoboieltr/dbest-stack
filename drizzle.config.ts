import type { Config } from 'drizzle-kit';
import { serverEnv } from '~/utils/env/server';

export default {
  schema: './src/server/routes/schema.ts',
  driver: 'pg',
  dbCredentials: { connectionString: serverEnv.DATABASE_URL },
} satisfies Config;
