import { invalid, MaybeInvalid } from '../invalid';
import { isNullOrUndefined } from './is-null-or-undefined';

export const validateString = (input: unknown): MaybeInvalid<string> => {
  if (isNullOrUndefined(input)) return invalid;

  return typeof input === 'string' ? input : invalid;
};
