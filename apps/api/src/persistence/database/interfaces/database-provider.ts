import { Entity } from 'apps/api/src/domain/models/entity';
import { IDatabase } from './database';
import { IDatabaseForCollection } from './database-for-collection';

export interface IDatabaseProvider {
  getDBInstance: () => Promise<IDatabase>;

  getDatabaseForCollection: <TEntity extends Entity>(
    collectionId: string
  ) => IDatabaseForCollection<TEntity>;
}
