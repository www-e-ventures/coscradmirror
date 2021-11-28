import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseProvider } from 'apps/api/src/database/database.provider';
import { IDatabase } from 'apps/api/src/database/interfaces/database';
import { IDatabaseProvider } from 'apps/api/src/database/interfaces/database.provider';
import { TermService } from './term.service';

/**
 * TODO Move the following to a test utility direcotry
 */
export type MockInstance<T> = {
  [k in keyof T]: typeof jest.fn;
};

export const buildMockArangoDatabase = (): MockInstance<IDatabase> => ({
  fetchById: jest.fn,
  fetchMany: jest.fn,
  create: jest.fn,
  createMany: jest.fn,
  update: jest.fn,
  getCount: jest.fn,
});

export const buildMockDatabaseProvicer = (): IDatabaseProvider => ({
  getDBInstance: jest.fn().mockResolvedValue(buildMockArangoDatabase()),
});

describe('TermService', () => {
  let service: TermService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TermService,
        {
          provide: DatabaseProvider,
          useFactory: buildMockDatabaseProvicer,
        },
      ],
    }).compile();

    service = module.get<TermService>(TermService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
