import { Injectable } from '@nestjs/common';
import { isNotFound, notFound } from '../../lib/types/not-found';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { PartialDTO } from '../../types/partial-dto';
import { Term } from '../models/term/entities/term.entity';
import { IRepositoryForEntity } from '../repositories/interfaces/repository-for-entity';
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
  #termRepository: IRepositoryForEntity<Term>;

  initialized: Promise<boolean>;

  constructor(private termRepositoryProvider: RepositoryProvider) {
    this.#termRepository = this.termRepositoryProvider.forEntity<Term>(
      'term',
      (dto: PartialDTO<Term>) => new Term(dto)
    );
  }

  async create(createTermDto: PartialDTO<Term>) {
    return this.#termRepository.create(new Term(createTermDto));
  }

  async findAll() {
    return this.#termRepository
      .fetchMany()
      .then((allModels) => allModels.map((model) => model.toDTO()));
  }

  async createMany(createTermDtos: PartialDTO<Term>[]) {
    return this.#termRepository.createMany(
      createTermDtos.map((dto) => new Term(dto))
    );
  }

  async findOne(id: string) {
    const searchResult = await this.#termRepository.fetchById(id);

    if (isNotFound(searchResult)) return notFound;

    return new Term(searchResult);
  }

  update(id: string, updateTermDto: PartialDTO<Term>) {
    throw new Error('Updating a term is not supported at this time');
  }

  remove(id: string) {
    throw new Error('Remove term is not supported at this time');
  }
}
