import { VariableValues } from '../types/variable-values';
import { invalid, isInvalid, MaybeInvalid } from './invalid';
import { RawTermData } from './term-view-model';
import { isNullOrUndefined } from './utilities/is-null-or-undefined';
import { validateVariableValues } from './utilities/validate-variable-values';
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
  // note: We defer validation of a term to the TermViewModel constructor

  const { term, variable_values } = input as RawVocabularyListEntryData;

  const validationResultForVariableValues =
    validateVariableValues(variable_values);

  if (isInvalid(validationResultForVariableValues)) return invalid;

  return {
    variable_values,
  };

  throw new Error('not implemented');
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
  const term = new TermViewModel(validatedRawData.term);
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
