import TermViewModel from './term-view-model';
import VocabularyListEntryViewModel from './vocabulary-list-entry-view-model';

const dummyTermText = 'term-in-language';

const dummyTermTextEnglish = 'term-in-english';

const dummyVariableValues = { possessor: '21', naturalPossessor: true };

const dummyRawData = {
  term: {
    id: 2,
    term: dummyTermText,
    term_english: dummyTermTextEnglish,
    contributor: 2,
    source: { possessor: '21' },
    published_at: '2021-02-19T15:24:30.466Z',
    created_at: '2021-02-19T15:21:14.226Z',
    updated_at: '2021-02-25T03:59:17.670Z',
    old_id: null,
    comments: null,
    audio: [
      {
        id: 644,
        name: '5672291.wav',
        alternativeText: '',
        caption: '',
        width: null,
        height: null,
        formats: null,
        hash: '5672291_10d5a5696f',
        ext: '.wav',
        mime: 'audio/wav',
        size: 295.15,
        url: '/uploads/5672291_10d5a5696f.wav',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2021-02-23T19:25:11.590Z',
        updated_at: '2021-02-23T19:25:11.600Z',
      },
    ],
    video: [],
  },
  vocabulary_list: {
    id: 1,
    name: 'vocab-list-chilcotin-name',
    name_english: 'vocab-list-english-name',
    variables: [
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
    ],
    credits: null,
    comments: null,
    published_at: '2021-02-21T17:57:15.572Z',
    created_at: '2021-02-19T15:17:19.434Z',
    updated_at: '2021-02-22T16:29:30.284Z',
  },
  variable_values: dummyVariableValues,
  published_at: '2021-02-19T15:31:25.182Z',
  created_at: '2021-02-19T15:19:25.156Z',
  updated_at: '2021-02-21T18:05:31.789Z',
  alternative_forms: [],
};

const expectedTerm: Omit<TermViewModel, 'mapRawDataToDTO'> = {
  term: 'term-in-language',
  termEnglish: 'term-in-english',
  id: '2',
  contributor: 'William Myers',
  audioURL: '/uploads/5672291_10d5a5696f.wav',
  audioFormat: 'audio/wav',
};

const expectedViewModel = {
  term: expectedTerm,
  variableValues: dummyVariableValues,
};

type ValidVocabularyListEntryViewModelTestCase = {
  description: string;
  rawData: unknown;
  expectedViewModel: VocabularyListEntryViewModel;
};

type InvalidVocabularyListEntryViewModelTestCase = Omit<
  ValidVocabularyListEntryViewModelTestCase,
  'expectedViewModel'
>;

type VocabularyListViewModelTestData = {
  validCases: ValidVocabularyListEntryViewModelTestCase[];
  invalidCases?: InvalidVocabularyListEntryViewModelTestCase[];
};

const testData: VocabularyListViewModelTestData = {
  validCases: [
    {
      description: 'receives valid input data with no entries',
      rawData: dummyRawData,
      // TODO Deal with removing methods from the instance in the type
      expectedViewModel:
        expectedViewModel as unknown as VocabularyListEntryViewModel,
    },
  ],
  invalidCases: [],
};

describe('Vocabulary List View Model', () => {
  describe('when the data is valid', () => {
    testData.validCases.forEach(
      ({ description, rawData, expectedViewModel }) => {
        describe(description, () => {
          const actualViewModel = new VocabularyListEntryViewModel(rawData);

          const actualViewModelWithoutMethod = {
            ...actualViewModel,
            mapRawDataToDTO: undefined,
          };

          it('should return the expected view model', () => {
            expect(actualViewModelWithoutMethod).toEqual(expectedViewModel);
          });
        });
      }
    );
  });

  describe('when the data is invalid', () => {
    testData.invalidCases?.forEach(({ description, rawData }) => {
      const buildViewModel = () => new VocabularyListEntryViewModel(rawData);

      describe(description, () => {
        it('should throw', () => {
          expect(buildViewModel).toThrow();
        });
      });
    });
  });
});
