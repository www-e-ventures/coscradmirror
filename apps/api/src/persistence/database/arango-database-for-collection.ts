import { isArangoDatabase } from 'arangojs/database';
import { Entity } from '../../domain/models/entity';
import { EntityId } from '../../domain/types/entity-id';
import { Maybe } from '../../lib/types/maybe';
import { PartialDTO } from '../../types/partial-dto';
import { ArangoDatabase } from './arango-database';
import { ArangoCollectionID } from './get-arango-collection-ids';
import { IDatabaseForCollection } from './interfaces/database-for-collection';
import mapEntityDTOToDatabaseDTO from './utilities/mapEntityDTOToDatabaseDTO';

export class ArangoDatabaseForCollection<TEntityDTO extends PartialDTO<Entity>>
  implements IDatabaseForCollection<TEntityDTO>
{
  #collectionID: ArangoCollectionID;

  #arangoDatabase: ArangoDatabase;

  constructor(
    arangoDatabase: ArangoDatabase,
    collectionName: ArangoCollectionID
  ) {
    this.#collectionID = collectionName;

    this.#arangoDatabase = arangoDatabase;

    if (isArangoDatabase(this.#arangoDatabase))
      throw new Error(
        `Received invalid arango db instance: ${JSON.stringify(arangoDatabase)}`
      );
  }

  // True Queries (return information)
  fetchById(id: EntityId): Promise<Maybe<TEntityDTO>> {
    return this.#arangoDatabase.fetchById<TEntityDTO>(id, this.#collectionID);
  }

  fetchMany(): Promise<TEntityDTO[]> {
    return this.#arangoDatabase.fetchMany<TEntityDTO>(this.#collectionID);
  }

  getCount(): Promise<number> {
    return this.#arangoDatabase.getCount(this.#collectionID);
  }

  // Commands (mutate state)
  create(entityDTO: TEntityDTO) {
    // Handle the difference in _id \ _key between model and database
    return this.#arangoDatabase.create(
      mapEntityDTOToDatabaseDTO(entityDTO),
      this.#collectionID
    );
  }

  createMany(entityDTOs: TEntityDTO[]) {
    // Handle the difference in _id \ _key between model and database
    const databaseDTOs = entityDTOs.map(mapEntityDTOToDatabaseDTO);

    return this.#arangoDatabase.createMany(databaseDTOs, this.#collectionID);
  }

  update(id: EntityId, updateDTO: TEntityDTO) {
    return this.#arangoDatabase.update(id, updateDTO, this.#collectionID);
  }
}
