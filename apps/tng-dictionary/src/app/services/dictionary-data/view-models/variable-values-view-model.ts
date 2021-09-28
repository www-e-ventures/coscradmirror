import { VariableValues } from '../types/variable-values';
import { invalid, isInvalid, MaybeInvalid } from './invalid';
import { isNullOrUndefined } from './utilities/is-null-or-undefined';
import { validateVariableValues } from './utilities/validate-variable-values';
import {
  IViewModel,
  MapValidatedRawDataToDTO,
  RawDataValidator,
} from './view-model.interface';

type RawVariableValues = VariableValues;

type VariableValuesDTO = VariableValues;

const validateRawData = validateVariableValues;

const mapValidRawDataToDTO = (rawData: RawVariableValues): VariableValuesDTO =>
  rawData;

export class VariableValuesViewModel
  implements IViewModel<RawVariableValues, VariableValuesDTO>
{
  constructor(rawData: unknown) {
    const dto = this.mapRawDataToDTO(
      rawData,
      validateRawData,
      mapValidRawDataToDTO
    );

    if (isInvalid(dto))
      throw new Error(`Invalid Variable Values : ${JSON.stringify(rawData)}`);

    /**
     * Note: We do not know what keys will be on the dto, as variable names are
     * dynamic. Therefore, we do not know what properties will be on this view
     * model class. So we cannot make the type any tighter than Record<string, VariableValueType>
     */
    Object.assign(this, dto);
  }

  mapRawDataToDTO(
    rawData: unknown,
    validateRawData: RawDataValidator<RawVariableValues>,
    mapValidRawDataToDTO: MapValidatedRawDataToDTO<
      RawVariableValues,
      VariableValuesDTO
    >
  ): MaybeInvalid<VariableValuesDTO> {
    if (isNullOrUndefined(rawData)) return invalid;

    const maybeInvalidRawData = validateRawData(rawData);

    if (isInvalid(maybeInvalidRawData)) return invalid;

    return mapValidRawDataToDTO(maybeInvalidRawData);
  }
}
