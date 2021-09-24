import { AudioData } from '../types/audioData';
import { RawContributor } from '../types/raw-contributor';
import { invalid, isInvalid, isValid, MaybeInvalid } from './invalid';
import { validateId } from './utilities/validate-id';
import { validateStringWithLength } from './utilities/validate-string-with-length';
import { validateAudioData } from './utilities/validateAudioData';
import { validateRawContributor } from './utilities/validateContributor';
import {
  IViewModel,
  MapValidatedRawDataToDTO,
  RawDataValidator,
} from './view-model.interface';

export type RawTermData = {
  id: string;
  term: string;
  term_english?: string;
  audio?: AudioData;
  contributor: RawContributor;
};

export type TermDTO = {
  id: string;
  term: string;
  termEnglish?: string;
  contributor: string;
  audioURL?: string;
  audioFormat?: string;
};

const validateRawTermData = (input: unknown): MaybeInvalid<RawTermData> => {
  const test = input as RawTermData;

  // Validate required properties
  const id = validateId(test.id);
  if (isInvalid(id)) return invalid;

  const term = validateStringWithLength(test.term);
  if (isInvalid(term)) return invalid;

  const contributor = validateRawContributor(test.contributor);
  if (isInvalid(contributor)) return invalid;

  // Validate optional properties
  const term_english = validateStringWithLength(test.term_english);
  const audio = validateAudioData(test.audio);

  return {
    id,
    term,
    contributor,
    term_english: isValid(term_english) ? term_english : undefined,
    audio: isValid(audio) ? audio : undefined,
  };
};

const mapValidatedRawTermDataToDTO = (
  validatedRawData: RawTermData
): TermDTO => {
  throw new Error('Not implemented');
};

export default class TermViewModel implements IViewModel<RawTermData, TermDTO> {
  // Add Term View Model properties here

  id: string;

  term: string;

  termEnglish?: string;

  contributor: string;

  audioURL?: string;

  audioFormat?: string;

  constructor(rawData: unknown) {
    const dto = this.mapRawDataToDTO(
      rawData,
      validateRawTermData,
      mapValidatedRawTermDataToDTO
    );

    // Check if dto isInvalid(...) -> throw

    // set Term View Model properties from dto

    if (isInvalid(dto))
      throw new Error(`Invalid Vocabulary List Summary DTO: ${rawData}`);

    //    Object.assign(this, dto);
    this.id = dto.id;

    this.term = dto.term;

    this.termEnglish = dto.termEnglish || undefined;

    this.contributor = dto.contributor;

    this.audioURL = dto.audioURL || undefined;

    this.audioFormat = dto.audioFormat || undefined;
  }

  mapRawDataToDTO(
    _rawData: unknown,
    _validateRawTermData: RawDataValidator<RawTermData>,
    _mapValidatedRawTermDataToDTO: MapValidatedRawDataToDTO<
      RawTermData,
      TermDTO
    >
  ): TermDTO {
    throw new Error('Not implemented');
  }
}

// TODO
// - implement `mapRawDataToDTO`
// - implement `validateRawTermData`
// - implement `mapValidatedRawTermDataToDTO`
// return {
//   id: throwErrorIfUndefined(apiTerm.id),
//   term: returnValueOrNullIfUndefined(apiTerm.term),
//   termEnglish: returnValueOrNullIfUndefined(apiTerm.term_english),
//   audioURL: `${this.baseAPIURL}${returnValueOrNullIfUndefined(
//     apiTerm.audio[0]?.url
//   )}`,
//   audioFormat: returnValueOrNullIfUndefined(apiTerm.audio[0]?.format),
//   contributor: returnValueOrNullIfUndefined(
//     `${apiTerm.contributor?.first_name} ${apiTerm.contributor?.last_name}`
//   ),
// };
