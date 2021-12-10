import { Injectable } from '@nestjs/common';
import { isNotFound, notFound } from '../../lib/types/not-found';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { PartialDTO } from '../../types/partial-dto';
import { IRepositoryForEntity } from '../repositories/interfaces/repository-for-entity';
import { VocabularyList } from '../vocabulary-list/entities/vocabulary-list.entity';
/**
 * TODO Refactor to use repository pattern and a `vocabularyListRepositoryProvider`.
 * Adhere to DDD and decouple domain from persistence layer.
 *
 * Should we split `VocabularyList updates` (commands) from (GET X, count, etc.) queries?
 * The former apply to `domain models`, whereas the latter should work with
 * `view models`.
 */
@Injectable()
export class VocabularyListService {
  #vocabularyListRepository: IRepositoryForEntity<VocabularyList>;

  initialized: Promise<boolean>;

  constructor(private repositoryProvider: RepositoryProvider) {
    this.#vocabularyListRepository =
      this.repositoryProvider.forEntity<VocabularyList>(
        'vocabularyList',
        (dto: PartialDTO<VocabularyList>) => new VocabularyList(dto)
      );
  }

  async create(createVocabularyListDto: PartialDTO<VocabularyList>) {
    return this.#vocabularyListRepository.create(
      new VocabularyList(createVocabularyListDto)
    );
  }

  async findAll() {
    return this.#vocabularyListRepository.fetchMany();
  }

  async createMany(createVocabularyListDtos: PartialDTO<VocabularyList>[]) {
    return this.#vocabularyListRepository.createMany(
      createVocabularyListDtos.map((dto) => new VocabularyList(dto))
    );
  }

  async findOne(id: string) {
    const searchResult = await this.#vocabularyListRepository.fetchById(id);

    if (isNotFound(searchResult)) return notFound;

    return searchResult;
  }

  update(id: string, updateVocabularyListDto: PartialDTO<VocabularyList>) {
    throw new Error('Updating a VocabularyList is not supported at this time');
  }

  remove(id: string) {
    throw new Error('Removing a VocabularyList is not supported at this time');
  }
}
