import { aql, Database } from 'arangojs';
import { isArangoDatabase } from 'arangojs/database';
import { Maybe } from '../app/lib/types/maybe';
import { isNotFound, notFound } from '../app/lib/types/not-found';
import { AllCreateEntityDtosUnion } from '../domain/types/all-entities';
import { CollectionNameAndModels } from '../test-data/test-data-index';

type HasKey<T> = T & {
  _key: string;
};

/**
 * The generics on the class seem out of place.
 */
export class ArangoDatabase {
  #db: Database;

  constructor(database: Database) {
    if (!isArangoDatabase(database))
      throw new Error(
        'Cannot create an Arango Database from an invalid database connection'
      );

    this.#db = database;
  }

  fetchById = async <TCreateEntityDto>(
    id: string,
    collectionName: string
  ): Promise<Maybe<TCreateEntityDto>> => {
    const collection = this.#getCollection(collectionName);

    if (!collection) return notFound;

    const query = aql`
    FOR t IN ${collection}
      FILTER t._id == @id
        RETURN t
    `;

    const cursor = await this.#db.query(query);

    if (cursor.count === 0) return notFound;

    if (cursor.count > 1)
      throw new Error(
        [
          `More than one document`,
          `with the id ${id}`,
          ` found in collection ${collectionName}`,
        ].join(' ')
      );

    // TODO remove cast
    return cursor.next() as unknown as TCreateEntityDto;
  };

  fetchMany = async <TCreateEntityDto>(
    collectionName: string
  ): Promise<Maybe<TCreateEntityDto[]>> => {
    const collection = this.#getCollection(collectionName);

    const query = aql`
      FOR t IN ${collection}
        return t
      `;

    const cursor = await this.#db.query(query);

    if (cursor.count === 0) return notFound;

    // TODO remove cast
    return cursor.all() as unknown as TCreateEntityDto[];
  };

  getCount = async (collectionName: string): Promise<number> => {
    const results = await this.fetchMany(collectionName);

    return isNotFound(results) ? 0 : results.length;
  };

  // Write Methods
  /**
   *
   * TODO [design] consider a pattern for returning errors
   */
  create = async <TCreateEntityDto>(
    dto: TCreateEntityDto,
    collectionName: string
  ): Promise<void> => {
    const collection = this.#getCollection(collectionName);

    if (!collection) throw new Error(`Collection ${collectionName} not found!`);

    const query = `
    INSERT @dto
        INTO ${collection}
    `;

    const bindVars = {
      dto,
    };

    await this.#db.query({
      query,
      bindVars,
    });
  };

  createMany = async <TCreateEntityDto>(
    dtos: TCreateEntityDto[],
    collectionName: string
  ): Promise<void> => {
    const collection = this.#getCollection(collectionName);

    if (!collection) throw new Error(`Collection ${collectionName} not found!`);

    const query = `
    FOR dto IN @dtos
        INSERT dto
            INTO ${collection}
    `;

    const bindVars = {
      dtos,
    };

    await this.#db.query({
      query,
      bindVars,
    });
  };

  update = async <TUpdateEntityDTO>(
    id: string,
    dto: TUpdateEntityDTO,
    collectionName: string
  ): Promise<void> => {
    const collection = this.#getCollection(collectionName);

    if (!collection) throw new Error(`Collection ${collectionName} not found`);

    const documentToUpdate = await this.fetchById(id, collectionName);

    if (isNotFound(documentToUpdate))
      throw new Error(
        [
          `Cannot update document`,
          `${id}`,
          `as no document with that id was found`,
        ].join(' ')
      );

    // TODO remove cast
    const key = this.#getKeyOfDocument(
      documentToUpdate as HasKey<TUpdateEntityDTO>
    );

    if (isNotFound(key))
      throw new Error(
        `No property '_key' was found on document: ${documentToUpdate}`
      );

    const query = `
    UPDATE ${key}
        WITH @dto
            IN ${collection}
    `;
  };

  // TODO Add Replace

  // TODO Add Soft Delete

  #getCollection(collectionName: string) {
    return this.#db.collection(collectionName);
  }

  #getKeyOfDocument = <TCreateEntityDto>(
    document: HasKey<TCreateEntityDto>
  ): Maybe<string> =>
    typeof document._key === 'string' ? document._key : notFound;

  initializeWithData = async (
    collectionNamesAndModels: CollectionNameAndModels<AllCreateEntityDtosUnion>[]
  ): Promise<void> =>
    collectionNamesAndModels.forEach(({ collection, models }) => {
      this.#db.createCollection(collection);

      // TODO rethink the generic as it doesn't make sense for this method!
      this.createMany(models, collection);
    });
}
