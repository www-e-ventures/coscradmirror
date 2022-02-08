import { Component, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isNullOrUndefined } from 'util';
import VocabularyListContext, { buildUnselectedFormData, FormItemValue, MaybeSelected } from '../../context/VocabularyListContext';
import doValuesMatchFilters from '../../utilities/doValuesMatchFilters';
import Loading from '../Loading/Loading';
import TermsDetailComponent, { Term } from '../TermsDetail/TermsDetail';
import VocabularyListForm, { VocabularyListFormElement } from '../VocabularyListForm/VocabularyListForm';
import './VocabularyListDetail.module.css';
import { Paper } from '@mui/material';
import Carousel from '../Carousel/Carousel';
import { Typography } from '@mui/material';
import removeNoSelectionValuedPropsFromFilters from '../../utilities/removeNoSelectionValuedPropsFromFilters';



type HasIdAndName = {
  id: string;
  name: string;
}

const getData = async (endpoint: string) => fetch(endpoint).then(response => response.json())

type VocabularyListEntry = {
  term: Term;
  variableValues: Record<string, string | boolean>;
}

type VocabularyList = HasIdAndName & {
  nameEnglish?: string;
  variables: VocabularyListFormElement[];
  entries: VocabularyListEntry[];
}


const filterEntriesForSelectedTerms = (allEntries: VocabularyListEntry[], filters: Record<string, string | boolean>): Term[] =>
  allEntries.filter(({ variableValues }) => doValuesMatchFilters(variableValues, filters)).map(({ term }) => term)

type ComponentState = {
  loading: boolean;
  vocabularyList: null | VocabularyList;
}

/* eslint-disable-next-line */
export interface VocabularyListDetailProps { }

export function VocabularyListDetail(props: VocabularyListDetailProps) {

  const [form, setFormState] = useContext(VocabularyListContext);

  const [appState, setAppState] = useState<ComponentState>({
    loading: false,
    vocabularyList: null,
  });

  const { id } = useParams();

  useEffect(() => {
    setAppState({ loading: true, vocabularyList: null });

    const apiUrl = `http://104.225.142.106:3131/api/entities?type=vocabularyList&id=${id}`;
    fetch(apiUrl, { mode: 'cors' })
      .then((res) => res.json())
      .then((vocabularyList) => {
        setAppState({ loading: false, vocabularyList: vocabularyList });

        // Reset the form on the first loading of the detail page
        setFormState({
          currentSelections: buildUnselectedFormData(appState.vocabularyList?.variables.map(({ name }) => name))
        })
      }).catch(rej => console.log(rej))
  }, [setAppState]);

  if (!appState.vocabularyList) return <div>
    <Loading />
  </div>

  // if (!form.isReady) return (
  //   <div>
  //     <h1>Vocabulary List: {id}</h1>
  //     <p>
  //       {`${(appState.vocabularyList as unknown as HasIdAndName).id}: ${(appState.vocabularyList as unknown as HasIdAndName).name}`}
  //     </p>
  //     <h1>Selected Term</h1>
  //     Please complete the form to select a term.
  //     <VocabularyListForm formItems={(appState.vocabularyList as unknown as any).variables} />
  //   </div>
  // )

  const allEntries = (appState.vocabularyList as unknown as any).entries;

  const selectedTerms = filterEntriesForSelectedTerms(allEntries, removeNoSelectionValuedPropsFromFilters(form.currentSelections));

  if (!selectedTerms.length) return (
    <div>
      <p>Vocabulary List: {id}</p>
      <p>
        {`${(appState.vocabularyList as unknown as HasIdAndName).id}: ${(appState.vocabularyList as unknown as HasIdAndName).name}`}
      </p>
      <h1>Selected Term</h1>
      {/* TODO remove all casts */}
      <VocabularyListForm formItems={(appState.vocabularyList as unknown as any).variables} />
      Term not found. Please search again.
    </div>
  )
  // Extract terms from entries into separate term array
  // const allTerms = appState.vocabularyList.entries.map(({ term }: { term: Term }) => term);

  return (
    <div style={center}>

      <p>Vocabulary List: {id}</p>
      <p>
        {`${(appState.vocabularyList as unknown as HasIdAndName).id}: ${(appState.vocabularyList as unknown as HasIdAndName).name}`}
      </p>
      {/* TODO remove all casts */}
      {/* TODO Complete form filtering feature */}
      {/* <VocabularyListForm formItems={(appState.vocabularyList as unknown as any).variables} />*/}
      <div><Carousel data={selectedTerms} /></div>
    </div >
  );
}

export default VocabularyListDetail;

const center = {
  position: 'absolute',
  height: '90vh',
  width: '100vw',
  background: 'inherit',
  textAlign: 'center'
} as const
