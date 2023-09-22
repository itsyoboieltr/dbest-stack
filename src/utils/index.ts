import { TSchema } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

export const parse = <T extends TSchema>(schema: T, value: unknown) => {
  const validator = TypeCompiler.Compile(schema);
  try {
    const data = validator.Decode(value);
    return data;
  } catch (error) {
    const errorsArray = [...validator.Errors(value)].map((error) => {
      return `\n ${
        error.path.startsWith('/') ? error.path.slice(1) : error.path
      }: ${
        typeof error.schema.error === 'string'
          ? error.schema.error
          : error.message
      }`;
    });
    const uniqueErrorsArray = [...new Set(errorsArray)];
    const errorsString = uniqueErrorsArray.join('\n');
    throw new Error(errorsString);
  }
};
