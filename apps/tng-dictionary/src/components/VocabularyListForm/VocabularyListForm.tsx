import { useContext, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { __values } from 'tslib';
import VocabularyListContext, { FormItemValue, MaybeSelected, NoSelection, VocabularyListFormState } from '../../context/VocabularyListContext';
import './VocabularyListForm.module.css';

export type LabelAndValue<T = any> = {
  display: string;
  value: T;
}

export type VocabularyListFormElementType = 'dropbox' | 'checkbox';

export type VocabularyListFormElement = {
  type: VocabularyListFormElementType;
  name: string;
  validValues: LabelAndValue[];
}

export interface VocabularyListFormProps {
  formItems: VocabularyListFormElement[];
}

const convertFormDataValuesIfApplicable = (input: MaybeSelected<FormItemValue>): string | boolean => {
  if(input === NoSelection) return 'NoSelection';

  if (typeof input !== 'string') return input;

  if (input.toLowerCase() === 'false') return false;

  if (input.toLowerCase() === 'true') return true;

  return input;
}

export const isFormReady = (formPropertyNames: string[], filters: Record<string, string | boolean>)
  : boolean => formPropertyNames.every(name => Object.keys(filters).includes(name));

export function VocabularyListForm({ formItems }: VocabularyListFormProps) {
  const getUpdatedFormState = ({ currentSelections: formState }: VocabularyListFormState, key: string, value: MaybeSelected<FormItemValue>): VocabularyListFormState => {
    console.log(`Time to update the form`)

    // TODO Deal with invalid input

    // TODO Clean up the data and remove this hack
    const fixedKey = key === 'aspect \\ mode' ? 'aspect' : key;

    const updatedState = {
      ...formState,
      [fixedKey]: convertFormDataValuesIfApplicable(value)
    }

    // TODO clean data and remove hack
    const formItemNames = formItems.map(({ name }) => name === 'aspect \\ mode' ? 'aspect' : name);

    console.log({
      formItemNames
    })

    return {
      currentSelections: updatedState,
      // isReady: isFormReady(formItemNames, updatedState)
    };
  }

  const [formState, setFormState] = useContext(VocabularyListContext);

  const buildSingleSelectElement = ({ name, validValues: labelsAndValues }: VocabularyListFormElement, currentState: MaybeSelected<FormItemValue>) => (
    <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={name}>{name}</InputLabel>
      <Select
        value={currentState}
        label={name}
        onChange={e => updateFormState(formState, name, e.target.value as MaybeSelected<FormItemValue>)}
      >
        {
          labelsAndValues.map(({ value, display: label }) => (
            <MenuItem value={value}>{label}</MenuItem>
          )).concat(<MenuItem value={'NoSelection'}>{`ANY`}</MenuItem>)
        }
      </Select>
    </FormControl>
    // <label htmlFor={name}>
    //   {name}
    //   <select
    //     id={name}
    //     onChange={e => updateFormState(formState, name, e.target.value)}
    //     onBlur={e => updateFormState(formState, name, e.target.value)}
    //   >
    //     <option />
    //     {labelsAndValues.map(({ value, display: label }) => (
    //       <option value={value}>
    //         {label}
    //       </option>
    //     ))}
    //   </select>
    // </label>
  )

  // TODO type the return value
  const buildSelectElementsForForm = (form: VocabularyListFormElement[],currentSelections: Record<string,MaybeSelected<FormItemValue>>) => (
    <div>
      {form.filter(({ type }) => type === 'dropbox').map(formElement => buildSingleSelectElement(formElement,currentSelections[formElement.name]))}
    </div>
  )

  // TODO type return value
  const buildCheckboxesForForm = (form: VocabularyListFormElement[], currentSelections: Record<string,MaybeSelected<FormItemValue>>) => (
    <div>
      {form.filter(({ type }) => type === 'checkbox').map(({ type, name, validValues }) => ({
        type,
        name,
        validValues: validValues.map(({ display, value }) => ({
          display,
          value: convertFormDataValuesIfApplicable(value) //: value === true ? 'True' : 'False'
        }))
      })
      )
        // Eventually we will replace this with a checkbox builder. For now render as a dropdown
        .map(formElement => buildSingleSelectElement(formElement,currentSelections[formElement.name]))
      }
    </div>
  )

  const updateFormState = (existingState: VocabularyListFormState, key: string, value: MaybeSelected<FormItemValue>): void => {
    const newState = getUpdatedFormState(existingState, key, value);

    console.log({
      newState
    })

    setFormState(newState);
  }

  return (
    <div className="form">
      <form
      >
        {buildSelectElementsForForm(formItems,formState.currentSelections)}
        {buildCheckboxesForForm(formItems,formState.currentSelections)}
        {/* <label htmlFor='positive'>
        positive \ negative form?
        <input
        id={`positive`}
        type="checkbox"
        onChange={e =>{console.log(`checkbox: ${e.target.value}`)}}
      />
      </label> */}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default VocabularyListForm;
