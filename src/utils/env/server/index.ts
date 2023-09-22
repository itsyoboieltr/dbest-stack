import { Type } from '@sinclair/typebox';
import { parse } from '~/utils';

const serverEnvSchema = Type.Object({
  database: Type.Object({
    host: Type.String({ minLength: 1 }),
    port: Type.Number(),
    user: Type.String({ minLength: 1 }),
    password: Type.String(),
    name: Type.String({ minLength: 1 }),
    ssl: Type.Boolean(),
    url: Type.String({ minLength: 1 }),
  }),
});

const getDatabaseData = () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  name: process.env.DATABASE_NAME || 'postgres',
  ssl: process.env.DATABASE_SSL === 'true',
});

const getDatabaseUrl = () => {
  const { host, port, user, password, name, ssl } = getDatabaseData();
  return `postgresql://${user}${
    password ? `:${password}` : ''
  }@${host}:${port}/${name}${ssl ? '?sslmode=require' : ''}`;
};

export const serverEnv = parse(serverEnvSchema, {
  database: { ...getDatabaseData(), url: getDatabaseUrl() },
});
