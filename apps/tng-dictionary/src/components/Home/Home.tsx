import './Home.module.css';
import * as React from 'react';
import { Link } from "react-router-dom";
import { Backdrop, Button, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BackdropUnstyled from '@mui/base/BackdropUnstyled';

/* eslint-disable-next-line */
export interface HomeProps { }

export function Home(props: HomeProps) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!false);
  };
  return (

    <div style={{ position: 'relative' }}>
      <div className='home'>
        <div className='Center' style={{ display: 'grid' }}>
          <Link to="/terms"><Button className='button' style={style} variant="outlined"><SearchIcon />Terms</Button></Link>
          <Link to="/VocabularyLists"><Button style={style} variant='outlined'><SearchIcon />Paradigms and Vocabulary Lists</Button></Link>
          <Link to="/credits"><Button style={style} variant='outlined'><InfoOutlinedIcon />Credits</Button></Link>
          <div style={{ display: 'column', marginBlock: '10px' }}>
            <Button style={mobile} variant='outlined'><AndroidIcon />Download for Android</Button>
            <Button style={mobile} variant='outlined' ><AppleIcon />Download for iOS</Button>

          </div>
        </div>
        <div>
        </div>
      </div>
      <div>

        <Backdrop
          sx={{ color: '#fff', zIndex: '100', background: 'rgb(168,4,4, .8)' }}
          open={open}
          onClick={handleClose}
        >
          <div style={{ padding: '15px' }}>
            <h1>Disclaimer</h1>
            <Divider sx={{ bgcolor: 'white' }} />
            <p>The 'Tŝilhqot'in Dictionary' is still under active development and this domain is intended for testing purposes by those selected to give user feedback.</p>
            <p>Please do not distribute this app's address.</p>
            <p>Sechanalyagh,</p>
            <br />
            <p><img style={{ marginRight: '10px', verticalAlign: 'text-bottom' }} src='https://www.tsilhqotin.ca/wp-content/uploads/2022/02/imageedit_14_8913908156.png' height={20}></img>Tŝilhqot'in National Government</p>
            <Divider sx={{ bgcolor: 'white' }} />
            <p style={{ textAlign: 'center' }}>'Click anywhere to continue'</p>
          </div>
        </Backdrop>
      </div>
    </div>

  );
}

export default Home;

const mobile = {
  color: 'white',
  borderColor: 'white',
  borderRadius: '28px',
  textTransform: 'none',
  paddingBlock: '10px',
  margin: '2.5px'
} as const

const style = {
  width: 330,
  borderColor: 'rgb(237,0,0)',
  color: 'rgb(237,0,0)',
  height: 70,
  margin: '5px',
  background: 'white',
  borderRadius: '36px',

}
