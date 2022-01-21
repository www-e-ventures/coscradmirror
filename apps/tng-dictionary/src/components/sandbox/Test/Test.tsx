import './Test.module.css';
import { useState } from 'react';
import TermsDetailComponent, { TermViewModel } from '../../TermsDetail/TermsDetail';
import Carousel from '../../Carousel/Carousel';

/* eslint-disable-next-line */
export interface TestProps {
}

export function Test(props: TestProps) {

  const terms: TermViewModel[] = [{
    term: 'test term 1',
    termEnglish: 'english term 1',
    contributor: 'John Doe',
    audioURL: 'https://api.tsilhqotinlanguage.ca/uploads/128_d260bf5afa.wav',
    id: '1'
  },
  {
    term: 'test term 2',
    termEnglish: 'english term 2',
    contributor: 'John Doe2',
    id: '2'
  },
  {
    term: 'test term 3',
    contributor: 'John Doe3',
    audioURL: 'https://api.tsilhqotinlanguage.ca/uploads/128_d260bf5afa.wav',
    id: '3'
  }
  ]

  return (
    <div className='Carousel'>
      <Carousel data={terms} />
    </div>
  );
}

export default Test;
