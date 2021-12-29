import { InternalError } from '../../lib/errors/InternalError';
import { ResultOrError } from '../../types/ResultOrError';
import termValidator from '../domainModelValidators/termValidator';
import vocabularyListValidator from '../domainModelValidators/vocabularyListValidator';
import { Entity } from '../models/entity';
import { Term } from '../models/term/entities/term.entity';
import { VocabularyList } from '../models/vocabulary-list/entities/vocabulary-list.entity';
import { EntityType, entityTypes } from '../types/entityType';
import buildInstanceFactory from './utilities/buildInstanceFactory';

export type InstanceFactory<TEntity> = (dto: unknown) => ResultOrError<TEntity>;

export default <TEntity extends Entity>(
  entityType: EntityType
): InstanceFactory<TEntity> => {
  switch (entityType) {
    case entityTypes.term:
      // @ts-expect-error TODO fix this tricky type error
      return buildInstanceFactory<Term>(termValidator, Term);

    case entityTypes.vocabularyList:
      // @ts-expect-error TODO fix this tricky type error
      return buildInstanceFactory<VocabularyList>(
        vocabularyListValidator,
        VocabularyList
      );

    default:
      const exhaustiveCheck: never = entityType;
      throw new InternalError(
        `Failed to build instance factory for unknown entity type ${exhaustiveCheck}`
      );
  }
};
