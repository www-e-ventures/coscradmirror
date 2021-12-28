import { EntityId } from '../../../domain/types/entity-id';
import { VocabularyList } from '../../../domain/vocabulary-list/entities/vocabulary-list.entity';

export class VocabularyListSummaryViewModel {
  readonly name?: string;

  readonly nameEnglish?: string;

  readonly id: EntityId;

  constructor(vocabularyList: VocabularyList) {
    const { name, nameEnglish, id } = vocabularyList;

    this.name = name;

    this.nameEnglish = nameEnglish;

    this.id = id;
  }
}
