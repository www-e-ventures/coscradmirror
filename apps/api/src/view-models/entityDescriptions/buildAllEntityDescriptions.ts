import { EntityType } from '../../domain/types/entityType';

type EntityDescriptions = {
  [k in EntityType]: string;
};

const entityDescriptions: EntityDescriptions = {
  term: 'A term is a word, phrase, or sentence.',
  vocabularyList: [
    'A vocabulary list gathers terms with filters that apply',
    'within the context of the vocabulary list',
  ].join(' '),
};

export const buildAllEntityDescriptions = () => entityDescriptions;
