// TODO [design] Should we tie this to the model constructors?
const arangoCollectionIDs = {
  book: 'BookCollection',
  term: 'terms',
  vocabularyList: 'vocabulary_lists',
} as const;

// TODO export to higher level type utility
type ValueType<T extends object> = T[keyof T];

export type EntityName = keyof typeof arangoCollectionIDs;

export type ArangoCollectionID = ValueType<typeof arangoCollectionIDs>;

export const getArangoCollectionIDs = () => ({ ...arangoCollectionIDs });

export const getArangoCollectionID = (
  entityName: EntityName
): ArangoCollectionID => {
  if (Object.keys(arangoCollectionIDs).includes(entityName)) {
    const result = arangoCollectionIDs[entityName];

    console.log(`found: `);

    return result;
  }

  throw new Error(
    `Cannot identify collection ID for unsupported entity: ${entityName}`
  );
};
