import VocabularyListDetail from '../components/VocabularyListDetail/VocabularyListDetail';
import styles from './app.module.css';
import { Routes } from "react-router-dom";
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home/Home';
import VocabularyListIndex from '../components/VocabularyListIndex/VocabularyListIndex';
import Credits from '../components/Credits/Credits';
import TermsDetailComponent from '../components/TermsDetail/TermsDetail';
import Toolbar from '../components/Toolbar/Toolbar';
import VocabularyListContext from '../context/VocabularyListContext';
import { useState } from 'react';


import Test from '../components/sandbox/Test/Test';
import Loading from '../components/Loading/Loading';

export function App() {
  const vocabularyListFormState = useState({
    currentSelections: {},
    // isReady: false
  });

  return (
    <VocabularyListContext.Provider value={vocabularyListFormState}>
      <div className='body' style={{ marginTop: '80px' }}>
        <BrowserRouter>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Credits" element={<Credits />} />
            <Route path="/VocabularyLists" element={<VocabularyListIndex />} />
            <Route path="/VocabularyLists/:id" element={<VocabularyListDetail />} />
            <Route path="/Terms" element={<TermsDetailComponent />} />
            <Route path="/Test" element={<Test />} />
            <Route path="/Loading" element={<Loading />} />
          </Routes>
        </BrowserRouter>
      </div>
    </VocabularyListContext.Provider>
  );
}

export default App;