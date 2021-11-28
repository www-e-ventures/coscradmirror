import { Injectable } from '@nestjs/common';
import { ArangoDatabase } from 'apps/api/src/database/arango-database';
import { DatabaseProvider } from 'apps/api/src/database/database.provider';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
/**
 * TODO Refactor to use repository pattern and a `TermRepositoryProvider`.
 * Adhere to DDD and decouple domain from persistence layer.
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

  async create(createTermDto: CreateTermDto) {
    return this.#db.create(createTermDto, this.collection);
  }

  async findAll() {
    return this.#db.fetchMany(this.collection);
  }

  async createMany(createTermDtos: CreateTermDto[]) {
    return this.#db.createMany(createTermDtos, this.collection);
  }

  findOne(id: string) {
    return this.#db.fetchById(id, this.collection);
  }

  update(id: string, updateTermDto: UpdateTermDto) {
    return this.#db.update(id, updateTermDto, this.collection);
  }

  remove(id: string) {
    throw new Error('Remove term is not supported at this time');
  }
}
