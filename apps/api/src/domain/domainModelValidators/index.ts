import { InternalError } from '../../lib/errors/InternalError';
import termValidator from './termValidator';
import { Valid } from './Valid';
import vocabularyListValidator from './vocabularyListValidator';

export type DomainModelValidator = (inputDTO: unknown) => Valid | InternalError;

export default {
  termValidator,
  vocabularyListValidator,
};
