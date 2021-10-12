import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database } from 'arangojs';

@Injectable()
export class DatabaseProvider {
  // TODO add type
  readonly #db;

  constructor(private configService: ConfigService) {
    const dbUser = 'root'; // this.configService.get<string>('ARANGO_DB_USER');
    const dbPass = this.configService.get<string>('ARANGO_DB_ROOT_PASSWORD');
    const dbName = this.configService.get<string>('ARANGO_DB_NAME');

    if (!dbUser || !dbPass || !dbName)
      throw new Error(
        'Failed to obtain environment variables required for db connection.'
      );

    console.log({
      dbUser,
      dbPass,
      dbName,
    });

    const systemDB = new Database({
      url: 'http://localhost:8585/',
    });
    // TODO why is `useDatabase` deprecated? can we use myDB.database("db_name")?

    const dbInstance = systemDB.database(dbName);
    // TODO implement a more sophisticated authentication method
    dbInstance.useBasicAuth(dbUser, dbPass);

    this.#db = dbInstance;

    console.log({ db: this.#db });
  }

  getConnection = () => this.#db;
}
