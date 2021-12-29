import { InternalError } from '../../lib/errors/InternalError';
import { PartialDTO } from '../../types/partial-dto';
import { Entity } from '../models/entity';
import { Term } from '../models/term/entities/term.entity';
import { EntityType, entityTypes } from '../types/entityType';
import InvalidTermDTOError from './errors/term/InvalidTermDTOError';
import TermHasNoTextInAnyLanguageError from './errors/term/TermHasNoTextInAnyLanguageError';
import { DomainModelValidator } from './index';
import termValidator from './termValidator';
import { Valid } from './Valid';

type DomainModelValidatorTestCase<TEntity extends Entity = Entity> = {
  entityType: EntityType; // TODO correlate this with TEntity
  validator: DomainModelValidator;
  validCases: {
    description?: string;
    dto: PartialDTO<TEntity>;
  }[];
  invalidCases: {
    description?: string;
    invalidDTO: PartialDTO<TEntity>;
    expectedError: InternalError;
  }[];
};

const testCases: DomainModelValidatorTestCase<Term>[] = [
  {
    entityType: entityTypes.term,
    validator: termValidator,
    validCases: [
      {
        dto: {
          term: 'test term in language',
          termEnglish: 'test term in english',
          id: '123',
        },
      },
    ],
    invalidCases: [
      {
        description: 'Both term and termEnglish are empty',
        invalidDTO: {
          id: '123',
        },
        expectedError: new InvalidTermDTOError('123', [
          new TermHasNoTextInAnyLanguageError('123'),
        ]),
      },
    ],
  },
];

describe('Domain Model Vallidators', () => {
  testCases.forEach(({ entityType, validCases, invalidCases, validator }) => {
    describe(`${entityType} validator`, () => {
      describe('When the DTO is valid', () => {
        validCases.forEach(({ description, dto }, index) => {
          describe(description || `valid case ${index + 1}`, () => {
            it('should return Valid', () => {
              const result = validator(dto);

              expect(result).toBe(Valid);
            });
          });
        });
      });
    });

    describe('When the DTO is invalid', () => {
      invalidCases.forEach(
        ({ description, invalidDTO, expectedError }, index) => {
          describe(description || `invalid case ${index + 1}`, () => {
            it('should return the appropriate errors', () => {
              const result = validator(invalidDTO);

              expect(result).toEqual(expectedError);
            });
          });
        }
      );
    });
  });
});
