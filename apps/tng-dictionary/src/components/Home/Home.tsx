import './Home.module.css';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

/* eslint-disable-next-line */
export interface HomeProps { }

export function Home(props: HomeProps) {
  return (
    <div style={{ position: 'relative' }}>
      <div className='home'>
        <div className='Center' style={{ display: 'grid' }}>
          <Link to="/terms"><Button className='button' style={style} variant="outlined"><SearchIcon />Terms</Button></Link>
          <Link to="/VocabularyLists"><Button style={style} variant='outlined'><SearchIcon />Paradigms and Vocabulary Lists</Button></Link>
          <Link to="/credits"><Button style={style} variant='outlined'><InfoOutlinedIcon />Credits</Button></Link>
          <div style={{ display: 'column', marginBlock: '10px' }}>
            <Button variant='outlined' style={{ color: 'white', borderColor: 'white', borderRadius: '18px', textTransform: 'none', paddingBlock: '10px', marginRight: '2.5px' }}><AndroidIcon />Download for Android</Button>
            <Button variant='outlined' style={{ color: 'white', borderColor: 'white', borderRadius: '18px', textTransform: 'none', paddingBlock: '10px', marginLeft: '2.5px' }}><AppleIcon />Download for iOS</Button>
          </div>
        </div>
        <div>
        </div>

      </div>

    </div>

  );
}

export default Home;

const style = {
  width: 330,
  borderColor: 'rgb(237,0,0)',
  color: 'rgb(237,0,0)',
  height: 70,
  margin: '5px',
  background: 'white',
  borderRadius: '36px',

}
