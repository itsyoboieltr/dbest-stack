import { Type } from '@sinclair/typebox';
import { parse } from '~/utils';

const clientEnvSchema = Type.Object({
  HOST_URL: Type.String({ minLength: 1 }),
});

export const clientEnv = parse(clientEnvSchema, {
  HOST_URL: import.meta.env.VITE_HOST_URL || 'http://localhost:3000',
});
