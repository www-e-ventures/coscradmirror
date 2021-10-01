import { isNullOrUndefined } from './utilities/is-null-or-undefined';
import VocabularyListEntryViewModel from './vocabulary-list-entry-view-model';
import { VocabularyListSummaryViewModel } from './vocabulary-list-summary-view-model';
import { VocabularyListVariableViewModel } from './vocabulary-list-variable-view-model';

type HasVariables = {
  variables: VocabularyListVariableViewModel[];
};

const hasVariables = (input: unknown): input is HasVariables => {
  if (isNullOrUndefined(input)) return false;

  const test = input as HasVariables;

  if (!Array.isArray(test.variables)) return false;

  return true;
};

export class VocabularyListViewModel {
  name: string;

  nameEnglish: string;

  entries: VocabularyListEntryViewModel[];

  variables: VocabularyListVariableViewModel[];

  constructor(entries: VocabularyListEntryViewModel[], rawData: unknown) {
    // parse variables from raw data
    if (isNullOrUndefined(rawData))
      throw new Error('No raw data received when building a vocabulary list.');

    if (!hasVariables(rawData))
      throw new Error(
        `Invalid data when building vocabulary list: ${JSON.stringify(rawData)}`
      );

    try {
      this.variables = rawData.variables.map(
        (rawVariableData) =>
          new VocabularyListVariableViewModel(rawVariableData)
      );
    } catch (error) {
      const msg = (error as Error).message;

      throw new Error(msg);
    }

    this.entries = entries;

    try {
      const { name, nameEnglish } = new VocabularyListSummaryViewModel(rawData);

      if (name) this.name = name;
      if (nameEnglish) this.nameEnglish = nameEnglish;
    } catch (error) {
      const msg = (error as Error).message;

      throw new Error(msg);
    }
  }
}
