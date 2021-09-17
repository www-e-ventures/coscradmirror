import { MaybeInvalid, Raw } from './invalid';

export type TermDTO = {
  id: string;
  term: string;
  termEnglish?: string;
  contributor?: string;
  audioURL?: string;
  audioFormat?: string;
};

export type ValidatedRawTermDTO = Omit<TermDTO, 'id'> & {
  id: number;
};

export type RawTermDTO = Partial<ValidatedRawTermDTO>;

export default class TermViewModel {
  constructor() {}

  validateDTO(rawData: Raw<TermDTO>): MaybeInvalid<TermDTO> {
    throw new Error('validate DTO is not implemented for a Term');
    // if (isUndefined(rawData)) return invalid;

    // if (!Number.isInteger(rawData.id)) return invalid;

    // const id = rawData.id.toString();
  }
}
