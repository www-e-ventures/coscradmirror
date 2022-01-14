import { DomainModelValidator } from '.';
import { InternalError } from '../../lib/errors/InternalError';
import isStringWithNonzeroLength from '../../lib/utilities/isStringWithNonzeroLength';
import { PartialDTO } from '../../types/partial-dto';
import { Tag } from '../models/tag/tag.entity';
import { entityTypes } from '../types/entityType';
import { isNullOrUndefined } from '../utilities/validation/is-null-or-undefined';
import InvalidEntityDTOError from './errors/InvalidEntityDTOError';
import NullOrUndefinedDTOError from './errors/NullOrUndefinedDTOError';
import TagHasNoTextError from './errors/tag/TagHasNoTextError';
import { Valid } from './Valid';

const tagValidator: DomainModelValidator = (
  dto: unknown
): Valid | InternalError => {
  if (isNullOrUndefined(dto))
    return new InvalidEntityDTOError(entityTypes.tag, undefined, [
      new NullOrUndefinedDTOError(entityTypes.tag),
    ]);

  const innerErrors: InternalError[] = [];

  const { text, id } = dto as PartialDTO<Tag>;

  if (!isStringWithNonzeroLength(text))
    innerErrors.push(new TagHasNoTextError(id));

  return innerErrors.length
    ? new InvalidEntityDTOError(entityTypes.tag, id, innerErrors)
    : Valid;
};

export default tagValidator;