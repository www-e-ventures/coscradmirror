import './Toolbar.module.css';
import { CssBaseline } from '@mui/material';
import { AppBar } from '@mui/material';
import { motion } from 'framer-motion'


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
        <motion.div
          style={{ lineHeight: '80px' }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{ duration: 1 }}
        >
          <h1><img style={{ marginRight: '14px', verticalAlign: 'sub' }} className='tool' src='https://api.tsilhqotinlanguage.ca/uploads/tng_log_for_language_hub_2e4ec30f17.png' height={40}></img>Tŝilhqot'in Dictionary</h1>
        </motion.div>
      </AppBar>
    </CssBaseline>
  );
}

export default Toolbar;
