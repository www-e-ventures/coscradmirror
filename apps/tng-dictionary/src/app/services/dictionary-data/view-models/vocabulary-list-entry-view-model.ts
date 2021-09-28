import TermViewModel from './term-view-model';
import { isNullOrUndefined } from './utilities/is-null-or-undefined';
import { VariableValuesViewModel } from './variable-values-view-model';

type HasTerm = {
  term: TermViewModel;
};

const hasTerm = (input: unknown): input is HasTerm => {
  if (isNullOrUndefined(input)) return false;

  const test = input as HasTerm;

  return !isNullOrUndefined(test.term);
};

type HasVariableValues = {
  variable_values: VariableValuesViewModel;
};

const hasVariableValues = (input: unknown): input is HasVariableValues => {
  if (isNullOrUndefined(input)) return false;

  const test = input as HasVariableValues;

  return !isNullOrUndefined(test.variable_values);
};

export default class VocabularyListEntryViewModel {
  term: TermViewModel;

  variableValues: VariableValuesViewModel;

  constructor(rawData: unknown) {
    if (!hasTerm(rawData)) {
      const msg = [
        `No term property found when trying to build`,
        `a vocabulary list entry view model from :`,
        JSON.stringify(rawData),
      ].join(' ');

      throw new Error(msg);
    }

    try {
      this.term = new TermViewModel(rawData.term);
    } catch (error) {
      const msg = (error as Error).message;

      throw new Error(msg);
    }

    if (!hasVariableValues(rawData)) {
      const msg = [
        `No variable values property found when trying to build`,
        `a vocabulary list entry view model from :`,
        JSON.stringify(rawData),
      ].join(' ');

      throw new Error(msg);
    }

    try {
      this.variableValues = new VariableValuesViewModel(rawData);
    } catch (error) {
      const msg = (error as Error).message;

      throw new Error(msg);
    }
  }
}
