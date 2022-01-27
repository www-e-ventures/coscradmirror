import { useState } from 'react';
import Test from '../sandbox/Test/Test';
import TermsDetailComponent, { TermViewModel } from '../TermsDetail/TermsDetail';
import './Carousel.module.css';

/* eslint-disable-next-line */
export interface CarouselProps {
  data: TermViewModel[]
}

const cyclicDecrement = (currentIndex: number, max: number): number => {
  const newIndex = currentIndex - 1;

  if (newIndex === -1) return max;

  return newIndex;
}

const cyclicIncrement = (currentIndex: number, max: number): number => {
  const newIndex = currentIndex + 1;

  if (newIndex > max) return 0;

  return newIndex;
}

/**
 * 
 * TODO [refactor] Make Carousel a higher-order component which takes in 
 * props and a component to wrap so we can reuse this behaviour.
 */
export function Carousel(props: CarouselProps) {

  const [currentIndex, setIndex] = useState(0)

  if (props.data.length === 0) return (
    <p>No Data</p>
  )

  const currentItem: TermViewModel = props.data[currentIndex];

  return (
    <div className='Carousel'>
      <div onClick={e => setIndex(cyclicDecrement(currentIndex, props.data.length - 1))}>Prev</div>
      <div onClick={e => setIndex(cyclicIncrement(currentIndex, props.data.length - 1))}>Next</div>
      <TermsDetailComponent termData={currentItem} />
    </div>
  );
}

export default Carousel;
