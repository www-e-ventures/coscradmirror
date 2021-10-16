import { AllCreateEntityDtosUnion } from '../domain/types/all-entities';
import { buildDictionaryTestData } from './dictionary-test-data';

export type CollectionNameAndModels<TCreateEntityDto> = {
  collection: string;
  models: TCreateEntityDto[];
};

export const buildTestData =
  (): CollectionNameAndModels<AllCreateEntityDtosUnion>[] => [
    ...buildDictionaryTestData(),
  ];
