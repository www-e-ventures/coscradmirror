export type TableData<TRow extends Record<string, string>> = {
  rows: TRow[];
  headings: (keyof TRow)[];
};
