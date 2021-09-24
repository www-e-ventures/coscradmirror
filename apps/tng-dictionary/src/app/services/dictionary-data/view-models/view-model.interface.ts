import { MaybeInvalid } from './invalid';

export type RawDataValidator<TValidatedRawData> = (
  rawData: unknown
) => MaybeInvalid<TValidatedRawData>;

export type MapValidatedRawDataToDTO<TValidatedRawData, TModelDTO> = (
  validRawData: TValidatedRawData
) => TModelDTO;

export interface IViewModel<TRawData, TModelDTO> {
  // TODO add the constructor here
  mapRawDataToDTO: (
    rawData: unknown,
    validateRawData: RawDataValidator<TRawData>,
    mapValidRawDataToDTO: MapValidatedRawDataToDTO<TRawData, TModelDTO>
  ) => MaybeInvalid<TModelDTO>;
}
