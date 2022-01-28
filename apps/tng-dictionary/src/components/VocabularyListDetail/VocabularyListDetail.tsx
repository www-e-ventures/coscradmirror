import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isNullOrUndefined } from 'util';
import VocabularyListContext from '../../context/VocabularyListContext';
import doValuesMatchFilters from '../../utilities/doValuesMatchFilters';
import Loading from '../Loading/Loading';
import TermsDetailComponent, { Term } from '../TermsDetail/TermsDetail';
import VocabularyListForm, { VocabularyListFormElement } from '../VocabularyListForm/VocabularyListForm';
import './VocabularyListDetail.module.css';
import { Paper } from '@mui/material';
import Carousel from '../Carousel/Carousel';
import { Typography } from '@mui/material';



type HasIdAndName = {
  id: string;
  name: string;
}

const getData = async (endpoint: string) => fetch(endpoint).then(response => response.json())

type VocabularyListEntry = {
  term: Term;
  variableValues: Record<string, string | boolean>;
}



const filterEntriesForSelectedTerms = (allEntries: VocabularyListEntry[], filters: Record<string, string | boolean>): Term[] =>
  allEntries.filter(({ variableValues }) => doValuesMatchFilters(variableValues, filters)).map(({ term }) => term)


/* eslint-disable-next-line */
export interface VocabularyListDetailProps { }

export function VocabularyListDetail(props: VocabularyListDetailProps) {

  const [form, setFormState] = useContext(VocabularyListContext);

  const [appState, setAppState] = useState({
    loading: false,
    vocabularyList: null,
  });

  const { id } = useParams();

  useEffect(() => {
    setAppState({ loading: true, vocabularyList: null });

    // Reset the form on the first loading of the detail page
    setFormState({
      currentSelections: {},
      isReady: false
    })
    const apiUrl = `http://localhost:3131/api/entities?type=vocabularyList&id=${id}`;
    fetch(apiUrl, { mode: 'cors' })
      .then((res) => res.json())
      .then((vocabularyList) => {
        console.log({
          result: vocabularyList
        })
        setAppState({ loading: false, vocabularyList: vocabularyList });
      }).catch(rej => console.log(rej))
  }, [setAppState]);

  if (!appState.vocabularyList) return <div>
    <Loading nameToDisplay={'Vocabulary Lists'} />
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

  const selectedTerms = (allEntries as any).map(({term}: Term)=>term) // filterEntriesForSelectedTerms(allEntries, form.currentSelections);

  if (!selectedTerms.length) return (
    <div>
      <h1>Vocabulary List: {id}</h1>
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
//  const allTerms = (appState.vocabularyList as unknown as any).entries.map(({ term }: { term: Term }) => term);

  return (
    <div style={{ textAlign: 'center' }}>

      <h1>Vocabulary List: {id}</h1>

      <p>
        {`${(appState.vocabularyList as unknown as HasIdAndName).id}: ${(appState.vocabularyList as unknown as HasIdAndName).name}`}
      </p>
      <h1>Selected Term</h1>
      {/* TODO remove all casts */}
      {/* TODO Complete form filtering feature */}
      {/* <VocabularyListForm formItems={(appState.vocabularyList as unknown as any).variables} /> */}
      <Carousel data={selectedTerms} />
    </div >
  );
}

export default VocabularyListDetail;
