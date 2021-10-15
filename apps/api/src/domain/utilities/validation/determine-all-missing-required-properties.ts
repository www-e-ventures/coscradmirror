import { isNullOrUndefined } from './is-null-or-undefined';

type DtoKeys<TDto> = (keyof TDto)[];

export const determineAllMissingRequiredProperties = <TDto>(
  dto: TDto,
  requiredProperties: DtoKeys<TDto>
): DtoKeys<TDto> =>
  requiredProperties.reduce(
    (accumulatedMissingKeys: DtoKeys<TDto>, nextRequiredKey) => {
      // ignore symbol or number (Arrays) keys
      if (typeof nextRequiredKey === 'string') return accumulatedMissingKeys;

      if (isNullOrUndefined(dto?.[nextRequiredKey]))
        return accumulatedMissingKeys.concat(nextRequiredKey);

      return accumulatedMissingKeys;
    },
    []
  );
