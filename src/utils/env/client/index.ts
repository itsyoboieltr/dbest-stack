import { Object, String } from '@sinclair/typebox/type';
import { parse } from '~/utils';

const clientEnvSchema = Object({
  HOST_URL: String({
    minLength: 1,
    error: 'HOST_URL client environment variable is not set!',
  }),
});

export const clientEnv = parse(clientEnvSchema, {
  HOST_URL: import.meta.env.VITE_HOST_URL || 'http://localhost:3000',
});
