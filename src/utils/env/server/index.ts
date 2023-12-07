import { Type } from '@sinclair/typebox';
import { parse } from '~/utils';

const serverEnvSchema = Type.Object({
  DATABASE_URL: Type.String({
    minLength: 1,
    error: 'Server environment variable is not set!',
  }),
});

export const serverEnv = parse(serverEnvSchema, {
  DATABASE_URL: Bun.env.DATABASE_URL,
});
