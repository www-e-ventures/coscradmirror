import { invalid, isInvalid, isValid, MaybeInvalid, Raw } from './invalid';
import { isUndefined } from './utilities/is-null-or-undefined';
import { validateId } from './utilities/validate-id';
import { validateStringWithLength } from './utilities/validate-string-with-length';

export type VocabularyListSummaryDTO = {
  id: string;

  name?: string;

  nameEnglish?: string;
};

export type ValidatedRawVocabularyListSummaryDTO = Omit<
  VocabularyListSummaryDTO,
  'nameEnglish' | 'id'
> & {
  name_english: string;
  id: number;
};

// This is the part of the domain model we need to create the View Model
export type RawVocablaryListSummaryDTO =
  Raw<ValidatedRawVocabularyListSummaryDTO>;

// This belongs on the server!
const validateRawVocabularyListSummaryDTO = (
  input: RawVocablaryListSummaryDTO
): MaybeInvalid<ValidatedRawVocabularyListSummaryDTO> => {
  const { id, name, name_english } = input;

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
  } as ValidatedRawVocabularyListSummaryDTO;
};

/**
 * TODO Move the validation of DTOs and creation
 * of valid View Model DTOs to the server.
 * The API should return valid DTOs for view models
 * as part of its contract with the front-end.
 */
export default class VocabularyListSummaryViewModel {
  id: string;

  name?: string;

  nameEnglish?: string;

  constructor(rawData: RawVocablaryListSummaryDTO) {
    const dto = this.mapRawDataToDTO(rawData);

    if (isInvalid(dto))
      throw new Error(`Invalid Vocabulary List Summary DTO: ${rawData}`);

    this.id = dto.id;

    this.name = dto.name || undefined;

    this.nameEnglish = dto.nameEnglish || undefined;
  }

  // Consider throwing here for more fine-grained error messages
  mapRawDataToDTO(
    rawData: RawVocablaryListSummaryDTO
  ): MaybeInvalid<VocabularyListSummaryDTO> {
    if (isUndefined(rawData)) return invalid;

    const dto = validateRawVocabularyListSummaryDTO(rawData);

    if (isInvalid(dto)) return invalid;

    const { id, name, name_english } = dto;

    // map domain model to view model
    return {
      id: id.toString(),
      name,
      nameEnglish: name_english,
    };
  }
}
