import { VocabularyListVariable } from '../types/vocabulary-list-variable';
import { VocabularyListEntry } from '../vocabulary-list-entry';

// TEST

export class CreateVocabularyListDto {
  name?: string;

  nameEnglish?: string;

  entries: VocabularyListEntry[];

  variables: VocabularyListVariable[];
}
