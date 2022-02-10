import './TermsDetail.module.css';
import * as React from 'react';
import { Divider, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// TODO move this to shared interfaces lib
export type Term = {
  id: string;

  contributor: string;

  term: string;

  termEnglish?: string;

  audioURL?: string;

  sourceProject?: string;

  // Should this hit the frontend?
  //  isPublished: boolean;
}

/* eslint-disable-next-line */
export interface TermsDetailComponentProps {
  termData?: Term
}

export function TermsDetailComponent(props: TermsDetailComponentProps) {
  const audioRef = React.useRef();

  const { termData } = props;

  if (!termData) return (
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
          <h1>Term not found</h1>
          <h2>Lha ts'egwediʔal</h2>
          <h2 style={{ color: 'rgb(204, 170, 170)' }}>"One couldn't find the word."</h2>
        </div>
      </motion.div>
    </div >
  );

  const {
    id, contributor, term, termEnglish, audioURL
  } = termData;


  return (

    <div>
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


        <Typography sx={{ mb: 1.5 }} variant='h5'>{term}</Typography>
        {/* Don't add a div if there's no termEnglish */}
        <Divider sx={{ mb: 1.5, background: 'rgb(150, 150, 150)' }} />
        <Typography sx={{ mb: 1.5, textAlign: 'left' }}>English: {termEnglish ? termEnglish : ''}</Typography>
        <Typography sx={{ mb: 1.5, textAlign: 'left' }} color="text.secondary">{`contributor: ${contributor}`}</Typography>
        <Typography sx={{ mb: 1.5, textAlign: 'left' }} color="text.secondary">{`Term: ${id}`}</Typography>
        <Typography sx={{ mb: 1.5, textAlign: 'left', display: 'none' }} color="text.secondary" variant='body2'>{`${audioURL}`}</Typography>

        <div>
          {/* Don't render this if there is no valid source */}
          { /* <a href={`${audioURL}`} target="_blank">audio</a>*/}
          <audio style={{ marginBottom: '5px' }} id="myAudio" controls key={audioURL}>
            <source src={`${audioURL}`} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </motion.div>
    </div>

  );
}

export default TermsDetailComponent;
