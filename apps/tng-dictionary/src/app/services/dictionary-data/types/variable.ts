import { ValueAndDisplay } from './value-and-display';

export type Variable<T> = {
  name: string;
  type: string;
  validValues: ValueAndDisplay<T>[];
};
