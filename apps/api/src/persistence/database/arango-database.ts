import { AllCreateEntityDtosUnion } from 'apps/api/src/domain/types/all-entities';
import { Maybe } from 'apps/api/src/lib/types/maybe';
import { isNotFound, notFound } from 'apps/api/src/lib/types/not-found';
import { CollectionNameAndModels } from 'apps/api/src/test-data/test-data-index';
import { Database } from 'arangojs';
import { isArangoDatabase } from 'arangojs/database';
import { IDatabase } from './interfaces/database';

type HasKey<T> = T & {
  _key: string;
};

export class ArangoDatabase implements IDatabase {
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
    const query = `
    FOR t IN ${collectionName}
      FILTER t._id == @id
        RETURN t
    `;

    const bindVars = {
      id: `${collectionName}/${id}`,
    };

    const cursor = await this.#db.query({
      query,
      bindVars,
    });

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
    const query = `
      FOR t IN ${collectionName}
        return t
      `;

    const bindVars = {};

    const cursor = await this.#db.query({
      query,
      bindVars,
    });

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
    // remove this check. It's the callers responsibility to verify the `Collection` exists
    const collectionExists = await this.#doesCollectionExist(collectionName);

    if (!collectionExists)
      throw new Error(`Collection ${collectionName} not found!`);
    const query = `
    INSERT @dto
        INTO ${collectionName}
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
    // remove this check. It's the callers responsibility to verify the `Collection` exists
    const collectionExists = await this.#doesCollectionExist(collectionName);

    if (!collectionExists)
      throw new Error(`Collection ${collectionName} not found!`);

    const query = `
    FOR dto IN @dtos
        INSERT dto
            INTO ${collectionName}
    `;

    const bindVars = {
      dtos,
    };

    try {
      await this.#db.query({
        query,
        bindVars,
      });
    } catch (error) {
      throw error;
    }
  };

  update = async <TUpdateEntityDTO>(
    id: string,
    dto: TUpdateEntityDTO,
    collectionName: string
  ): Promise<void> => {
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
            IN ${collectionName}
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

  #doesCollectionExist = async (collectionName: string): Promise<boolean> =>
    this.#db
      .collections()
      .then((collections) =>
        collections.some((collection) => collection.name === collectionName)
      );

  initializeWithData = async (
    collectionNamesAndModels: CollectionNameAndModels<AllCreateEntityDtosUnion>[]
  ): Promise<void[]> =>
    Promise.all(
      collectionNamesAndModels.map(async ({ collection, models }) => {
        if (await this.#doesCollectionExist(collection)) return;

        this.#db.createCollection(collection);

        this.createMany(models, collection);
      })
    );
}
