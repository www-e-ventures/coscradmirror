import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Term } from '../TermsDetail/TermsDetail';
import { useState } from 'react';
import doValuesMatchFilters from '../../utilities/doValuesMatchFilters';

const stringIncludes = (input: string, textToMatch: string) => input.includes(textToMatch)

const determineSelectedTerms = (allTerms: Term[], filters: Record<string, string>) => {

  console.log({
    allTerms,
    filters,
    match: doValuesMatchFilters(terms[0], filters)
  })

  // @ts-ignore
  return allTerms.filter(term => doValuesMatchFilters(term, filters, stringIncludes))
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90
  },
  {
    field: 'termEnglish',
    headerName: 'termEnglish',
    width: 150,
    editable: true,
  },
  {
    field: 'term',
    headerName: 'term',
    width: 150,
    editable: true,
  },
  {
    field: 'audio',
    headerName: 'Audio',
    width: 150,
    editable: true,
  },

];

let terms: Term[] = [
  { id: '1220317', term: 'Badi ch’aghanelʔiny.', termEnglish: 'eng_translation', audioURL: 'audioURL', contributor: '1' },
  { id: '1220320', term: 'Baxaŝilh.', termEnglish: 'eng_translation', audioURL: 'audioURL', contributor: '1' },
  { id: '1220323', term: 'Bagweẑed.', termEnglish: 'eng_translation', contributor: '1' },
  { id: '1220326', term: 'Bebed ghet’in', audioURL: 'audioURL', contributor: '1' },
  { id: '1220329', term: 'Bebed hets’ed.', termEnglish: 'eng_translation', audioURL: 'audioURL', contributor: '1' },
  { id: '1220332', term: 'Bechel helhtsagh', termEnglish: 'eng_translation', audioURL: 'audioURL', contributor: '1' },
  { id: '1220335', term: 'Bechel helhŵes', termEnglish: 'eng_translation', audioURL: 'audioURL', contributor: '1' },
  { id: '1220338', term: 'Bed ʔalax', termEnglish: 'eng_translation', audioURL: 'audioURL', contributor: '1' },
];

export default function DataGridDemo(): JSX.Element {

  const [searchResults, setSearchResults] = useState({
    selectedTerms: terms,
  });

  function escapeRegExp(value: string): string {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  interface QuickSearchToolbarProps {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
  }

  function QuickSearchToolbar(props: QuickSearchToolbarProps): JSX.Element {

    return (
      <Box>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          InputProps={{
            startAdornment: <GridSearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          sx={style}
        />

        <FormGroup >
          <FormControlLabel control={<Switch color='warning' defaultChecked />} label="Tŝilhqot’in" />
        </FormGroup>

      </Box>
    );
  }


  return (
    <div style={{ height: 500, width: '100%', background: 'white' }}>
      <TextField onChange={(event) => setSearchResults({ selectedTerms: determineSelectedTerms(terms, event.target.value ? { term: event.target.value } : {}) })} />
      <DataGrid
        rows={searchResults.selectedTerms}
        // components={{ Toolbar: QuickSearchToolbar }}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}


{/* MUI TABLE STYLING */ }

const style = {
  width: {
    xs: 1,
    sm: 'auto',
  },
  m: (theme: { spacing: (arg0: number, arg1: number, arg2: number) => any; }) => theme.spacing(1, 0.5, 1.5),
  '& .MuiSvgIcon-root': {
    mr: 0.5,
  },
  '& .MuiInput-underline:before': {
    borderBottom: 1,
    borderColor: 'divider',
  },
}

function useDemoData(arg0: { dataSet: string; visibleFields: any; rowLength: number; }): { data: any; } {
  throw new Error('Function not implemented.');
}
