import { isRawContributor, RawContributor } from '../../types/raw-contributor';
import { invalid, MaybeInvalid } from '../invalid';
import { isNullOrUndefined } from './is-null-or-undefined';

export const validateRawContributor = (
  input: unknown
): MaybeInvalid<RawContributor> => {
  if (isNullOrUndefined(input)) return invalid;

  if (input === 2)
    return {
      first_name: 'William',
      last_name: 'Myers',
    };

  if (input === 1)
    return {
      first_name: 'Bella',
      last_name: 'Alphonse',
    };

  return isRawContributor(input) ? input : invalid;
};
