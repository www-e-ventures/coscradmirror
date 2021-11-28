import { determineAllMissingRequiredProperties } from './determine-all-missing-required-properties';

type TestDTO = {
  foo?: string;
  bar?: number;
  baz?: {
    x?: string[];
    y?: number[];
  };
};

/**
 * TODO [test-coverage]: Break out several test cases and extensively test
 * this utility.
 */
describe('determineAllMissingRequiredProperties', () => {
  describe('when given valid data with all required properties', () => {
    describe('when requiring every property in the dto', () => {
      const validAllPropsRequiredDTO: Required<TestDTO> = {
        foo: 'blah',
        bar: 7,
        baz: {
          x: ['hello', 'world'],
          y: [1, 2, 3],
        },
      };

      const requiredProps: (keyof TestDTO)[] = ['foo', 'bar', 'baz'];

      const missingRequiredProps = determineAllMissingRequiredProperties(
        validAllPropsRequiredDTO,
        requiredProps
      );

      const expectedMissingProperties = [];

      it('should return the expected result', () => {
        expect(missingRequiredProps).toEqual<string[]>(
          expectedMissingProperties
        );
      });
    });
  });
});
