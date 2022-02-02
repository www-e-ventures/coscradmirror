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
        sx={{ bgcolor: 'rgb(222,37,37)', display: 'block' }}
      >
        <div style={{ display: 'inline-block', verticalAlign: 'sub', paddingRight: '15px' }}><img src='https://www.tsilhqotin.ca/wp-content/uploads/2021/08/tng_footer_logo_black_white.png' height={40}></img></div>
        <div style={{ display: 'inline-block', marginTop: 'auto' }}>
          <h1>Tŝilhqot'in Dictionary</h1>
        </div>
      </AppBar>
    </CssBaseline>
  );
}

export default Toolbar;
