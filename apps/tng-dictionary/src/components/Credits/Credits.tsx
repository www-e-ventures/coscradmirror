import './Credits.module.css';
import * as React from 'react';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { Box } from '@mui/material';
import Carousel from '../Carousel/Carousel';

/* MOVE TO TEST COMPONENT */
/* ADD SWITCH TOGGLE BUTTON */
export interface CreditsProps { }

export function Credits(props: CreditsProps) {

  const [age, setAge] = React.useState('');
  const [aspect, setAspect] = React.useState('');
  const [positive, setPositive] = React.useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAge(event.target.value);
  };

  const handleChange2 = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAspect(event.target.value);
  };

  const handleChange3 = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPositive(event.target.value);
  };

  const newLocal = <Box sx={{ minWidth: 120 }}>
    <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Person</InputLabel>
      <Select
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={1}>He</MenuItem>
        <MenuItem value={2}>She</MenuItem>
        <MenuItem value={3}>It</MenuItem>
      </Select>
    </FormControl>

  </Box>;

  const newLocal2 = <Box sx={{ minWidth: 150 }}>
    <FormControl variant='filled' sx={{ m: 1, minWidth: 150 }}>
      <InputLabel id="demo-simple-select-label">Aspect/Mode</InputLabel>
      <Select
        value={aspect}
        label="Aspect"
        onChange={handleChange2}
      >
        <MenuItem value={10}>Present (present perfective, imperfective, progressive)</MenuItem>
        <MenuItem value={20}>Past (perfective)</MenuItem>
        <MenuItem value={30}>Future (inceptive progressive)</MenuItem>
        <MenuItem value={40}>Should \ May (optative)</MenuItem>
        <MenuItem value={50}>Started to (inceptive perfective)</MenuItem>
      </Select>
    </FormControl>
  </Box>;

  const newLocal3 = <Box sx={{ minWidth: 150 }}>
    <FormControl variant='filled' sx={{ m: 1, minWidth: 150 }}>
      <InputLabel id="demo-simple-select-label">Aspect/Mode</InputLabel>
      <Select
        value={positive}
        label="Aspect"
        onChange={handleChange3}
      >
        <MenuItem value={100}>Positive (switch for negative)</MenuItem>
        <MenuItem value={200}>Negative</MenuItem>
      </Select>
    </FormControl>
  </Box>;
  return (
    <div className='load'>
      <div className='loading' style={{ color: 'white' }}>
        <h1>Contributors</h1>
        <p>coming soon</p>
        <h1>Funders</h1>
        <p>coming soon</p>
      </div>
    </div >

  );
}

export default Credits;
