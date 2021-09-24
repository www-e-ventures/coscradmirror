import { isValid } from '../view-models/invalid';
import { validateStringWithLength } from '../view-models/utilities/validate-string-with-length';

export type RawContributor = {
  first_name: string;
  last_name: string;
};

export const isRawContributor = (input: unknown): input is RawContributor => {
  const test = input as RawContributor;

  const first_name = validateStringWithLength(test.first_name);

  const last_name = validateStringWithLength(test.last_name);

  return [first_name, last_name].every(isValid);
};
