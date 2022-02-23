import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { TextField, ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';
import doValuesMatchFilters from '../../utilities/doValuesMatchFilters';
import Loading from '../Loading/Loading';
import TermData from '../Term/Term';
import { ThemeProvider, createTheme } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { initial } from 'cypress/types/lodash';



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
        setComponentState({ ...componentState, allTerms: allTerms });
        setSearchResults({ selectedTerms: allTerms })
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
    renderCell: (idParam: GridRenderCellParams<string>) => <Link to={`/terms/${idParam.value}`}><p>{idParam.value}</p></Link>,

  },
  {
    field: 'term',
    headerName: 'Term',
    minWidth: 150,
    flex: 0
  },
  {
    field: 'english',
    headerName: 'English',
    width: 150,
    flex: 1
  }]

  const searchTsilhqotin = <TextField placeholder="Search Tŝilhqot'in" onChange={(event) => setSearchResults({ selectedTerms: event.target.value ? determineSelectedTerms(componentState.allTerms, { [componentState.searchContext]: event.target.value }) : componentState.allTerms })} InputProps={{
    sx: { borderRadius: '24px', bgcolor: 'white', width: '300px' }
  }} />;
  const searchEnglish = <TextField placeholder="Search English" onChange={(event) => setSearchResults({ selectedTerms: event.target.value ? determineSelectedTerms(componentState.allTerms, { [componentState.searchContext]: event.target.value }) : componentState.allTerms })}
    InputProps={{
      sx: { borderRadius: '24px', bgcolor: 'white', width: '300px' }
    }}
  />;

  // SWITCHCOMPONENT

  const [toggled, setToggled] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggled(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 400 }}>
        <div style={{ color: 'white', textAlign: 'center', padding: '24px' }}>
          <div> {toggled ? [searchEnglish] : [searchTsilhqotin]} </div>
          <FormControlLabel control={<Switch onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />} label="Tŝilhqot'in / English" />
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          sx={{ bgcolor: 'white' }}
        />
      </div>
    </ThemeProvider>
  );
}




export const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255,28,28)', // main color
    },
  },
});