// for readability
export type Raw<T> = Partial<T>;

export const invalid: unique symbol = Symbol('invalid');

export type Invalid = typeof invalid;

// TODO is there a better way to avoid double-negatives here?
export const isInvalid = (input: unknown): input is Invalid =>
  input === invalid;

export const isValid = <T>(input: MaybeInvalid<T>): input is T =>
  !isInvalid(input);

export type MaybeInvalid<T> = T | Invalid;

export type Valid<T> = T;
