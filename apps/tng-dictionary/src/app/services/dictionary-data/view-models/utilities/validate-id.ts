import { invalid, MaybeInvalid } from '../invalid';
import { isNullOrUndefined } from './is-null-or-undefined';

/**
 *
 * @param input : u`nknown - candidate id
 * @returns `invalid` symbol if the input is not a non-negative integer
 * or else a string representation of the input id
 */
export const validateId = (input: unknown): MaybeInvalid<string> => {
  if (isNullOrUndefined(input)) return invalid;

  const test = input as number;

  if (Number.isInteger(test) && test > 0) return test.toString();

  return invalid;
};
