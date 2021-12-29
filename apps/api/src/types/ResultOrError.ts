import { InternalError } from '../lib/errors/InternalError';

/**
 * There are many places where we expect a result but could receive an error.
 * We need to be explicit about these. This type must be discriminated
 * with a type guard by the client when receiving a `ResultOrError`.
 */
export type ResultOrError<T> = T | InternalError;
