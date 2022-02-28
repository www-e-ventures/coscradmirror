import './TermsDetail.module.css';
import * as React from 'react';
import { Card, Divider, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import VocabularyListDetail from '../VocabularyListDetail/VocabularyListDetail';
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone';
import TermData, { Term } from '../Term/Term';
import Loading from '../Loading/Loading';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface TermsDetailComponentProps { }

type ComponentState = {
  termData: null | TermData;
}

export function TermsDetailComponent(props: TermsDetailComponentProps) {

  const [componentState, setComponentState] = useState<ComponentState>({
    termData: null
  })

  const { id } = useParams();

  useEffect(() => {
    setComponentState({ termData: null });

    const apiUrl = `http://localhost:3131/api/entities?type=term&id=${id}`;
    fetch(apiUrl, { mode: 'cors' })
      .then((res) => res.json())
      .then((term) => {
        setComponentState({ termData: term });
      }).catch(rej => console.log(rej))
  }, [setComponentState]);

  if (!componentState.termData) return (
    <Loading></Loading>
  );

  return (
    <div style={{ textAlign: 'center', alignContent: 'center', margin: '0 auto', alignSelf: 'center', color: 'white', padding: '0px' }}>
      <Card sx={{ width: '100vw', minHeight: '100vh', margin: '0 auto' }}>
        <div style={{ padding: '2px' }}>
          <Term termData={componentState.termData}></Term>
        </div>
      </Card>
    </div>

  );
}

export default TermsDetailComponent;

const style = {
  marginBottom: 1.5,
  textAlign: 'left',
} as const

const divider = {
  marginBottom: 1.5,
  background: 'rgb(150, 150, 150)'
}

const play = {
  fontSize: '38px',
  verticalAlign: 'bottom'
}