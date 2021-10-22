export const notFound: unique symbol = Symbol('notFound');

export type NotFound = typeof notFound;

export const isNotFound = (input: unknown): input is NotFound => input === notFound; 