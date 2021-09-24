import { isRawContributor, RawContributor } from '../../types/raw-contributor';
import { invalid, MaybeInvalid } from '../invalid';
import { isNullOrUndefined } from './is-null-or-undefined';

export const validateRawContributor = (
  input: unknown
): MaybeInvalid<RawContributor> => {
  if (isNullOrUndefined(input)) return invalid;

  return isRawContributor(input) ? input : invalid;
};
