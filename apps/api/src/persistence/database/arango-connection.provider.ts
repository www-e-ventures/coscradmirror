import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database } from 'arangojs';
import { Scheme } from '../../app/config/constants/Scheme';
import { isNullOrUndefined } from '../../domain/utilities/validation/is-null-or-undefined';
import { PartialDTO } from '../../types/partial-dto';
import ArangoDatabaseConfiguration from './ArangoDatabaseConfiguration';
import DatabaseAlreadyInitializedError from './errors/DatabaseAlreadyInitializedError';
import DatabaseCannotBeDroppedError from './errors/DatabaseCannotBeDroppedError';
import DatabaseNotYetInitializedError from './errors/DatabaseNotYetInitializedError';
import { getAllArangoCollectionIDs } from './types/ArangoCollectionId';
import canDatabaseBeDropped from './utilities/canDatabaseBeDropped';

// Alias for more clarity from the outside; TODO wrap `Database` with simpler API?
export type ArangoConnection = Database;

type Port = `${number}`;

const isPortRequired = (scheme: Scheme, port: `${number}`) => {
    if (scheme === 'http' && port === '80') return false;
    if (scheme === 'https' && port === '443') return false;
    return true;
};

const buildFullHostURL = (
    domain: string,
    scheme: Scheme = Scheme.https,
    port: Port = '443'
): string => `${scheme}://${domain}${isPortRequired(scheme, port) ? `:${port}` : ''}`;

@Injectable()
export class ArangoConnectionProvider {
    #connection: ArangoConnection;

    #databaseConfiguration: ArangoDatabaseConfiguration;

    isInitialized = false;

    public get databaseConfiguration() {
        return this.#databaseConfiguration.getConfig();
    }

    constructor(private configService: ConfigService) {
        this.setDatabaseConfiguration({
            dbName: this.configService.get<string>('ARANGO_DB_NAME'),
            dbRootPass: this.configService.get<string>('ARANGO_DB_ROOT_PASSWORD'),
            dbUser: this.configService.get<string>('ARANGO_DB_USER'),
            dbPass: this.configService.get<string>('ARANGO_DB_USER_PASSWORD'),
            dbHostUrl: buildFullHostURL(
                this.configService.get<string>('ARANGO_DB_HOST_DOMAIN', 'localhost'),
                this.configService.get<Scheme>('ARANGO_DB_HOST_SCHEME', Scheme.http),
                this.configService.get<Port>('ARANGO_DB_HOST_PORT', '80')
            ),
        });

        const systemDB = this.#getAdminDBConnection();

        // TODO why is `useDatabase` deprecated? can we use myDB.database("db_name")?
        const dbInstance = systemDB.database(this.databaseConfiguration.dbName);
        dbInstance.useBasicAuth(
            this.databaseConfiguration.dbUser,
            this.databaseConfiguration.dbPass
        );

        this.#connection = dbInstance;
    }

    /**
     * This async setup helper will
     * - Create the database (the one referenced in your .env via ConfigService)
     * only if this database does not exist
     * - Add any missing collections (but leave existing collections untouched)
     * and can only be run once.
     */
    async initialize(): Promise<void> {
        if (this.isInitialized) throw new DatabaseAlreadyInitializedError();

        await this.#createDatabaseIfNotExists();

        await this.#createAllMissingCollections();

        this.isInitialized = true;
    }

    getConnection(): ArangoConnection {
        if (!this.isInitialized)
            throw new DatabaseNotYetInitializedError('get an Arango connection');

        return this.#connection;
    }

    public setDatabaseConfiguration(config: PartialDTO<ArangoDatabaseConfiguration>) {
        this.#databaseConfiguration = new ArangoDatabaseConfiguration({
            ...config,
        });
    }

    #getAdminDBConnection(): Database {
        const adminInstance = new Database({
            url: this.databaseConfiguration.dbHostUrl,
        });

        adminInstance.useBasicAuth('root', this.databaseConfiguration.dbRootPass);

        return adminInstance;
    }

    async #doesCollectionExist(collectionName: string): Promise<boolean> {
        const doesCollectionExist = await this.#getAdminDBConnection()
            .listCollections()
            .then((allCollectionMetadata) =>
                allCollectionMetadata.map(({ name }) => name).includes(collectionName)
            );

        return doesCollectionExist;
    }

    async #createDatabaseIfNotExists(): Promise<void> {
        const databaseName = this.databaseConfiguration.dbName;

        if (await this.#doesDatabaseExist(databaseName)) return;

        const { dbUser } = this.#databaseConfiguration;

        try {
            await this.#getAdminDBConnection()
                .createDatabase(databaseName, {
                    users: [{ username: dbUser }, { username: 'root' }],
                })
                .catch((e) => {
                    throw new Error(`Failed to create database: ${e?.message}`);
                });
        } catch (error) {
            console.log(`failed to create database!: ${error.message}`);
        }
    }

    async #createAllMissingCollections(): Promise<void> {
        await Promise.all(
            getAllArangoCollectionIDs().map((collectionName) =>
                this.#createCollectionIfNotExists(collectionName)
            )
        );
    }

    async #createCollectionIfNotExists(collectionName: string): Promise<void> {
        if (await this.#doesCollectionExist(collectionName)) return;

        await this.#getAdminDBConnection().createCollection(collectionName);
    }

    #doesDatabaseExist = async (databaseName: string) => {
        if (isNullOrUndefined(databaseName)) return false;

        const doesDatabaseExist = await this.#getAdminDBConnection()
            .listDatabases()
            .then((allDatabaseNames) => allDatabaseNames.includes(databaseName));

        return doesDatabaseExist;
    };

    /**
     * **CAUTION** This method is only to be used in tests.
     */
    async dropDatabaseIfExists(): Promise<void> {
        const dbName = this.databaseConfiguration.dbName;

        const doesDatabaseExist = await this.#doesDatabaseExist(dbName);

        if (!doesDatabaseExist) return;

        if (!canDatabaseBeDropped(dbName)) throw new DatabaseCannotBeDroppedError(dbName);

        await this.#getAdminDBConnection().dropDatabase(dbName);
    }
}
