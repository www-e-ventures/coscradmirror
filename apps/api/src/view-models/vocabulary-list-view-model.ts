import { Term } from '../domain/models/term/entities/term.entity';
import { EntityId } from '../domain/types/entity-id';
import { VocabularyList } from '../domain/vocabulary-list/entities/vocabulary-list.entity';
import { VocabularyListVariable } from '../domain/vocabulary-list/types/vocabulary-list-variable';
import { VocabularyListVariableValue } from '../domain/vocabulary-list/types/vocabulary-list-variable-value';
import { notFound } from '../lib/types/not-found';
import { TermViewModel } from './term-view-model';

type VocabularyListEntryViewModel = {
  term: TermViewModel;

  variableValues: Record<string, VocabularyListVariableValue>;
};

export class VocabularyListViewModel {
  readonly name?: string;

  readonly nameEnglish?: string;

  readonly id: EntityId;

  readonly entries: VocabularyListEntryViewModel[];

  readonly variables: VocabularyListVariable[];

  constructor(vocabularyList: VocabularyList, allTerms: Term[]) {
    const { entries } = vocabularyList;

    const newEntries = entries
      .map(({ termId, variableValues }) => ({
        term: allTerms.find((term) => term.id === termId) || notFound,
        variableValues,
      }))
      .filter(({ term }) => term !== notFound);

    this.entries = newEntries;
  }
}
