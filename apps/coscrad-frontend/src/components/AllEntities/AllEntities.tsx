import { useEffect, useState } from 'react';
import './AllEntities.module.scss';

/* eslint-disable-next-line */
export interface AllEntitiesProps { }

type EntitiesAndDescriptions = Record<string, string>;

type ComponentState = {
  entitiesAndDescriptions: EntitiesAndDescriptions
}

export function AllEntities(props: AllEntitiesProps) {
  const [appState, setAppState] = useState<ComponentState>({
    entitiesAndDescriptions: {}
  });

  if (Object.keys(appState.entitiesAndDescriptions).length === 0)
    return (
      <div>Loading...</div>
    )

  useEffect(() => {
    setAppState({ entitiesAndDescriptions: {} });
    const apiUrl = `http://104.225.142.106:3131/api/entities/descriptions/`;
    fetch(apiUrl, { mode: 'cors' })
      .then((res) => res.json())
      .then((entitiesAndDescriptions) => {
        setAppState({ ...appState, entitiesAndDescriptions });
      }).catch(rej => console.log(rej))
  }, [setAppState]);

  return (
    <div>
      <h1>Welcome to AllEntities!</h1>
      <p>{Object.entries(appState.entitiesAndDescriptions).map(([entityType, description]) => (<p><b>{entityType}:</b>&nbsp;{description}</p>))}</p>
    </div>
  );
}

export default AllEntities;
