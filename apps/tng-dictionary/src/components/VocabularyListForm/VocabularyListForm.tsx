import { useContext, useState } from 'react';
import { __values } from 'tslib';
import VocabularyListContext, { VocabularyListFormState } from '../../context/VocabularyListContext';
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

const convertStringToBooleanIfApplicable = (input: string): string | boolean => {
  if(typeof input !== 'string') return input;

  if(input.toLowerCase() === 'false') return false;

  if(input.toLowerCase() === 'true') return true;

  return input;
}

export const isFormReady = (formPropertyNames: string[],filters: Record<string, string | boolean>)
: boolean => formPropertyNames.every(name => Object.keys(filters).includes(name));

export function VocabularyListForm({formItems}: VocabularyListFormProps) {
  const getUpdatedFormState = ({currentSelections: formState}: VocabularyListFormState,key: string, value: string): VocabularyListFormState =>{
    console.log(`Time to update the form`)

    console.log(`previous state: ${formState}, next key: ${key}, next value: ${value}`);

   // TODO Deal with invalid input

   // TODO Clean up the data and remove this hack
   const fixedKey = key === 'aspect \\ mode' ? 'aspect' : key;

    const updatedState = {
      ...formState,
      [fixedKey]: convertStringToBooleanIfApplicable(value) 
    }

    // TODO clean data and remove hack
    const formItemNames = formItems.map(({name})=>name === 'aspect \\ mode' ? 'aspect' : name);

    console.log({
      formItemNames
    })

    return {currentSelections: updatedState,
    isReady: isFormReady(formItemNames,updatedState)
    };
  }

  const [formState,setFormState] = useContext(VocabularyListContext);

  const buildSingleSelectElement = ({name,validValues: labelsAndValues}: VocabularyListFormElement) =>(
    <label htmlFor={name}>
    {name}
    <select
    id={name}
    key={name}
    onChange={e =>updateFormState(formState,name,e.target.value)}
    onBlur={e =>updateFormState(formState,name,e.target.value)} 
    >
      <option />
        {labelsAndValues.map(({value,display: label})=>(
          <option value={value}>
            {label}
          </option>
        ))}
    </select>
    </label>
  )
  
  // TODO type the return value
  const buildSelectElementsForForm = (form: VocabularyListFormElement[]) => (
    <div>
      {form.filter(({type})=> type === 'dropbox').map(buildSingleSelectElement)}
    </div>
  )
  
  // TODO type return value
  const buildCheckboxesForForm = (form: VocabularyListFormElement[]) => (
    <div>
      {form.filter(({type})=> type === 'checkbox').map(({type, name, validValues}) => ({
        type,
        name,
        validValues: validValues.map(({display, value}) =>({
          display,
          value: convertStringToBooleanIfApplicable(value) //: value === true ? 'True' : 'False'
        }))
      })
      )
      // Eventually we will replace this with a checkbox builder. For now render as a dropdown
      .map(buildSingleSelectElement)
      }
    </div>
  )
  

  const updateFormState = (existingState: VocabularyListFormState,key: string, value: string): void =>{
    const newState = getUpdatedFormState(existingState,key,value);

    console.log({
      newState
    })

    setFormState(newState);
  }

  return (
    <div className="form">
      <form
      onSubmit={e=>{
        e.preventDefault();
        // updateFormState();
      }}
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
