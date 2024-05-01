import type { TSchema, Static } from '@sinclair/typebox/type';
import { Check } from '@sinclair/typebox/value';
import {
  Errors,
  SetErrorFunction,
  DefaultErrorFunction,
} from '@sinclair/typebox/errors';

SetErrorFunction((error) => {
  if (typeof error.schema.error === 'string') return error.schema.error;
  return DefaultErrorFunction(error);
});

export const parse = <T extends TSchema>(
  schema: T,
  value: unknown
): Static<T> => {
  const check = Check(schema, value);
  if (!check) throw new Error(Errors(schema, value).First()?.message);
  return value;
};

export const validate = <T extends TSchema>(
  schema: T,
  value: unknown
): boolean => {
  return Check(schema, value);
};
