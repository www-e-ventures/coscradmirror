// TODO tighten the constraint to require string keys
export type TableClickEventData<TRow extends Record<string, string>> = {
  row: number;
  column: keyof TRow;
};
