import { Term } from '../domain/models/term/entities/term.entity';
import { VocabularyList } from '../domain/vocabulary-list/entities/vocabulary-list.entity';
import { PartialDTO } from '../types/partial-dto';
import { CollectionNameAndModels } from './test-data-index';

export const buildDictionaryTestData = (): CollectionNameAndModels<
  // TODO type individual elements
  PartialDTO<Term> | PartialDTO<VocabularyList>
>[] => [
  {
    collection: 'terms',
    models: [
      {
        term: 'Chil-term-1',
        termEnglish: 'Engl-term-1',
        contributorId: 'John Doe',
        id: '1',
      },
      {
        term: 'Chil-term-2',
        termEnglish: 'Engl-term-2',
        contributorId: 'John Doe',
        id: '2',
      },
      {
        term: 'Chil-term-no-english',
        contributorId: 'Jane Deer',
        id: '3',
      },
    ],
  },
  {
    collection: 'vocabulary_lists',
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
        entries: [
          {
            termId: '2',
            variableValues: {
              person: '23',
            },
          },
        ],
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
