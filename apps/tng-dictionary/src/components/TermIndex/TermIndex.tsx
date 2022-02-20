import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import doValuesMatchFilters from '../../utilities/doValuesMatchFilters';
import Loading from '../Loading/Loading';
import TermData from '../Term/Term';

type ComponentState = {
  allTerms: TermData[];
  searchContext: 'term' | 'termEnglish';
}

const stringIncludes = (input: string, textToMatch: string) => input.includes(textToMatch)

const determineSelectedTerms = (allTerms: TermData[], filters: Record<string, string>) =>  
// @ts-ignore
allTerms.filter(term => doValuesMatchFilters(term, filters, stringIncludes))



export default function DataGridDemo(): JSX.Element {
  const [componentState, setComponentState] = useState<ComponentState>({
    allTerms: [],
    searchContext: 'term'
  })

  const [searchResults, setSearchResults] = useState({
    selectedTerms: componentState.allTerms,
  });

  useEffect(() => {
    setComponentState({ allTerms: [], searchContext: 'term' });
    const apiUrl = `http://localhost:3131/api/entities?type=term`;
    fetch(apiUrl, { mode: 'cors' })
      .then((res) => res.json())
      .then((allTerms) => {
        setComponentState({...componentState, allTerms: allTerms });
        setSearchResults({selectedTerms: allTerms})
      }).catch(rej => console.log(rej))
  }, [setComponentState]);

  if (componentState.allTerms === []) return <Loading />

  const rows: GridRowsProp = (searchResults.selectedTerms).map(term => ({
    id: term.id,
    english: term.termEnglish,
    term: term.term
  }));

  const columns: GridColDef[] = [{
    field: 'id',
    headerName: 'ID',
    renderCell: (idParam: GridRenderCellParams<string>) => <Link to={`/terms/${idParam.value}`}><p>{idParam.value}</p></Link>
    
  }, 
  {
    field: 'term',
    headerName: 'Term',
    width: 100
  },
  {
    field: 'english',
    headerName: 'English',
    width: 100
  }]

  return (
    <div style={{ height: 500, width: '100%', background: 'white' }}>
      <TextField onChange={(event) => setSearchResults({ selectedTerms: event.target.value ? determineSelectedTerms(componentState.allTerms,{ [componentState.searchContext]: event.target.value }) : componentState.allTerms })} />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}




