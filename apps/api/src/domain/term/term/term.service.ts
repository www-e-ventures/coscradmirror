import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from 'apps/api/src/database/database.provider';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
/**
 * TODO Refactor to use repository pattern and a `TermRepositoryProvider`.
 * Adhere to DDD and decouple domain from persistence layer.
 */
@Injectable()
export class TermService {
  #db;

  collection: 'TermCollection';

  constructor(databaseProvider: DatabaseProvider) {
    const shouldInitialize = true;

    this.#db = databaseProvider.getArangoDbInstance(shouldInitialize);
  }

  async create(createTermDto: CreateTermDto) {
    const query = `
    INSERT @dto
      INTO TermCollection
    `;

    await this.#db.query({
      query,
      bindVars: {
        dto: createTermDto,
      },
    });

    return '200 ok';
  }

  async findAll() {
    const query = `
    FOR t in TermCollection
      RETURN t
  `;

    try {
      return await this.#db
        .query({
          query,
          bindVars: {}, // { collection: this.collection || 'TermCollection' },
        })
        .then((cursor) =>
          cursor.reduce(
            (accumulatedResults, nextValue) =>
              accumulatedResults.concat([nextValue]),
            []
          )
        );
    } catch (err) {
      return err;
    }
  }

  async createMany(createTermDtos: CreateTermDto[]) {
    const query = `
    FOR dto in @dtos
      INSERT dto
        INTO TermCollection
    `;

    await this.#db.query({
      query,
      bindVars: {
        dtos: createTermDtos,
      },
    });

    return '200 ok';
  }

  findOne(id: string) {
    const query = `
    FOR t IN TermCollection
      FILTER t._id == @id
        RETURN t
    `;
  }

  update(id: number, updateTermDto: UpdateTermDto) {
    return `This action updates a #${id} term`;
  }

  remove(id: number) {
    return `This action removes a #${id} term`;
  }
}
