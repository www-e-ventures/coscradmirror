import { ArangoCollectionID } from 'apps/api/src/persistence/database/get-arango-collection-ids';
import { InstanceFactory } from 'apps/api/src/persistence/repositories/repository-for-entity';
import { Entity } from '../../models/entity';
import { IRepositoryForEntity } from './repository-for-entity';

export interface IRepositoryProvider {
  forEntity: <TEntity extends Entity>(
    collectionName: ArangoCollectionID,
    instanceFactory: InstanceFactory<TEntity>
  ) => IRepositoryForEntity<TEntity>;
}
