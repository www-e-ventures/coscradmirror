import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database } from 'arangojs';
import { Entity } from '../../domain/models/entity';
import { ArangoDatabase } from './arango-database';
import { ArangoDatabaseForCollection } from './arango-database-for-collection';
import { ArangoCollectionID } from './get-arango-collection-ids';
import { IDatabaseProvider } from './interfaces/database-provider';

// TODO [refactor] break the following out into a utility
const allowedSchemes = ['http', 'https'] as const;

type Scheme = typeof allowedSchemes[number];

const isValidScheme = (input: unknown): input is Scheme =>
  ['http', 'https'].includes(input as string);

const isPortRequired = (scheme: Scheme, port: `${number}`) => {
  if (scheme === 'http' && port === '80') return false;
  if (scheme === 'https' && port === '443') return false;

  return true;
};

type Port = `${number}`;

const isValidPort = (input: unknown): input is Port =>
  typeof input === 'string' && !isNaN(parseInt(input));

const buildFullHostURL = (
  domain: string,
  scheme: Scheme = 'https',
  port: Port = '443'
): string =>
  `${scheme}://${domain}${isPortRequired(scheme, port) ? `:${port}` : ''}`;

// TODO Should we rename this `ArangoDatabaseProvider` ?
@Injectable()
export class DatabaseProvider implements IDatabaseProvider {
  readonly #db: Database;

  #arangoInstance: ArangoDatabase;

  constructor(private configService: ConfigService) {
    const dbUser = this.configService.get<string>('ARANGO_DB_USER', 'user');
    const dbPass = this.configService.get<string>(
      'ARANGO_DB_USER_PASSWORD',
      'userPASSWORD'
    );
    const dbName = this.configService.get<string>('ARANGO_DB_NAME', 'testdb');
    const dbHostDomain = this.configService.get<string>(
      'ARANGO_DB_HOST_DOMAIN',
      'localhost'
    );
    const dbHostScheme = this.configService.get<string>(
      'ARANGO_DB_HOST_SCHEME',
      'http'
    );
    const dbHostPort = this.configService.get<string>(
      'ARANGO_DB_HOST_PORT',
      '80'
    );

    if (!isValidScheme(dbHostScheme))
      throw new Error(
        `Invalid config, scheme: ${dbHostScheme}. Allowed: http, https`
      );

    if (!isValidPort(dbHostPort))
      throw new Error(`Invalid config, db port: ${dbHostPort}`);

    const systemDB = new Database({
      url: buildFullHostURL(dbHostDomain, dbHostScheme, dbHostPort),
    });
    // TODO why is `useDatabase` deprecated? can we use myDB.database("db_name")?
    const dbInstance = systemDB.database(dbName);
    dbInstance.useBasicAuth(dbUser, dbPass);

    this.#db = dbInstance;
  }

  getConnection = () => this.#db;

  getDBInstance = async (): Promise<ArangoDatabase> => {
    if (!this.#arangoInstance)
      // TODO inject this in the constructor
      this.#arangoInstance = new ArangoDatabase(this.#db);

    return this.#arangoInstance;
  };

  // TODO [type-safety] Can we correlate entity `DTOs` with `collection IDs`?
  // @ts-expect-error TODO fix the following!
  getDatabaseForCollection = <TEntity extends Entity>(
    collectionName: ArangoCollectionID
  ): ArangoDatabaseForCollection<TEntity> => {
    if (!this.#arangoInstance)
      // TODO should we inject this?
      this.#arangoInstance = new ArangoDatabase(this.#db);

    return new ArangoDatabaseForCollection<TEntity>(
      this.#arangoInstance,
      collectionName
    );
  };
}
