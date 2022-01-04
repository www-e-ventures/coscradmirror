import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ArangoConnectionProvider } from './arango-connection.provider';
import { ArangoDatabase } from './arango-database';
import { DatabaseProvider } from './database.provider';

describe('AppController', () => {
  let databaseProvider: DatabaseProvider;
  let configService: ConfigService;

  let arangoInstance;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigService, ArangoConnectionProvider],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
    if (!configService) throw new Error('Config service not injected.');

    const arangoConnectionProvider = moduleRef.get<ArangoConnectionProvider>(
      ArangoConnectionProvider
    );

    if (!arangoConnectionProvider)
      throw new Error('Connection provider not injected');

    const databaseProvider = new DatabaseProvider(
      configService,
      arangoConnectionProvider
    );

    arangoInstance = await databaseProvider.getDBInstance();
  });

  describe('get database instance', () => {
    describe('the returned instance', () => {
      it('should not be null or undefined', () => {
        expect(arangoInstance).toBeTruthy();
      });

      it('should be an instance of ArangoDatabase', () => {
        expect(arangoInstance).toBeInstanceOf(ArangoDatabase);
      });
    });
  });
});
