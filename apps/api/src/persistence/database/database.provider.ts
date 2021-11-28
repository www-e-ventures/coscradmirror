import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { buildTestData } from 'apps/api/src/test-data/test-data-index';
import { Database } from 'arangojs';
import { ArangoDatabase } from './arango-database';

@Injectable()
export class DatabaseProvider {
  // TODO add type
  readonly #db;

  #arangoInstance: ArangoDatabase = null;

  constructor(private configService: ConfigService) {
    const dbUser = 'root'; // this.configService.get<string>('ARANGO_DB_USER');
    const dbPass = this.configService.get<string>('ARANGO_DB_ROOT_PASSWORD');
    const dbName = this.configService.get<string>('ARANGO_DB_NAME');

    if (!dbUser || !dbPass || !dbName)
      throw new Error(
        'Failed to obtain environment variables required for db connection.'
      );

    // TODO get this from the configService
    const systemDB = new Database({
      url: 'http://localhost:8585/',
    });
    // TODO why is `useDatabase` deprecated? can we use myDB.database("db_name")?

    const dbInstance = systemDB.database(dbName);
    // TODO implement a more sophisticated authentication method
    dbInstance.useBasicAuth(dbUser, dbPass);

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

  #initializeArangoDb = async (
    // TODO move this to an Options array
    shouldInitializeWithTestData = false
  ): Promise<void> => {
    const arangoDb = new ArangoDatabase(this.#db);

    if (shouldInitializeWithTestData)
      // TODO Move this out and do it in a testing utility
      await arangoDb.initializeWithData(buildTestData());

    this.#arangoInstance = arangoDb;
  };
}
