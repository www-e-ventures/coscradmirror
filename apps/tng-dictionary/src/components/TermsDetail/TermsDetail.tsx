import './TermsDetail.module.css';
import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

// TODO move this to shared interfaces lib
export type TermViewModel = {
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
  termData?: TermViewModel
}

export function TermsDetailComponent(props: TermsDetailComponentProps) {
  const audioRef = React.useRef();

  const { termData } = props;

  if (!termData) return (
    <h1>Term not found</h1>
  );

  const {
    id, contributor, term, termEnglish, audioURL
  } = termData;


  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ height: '90vh', width: '100%' }}>
        <h1>{`Term: ${id}`}</h1>
        <div>{`contributor: ${contributor}`}</div>
        <div>{term}</div>
        {/* Don't add a div if there's no termEnglish */}
        <div>{termEnglish ? termEnglish : ''}</div>
        {`${audioURL}`}
        <div>
          {/* Don't render this if there is no valid source */}
          { /* <a href={`${audioURL}`} target="_blank">audio</a>*/}
          <audio id="myAudio" controls key={audioURL}>
            <source src={`${audioURL}`} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}

export default TermsDetailComponent;
