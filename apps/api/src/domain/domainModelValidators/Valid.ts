export const Valid = Symbol(
  'The value has successfully passed internal validation'
);

// stack the corresponding type
export type Valid = typeof Valid;

export type MaybeValid<T> = Valid | T;

export const isValid = (input: unknown): input is Valid => input === Valid;
