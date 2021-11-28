import { Injectable } from '@nestjs/common';
import { ArangoDatabase } from '../../persistence/database/arango-database';
import { DatabaseProvider } from '../../persistence/database/database.provider';
import { PartialDTO } from '../../types/partial-dto';
import { Term } from '../models/term/entities/term.entity';
/**
 * TODO Refactor to use repository pattern and a `TermRepositoryProvider`.
 * Adhere to DDD and decouple domain from persistence layer.
 *
 * Should we split `term updates` (commands) from (GET X, count, etc.) queries?
 * The former apply to `domain models`, whereas the latter should work with
 * `view models`.
 */
@Injectable()
export class TermService {
  #db: ArangoDatabase;

  initialized: Promise<boolean>;

  collection = 'TermCollection';

  constructor(databaseProvider: DatabaseProvider) {
    // TODO read this from config \ env
    const shouldInitialize = false;

    // We need to await this somehow! also verify collection exists.
    this.initialized = databaseProvider
      .getDBInstance(shouldInitialize)
      .then((arangoInstance) => {
        this.#db = arangoInstance;
        return true;
      });
  }

  async create(createTermDto: PartialDTO<Term>) {
    return this.#db.create(createTermDto, this.collection);
  }

  async findAll() {
    return this.#db.fetchMany(this.collection);
  }

  async createMany(createTermDtos: PartialDTO<Term>[]) {
    return this.#db.createMany(createTermDtos, this.collection);
  }

  findOne(id: string) {
    return this.#db.fetchById(id, this.collection);
  }

  update(id: string, updateTermDto: PartialDTO<Term>) {
    return this.#db.update(id, updateTermDto, this.collection);
  }

  remove(id: string) {
    throw new Error('Remove term is not supported at this time');
  }
}
