import { Test, TestingModule } from '@nestjs/testing';
import { IDatabase } from 'apps/api/src/persistence/database/interfaces/database';
import { IDatabaseProvider } from 'apps/api/src/persistence/database/interfaces/database-provider';
import { IDatabaseForCollection } from '../../persistence/database/interfaces/database-for-collection';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { PartialDTO } from '../../types/partial-dto';
import { Entity } from '../models/entity';
import { IRepositoryForEntity } from '../repositories/interfaces/repository-for-entity';
import { IRepositoryProvider } from '../repositories/interfaces/repository-provider';
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

export const buildMockArangoDatabaseForCollection = <
  TEntityDTO extends PartialDTO<Entity>
>(): MockInstance<IDatabaseForCollection<TEntityDTO>> => ({
  fetchById: jest.fn,
  fetchMany: jest.fn,
  create: jest.fn,
  createMany: jest.fn,
  update: jest.fn,
  getCount: jest.fn,
});

export const buildMockDatabaseProvider = <
  TEntityDTO extends PartialDTO<Entity>
>(): IDatabaseProvider => ({
  getDBInstance: jest.fn().mockResolvedValue(buildMockArangoDatabase()),
  getDatabaseForCollection: jest
    .fn()
    .mockResolvedValue(
      buildMockArangoDatabaseForCollection<PartialDTO<TEntityDTO>>()
    ),
});

export const buildMockRepositoryProvider = <
  TEntity extends Entity
>(): IRepositoryProvider => ({
  forEntity: jest.fn().mockReturnValue(buildMockRepository<TEntity>()),
});

export const buildMockRepository = <TEntity extends Entity>(): MockInstance<
  IRepositoryForEntity<TEntity>
> => ({
  fetchById: jest.fn,
  fetchMany: jest.fn,
  create: jest.fn,
  createMany: jest.fn,
  getCount: jest.fn,
});

describe('TermService', () => {
  let service: TermService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TermService,
        {
          provide: RepositoryProvider,
          useFactory: buildMockRepositoryProvider,
        },
      ],
    }).compile();

    service = module.get<TermService>(TermService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
