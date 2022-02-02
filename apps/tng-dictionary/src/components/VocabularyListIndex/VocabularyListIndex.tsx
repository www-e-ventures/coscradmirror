import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
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
    fetch(apiUrl, { mode: 'cors' })
      .then((res) => res.json())
      .then((vocabularyLists) => {
        setAppState({ loading: false, vocabularyLists: vocabularyLists });
      }).catch(rej => console.log(rej))
  }, [setAppState]);

  if (!appState.vocabularyLists || appState.vocabularyLists === []) return <Loading />

  const rows: GridRowsProp = (appState.vocabularyLists as unknown as HasIdAndName[]).map(vocabularyList => ({
    id: vocabularyList.id,
    name: vocabularyList.name
  }));

  const columns: GridColDef[] = [{
    field: 'id',
    headerName: 'ID',
    renderCell: (idParam: GridRenderCellParams<string>) => (
      <Link to={`/vocabularyLists/${idParam.value}`}><p style={{ color: 'black' }}>{idParam.value}</p></Link>
    ),
    width: 150
  }, {
    field: 'name',
    headerName: 'Vocabulary List',
    width: 150
  }]

  return (
    <div>
      <div style={{ textAlign: 'center', justifySelf: 'center' }}>
        <div style={{ height: '90vh', width: 'fit-content', background: 'white', color: 'black', textAlign: 'center', display: 'inline-block' }}>
          <DataGrid rows={rows} columns={columns} pageSize={100} components={{ Toolbar: GridToolbar }} />
        </div>
      </div>
    </div>

  );
}

export default VocabularyListIndex;


