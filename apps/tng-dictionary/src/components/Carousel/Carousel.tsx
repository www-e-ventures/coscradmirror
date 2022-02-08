import { useState } from 'react';
import Test from '../sandbox/Test/Test';
import './Carousel.module.css';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { cardClasses, Paper } from '@mui/material';
import { Divider } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import TermsDetailComponent, { Term } from '../TermsDetail/TermsDetail';
import ArrowBackIosNewOutlined from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Button } from '@mui/material';


/* eslint-disable-next-line */
export interface CarouselProps {
  data: Term[]
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

  const currentItem: Term = props.data[currentIndex];

  return (
    <div style={{ height: '90vh' }}>
      <Card className="Cards">
        <CardContent>
          <TermsDetailComponent termData={currentItem} />
          <Divider />
          <div style={{ margin: '12px' }}>
            {/* 
                            <ArrowBackIosNewOutlined sx={{ marginRight: '40px' }} fontSize='large' onClick={e => setIndex(cyclicDecrement(currentIndex, props.data.length - 1))} />
              <ArrowForwardIosOutlinedIcon fontSize='large' onClick={e => setIndex(cyclicIncrement(currentIndex, props.data.length - 1))} />
                            <Button style={mobile} variant='outlined' onClick={e => setIndex(cyclicDecrement(currentIndex, props.data.length - 1))}><ArrowBackIosNewOutlinedIcon /> Back</Button>
              <Button style={mobile} variant='outlined' onClick={e => setIndex(cyclicIncrement(currentIndex, props.data.length - 1))}>Next <ArrowForwardIosOutlinedIcon /></Button>
              */}
          </div>
        </CardContent>
      </Card>
      <div style={{ padding: '20px' }}>
        <Button style={mobile} variant='outlined' onClick={e => setIndex(cyclicDecrement(currentIndex, props.data.length - 1))}><ArrowBackIosNewOutlinedIcon /> Back</Button>
        <Button style={mobile} variant='outlined' onClick={e => setIndex(cyclicIncrement(currentIndex, props.data.length - 1))}>Next <ArrowForwardIosOutlinedIcon /></Button>
      </div>

    </div >
  );
}

export default Carousel;

const mobile = {
  color: 'rgb(168,4,4)',
  borderColor: 'rgb(168,4,4)',
  borderRadius: '28px',
  textTransform: 'none',
  paddingBlock: '10px',
  margin: '0px',
  minWidth: '140px',
  background: 'white',
  marginRight: '2.5px',
  marginLeft: '2.5px',
  height: '60px',
  fontSize: '22px',
} as const