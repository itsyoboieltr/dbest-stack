import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL)
  throw new Error('DATABASE_URL environment variable is not set!');

export default {
  schema: './src/routes/api/schema.ts',
  driver: 'pg',
  dbCredentials: { connectionString: process.env.DATABASE_URL },
} satisfies Config;
