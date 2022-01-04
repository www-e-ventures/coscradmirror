import { Entity } from '../../models/entity';
import { EntityType } from '../../types/entityType';
import { IRepositoryForEntity } from './repository-for-entity';

export interface IRepositoryProvider {
  forEntity: <TEntity extends Entity>(
    entityType: EntityType
  ) => IRepositoryForEntity<TEntity>;
}
