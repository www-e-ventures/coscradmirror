import VocabularyListEntryViewModel from './vocabulary-list-entry-view-model';
import { VocabularyListVariableViewModel } from './vocabulary-list-variable-view-model';
import { VocabularyListViewModel } from './vocabulary-list-view-model';

const dummyName = 'test-list-name';
const dummyNameEnglish = 'test-list-name-english';

const dummyVariables = [
  {
    name: 'possessor',
    type: 'dropbox',
    validValues: [
      { value: '11', display: 'my' },
      { value: '21', display: 'your' },
      { value: '31', display: 'his, her, or its' },
      { value: '41', display: "the other's" },
      { value: '12', display: 'our' },
      { value: '22', display: 'your (plural)' },
      { value: '32', display: 'their' },
      { value: '0', display: 'a' },
    ],
  },
  {
    name: 'natural possessor',
    type: 'checkbox',
    validValues: [
      {
        value: true,
        display: "natural possessor (e.g. human's own body part)",
      },
      {
        value: false,
        display:
          "not natural possessor (e.g. human owns an animal's body part)",
      },
    ],
  },
];

const rawVocabularyList = {
  id: 2,
  name: dummyName,
  name_english: dummyNameEnglish,
  variables: dummyVariables,
  credits: null,
  comments: null,
  published_at: '2021-03-04T18:22:06.271Z',
  created_at: '2021-03-04T18:07:58.164Z',
  updated_at: '2021-03-04T18:22:06.288Z',
};

const expectedViewModel: VocabularyListViewModel = {
  name: dummyName,
  nameEnglish: dummyNameEnglish,
  entries: [],
  variables: dummyVariables.map(
    (variable) => new VocabularyListVariableViewModel(variable)
  ),
};

type ValidVocabularyListViewModelTestCase = {
  description: string;
  rawData: unknown;
  vocabularyListEntries: VocabularyListEntryViewModel[];
  expectedViewModel: VocabularyListViewModel;
};

type InvalidVocabularyListViewModelTestCase = Omit<
  ValidVocabularyListViewModelTestCase,
  'expectedViewModel'
>;

type VocabularyListViewModelTestData = {
  validCases: ValidVocabularyListViewModelTestCase[];
  invalidCases?: InvalidVocabularyListViewModelTestCase[];
};

const testData: VocabularyListViewModelTestData = {
  validCases: [
    {
      description: 'receives valid input data with no entries',
      rawData: rawVocabularyList,
      vocabularyListEntries: [],
      expectedViewModel,
    },
  ],
  invalidCases: [
    {
      description:
        'receives invalid input data (name and name_english both missing)',
      rawData: {
        ...rawVocabularyList,
        name: undefined,
        name_english: undefined,
      },
      vocabularyListEntries: [],
    },
  ],
};

describe('Vocabulary List View Model', () => {
  describe('when the data is valid', () => {
    testData.validCases.forEach(
      ({ description, rawData, vocabularyListEntries, expectedViewModel }) => {
        describe(description, () => {
          const actualViewModel = new VocabularyListViewModel(
            vocabularyListEntries,
            rawData
          );

          it('should return the expected view model', () => {
            expect(actualViewModel).toEqual(expectedViewModel);
          });
        });
      }
    );
  });

  describe('when the data is invalid', () => {
    testData.invalidCases?.forEach(
      ({ description, rawData, vocabularyListEntries }) => {
        const buildViewModel = () =>
          new VocabularyListViewModel(vocabularyListEntries, rawData);

        describe(description, () => {
          it('should throw', () => {
            expect(buildViewModel).toThrow();
          });
        });
      }
    );
  });
});
