import { MaybeInvalid } from '../invalid';
import { validateStringWithLength } from './validate-string-with-length';

export const validateUrl = (input: unknown): MaybeInvalid<string> =>
  validateStringWithLength(input);
