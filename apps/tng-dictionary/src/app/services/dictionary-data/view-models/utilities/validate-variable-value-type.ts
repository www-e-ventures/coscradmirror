import { VariableValueType } from '../../types/variable-value-type';
import { invalid, isValid, MaybeInvalid } from '../invalid';
import { validateStringWithLength } from './validate-string-with-length';

export const validateVariableValueType = (
  input: unknown
): MaybeInvalid<VariableValueType> => {
  const test = input as VariableValueType;

  const testAsString = validateStringWithLength(test);

  if (isValid(testAsString)) return testAsString;

  return typeof test === 'boolean' ? test : invalid;
};
