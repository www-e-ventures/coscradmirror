import { EntityId } from '../../types/entity-id';
import { VocabularyListVariable } from '../types/vocabulary-list-variable';
import { VocabularyListEntry } from '../vocabulary-list-entry';

export class VocabularyList {
  readonly name?: string;

  readonly nameEnglish?: string;

  readonly id: EntityId;

  readonly entries: VocabularyListEntry[];

  readonly variables: VocabularyListVariable[];
}
