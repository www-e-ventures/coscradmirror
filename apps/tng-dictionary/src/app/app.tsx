import styles from './app.module.css';
import { Routes } from "react-router-dom";
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import VocabularyListIndex from '../components/VocabularyListIndex/VocabularyListIndex';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VocabularyListIndex />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
