import { EntityType, EntityTypeToInstance } from '../domain/types/entityType';
import { PartialDTO } from '../types/partial-dto';
import buildTagTestData from './buildTagTestData';
import buildTermTestData from './buildTermTestData';
import buildVocabularyListTestData from './buildVocabularyListTestData';

export type CollectionNamesAndModels = {
  [k in EntityType]: PartialDTO<EntityTypeToInstance[k]>[];
};

export default (): CollectionNamesAndModels =>
  ({
    ...buildTagTestData(),
    ...buildTermTestData(),
    ...buildVocabularyListTestData(),
    // TODO fix types
  } as CollectionNamesAndModels);
