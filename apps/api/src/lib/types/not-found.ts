export const NotFound: unique symbol = Symbol('notFound');

export type NotFound = typeof NotFound;

export const isNotFound = (input: unknown): input is NotFound =>
  input === NotFound;
