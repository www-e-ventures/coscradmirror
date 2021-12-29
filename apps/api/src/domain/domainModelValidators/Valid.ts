export const Valid = Symbol(
  'The value has succesfully passed internal validation'
);

// stack the corresponding type
export type Valid = typeof Valid;

export type MaybeValid<T> = Valid | T;

export const isValid = (input: unknown): input is Valid => input === Valid;
