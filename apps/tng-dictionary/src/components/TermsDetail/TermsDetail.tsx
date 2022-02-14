import './TermsDetail.module.css';
import * as React from 'react';
import { Divider, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import VocabularyListDetail from '../VocabularyListDetail/VocabularyListDetail';
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone';

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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>

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

  /* AUDIO PLAYER */
  let audio = new Audio(`${audioURL}`)

  const start = () => {
    audio.play().catch(console.log)
  }

  return (

    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
        <Typography sx={{ mb: 1.5, color: 'rgb(159,2,2)' }} variant='h5'>
          <b>{term}</b><VolumeUpTwoToneIcon style={play} key={audioURL} onClick={start} />
        </Typography>
        {/* Don't add a div if there's no termEnglish */}
        <Divider style={divider} />
        <Typography style={style}>
          Vocabulary List:
        </Typography>
        <Typography style={style} >
          English: {termEnglish ? termEnglish : ''}
        </Typography>
        <Typography style={style} color="text.secondary">
          {`contributor: ${contributor}`}
        </Typography>
        <Typography style={style} color="text.secondary">
          {`Term: ${id}`}
        </Typography>
        <Typography style={style} color="text.secondary" variant='body2'>
          {`${audioURL}`}
        </Typography>
        <div>
          {/* Don't render this if there is no valid source */}
          { /* <a href={`${audioURL}`} target="_blank">audio</a>*/}
          <audio id="myAudio" controls key={audioURL}>
            <source src={`${audioURL}`} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </motion.div>
    </div>
  );
}

export default TermsDetailComponent;

const style = {
  marginBottom: 1.5,
  textAlign: 'left'
} as const

const divider = {
  marginBottom: 1.5,
  background: 'rgb(150, 150, 150)'
}

const play = {
  fontSize: '38px',
  verticalAlign: 'bottom'
}