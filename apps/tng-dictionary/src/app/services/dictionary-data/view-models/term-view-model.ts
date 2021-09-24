import { MaybeInvalid } from './invalid';
import {
  IViewModel,
  MapValidatedRawDataToDTO,
  RawDataValidator,
} from './view-model.interface';

type Audio = {
  url: string;
  format?: string;
};

type Contributor = {
  first_name: string;
  last_name: string;
};

export type RawTermData = {
  id: string;
  term: string;
  term_english?: string;
  audio?: Audio;
  contributor: Contributor;
};

export type TermDTO = {
  id: string;
  term: string;
  termEnglish?: string;
  contributor?: string;
  audioURL?: string;
  audioFormat?: string;
};

const validateRawTermData = (input: unknown): MaybeInvalid<RawTermData> => {
  throw new Error('Not implemented');
};

const mapValidatedRawTermDataToDTO = (
  validatedRawData: RawTermData
): TermDTO => {
  throw new Error('Not implemented');
};

export default class TermViewModel implements IViewModel<RawTermData, TermDTO> {
  // Add Term View Model properties here

  constructor(rawData: unknown) {
    const dto = this.mapRawDataToDTO(
      rawData,
      validateRawTermData,
      mapValidatedRawTermDataToDTO
    );

    // Check if dto isInvalid(...) -> throw

    // set Term View Model properties from dto
  }

  mapRawDataToDTO(
    rawData: unknown,
    validateRawTermData: RawDataValidator<RawTermData>,
    mapValidatedRawTermDataToDTO: MapValidatedRawDataToDTO<RawTermData, TermDTO>
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
