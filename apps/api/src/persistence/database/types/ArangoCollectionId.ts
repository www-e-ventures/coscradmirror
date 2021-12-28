const arangoCollectionIds = ['terms', 'vocabulary_lists'] as const;

export type ArangoCollectionID = typeof arangoCollectionIds[number];
