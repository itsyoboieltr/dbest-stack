import { t } from 'elysia';
import { parse } from '~/utils';

const clientEnvSchema = t.Object({
  HOST_URL: t.String({ minLength: 1 }),
});

export const clientEnv = parse(clientEnvSchema, {
  HOST_URL: import.meta.env.VITE_HOST_URL || 'http://localhost:3000',
});
