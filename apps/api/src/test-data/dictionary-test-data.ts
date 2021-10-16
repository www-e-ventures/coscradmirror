import { CreateTermDto } from '../domain/term/term/dto/create-term.dto';
import { CollectionNameAndModels } from './test-data-index';

export const buildDictionaryTestData =
  (): CollectionNameAndModels<CreateTermDto>[] => [
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
  ];
