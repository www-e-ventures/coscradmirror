import { isNullOrUndefined } from 'apps/api/src/domain/utilities/validation/is-null-or-undefined';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { Term } from '../../../domain/models/term/entities/term.entity';
import { VocabularyList } from '../../../domain/models/vocabulary-list/entities/vocabulary-list.entity';
import { VocabularyListVariable } from '../../../domain/models/vocabulary-list/types/vocabulary-list-variable';
import { VocabularyListVariableValue } from '../../../domain/models/vocabulary-list/types/vocabulary-list-variable-value';
import { EntityId } from '../../../domain/types/entity-id';
import { NotFound } from '../../../lib/types/not-found';
import { TermViewModel } from './TermViewModel';

type VariableValues = Record<string, VocabularyListVariableValue>;

type VocabularyListEntryViewModel = {
  term: TermViewModel;

  variableValues: VariableValues;
};

// "{'positive': True, 'aspect': '2', 'usitative': False, 'person': '31'}"

const buildSuffixFromVariableValues = (
  variableValues: VariableValues
): string => {
  const test = variableValues as any;

  const positive = test.positive;

  const aspect = test.aspect;

  const usitative = test.usitative;

  const person = test.person;

  if ([positive, aspect, usitative, person].some(isNullOrUndefined)) return '';

  if (![positive, usitative].every((x) => typeof x === 'boolean')) return '';

  return [
    `${positive ? '1' : '0'}`,
    aspect,
    `${usitative ? 'u' : ''}`,
    person,
  ].join('');
};

const appendPrefixAndSuffixToAudioFilename = (
  originalName: string,
  variableValues: VariableValues
): string => {
  return `BA_${originalName}_${buildSuffixFromVariableValues(variableValues)}`;
};

const fixTermAudioFilename = (
  term: Term,
  variableValues: VariableValues
): PartialDTO<Term> =>
  term.contributorId !== '1'
    ? { ...term }
    : {
        ...term,
        audioFilename: appendPrefixAndSuffixToAudioFilename(
          term.audioFilename,
          variableValues
        ),
      };

export class VocabularyListViewModel {
  readonly name?: string;

  readonly nameEnglish?: string;

  readonly id: EntityId;

  readonly entries: VocabularyListEntryViewModel[];

  readonly variables: VocabularyListVariable[];

  readonly isPublished: boolean;

  constructor(vocabularyList: VocabularyList, allTerms: Term[]) {
    const { entries, id, name, nameEnglish, variables, published } =
      vocabularyList;

    this.id = id;

    this.name = name;

    this.nameEnglish = nameEnglish;

    this.isPublished = published;

    this.variables = variables;

    const newEntries = (entries || [])
      .map(({ termId, variableValues }) => {
        const termSearchResult = allTerms.find((term) => term.id === termId);

        return {
          term: termSearchResult
            ? new TermViewModel(
                fixTermAudioFilename(termSearchResult, variableValues) as Term
              )
            : NotFound,
          // TODO fix this
          variableValues,
        };
      })
      .filter(({ term }) => term !== NotFound);

    this.entries = newEntries as VocabularyListEntryViewModel[];
  }
}
