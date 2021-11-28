import { DatabaseProvider } from '../database/database.provider';

export class BookRepository {
  readonly #db;

  readonly entityName: 'Book';

  constructor(private databaseProvider: DatabaseProvider) {
    this.#db = databaseProvider.getConnection();
  }

  fetchMany() {
    /**
     * TODO write a service class that encapsulates the raw AQL logic.
     * We may want to package this with our db connection into a db class,
     * which implements a more generic interface that could easily be implemented
     * with an alternative db.
     */
    const query = `FOR entity in @collection
        return entity
      `;

    const queryParameters = {
      query,
      // TODO where to store \ retrieve the entity name?
      bindVars: {
        collection: 'Book',
      },
    };

    // TODO pipe through entity constructor
    // TODO implement strategy for error handling
    return this.#db.query(queryParameters);
  }

  fetchById(id: string) {
    const query = `FOR entity in @collection
        FILTER entity._id == ${id}
        return entity`;

    const queryParameters = {
      query,
      bindVars: {
        collection: 'Book',
      },
    };

    // TODO pipe through entity constructor
    return this.#db.query(queryParameters);
  }

  create(newEntity) {
    // TODO Convert entity to DTO first
    const query = `INSERT @newEntity INTO @collection`;

    const queryParameters = {
      query,
      bindVars: {
        collection: 'Book',
        newEntity,
      },
    };

    return this.#db.query(queryParameters);
  }

  createMany(newEntities) {
    // TODO Pipe entities through to DTO first
    const query = `FOR newEntity in @newEntities
        INSERT newEntity INTO @collection`;

    const bindVars = {
      collection: 'Book',
      newEntities,
    };

    const queryParameters = {
      query,
      bindVars,
    };

    return this.#db.query(queryParameters);
  }

  linkToRelatedResource(context) {
    // TODO add edge representing relationship
  }

  fetchListOfRelatedResources(context) {}
}
