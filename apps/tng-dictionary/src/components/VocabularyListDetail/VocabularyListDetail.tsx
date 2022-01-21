import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import TermsDetailComponent from '../TermsDetail/TermsDetail';
import VocabularyListForm, { VocabularyListFormElement } from '../VocabularyListForm/VocabularyListForm';
import './VocabularyListDetail.module.css';
import { Paper } from '@mui/material';
import Carousel from '../Carousel/Carousel';


type HasIdAndName = {
  id: string;
  name: string;
}

const getData = async (endpoint: string) => fetch(endpoint).then(response => response.json())

/* eslint-disable-next-line */
export interface VocabularyListDetailProps { }

export function VocabularyListDetail(props: VocabularyListDetailProps) {

  const [appState, setAppState] = useState({
    loading: false,
    vocabularyList: null,
  });

  const { id } = useParams();

  useEffect(() => {
    setAppState({ loading: true, vocabularyList: null });
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

  return (
    <div>
      <Paper>
        <h1>Vocabulary List: {id}</h1>
      </Paper>
      <p>
        {`${(appState.vocabularyList as unknown as HasIdAndName).id}: ${(appState.vocabularyList as unknown as HasIdAndName).name}`}
      </p>
      <h1>Selected Terms</h1>
      {/* TODO remove all casts */}
      <VocabularyListForm formItems={(appState.vocabularyList as unknown as any).variables} />
      <TermsDetailComponent termData={(appState.vocabularyList as unknown as any).entries[0].term} />
    </div>
  );
}

export default VocabularyListDetail;
