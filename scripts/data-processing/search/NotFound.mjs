export const NotFound = Symbol('The resource was not found');

export const wasNotFound = (result) => result === NotFound;
