import { DomainModelValidator } from '.';
import { InternalError } from '../../lib/errors/InternalError';
import isStringWithNonzeroLength from '../../lib/utilities/isStringWithNonzeroLength';
import { PartialDTO } from '../../types/partial-dto';
import { Term } from '../models/term/entities/term.entity';
import { entityTypes } from '../types/entityType';
import { isNullOrUndefined } from '../utilities/validation/is-null-or-undefined';
import NullOrUndefinedDTOError from './errors/NullOrUndefinedDTOError';
import InvalidTermDTOError from './errors/term/InvalidTermDTOError';
import TermHasNoTextInAnyLanguageError from './errors/term/TermHasNoTextInAnyLanguageError';
import { Valid } from './Valid';

const termValidator: DomainModelValidator = (
  dto: unknown
): Valid | InternalError => {
  // Return early, as we will get null pointers if we proceed
  if (isNullOrUndefined(dto))
    return new NullOrUndefinedDTOError(entityTypes.term);

  const innerErrors: InternalError[] = [];

  const { term, termEnglish, id } = dto as PartialDTO<Term>;

  if (
    !isStringWithNonzeroLength(term) &&
    !isStringWithNonzeroLength(termEnglish)
  )
    innerErrors.push(new TermHasNoTextInAnyLanguageError(id));

  return innerErrors.length ? new InvalidTermDTOError(id, innerErrors) : Valid;
};

export default termValidator;
