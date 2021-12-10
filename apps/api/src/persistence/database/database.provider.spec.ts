import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { DatabaseProvider } from './database.provider';

describe('AppController', () => {
  let databaseProvider: DatabaseProvider;
  let configService: ConfigService;

  let db;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
    if (!configService) throw new Error('Config service not injected.');
    databaseProvider = new DatabaseProvider(configService);

    db = databaseProvider.getConnection();
  });

  describe('getConnection', () => {
    let result;

    beforeAll(async () => {
      result = await db.route('_api').get('version');
    });

    it('querying the db version should return a result', () => {
      expect(result).toBeTruthy();
    });
  });
});
