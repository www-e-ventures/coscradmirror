import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDictionaryDataAPI } from '../dictionary-data/interfaces/dictionary-data-api.interface';
import { invalid, isValid, MaybeInvalid } from './view-models/invalid';
import VocabularyListEntryViewModel from './view-models/vocabulary-list-entry-view-model';
import { VocabularyListSummaryViewModel } from './view-models/vocabulary-list-summary-view-model';
import { VocabularyListViewModel } from './view-models/vocabulary-list-view-model';

@Injectable({
  providedIn: 'root',
})
export class DictionaryDataService implements IDictionaryDataAPI {
  private baseAPIURL: string = 'https://api.tsilhqotinlanguage.ca';

  // TODO refactor and add type safety to keys, consider using builder
  private endpointNamesAndEndpoints = {
    listTerms: `${this.baseAPIURL}/list-terms/?vocabulary_list=`,
    vocabularyLists: `${this.baseAPIURL}/vocabulary-lists/`,
    terms: `${this.baseAPIURL}/terms/`,
    vocabularyListEntries: `${this.baseAPIURL}/list-terms/`,
  } as const;

  constructor(private http: HttpClient) {}

  getAllVocabularyListSummaries(): Observable<
    VocabularyListSummaryViewModel[]
  > {
    const endpoint = this.endpointNamesAndEndpoints.vocabularyLists;
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

  // TODO [JB] implement -> getVocabularyListByID
  getVocabularyListByID(id: string) {
    // TODO Validate id
    const vocabularyListByIdEndpoint = `${this.endpointNamesAndEndpoints.vocabularyLists}${id}`;
    const $vocabularyList = this.http.get(vocabularyListByIdEndpoint);

    const vocabularyListEntriesEndpoint = `${this.endpointNamesAndEndpoints.vocabularyListEntries}?vocabulary_list=${id}`;
    const $vocabularyListEntries = this.http.get(vocabularyListEntriesEndpoint);

    return forkJoin([$vocabularyList, $vocabularyListEntries]).pipe(
      map(([rawVocabularyListData, rawVocabularyListEntries]) => {
        if (!Array.isArray(rawVocabularyListEntries))
          throw new Error(
            `Invalid vocabulary list entries received from server: ${JSON.stringify(
              rawVocabularyListEntries
            )}`
          );
        const vocabularyListEntriesViewModel = rawVocabularyListEntries
          .map((rawEntryData) => {
            try {
              const vocabularyListViewModel = new VocabularyListEntryViewModel(
                rawEntryData
              );
              console.log({ vocabularyListViewModel });
              return new VocabularyListEntryViewModel(rawEntryData);
            } catch (error) {
              console.log(
                `failed to build vocabulary list: ${(error as Error).message}`
              );
              console.log({ rawVocabularyListEntries });
              return invalid;
            }
          })
          .filter(isValid);

        return new VocabularyListViewModel(
          vocabularyListEntriesViewModel,
          rawVocabularyListData
        );
      })
    );
  }
}
