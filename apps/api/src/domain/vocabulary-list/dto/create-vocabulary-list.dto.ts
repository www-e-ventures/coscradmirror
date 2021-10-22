import { EntityId } from '../../types/entity-id';
import { VocabularyListVariable } from '../types/vocabulary-list-variable';
import { VocabularyListEntry } from '../vocabulary-list-entry';

// TEST

export class CreateVocabularyListDto {
  id: EntityId;

  name?: string;

  nameEnglish?: string;

  entries: VocabularyListEntry[];

  variables: VocabularyListVariable[];
}
