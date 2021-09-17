import { invalid, isInvalid, MaybeInvalid } from '../invalid';
import { validateString } from './validate-string';

export const validateStringWithLength = (
  input: unknown
): MaybeInvalid<string> => {
  const testString = validateString(input);

  if (isInvalid(testString)) return invalid;

  if (!(testString.length > 0)) return invalid;

  return testString;
};
