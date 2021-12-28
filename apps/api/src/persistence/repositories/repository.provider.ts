import { Injectable } from '@nestjs/common';
import { Entity } from '../../domain/models/entity';
import { IRepositoryProvider } from '../../domain/repositories/interfaces/repository-provider';
import { EntityType } from '../../domain/types/entityType';
import { DatabaseProvider } from '../database/database.provider';
import { getArangoCollectionID } from '../database/get-arango-collection-ids';
import { InstanceFactory, RepositoryForEntity } from './repository-for-entity';

@Injectable()
export class RepositoryProvider implements IRepositoryProvider {
  constructor(private databaseProvider: DatabaseProvider) {}

  forEntity<TEntity extends Entity>(
    entityType: EntityType,
    instanceFactory: InstanceFactory<TEntity>
  ) {
    return new RepositoryForEntity<TEntity>(
      this.databaseProvider,
      getArangoCollectionID(entityType),
      instanceFactory
    );
  }
}
