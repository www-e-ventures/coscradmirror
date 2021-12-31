import { DomainModelValidator } from '.';
import { InternalError } from '../../lib/errors/InternalError';
import { Valid } from './Valid';

const tagValidator: DomainModelValidator = (
  dto: unknown
): Valid | InternalError => Valid;

export default tagValidator;
