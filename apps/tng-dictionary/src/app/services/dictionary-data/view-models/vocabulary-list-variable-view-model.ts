import { ValueAndDisplay } from '../types/value-and-display';
import { VariableValueType } from '../types/variable-value-type';
import { VocabularyListVariableValidValue } from '../types/vocabulary-list-valid-variable-value';
import { VocabularyListVariableType } from '../types/vocabulary-list-variable-type';
import { invalid, isInvalid, isValid, MaybeInvalid } from './invalid';
import { isNullOrUndefined } from './utilities/is-null-or-undefined';
import { validateStringWithLength } from './utilities/validate-string-with-length';
import { validateVariableType } from './utilities/validate-variable-type';
import { validateVocabularyListVariableValidValue } from './utilities/validate-vocabulary-list-valid-value';
import {
  IViewModel,
  MapValidatedRawDataToDTO,
  RawDataValidator,
} from './view-model.interface';

type RawVocabularyListVariableData = {
  name: string;

  type: VocabularyListVariableType;

  validValues: ValueAndDisplay<VariableValueType>[];
};

type VocabularyListVariableDTO = RawVocabularyListVariableData;

const validateRawData = (
  input: unknown
): MaybeInvalid<RawVocabularyListVariableData> => {
  const test = input as RawVocabularyListVariableData;

  const name = validateStringWithLength(test.name);

  const type = validateVariableType(test.type);

  const validValues = test.validValues
    .map((validValue) => validateVocabularyListVariableValidValue(validValue))
    .filter(
      (
        maybeInvalidValue
      ): maybeInvalidValue is VocabularyListVariableValidValue =>
        isValid(maybeInvalidValue)
    );

  if (
    isValid(name) &&
    isValid(type) &&
    test.validValues.length === validValues.length
  ) {
    return {
      name,
      type,
      validValues,
    };
  }

  return invalid;
};

const mapRawDataToDTO = (
  rawData: RawVocabularyListVariableData
): VocabularyListVariableDTO => rawData;

export class VocabularyListVariableViewModel
  implements
    IViewModel<RawVocabularyListVariableData, VocabularyListVariableDTO>
{
  name: string;

  type: VocabularyListVariableType;

  validValues: VocabularyListVariableValidValue[];

  constructor(rawData: unknown) {
    const dto = this.mapRawDataToDTO(rawData, validateRawData, mapRawDataToDTO);

    if (isInvalid(dto))
      throw new Error(
        `Received invalid data when building a vocabulary list variable: ${JSON.stringify(
          rawData
        )}`
      );

    this.name = dto.name;

    this.type = dto.type;

    this.validValues = dto.validValues;
  }

  mapRawDataToDTO(
    rawData: unknown,
    validateRawData: RawDataValidator<RawVocabularyListVariableData>,
    mapValidRawDataToDTO: MapValidatedRawDataToDTO<
      RawVocabularyListVariableData,
      VocabularyListVariableDTO
    >
  ): MaybeInvalid<VocabularyListVariableDTO> {
    if (isNullOrUndefined(rawData)) return invalid;

    const maybeInvalidRawData = validateRawData(rawData);

    if (isInvalid(maybeInvalidRawData)) return invalid;

    return mapValidRawDataToDTO(maybeInvalidRawData);
  }
}
