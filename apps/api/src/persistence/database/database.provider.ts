import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database } from 'arangojs';
import { Entity } from '../../domain/models/entity';
import { ArangoDatabase } from './arango-database';
import { ArangoDatabaseForCollection } from './arango-database-for-collection';
import { ArangoCollectionID } from './get-arango-collection-ids';
import { IDatabaseProvider } from './interfaces/database-provider';

// TODO Should we rename this `ArangoDatabaseProvider` ?
@Injectable()
export class DatabaseProvider implements IDatabaseProvider {
  readonly #db: Database;

  #arangoInstance: ArangoDatabase;

  constructor(private configService: ConfigService) {
    const dbUser = 'root'; // this.configService.get<string>('ARANGO_DB_USER');
    const dbPass = this.configService.get<string>('ARANGO_DB_ROOT_PASSWORD');
    const dbName = this.configService.get<string>('ARANGO_DB_NAME');

    if (!dbUser || !dbPass || !dbName)
      throw new Error(
        'Failed to obtain environment variables required for db connection.'
      );

    const systemDB = new Database({
      // TODO get this from the configService
      url: 'http://localhost:8585/',
    });
    // TODO why is `useDatabase` deprecated? can we use myDB.database("db_name")?
    const dbInstance = systemDB.database(dbName);
    dbInstance.useBasicAuth(dbUser, dbPass);

    dbInstance
      .route('_api')
      .get('version')
      .catch((error) => {
        systemDB.createDatabase(dbName);
      });

    this.#db = dbInstance;
  }

  getConnection = () => this.#db;

  getDBInstance = async (
    shouldInitializeWithTestData = false
  ): Promise<ArangoDatabase> => {
    if (!this.#arangoInstance)
      await this.#initializeArangoDb(shouldInitializeWithTestData);

    return this.#arangoInstance;
  };

  // TODO [type-safety] Can we correlate entity `DTOs` with `collection IDs`?
  // @ts-expect-error TODO fix the following!
  getDatabaseForCollection = <TEntity extends Entity>(
    collectionName: ArangoCollectionID
  ): ArangoDatabaseForCollection<TEntity> => {
    if (!this.#arangoInstance) this.#initializeArangoDb();

    return new ArangoDatabaseForCollection<TEntity>(
      this.#arangoInstance,
      collectionName
    );
  };

  #initializeArangoDb = (
    // TODO move this to an Options array
    shouldInitializeWithTestData = false
  ): void => {
    this.#arangoInstance = new ArangoDatabase(this.#db);
  };
}
