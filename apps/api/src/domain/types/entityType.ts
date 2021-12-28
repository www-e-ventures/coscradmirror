const entityTypes = ['term', 'vocabularyList'] as const;

export type EntityType = typeof entityTypes[number];

export const isEntityType = (input: unknown): input is EntityType =>
  entityTypes.includes(input as EntityType);
