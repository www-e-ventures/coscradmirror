import './Home.module.scss';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <div>
      <h1>Welcome to Home!</h1>
      <Link to='/About'>About</Link>
      <Link to='/AllEntities'>All Entities</Link>
    </div>
  );
}

export default Home;
