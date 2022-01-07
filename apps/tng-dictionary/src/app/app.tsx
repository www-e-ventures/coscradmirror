import VocabularyListDetail from '../components/VocabularyListDetail/VocabularyListDetail';
import styles from './app.module.css';
import { Routes } from "react-router-dom";
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import VocabularyListIndex from '../components/VocabularyListIndex/VocabularyListIndex';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/vocabularyLists" element={<VocabularyListIndex />} />
        <Route path="/vocabularyLists/:id" element={<VocabularyListDetail />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
