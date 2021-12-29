import { InternalError } from '../../lib/errors/InternalError';
import termValidator from './termValidator';
import { Valid } from './Valid';

export type DomainModelValidator = (inputDTO: unknown) => Valid | InternalError;

export default {
  termValidator,
};
