import { NoSelection } from '../context/VocabularyListContext';

export default (
  filtersWithNoSelectionValues: Record<string, string | boolean>
): Record<string, string | boolean> =>
  Object.entries(filtersWithNoSelectionValues).reduce(
    (accumulatedFilters: Record<string, string | boolean>, [key, value]) => ({
      ...accumulatedFilters,
      ...(value === NoSelection ? {} : { [key]: value }),
    }),
    {}
  );
