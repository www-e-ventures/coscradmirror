import { EntityId } from 'apps/api/src/domain/types/entity-id';
import { Maybe } from 'apps/api/src/lib/types/maybe';

/**
 * This should be identical to `IDatabase`, except that the `collection name`
 * is stored on the instance instead of being passed in to the methods.
 */
export interface IDatabaseForCollection<TEntityDTO> {
  // TODO we need an abstraction around `db` dependency
  //   constructor: (db: ?,collectionName: string) => IDatabase;

  fetchById: (id: EntityId) => Promise<Maybe<TEntityDTO>>;

  // Returns an empty array if none found
  fetchMany: () => Promise<TEntityDTO[]>;

  getCount: (collectionName: string) => Promise<number>;

  create: (dto: TEntityDTO) => Promise<void>;

  createMany: (dto: TEntityDTO[]) => Promise<void>;

  update: (id: EntityId, dto: TEntityDTO) => Promise<void>;
}
