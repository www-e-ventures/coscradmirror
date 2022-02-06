import './Test.module.css';
import { useEffect, useState } from 'react';
import Carousel from '../../Carousel/Carousel';
import { Term } from '../../TermsDetail/TermsDetail';


/* eslint-disable-next-line */
export interface TestProps {
}

export function Test(props: TestProps) {
  const [appState, setAppState] = useState({
    loading: false,
    entitiesAndDescriptions: null,
  });

  useEffect(() => {
    setAppState({ loading: true, entitiesAndDescriptions: null });
    const apiUrl = `http://localhost:3131/api/entities/descriptions`;
    fetch(apiUrl, { mode: 'cors' })
      .then((res) => res.json())
      .then((entitiesAndDescriptions) => {
        setAppState({ loading: false, entitiesAndDescriptions: entitiesAndDescriptions });
      }).catch(rej => console.log(rej))
  }, [setAppState]);

  const [entity,description] =  Object.entries(appState.entitiesAndDescriptions || {loading: 'still loading'})[0]

  return (
    <div>
      <h1>{entity}</h1>
      {description}
    </div>
  )
}

export default Test;
