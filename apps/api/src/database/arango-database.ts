import { aql, Database } from 'arangojs';
import { Maybe } from '../app/lib/types/maybe';
import { isNotFound, notFound } from '../app/lib/types/not-found';
import { DatabaseProvider } from './database.provider';

type HasKey<T> = T & {
  _key: string;
};

export class ArangoDatabase<TEntity, TCreateEntityDTO, TUpdateEntityDTO> {
  #db: Database;

  constructor(databaseProvider: DatabaseProvider) {
    this.#db = databaseProvider.getConnection();
  }

  fetchById = async (
    id: string,
    collectionName: string
  ): Promise<Maybe<TEntity>> => {
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
    return cursor.next() as unknown as TEntity;
  };

  fetchMany = async (collectionName: string): Promise<Maybe<TEntity[]>> => {
    const collection = this.#getCollection(collectionName);

    const query = aql`
      FOR t IN ${collection}
        return t
      `;

    const cursor = await this.#db.query(query);

    if (cursor.count === 0) return notFound;

    // TODO remove cast
    return cursor.all() as unknown as TEntity[];
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
  create = async (
    dto: TCreateEntityDTO,
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

  createMany = async (
    dtos: TCreateEntityDTO[],
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

  update = async (
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
    const key = this.#getKeyOfDocument(documentToUpdate as HasKey<TEntity>);

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

  #getKeyOfDocument = (document: HasKey<TEntity>): Maybe<string> =>
    typeof document._key === 'string' ? document._key : notFound;
}
