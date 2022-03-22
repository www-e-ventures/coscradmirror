import { createContext, Dispatch, SetStateAction } from 'react';

export const NoSelection = '<No Selection>';

export type MaybeSelected<T> = T | typeof NoSelection;

export const isSelected = <T>(input: MaybeSelected<T>): input is T =>
  input !== NoSelection;

export type FormItemValue = string | boolean;

export const buildUnselectedFormData = (
  formPropNames?: string[]
): Record<string, MaybeSelected<FormItemValue>> =>
  !formPropNames
    ? {}
    : formPropNames.reduce(
        (
          accumulatedFormData: Record<string, MaybeSelected<FormItemValue>>,
          key
        ) => ({
          ...accumulatedFormData,
          [key]: NoSelection,
        }),
        {}
      );

export type VocabularyListFormState = {
  currentSelections: Record<string, MaybeSelected<FormItemValue>>;
  // isReady: boolean;
};

const VocabularyListContext = createContext<
  [
    formState: VocabularyListFormState,
    dispatch: Dispatch<SetStateAction<VocabularyListFormState>>
  ]
>([
  {
    currentSelections: {},
  },
  () => {},
]);

export default VocabularyListContext;
