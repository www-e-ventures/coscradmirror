import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { DatabaseProvider } from '../database/database.provider';
import { RepositoryProvider } from './repository.provider';

describe('Repository Provider', () => {
  let repositoryProvider;

  let databaseProvier;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DatabaseProvider, ConfigService],
    }).compile();

    databaseProvier = moduleRef.get<DatabaseProvider>(DatabaseProvider);

    repositoryProvider = new RepositoryProvider(databaseProvier);
  });

  describe('the constructor', () => {
    it('should be truthy', () => {
      expect(repositoryProvider).toBeTruthy();
    });
  });
});
