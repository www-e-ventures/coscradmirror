import { VariableType } from '../../types/variable-type';
import { invalid, MaybeInvalid } from '../invalid';

export const validateVariableType = (
  input: unknown
): MaybeInvalid<VariableType> => {
  const test = input as VariableType;

  if (test === 'checkbox' || test === 'dropbox') return test;

  return invalid;
};
