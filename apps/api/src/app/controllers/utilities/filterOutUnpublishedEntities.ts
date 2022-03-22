export type HasPublicationStatus = {
  isPublished: boolean;
};

export default <T extends HasPublicationStatus>(input: T[]): T[] =>
  input.filter((publishableItem) => publishableItem.isPublished);
