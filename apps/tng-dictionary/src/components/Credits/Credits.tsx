import './Credits.module.css';
import * as React from 'react';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { Box } from '@mui/material';
import Carousel from '../Carousel/Carousel';
import { motion } from 'framer-motion';

/* MOVE TO TEST COMPONENT */
/* ADD SWITCH TOGGLE BUTTON */
export interface CreditsProps { }

export function Credits(props: CreditsProps) {

  return (
    <div className='load'>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        transition={{ duration: 1 }}
      >
        <div className='loading' style={{ color: 'white' }}>
          <h1>Contributors</h1>
          <p>coming soon</p>
          <h1>Funders</h1>
          <p>coming soon</p>
        </div>
      </motion.div>
    </div >

  );
}

export default Credits;

