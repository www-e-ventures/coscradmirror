import { VocabularyListVariableValidValue } from '../../types/vocabulary-list-valid-variable-value';
import { invalid, isValid, MaybeInvalid } from '../invalid';
import { validateStringWithLength } from './validate-string-with-length';
import { validateVariableValueType } from './validate-variable-value-type';

export const validateVocabularyListVariableValidValue = (
  input: unknown
): MaybeInvalid<VocabularyListVariableValidValue> => {
  const test = input as VocabularyListVariableValidValue;

  const display = validateStringWithLength(test.display);

  const value = validateVariableValueType(test.value);

  const areBothValid = isValid(display) && isValid(value);

  return areBothValid
    ? {
        display,
        value,
      }
    : invalid;
};
