import { AudioData } from '../types/audioData';
import { RawContributor } from '../types/raw-contributor';
import { invalid, isInvalid, isValid, MaybeInvalid } from './invalid';
import { isNullOrUndefined } from './utilities/is-null-or-undefined';
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

  if (isInvalid(audio))
    throw new Error(
      `Invalid audio!- remove me audio: ${JSON.stringify(test.audio)}`
    );

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
  const {
    id,
    term,
    term_english,
    audio,
    contributor: { first_name, last_name },
  } = validatedRawData;

  const audioURL = audio?.url;
  const audioFormat = audio?.format;

  return {
    id,
    term,
    termEnglish: term_english,
    audioURL,
    contributor: `${first_name} ${last_name}`,
    audioFormat,
  };
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
      throw new Error(`Invalid Term DTO: ${JSON.stringify(rawData)}`);

    //    Object.assign(this, dto);
    this.id = dto.id;

    this.term = dto.term;

    this.termEnglish = dto.termEnglish || undefined;

    this.contributor = dto.contributor;

    this.audioURL = dto.audioURL || undefined;

    this.audioFormat = dto.audioFormat || undefined;
  }

  mapRawDataToDTO(
    rawData: unknown,
    validateRawData: RawDataValidator<RawTermData>,
    mapValidRawDataToDTO: MapValidatedRawDataToDTO<RawTermData, TermDTO>
  ): MaybeInvalid<TermDTO> {
    if (isNullOrUndefined(rawData)) return invalid;

    const maybeInvalidRawData = validateRawData(rawData);

    if (isInvalid(maybeInvalidRawData)) return invalid;

    return mapValidRawDataToDTO(maybeInvalidRawData);
  }
}
