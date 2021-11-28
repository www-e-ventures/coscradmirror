import { IDatabase } from './database';
import { IDatabaseForCollection } from './database-for-collection';

export interface IDatabaseProvider {
  getDBInstance: (shouldInitialize: boolean) => Promise<IDatabase>;

  getDatabaseForCollection: <TEntityDTO>(
    collectionId: string
  ) => IDatabaseForCollection<TEntityDTO>;
}
