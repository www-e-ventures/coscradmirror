import { VariableValueType } from '../../types/variable-value-type';
import { VariableValues } from '../../types/variable-values';
import { invalid, isValid, MaybeInvalid } from '../invalid';
import { isNull } from './is-null-or-undefined';
import { validateStringWithLength } from './validate-string-with-length';

const validateIsStringOrBoolean = (
  input: unknown
): MaybeInvalid<VariableValueType> => {
  const valueAsString = validateStringWithLength(input);

  if (isValid(valueAsString)) return valueAsString;

  return typeof input === 'boolean' ? input : invalid;
};

export const validateVariableValues = (
  input: unknown
): MaybeInvalid<VariableValues> => {
  if (!(typeof input === 'object')) return invalid;

  if (Array.isArray(input)) return invalid;

  if (isNull(input)) return invalid;

  // TODO validate that no keys are symbols

  // validate that every value is either string with length | boolean
  const allValuesAreValid = Object.values(input).every(
    (value: unknown): value is string | boolean => {
      const valueAsString = validateStringWithLength(value);

      if (isValid(valueAsString)) return true;

      return typeof value === 'boolean';
    }
  );

  return allValuesAreValid ? (input as VariableValues) : invalid;
};
