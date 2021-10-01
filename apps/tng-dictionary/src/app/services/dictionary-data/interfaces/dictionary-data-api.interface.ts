import { Observable } from 'rxjs';
import { VocabularyListSummaryViewModel } from '../view-models/vocabulary-list-summary-view-model';
import { VocabularyListViewModel } from '../view-models/vocabulary-list-view-model';

/**
 * TODO Move all interfaces to a lib in the Nx monorepo.
 * This lib will be shared between the frontend and backend.
 */
export interface IDictionaryDataAPI {
  //   getTermsForListByListID(id: string): Observable<VocabularyListEntry[]>;
  getVocabularyListByID(id: string): Observable<VocabularyListViewModel>;
  //   getAllTerms(): Observable<Term[]>;
  //   getTermByID(id: string): Observable<Term>;
  getAllVocabularyListSummaries(): Observable<VocabularyListSummaryViewModel[]>;
}
