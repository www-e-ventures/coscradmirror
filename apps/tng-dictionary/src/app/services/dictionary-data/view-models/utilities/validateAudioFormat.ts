import { MaybeInvalid } from '../invalid';
import { validateStringWithLength } from './validate-string-with-length';

export const validateAudioFormat = (input: unknown): MaybeInvalid<string> =>
  validateStringWithLength(input);
