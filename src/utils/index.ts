import { EdenFetchError } from '@elysiajs/eden/src/errors';
import { getSchemaValidator, TSchema } from 'elysia';

export const parse = <T extends TSchema>(schema: T, value: unknown) => {
  const validator = getSchemaValidator(schema, { additionalProperties: false });
  if (!validator) throw new Error('Invalid schema!');
  try {
    const data: T['static'] = validator.Decode(value);
    return data;
  } catch (error) {
    const firstError = validator.Errors(value).First();
    if (!firstError) throw error;
    const path = firstError.path
      ? firstError.path.startsWith('/')
        ? `${firstError.path.slice(1)}: `
        : `${firstError.path}: `
      : '';
    const message =
      typeof firstError.schema.error === 'string'
        ? firstError.schema.error
        : firstError.message;
    const anyOf = Array.isArray(firstError.schema.anyOf)
      ? `: ${firstError.schema.anyOf
          .map((value) => value.const)
          .filter(Boolean)
          .join(' | ')}`
      : '';
    throw new Error(`${path}${message}${anyOf}`);
  }
};

export const validate = <T extends TSchema>(schema: T, value: unknown) => {
  const validator = getSchemaValidator(schema, { additionalProperties: false });
  if (!validator) throw new Error('Invalid schema!');
  return validator.Check(value);
};

export function handleEden<T>(
  response: (
    | {
        data: T;
        error: null;
      }
    | {
        data: null;
        error: EdenFetchError<number, string>;
      }
  ) & {
    status: number;
    response: Response;
    headers: Record<string, string>;
  },
): T {
  if (response.error) throw response.error;
  return response.data;
}
