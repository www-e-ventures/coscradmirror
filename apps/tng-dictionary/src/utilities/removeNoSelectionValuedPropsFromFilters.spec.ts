import { NoSelection } from '../context/VocabularyListContext';
import removeNoSelectionValuedPropsFromFilters from './removeNoSelectionValuedPropsFromFilters';
describe('removeNoSelectionValuedPropsFromFilters', () => {
  describe('when there are no props with NoSelection as the value', () => {
    it('should return the original object', () => {
      const originalObject = {
        foo: 'ok',
        baz: true,
      };

      const result = removeNoSelectionValuedPropsFromFilters(originalObject);

      expect(result).toEqual(originalObject);
    });
  });

  describe('when there are some props with NoSelection as the value', () => {
    it('should remove these props', () => {
      const objectCorrespondingToSelections = {
        foo: 'helloWorld',
        bar: false,
      };

      const objectCorrespondingToNoSelections = {
        baz: NoSelection,
        coolProp: NoSelection,
      };

      const originalObject = {
        ...objectCorrespondingToSelections,
        ...objectCorrespondingToNoSelections,
      };

      const result = removeNoSelectionValuedPropsFromFilters(originalObject);

      expect(result).toEqual(objectCorrespondingToSelections);
    });
  });
});
