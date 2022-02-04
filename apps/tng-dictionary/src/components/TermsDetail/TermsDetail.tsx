import './TermsDetail.module.css';
import * as React from 'react';
import { Divider, Typography } from '@mui/material';

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
      <div className='loading' style={{ color: 'white' }}>
        <h1>Term not found</h1>
        <h2>Lha ts'egwediʔal</h2>
        <h2 style={{ color: 'rgb(204, 170, 170)' }}>"One couldn't find the word."</h2>
      </div>
    </div >
  );

  const {
    id, contributor, term, termEnglish, audioURL
  } = termData;


  return (

    <div style={{ textAlign: 'center' }}>

      <Typography sx={{ mb: 1.5 }} variant='h4'>{term}</Typography>
      {/* Don't add a div if there's no termEnglish */}
      <Divider sx={{ mb: 1.5 }} />
      <Typography sx={{ mb: 1.5 }} variant="h5">English Translation: {termEnglish ? termEnglish : ''}</Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">{`contributor: ${contributor}`}</Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">{`Term: ${id}`}</Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary" variant='body2'>{`${audioURL}`}</Typography>

      <div>
        {/* Don't render this if there is no valid source */}
        { /* <a href={`${audioURL}`} target="_blank">audio</a>*/}
        <audio style={{ marginBottom: '5px' }} id="myAudio" controls key={audioURL}>
          <source src={`${audioURL}`} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>

  );
}

export default TermsDetailComponent;
