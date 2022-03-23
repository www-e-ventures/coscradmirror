import React, { useState } from 'react';
import SearchBar from "@mui/material";
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';


// This holds a list of some fiction people
// Some  have the same name but different age and id
const USERS = [
  { id: 1, name: 'Andy', age: 32 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Tom Hulk', age: 40 },
  { id: 4, name: 'Tom Hank', age: 50 },
  { id: 5, name: 'Audra', age: 30 },
  { id: 6, name: 'Anna', age: 68 },
  { id: 7, name: 'Tom', age: 34 },
  { id: 8, name: 'Tom Riddle', age: 28 },
  { id: 9, name: 'Bolo', age: 23 },
];

function App() {

  return (

    <div style={{ background: 'white', height: '100vh' }}>
      <div className='loading' style={{ backgroundColor: 'white' }}>
        <Box>
          <CircularProgress style={styles.loader} thickness={4} size={70} variant="indeterminate" />
          <CircularProgress style={styles.track} thickness={4} size={70} value={100} variant="determinate" />
          <CircularProgress style={styles.background} thickness={22} size={70} value={100} variant="determinate" />
          <div className='Logo' style={{ zIndex: 10, position: 'absolute' }}>
            <img height={40} src={'https://api.tsilhqotinlanguage.ca/uploads/tng_log_for_language_hub_2e4ec30f17.png'} />
          </div>
        </Box>
      </div>
    </div>



  );
}

export default App;

const styles = {
  loader: {
    color: 'rgb(168,4,4)',
    position: 'absolute',
    zIndex: '100'
  },
  track: {
    color: 'rgb(170, 170, 170)',
    zIndex: '10',
    position: 'absolute'
  },
  background: {
    color: 'white',
    zIndex: '1',

  }
} as const;




