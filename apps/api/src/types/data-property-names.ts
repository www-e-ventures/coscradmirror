/**
 * Builds a union type of all property names from an object, omitting the names
 * of all methods.
 * [reference link](https://bigfont.ca/data-transfer-object-wrapper/)
 */
export type DataPropertyNames<T> = {
    /* eslint-disable */ // This is a rare case where Function is ok as a type
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
