import { isNullOrUndefined } from 'apps/api/src/domain/utilities/validation/is-null-or-undefined';
import isStringWithNonzeroLength from 'apps/api/src/lib/utilities/isStringWithNonzeroLength';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { Term } from '../../../domain/models/term/entities/term.entity';
import { VocabularyList } from '../../../domain/models/vocabulary-list/entities/vocabulary-list.entity';
import { VocabularyListVariable } from '../../../domain/models/vocabulary-list/types/vocabulary-list-variable';
import { VocabularyListVariableValue } from '../../../domain/models/vocabulary-list/types/vocabulary-list-variable-value';
import { EntityId } from '../../../domain/types/entity-id';
import { NotFound } from '../../../lib/types/not-found';
import { TermViewModel } from './TermViewModel';

type VocabularyListEntryViewModel = {
  term: TermViewModel;

  // TODO JSON.parse
  variableValues: string; // Record<string, VocabularyListVariableValue>;
};

const safeParse = (serialized: string): Object => {
  try {
    return JSON.parse(serialized);
  } catch (error) {
    return {};
  }
};

// TODO add this in the database!
const getNounParadigmVariables = () => [
  {
    name: 'possessor',
    type: 'dropbox',
    validValues: [
      {
        value: '1',
        display: 'my',
      },
      {
        value: '2',
        display: 'your',
      },
      {
        value: '3',
        display: 'his, her, or its',
      },
      {
        value: '4',
        display: "the other's",
      },
      {
        value: '5',
        display: "our  you guys'",
      },
      {
        value: '7',
        display: 'their',
      },
      {
        value: '0',
        display: "someone's",
      },
    ],
  },
];

/**
 * TODO- We need to do this for once and for all across all data imported from
 * the Jupyter notebook. There is invalid JSON that resulted from not serializing
 * a dict to JSON properly.
 */
const cleanSerializedJSON = (input: string): string =>
  isStringWithNonzeroLength(input) && input !== 'undefined'
    ? input
        .replace(/'/g, '"')
        .replace(/False/g, 'false')
        .replace(/True/g, 'true')
    : undefined;

// "{'positive': True, 'aspect': '2', 'usitative': False, 'person': '31'}"

const buildSuffixFromVariableValues = (
  variableValues: VocabularyListVariableValue
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
  variableValues: VocabularyListVariableValue
): string => {
  return `BA_${originalName}_${buildSuffixFromVariableValues(variableValues)}`;
};

const fixTermAudioFilename = (
  term: Term,
  variableValues: VocabularyListVariableValue
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

    // @ts-expect-error
    this.variables =
      Array.isArray(variables) || variables === '[]'
        ? getNounParadigmVariables()
        : [...variables];

    const newEntries = (entries || [])
      .map(({ termId, variableValues }) => {
        const termSearchResult = allTerms.find((term) => term.id === termId);

        return {
          term: termSearchResult
            ? new TermViewModel(
                fixTermAudioFilename(
                  termSearchResult,
                  safeParse(
                    // Horrible hack- fix the data instead!
                    cleanSerializedJSON(variableValues as unknown as string)
                  ) as VocabularyListVariableValue
                ) as Term
              )
            : NotFound,
          // TODO fix this
          variableValues: safeParse(
            cleanSerializedJSON(variableValues as unknown as string)
          ) as VocabularyListVariableValue,
        };
      })
      .filter(({ term }) => term !== NotFound);

    this.entries = newEntries as VocabularyListEntryViewModel[];
  }
}
