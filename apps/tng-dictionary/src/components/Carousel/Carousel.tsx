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
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@mui/material';

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



  const [isToggled, setToggle] = useState(1);


  return (

    <div style={{ height: '90vh' }}>
      <AnimatePresence>

        <Card className="Cards">

          <CardContent>
            <motion.div
              key={currentIndex}
              initial={{
                x: isToggled
              }}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                x: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              transition={{ duration: .6 }}
            >
              <motion.div>
                <TermsDetailComponent termData={currentItem} />
              </motion.div>

              <Divider sx={{ background: 'rgb(150, 150, 150)' }} />
            </motion.div>

            <div style={{ marginTop: '16px', marginBottom: '0', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>

              <motion.div onClick={() => setToggle(prevValue => {
                return prevValue ? -500 : -500;
              })} whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
                whileTap={{ scale: 0.9 }}>
                <Button style={{ color: 'red' }} onClick={e => setIndex(cyclicDecrement(currentIndex, props.data.length - 1))}><ArrowBackIosNewOutlinedIcon /> Back</Button>
              </motion.div>
              <motion.div onClick={() => setToggle(prevValue => {
                return prevValue ? 500 : 500;
              })} whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
                whileTap={{ scale: 0.9 }}>
                <Button style={{ color: 'red' }} onClick={e => setIndex(cyclicIncrement(currentIndex, props.data.length - 1))}>Next <ArrowForwardIosOutlinedIcon /></Button>
              </motion.div>
              {/* 
                  <ArrowBackIosNewOutlined sx={{ marginRight: '40px' }} fontSize='large' onClick={e => setIndex(cyclicDecrement(currentIndex, props.data.length - 1))} />
    <ArrowForwardIosOutlinedIcon fontSize='large' onClick={e => setIndex(cyclicIncrement(currentIndex, props.data.length - 1))} />
                  <Button style={mobile} variant='outlined' onClick={e => setIndex(cyclicDecrement(currentIndex, props.data.length - 1))}><ArrowBackIosNewOutlinedIcon /> Back</Button>
    <Button style={mobile} variant='outlined' onClick={e => setIndex(cyclicIncrement(currentIndex, props.data.length - 1))}>Next <ArrowForwardIosOutlinedIcon /></Button>
    */}
            </div>
          </CardContent>

        </Card>

      </AnimatePresence>
    </div >
  );
}

export default Carousel;

const mobile = {
  color: 'rgb(168,4,4)',
  borderColor: 'rgb(168,4,4)',
  borderRadius: '8px',
  textTransform: 'none',
  paddingBlock: '10px',
  marginTop: '-10px',
  minWidth: '140px',
  background: 'white',
  marginRight: '2.5px',
  marginLeft: '2.5px',
  height: '40px',
  fontSize: '22px',
} as const

const pop = () => {
  <motion.div
    initial={{ scale: 0 }}
    animate={{ rotate: 180, scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
  />
};