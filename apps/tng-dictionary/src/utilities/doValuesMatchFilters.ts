// The filters are the `source of truth`. Superfluous props in values ignored.
export default (
  values: Record<string, string | boolean>,
  filters: Record<string, string | boolean>
): boolean =>
  !(filters === null) &&
  !(filters === undefined) &&
  Object.entries(filters).every(
    ([propertyName, value]) => values[propertyName] === value
  );
