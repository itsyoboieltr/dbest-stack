import { TSchema } from '@sinclair/typebox';
import { getSchemaValidator } from 'elysia';

export const parse = <T extends TSchema>(schema: T, value: unknown) => {
  const validator = getSchemaValidator(schema, { additionalProperties: false });
  if (!validator) throw new Error('Invalid schema!');
  try {
    const data: T['static'] = validator.Decode(value);
    return data;
  } catch (error) {
    const firstError = validator.Errors(value).First();
    if (!firstError) throw error;
    throw new Error(
      `${
        firstError.path.startsWith('/')
          ? firstError.path.slice(1)
          : firstError.path
      }: ${
        typeof firstError.schema.error === 'string'
          ? firstError.schema.error
          : firstError.message
      }`,
    );
  }
};

export const validate = <T extends TSchema>(schema: T, value: unknown) => {
  const validator = getSchemaValidator(schema, { additionalProperties: false });
  if (!validator) throw new Error('Invalid schema!');
  return validator.Check(value);
};
