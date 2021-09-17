import { invalid, isInvalid, isValid, MaybeInvalid, Raw } from './invalid';
import { isUndefined } from './utilities/is-null-or-undefined';
import { validateStringWithLength } from './utilities/validate-string-with-length';

export type VocabularyListSummaryDTO = {
  id: string;

  name?: string;

  nameEnglish?: string;
};

export type RawVocablaryListSummary = Raw<
  Omit<VocabularyListSummaryDTO, 'nameEnglish'> & {
    name_english: string;
  }
>;

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

  constructor(rawData: RawVocablaryListSummary) {
    const dto = this.validateDTO(rawData);

    if (isInvalid(dto))
      throw new Error(`Invalid Vocabulary List Summary DTO: ${rawData}`);

    this.id = dto.id;

    this.name = dto.name || undefined;

    this.nameEnglish = dto.nameEnglish || undefined;
  }

  // Consider throwing here for more fine-grained error messages
  validateDTO(
    rawData: RawVocablaryListSummary
  ): MaybeInvalid<VocabularyListSummaryDTO> {
    if (isUndefined(rawData)) return invalid;

    if (!Number.isInteger(rawData.id)) return invalid;

    const id = rawData.toString();

    const nameEnglish = validateStringWithLength(rawData.name_english);

    const name = validateStringWithLength(rawData.name);

    // one of nameEnglish and name must be a well defined string
    if (isInvalid(nameEnglish) && isInvalid(name)) return invalid;

    if (isValid(nameEnglish) && isValid(name)) {
      return {
        id,
        name,
        nameEnglish,
      };
    }

    // nameEnglish is a string with length
    if (isValid(nameEnglish) && isInvalid(name)) {
      return {
        id,
        nameEnglish,
      };
    }

    // name is a string with length
    if (isInvalid(nameEnglish) && isValid(name)) {
      return {
        id,
        name,
      };
    }

    // catchall
    return invalid;
  }
}
