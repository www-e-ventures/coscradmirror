import { ValueType } from '../../lib/types/valueType';
import { Tag } from '../models/tag/tag.entity';
import { Term } from '../models/term/entities/term.entity';
import { VocabularyList } from '../models/vocabulary-list/entities/vocabulary-list.entity';

export const entityTypes = {
  term: 'term',
  vocabularyList: 'vocabularyList',
  tag: 'tag',
} as const;

export type EntityType = ValueType<typeof entityTypes>;

export const isEntityType = (input: unknown): input is EntityType =>
  Object.values(entityTypes).includes(input as EntityType);

export const entityTypeToCtor = {
  term: Term,
  vocabularyList: VocabularyList,
  tag: Tag,
};

export type EntityTypeToInstance = typeof entityTypeToCtor;
