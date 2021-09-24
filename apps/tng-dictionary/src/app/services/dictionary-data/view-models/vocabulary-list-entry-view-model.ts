import { VariableValues } from '../types/variable-values';
import { invalid, isInvalid, MaybeInvalid } from './invalid';
import { RawTermData } from './term-view-model';
import { isNullOrUndefined } from './utilities/is-null-or-undefined';
import {
  IViewModel,
  MapValidatedRawDataToDTO,
  RawDataValidator,
} from './view-model.interface';

export type RawVariableValuesData = {};

export type RawVocabularyListEntryData = {
  term: RawTermData;
  variable_values: VariableValues;
};

export type VocabularyListEntryDTO = {
  term: TermViewModel;
  variableValues: VariableValues;
};

const validateRawEntryData = (
  input: unknown
): MaybeInvalid<RawVocabularyListEntryData> => {
  throw new Error('not implemented');
  // note: We defer validation of a term to the TermViewModel constructor

  // const test = input as RawTermData;

  // // Validate required properties
  // const id = validateId(test.id);
  // if (isInvalid(id)) return invalid;

  // const term = validateStringWithLength(test.term);
  // if (isInvalid(term)) return invalid;

  // const contributor = validateRawContributor(test.contributor);
  // if (isInvalid(contributor)) return invalid;

  // // Validate optional properties
  // const term_english = validateStringWithLength(test.term_english);
  // const audio = validateAudioData(test.audio);

  // return {
  //   id,
  //   term,
  //   contributor,
  //   term_english: isValid(term_english) ? term_english : undefined,
  //   audio: isValid(audio) ? audio : undefined,
  // };
};

const mapValidatedRawTermDataToDTO = (
  validatedRawData: RawVocabularyListEntryData
): VocabularyListEntryDTO => {
  throw new Error('Not Implemented');
};

export default class TermViewModel
  implements IViewModel<RawVocabularyListEntryData, VocabularyListEntryDTO>
{
  // Add Term View Model properties here

  constructor(rawData: unknown) {
    const dto = this.mapRawDataToDTO(
      rawData,
      validateRawEntryData,
      mapValidatedRawTermDataToDTO
    );

    // Check if dto isInvalid(...) -> throw

    // set Term View Model properties from dto

    if (isInvalid(dto))
      throw new Error(`Invalid Vocabulary List Summary DTO: ${rawData}`);

    //    Object.assign(this, dto);
  }

  mapRawDataToDTO(
    rawData: unknown,
    validateRawData: RawDataValidator<RawVocabularyListEntryData>,
    mapValidRawDataToDTO: MapValidatedRawDataToDTO<
      RawVocabularyListEntryData,
      VocabularyListEntryDTO
    >
  ): MaybeInvalid<VocabularyListEntryDTO> {
    if (isNullOrUndefined(rawData)) return invalid;

    const maybeInvalidRawData = validateRawData(rawData);

    if (isInvalid(maybeInvalidRawData)) return invalid;

    return mapValidRawDataToDTO(maybeInvalidRawData);
  }
}
