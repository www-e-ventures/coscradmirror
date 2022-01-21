import { createContext, Dispatch, SetStateAction } from 'react';

export type VocabularyListFormState = {
  currentSelections: Record<string, string | boolean>;
  isReady: boolean;
};

const VocabularyListContext = createContext<
  [
    formState: VocabularyListFormState,
    dispatch: Dispatch<SetStateAction<VocabularyListFormState>>
  ]
>([
  {
    currentSelections: {},
    isReady: false,
  },
  () => {},
]);

export default VocabularyListContext;
