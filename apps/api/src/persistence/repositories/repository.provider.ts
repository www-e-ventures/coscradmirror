import { Injectable } from '@nestjs/common';
import { Entity } from '../../domain/models/entity';
import { IRepositoryProvider } from '../../domain/repositories/interfaces/repository-provider';
import { DatabaseProvider } from '../database/database.provider';
import {
  EntityName,
  getArangoCollectionID,
} from '../database/get-arango-collection-ids';
import { InstanceFactory, RepositoryForEntity } from './repository-for-entity';

@Injectable()
export class RepositoryProvider implements IRepositoryProvider {
  constructor(private databaseProvider: DatabaseProvider) {}

  forEntity<TEntity extends Entity>(
    entityName: EntityName,
    instanceFactory: InstanceFactory<TEntity>
  ) {
    return new RepositoryForEntity<TEntity>(
      this.databaseProvider,
      getArangoCollectionID(entityName),
      instanceFactory
    );
  }
}
