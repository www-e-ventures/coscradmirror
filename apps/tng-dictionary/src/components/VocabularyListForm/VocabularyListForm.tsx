import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { __values } from 'tslib';
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


export function VocabularyListForm({ formItems }: VocabularyListFormProps) {
  const getUpdatedFormState = (existingState: Record<string, string>, key: string, value: string) => {
    console.log(`Time to update the form`)

    console.log(`previous state: ${existingState}, next key: ${key}, next value: ${value}`);

    // TODO Deal with invalid input

    const updatedState = {
      ...existingState,
      [key]: value
    }

    console.log({
      updatedState
    });

    return updatedState;
  }

  const [formState, setFormState] = useState<Record<string, string>>({})

  const buildSingleSelectElement = ({ name, validValues: labelsAndValues }: VocabularyListFormElement) => (
    <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={name}>{name}</InputLabel>
      <Select
        value={name}
        label={name}
        onChange={e => updateFormState(formState, name, e.target.value)}
      >
        {
          labelsAndValues.map(({value, display: label})=>(
            <MenuItem value={value}>{label}</MenuItem>
          )).concat(<MenuItem value={''}>{`ANY`}</MenuItem>)
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
  const buildSelectElementsForForm = (form: VocabularyListFormElement[]) => (
    <div>
      {form.filter(({ type }) => type === 'dropbox').map(buildSingleSelectElement)}
    </div>
  )

  // TODO type return value
  const buildCheckboxesForForm = (form: VocabularyListFormElement[]) => (
    <div>
      {form.filter(({ type }) => type === 'checkbox').map(({ type, name, validValues }) => ({
        type,
        name,
        validValues: validValues.map(({ display, value }) => ({
          display,
          value: value === true ? 'True' : 'False'
        }))
      })
      )
        // Eventually we will replace this with a checkbox builder. For now render as a dropdown
        .map(buildSingleSelectElement)
      }
    </div>
  )


  const updateFormState = (existingState: Record<string, string>, key: string, value: string): void => {
    const newState = getUpdatedFormState(existingState, key, value);

    console.log(`Set new state: ${newState}`)

    setFormState(newState);
  }

  return (
    <div className="form">
      HELLO WORLD
      FORM
      <form
>
        {buildSelectElementsForForm(formItems)}
        {buildCheckboxesForForm(formItems)}
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
