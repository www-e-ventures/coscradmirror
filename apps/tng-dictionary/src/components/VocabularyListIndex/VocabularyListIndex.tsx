import { useEffect, useState } from 'react';
import './VocabularyListIndex.module.css';

type HasIdAndName = {
  id: string;
  name: string;
}

const getData = async (endpoint: string) => fetch(endpoint).then(response => response.json())

/* eslint-disable-next-line */
export interface VocabularyListIndexProps { }

export function VocabularyListIndex(props: VocabularyListIndexProps) {

  const [appState, setAppState] = useState({
    loading: false,
    vocabularyLists: null,
  });

  useEffect(() => {
    setAppState({ loading: true, vocabularyLists: null });
    const apiUrl = `http://localhost:3131/api/entities?type=vocabularyList`;
    fetch(apiUrl,{mode:'cors'})
      .then((res) =>res.json())
      .then((vocabularyLists) => {
        console.log({
          result: vocabularyLists
        })
        setAppState({ loading: false, vocabularyLists: vocabularyLists });
      }).catch(rej => console.log(rej))
  }, [setAppState]);

  return (
    <div>
      <h1>Welcome to VocabularyListDetail!</h1>
      {
        (appState.vocabularyLists as unknown as HasIdAndName[] || []).map((vocabularyList) =><p>
          {`${vocabularyList.id}: ${vocabularyList.name}`}
        </p>)
      }
    </div>
  );
}

export default VocabularyListIndex;
