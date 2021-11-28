import { IDatabase } from './database';

export interface IDatabaseProvider {
  getDBInstance: (shouldInitialize: boolean) => Promise<IDatabase>;
}
