import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import { ThemeProvider, createTheme } from '@mui/material';


interface Terms {
  term: string;
  id: number;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Terms[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...tsilhqotin]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div style={{ margin: 'auto', width: 'fit-content' }}>
      <Card style={card}>
        <ThemeProvider theme={theme}>
          <Autocomplete
            sx={{ width: 300, bgcolor: 'white', margin: 'auto' }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.term === value.term}
            getOptionLabel={(option) => option.term}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Terms..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="primary" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                  sx: { borderRadius: '24px' }
                }}
              />
            )}
          />
        </ThemeProvider>


      </Card>
    </div>
  );
}

// terms
const tsilhqotin = [
  { term: 'Aaron ya?in', id: 1220314 },
  { term: "Badi ch'aghanel?iny", id: 1220317 },
  { term: "Baxasilh", id: 1220320 },
  { term: "Bagwezed", id: 1220323 },
  { term: "Bebed ghet'in", id: 1220326 },
  { term: "Bebed hets'ed", id: 1220329 }

];

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255,28,28)', // main color
    },
  },
});

const card = {
  height: '400px', width: '500px', padding: '12px'
}