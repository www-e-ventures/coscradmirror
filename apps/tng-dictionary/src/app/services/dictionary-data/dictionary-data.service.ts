import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDictionaryDataAPI } from '../dictionary-data/interfaces/dictionary-data-api.interface';
import { invalid, isValid, MaybeInvalid } from './view-models/invalid';
import VocabularyListSummaryViewModel from './view-models/vocabulary-list-summary-view-model';

@Injectable({
  providedIn: 'root',
})
export class DictionaryDataService implements IDictionaryDataAPI {
  private baseAPIURL: string = 'https://api.tsilhqotinlanguage.ca';

  // TODO refactor and add type safety to keys
  private endpointNamesAndEndpoints = {
    listTerms: `${this.baseAPIURL}/list-terms/?vocabulary_list=`,
    vocabularyLists: `${this.baseAPIURL}/vocabulary-lists/`,
    terms: `${this.baseAPIURL}/terms/`,
  } as const;

  constructor(private http: HttpClient) {}

  // getAllVocabularyLists() {
  //   let endpoint: string = this.endpointNamesAndEndpoints.vocabularyLists;
  //   return this.http.get(endpoint);
  // }

  getAllVocabularyListSummaries(): Observable<
    VocabularyListSummaryViewModel[]
  > {
    const endpoint: string = this.endpointNamesAndEndpoints.vocabularyLists;
    return this.http.get(endpoint).pipe(
      map((data: unknown) => {
        if (Array.isArray(data) && data.length > 0) {
          return data
            .map(
              (
                rawVocabularyList: unknown
              ): MaybeInvalid<VocabularyListSummaryViewModel> => {
                try {
                  return new VocabularyListSummaryViewModel(rawVocabularyList);
                } catch (error) {
                  console.log({
                    message: 'invalid dto',
                    invalidDto: rawVocabularyList,
                  });
                  return invalid;
                }
              }
            )

            .filter(
              (
                list: MaybeInvalid<VocabularyListSummaryViewModel>
              ): list is VocabularyListSummaryViewModel => isValid(list)
            );
        }

        return [];
      })
    );
  }
}
