import styles from './App.module.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from '../components/Home/Home';
import About from '../components/About/About';
import AllEntities from '../components/AllEntities/AllEntities';

export function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='About' element={<About />} />
        <Route path='AllEntities' element={<AllEntities />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
