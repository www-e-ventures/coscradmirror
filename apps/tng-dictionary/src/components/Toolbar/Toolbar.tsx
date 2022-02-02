import './Toolbar.module.css';
import { CssBaseline } from '@mui/material';
import { AppBar } from '@mui/material';
import { Button } from '@mui/material';


/* eslint-disable-next-line */
export interface ToolbarProps { }

export function Toolbar(props: ToolbarProps) {
  return (
    <CssBaseline>
      <AppBar
        className="toolbar"
        sx={{ bgcolor: 'rgb(168,4,4)' }}
      >
        {/*<div style={{}}><img src='https://www.tsilhqotin.ca/wp-content/uploads/2022/02/imageedit_14_8913908156.png' height={40}></img></div> */}
        <div style={{ lineHeight: '80px' }}>
          <h1><img style={{ marginRight: '14px', verticalAlign: 'sub' }} className='tool' src='https://www.tsilhqotin.ca/wp-content/uploads/2022/02/imageedit_14_8913908156.png' height={40}></img>Tŝilhqot'in Dictionary</h1>
        </div>
      </AppBar>
    </CssBaseline>
  );
}

export default Toolbar;
