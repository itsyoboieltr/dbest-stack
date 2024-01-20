import { Type as t } from '@sinclair/typebox/type';
import { parse } from '~/utils';

const serverEnvSchema = t.Object({
  DATABASE_URL: t.String({
    minLength: 1,
    error: 'DATABASE_URL server environment variable is not set!',
  }),
});

export const serverEnv = parse(serverEnvSchema, {
  DATABASE_URL: process.env.DATABASE_URL,
});
