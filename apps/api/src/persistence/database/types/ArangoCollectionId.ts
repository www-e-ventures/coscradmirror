const arangoCollectionIds = ['terms', 'vocabulary_lists', 'tags'] as const;

export type ArangoCollectionID = typeof arangoCollectionIds[number];
