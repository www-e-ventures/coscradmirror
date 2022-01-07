import { useEffect, useState } from 'react';
import './VocabularyListDetail.module.css';

type HasIdAndName = {
  id: string;
  name: string;
}

const getData = async (endpoint: string) => fetch(endpoint).then(response => response.json())

/* eslint-disable-next-line */
export interface VocabularyListDetailProps {}

export function VocabularyListDetail(props: VocabularyListDetailProps) {

  const [appState, setAppState] = useState({
    loading: false,
    vocabularyList: null,
  });

  useEffect(() => {
    setAppState({ loading: true, vocabularyList: null });
    const apiUrl = `http://localhost:3131/api/entities?type=vocabularyList&id=1220317`;
    fetch(apiUrl,{mode:'cors'})
      .then((res) =>res.json())
      .then((vocabularyList) => {
        console.log({
          result: vocabularyList
        })
        setAppState({ loading: false, vocabularyList: vocabularyList });
      }).catch(rej => console.log(rej))
  }, [setAppState]);

  if(!appState.vocabularyList) return <div>
    {'Loading ...'}
  </div>

  return (
    <div>
      <h1>Welcome to VocabularyListDetail!</h1>
      <p>   
        {`${(appState.vocabularyList as unknown as HasIdAndName).id}: ${(appState.vocabularyList as unknown as HasIdAndName).name}`}
        </p>
      
    </div>
  );
}

export default VocabularyListDetail;
