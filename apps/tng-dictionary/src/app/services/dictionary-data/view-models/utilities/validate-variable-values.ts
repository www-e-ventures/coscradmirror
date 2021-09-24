import { VariableValues } from '../../types/variable-values';
import { MaybeInvalid } from '../invalid';

export const validateVariableValues = (
  input: unknown
): MaybeInvalid<VariableValues> => {
  // validate that input
  // - is an object
  // - every key is a string (not number or symbol?) // use object.entries (or object.keys)
  // - every value is either string with length | boolean use helpers in this directory for these 2
  // use Object.keys (or Object.values)
  throw new Error('Not implemented');
};
