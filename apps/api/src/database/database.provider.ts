import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database } from 'arangojs';
import { buildTestData } from '../test-data/test-data-index';
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

  getArangoDbInstance = async (
    shouldInitializeWithTestData = false
  ): Promise<ArangoDatabase> => {
    if (!this.#arangoInstance)
      await this.#initializeArangoDb(shouldInitializeWithTestData);

    return this.#arangoInstance;
  };

  #initializeArangoDb = async (
    shouldInitializeWithTestData = false
  ): Promise<void> => {
    const arangoDb = new ArangoDatabase(this.#db);

    if (shouldInitializeWithTestData)
      await arangoDb.initializeWithData(buildTestData());

    this.#arangoInstance = arangoDb;
  };
}
