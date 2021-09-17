import { ValueAndDisplay } from './value-and-display';
import { Variable } from './variable';

export type PromptAndItemsForListControl<T> = {
  prompt: string;
  items: ValueAndDisplay<T>;
};

// TODO deal with inhomogeneous types for variables
export type RawVocabularyList<T> = {
  id: string;
  name?: string;
  name_english?: string;
  credits: object;
  comments: string;
  variables: Variable<T>[];
};

export type ParsedVariables = {
  dropboxes: PromptAndItemsForListControl<string>[];
  checkboxes: PromptAndItemsForListControl<boolean>[];
};

export type VocabularyList<T> = Omit<RawVocabularyList<any>, 'variables'> & {
  variables: ParsedVariables;
};

export type VocabularyListSummary = {
  id: string;
  name?: string;
  name_english: string;
};
