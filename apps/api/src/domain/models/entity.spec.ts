import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { Entity } from './entity';

type DTOAndDescription<TEntity> = {
  dto: PartialDTO<TEntity>;
  description: string;
};

type EntityConstructorTestCases<TEntity> = {
  validCases: DTOAndDescription<TEntity>[];
  // These `DTOs` may have invalid properties, so we type this weakly
  invalidCases: DTOAndDescription<object>[];
};

const entityTestCases: EntityConstructorTestCases<Entity> = {
  validCases: [
    {
      dto: {
        id: 'valid-id',
        published: true,
      },
      description: 'Entity with a valid id that is published',
    },
    {
      dto: {
        id: 'valid-id',
        published: false,
      },
      description: 'Entity with a valid id that is explicitly not published',
    },
    {
      dto: {
        id: 'valid-id',
      },
      description:
        'Entity with a valid id whose publication status is not specified',
    },
  ],
  invalidCases: [
    // Note that this is not part of the spec. We ignore irrelevant properties
    // on DTOs
    // {
    //   dto: {
    //     id: 'valid-id',
    //     published: true,
    //     invalidProp: 5,
    //   },
    //   description: 'A dto with an additional invalid property',
    // },
    {
      dto: {
        id: 789,
        published: false,
      },
      description: 'A dto with an invalid format for its id',
    },
  ],
};

/**
 * TODO Break out this test suite. We may need to do some devops to make sure
 * that we can ignore test directories \ files when doing a build.
 */
describe('Entity constructor', () => {
  const { validCases, invalidCases } = entityTestCases;
  describe('When given a valid dto', () => {
    validCases.forEach(({ description, dto }) => {
      describe(description, () => {
        it('should return an instance of the class', () => {
          const instance = new Entity(dto);

          expect(instance).toBeInstanceOf(Entity);
        });
      });
    });
  });

  describe('When given an invalid dto', () => {
    const emptyDTOTestCase = {
      dto: {},
      description: 'empty object dto',
    };

    invalidCases.concat(emptyDTOTestCase).forEach(({ dto, description }) => {
      /**
       * Instead of throwing in the constructor, we should have a wrapper layer
       * (maybe `instanceFactory` in the repository layer?) that
       * - runs validation
       * - returns Invalid | ModelInstance<TModel>
       * - let the caller of the repository method handle failure explicitly
       */
      describe.skip(description, () => {
        it('should throw', () => {
          const attemptToBuildInvalidModel = () => new Entity(dto);

          expect(attemptToBuildInvalidModel).toThrow();
        });
      });
    });
  });
});
