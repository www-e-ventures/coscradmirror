import { ValueType } from '../../lib/types/valueType';

export const entityTypes = {
  term: 'term',
  vocabularyList: 'vocabularyList',
} as const;

export type EntityType = ValueType<typeof entityTypes>;

export const isEntityType = (input: unknown): input is EntityType =>
  Object.values(entityTypes).includes(input as EntityType);
