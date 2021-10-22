import { CreateTermDto } from '../domain/term/term/dto/create-term.dto';
import { CreateVocabularyListDto } from '../domain/vocabulary-list/dto/create-vocabulary-list.dto';
import { CollectionNameAndModels } from './test-data-index';

export const buildDictionaryTestData = (): CollectionNameAndModels<
  CreateTermDto | CreateVocabularyListDto
>[] => [
  {
    collection: 'TermCollection',
    models: [
      {
        term: 'Chil-term-1',
        termEnglish: 'Engl-term-1',
        contributor: 'John Doe',
        id: '1',
      },
      {
        term: 'Chil-term-2',
        termEnglish: 'Engl-term-2',
        contributor: 'John Doe',
        id: '2',
      },
      {
        term: 'Chil-term-no-english',
        contributor: 'Jane Deer',
        id: '3',
      },
    ],
  },
  {
    collection: 'VocabularyListCollection',
    models: [
      // Vocabulary List 1
      {
        name: 'test VL 1 chil',
        nameEnglish: 'test VL 1 engl',
        entries: [
          {
            termId: '1',
            variableValues: {
              person: '11',
            },
          },
          {
            termId: '2',
            variableValues: {
              person: '21',
            },
          },
        ],
        variables: [
          {
            name: 'person',
            type: 'dropbox',
            validValues: [
              {
                display: 'I',
                value: '11',
              },
              {
                display: 'We',
                value: '21',
              },
            ],
          },
        ],
      },

      // Vocabulary List 2
      {
        name: 'test VL 2 CHIL- no engl name',
        entries: [],
        variables: [],
      },

      // Vocabulary List 3
      {
        nameEnglish: 'test VL ENG- 3 no chil name',
        entries: [],
        variables: [],
      },
    ],
  },
];
