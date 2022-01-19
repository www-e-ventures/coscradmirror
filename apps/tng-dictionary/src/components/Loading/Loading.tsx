import './Loading.module.css';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';


/* eslint-disable-next-line */
export interface LoadingProps {
  nameToDisplay: string;
}

export function Loading({ nameToDisplay }: LoadingProps): JSX.Element {

  return (
    <div className='loading'>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress style={styles.loader} thickness={4} size={150} />
        <CircularProgress style={styles.track} thickness={4} size={150} value={100} variant="determinate" />
        <CircularProgress style={styles.background} thickness={22} size={150} value={100} variant='determinate' />
        <div className='Logo'>< img height={80} src="https://www.tsilhqotin.ca/wp-content/uploads/2020/11/cropped-tng_logo_resized.png" /></div>
      </Box>
    </div>
  );
}

const styles = {
  loader: {
    color: 'red'
  },
  track: {
    color: "rgb(170, 170, 170)",
    zIndex: "-1",
    position: 'absolute' as 'absolute'
  },
  background: {
    color: 'rgb(220, 220, 220)',
    zIndex: '-2',
    position: 'absolute' as 'absolute'
  }
}

export default Loading;
