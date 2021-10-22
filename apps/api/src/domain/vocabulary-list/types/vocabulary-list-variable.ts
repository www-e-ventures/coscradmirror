import { ValueAndDisplay } from '../../types/value-and-display';
import { DropboxOrCheckbox } from './dropbox-or-checkbox';
import { VocabularyListVariableValue } from './vocabulary-list-variable-value';

/**
 * TODO correlate `type` and `validValues`
 * type:dropbox <-> string values
 * type:checkbox <-> boolean values
 */
export type VocabularyListVariable<
  TVariableType extends VocabularyListVariableValue = VocabularyListVariableValue
> = {
  name: string;

  type: DropboxOrCheckbox;

  validValues: ValueAndDisplay<VocabularyListVariableValue>[];
};
