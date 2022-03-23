export type ValueType<T extends Record<string, unknown>> = T[keyof T];
