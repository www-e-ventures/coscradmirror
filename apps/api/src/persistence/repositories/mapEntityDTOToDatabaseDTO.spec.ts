import { Entity } from '../../domain/models/entity';
import mapEntityDTOToDatabaseDTO from './mapEntityDTOToDatabaseDTO';

describe('mapEntityDTOToDatabaseDTO', () => {
  const dtoWithID = {
    id: '123',
    foo: 'nope',
    baz: 4,
    bar: {
      isActive: false,
      numbers: [1, 2, 3, 4, 5],
    },
  };
  describe('When given a dto with an ID property', () => {
    const actualDatabaseDTO = mapEntityDTOToDatabaseDTO(dtoWithID);

    const expectedDatabaseDTO = {
      _key: '123',
      foo: 'nope',
      baz: 4,
      bar: {
        isActive: false,
        numbers: [1, 2, 3, 4, 5],
      },
    };
    it('should map the dto to an appropriate database dto', () => {
      expect(actualDatabaseDTO).toEqual(expectedDatabaseDTO);
    });
  });

  describe('When given a dto with an invalID type for the ID property', () => {
    [null, undefined, 7, {}, '', () => 5].forEach((invalidID) => {
      const dtoWithInvalIDTypeForID = {
        ...dtoWithID,
        id: invalidID,
      };

      const dtoWithoutIDProperty = {
        ...dtoWithID,
        id: undefined,
      };

      const actualDatabaseDTO = mapEntityDTOToDatabaseDTO(
        dtoWithInvalIDTypeForID as unknown as Entity
      );

      it('should omit the id property', () => {
        expect(actualDatabaseDTO).toEqual(dtoWithoutIDProperty);
      });
    });
  });
});
