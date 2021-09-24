import { invalid, isInvalid, isValid, MaybeInvalid } from './invalid';
import { isNullOrUndefined } from './utilities/is-null-or-undefined';
import { validateId } from './utilities/validate-id';
import { validateStringWithLength } from './utilities/validate-string-with-length';
import { IViewModel } from './view-model.interface';

export type VocabularyListSummaryDTO = {
  id: string;

  name?: string;

  nameEnglish?: string;
};

export type ValidatedRawVocabularyListSummaryData = Partial<
  Omit<VocabularyListSummaryDTO, 'nameEnglish' | 'id'> & {
    name_english: string;
    id: number;
  }
>;

// This belongs on the server!
const validateRawVocabularyListSummaryData = (
  input: unknown
): MaybeInvalid<ValidatedRawVocabularyListSummaryData> => {
  const test = input as ValidatedRawVocabularyListSummaryData;

  const { id, name, name_english } = test;

  if (validateId(id) === invalid) return invalid;

  const nameValidationResult = validateStringWithLength(name);
  const nameEnglishValidationResult = validateStringWithLength(name_english);

  // one of name, name_english must be a name with length
  if (isInvalid(nameValidationResult) && isInvalid(nameEnglishValidationResult))
    return invalid;

  return {
    id,
    name: isValid(nameValidationResult) ? nameValidationResult : undefined,
    name_english: isValid(nameEnglishValidationResult)
      ? nameEnglishValidationResult
      : undefined,
  } as ValidatedRawVocabularyListSummaryData;
};

const mapValidRawVocabularyListSummaryDataToDTO = (
  validRawData: ValidatedRawVocabularyListSummaryData
): VocabularyListSummaryDTO => {
  const { id, name, name_english } = validRawData;

  // map domain model to view model
  return {
    id: (id as number).toString(),
    name,
    nameEnglish: name_english,
  };
};

/**
 * TODO Move the validation of DTOs and creation
 * of valid View Model DTOs to the server.
 * The API should return valid DTOs for view models
 * as part of its contract with the front-end.
 */
export default class VocabularyListSummaryViewModel
  implements
    IViewModel<ValidatedRawVocabularyListSummaryData, VocabularyListSummaryDTO>
{
  id: string;

  name?: string;

  nameEnglish?: string;

  constructor(rawData: unknown) {
    const dto = this.mapRawDataToDTO(
      rawData,
      validateRawVocabularyListSummaryData,
      mapValidRawVocabularyListSummaryDataToDTO
    );

    if (isInvalid(dto))
      throw new Error(`Invalid Vocabulary List Summary DTO: ${rawData}`);

    //    Object.assign(this, dto);

    this.id = dto.id;

    this.name = dto.name || undefined;

    this.nameEnglish = dto.nameEnglish || undefined;
  }

  // Consider throwing here for more fine-grained error messages
  mapRawDataToDTO(
    rawData: unknown,
    validateRawData: (
      rawData: unknown
    ) => MaybeInvalid<ValidatedRawVocabularyListSummaryData>,
    mapValidRawDataToDTO: (
      validRawData: ValidatedRawVocabularyListSummaryData
    ) => VocabularyListSummaryDTO
  ): MaybeInvalid<VocabularyListSummaryDTO> {
    if (isNullOrUndefined(rawData)) return invalid;

    const maybeInvalidRawData = validateRawData(rawData);

    if (isInvalid(maybeInvalidRawData)) return invalid;

    return mapValidRawDataToDTO(maybeInvalidRawData);
  }
}
