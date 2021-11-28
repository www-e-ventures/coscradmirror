// TODO [design] Should we tie this to the model constructors?
const arangoCollectionIDs = {
  book: 'BookCollection',
  term: 'TermCollection',
  vocabularyList: 'VocabularyListCollection',
} as const;

// TODO export to higher level type utility
type ValueType<T extends object> = T[keyof T];

export type ArangoCollectionID = ValueType<typeof arangoCollectionIDs>;

export const getArangoCollectionIDs = () => ({ ...arangoCollectionIDs });
