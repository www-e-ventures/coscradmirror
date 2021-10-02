import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import VocabularyListEntryViewModel from '../../../services/dictionary-data/view-models/vocabulary-list-entry-view-model';

@Component({
  selector: 'coscrad-vocabulary-list-detail',
  templateUrl: './vocabulary-list-detail.component.html',
  styleUrls: ['./vocabulary-list-detail.component.css'],
})
export class VocabularyListDetailComponent implements OnInit {
  selectedEntry: VocabularyListEntryViewModel;
  entries: VocabularyListEntryViewModel[];
  // vocabularyList: VocabularyList<any>;
  listId: string;
  errorMessage: string = '';
  // selectedTermId: string;
  // dropboxes: ListVariable<string>[] = [];
  // checkboxes: ListVariable<boolean>[] = [];
  constructor(
    private dictionaryDataService: DictionaryDataService,
    // private dictionarySearch: DictionarySearchService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.listId = params.get('id') || '';
          if (!this.listId) {
            this.errorMessage = 'No vocabulary list id provided in URL';
            // TODO fail early
          }
          return this.dictionaryDataService.getVocabularyListByID(this.listId);
        })
      )
      .subscribe((vocabularyListViewModel) => {
        console.log(vocabularyListViewModel);
        const { entries } = vocabularyListViewModel;
        this.entries = entries;
        if (entries.length > 0) this.selectedEntry = entries[0];
      });
  }

  playAudio(): void {
    if (!this.selectedEntry) return;

    const { audioURL } = this.selectedEntry.term;

    // TODO pre-load?
    if (!audioURL) return;

    // TODO actually play audio
    console.log(`Now playing: ${audioURL}`);
  }
  // ngOnInit(): void {
  //   this.route.paramMap
  //     .pipe(
  //       switchMap((params: ParamMap) => {
  //         this.listId = params.get('id');
  //         return forkJoin([
  //           this.dictionaryData.getTermsForListByListID(this.listId),
  //           this.dictionaryData.getVocabularyListByID(this.listId),
  //         ]);
  //       })
  //     )
  //     .subscribe((results) => {
  //       this.entries = results[0];
  //       this.vocabularyList = results[1];
  //       this.selectedTermId = this.entries[0].term.id;
  //       this.setDropboxes(this.vocabularyList.variables.dropboxes);
  //       this.setCheckboxes(this.vocabularyList.variables.checkboxes);
  //     });
  // }
  // handleNewSelection(data: ListQuery<boolean | string>) {
  //   this.search(data);
  //   console.log({
  //     message: 'got some data',
  //     data,
  //   });
  // }
  // search(q: ListQuery<any>) {
  //   const result: VocabularyListEntry = this.dictionarySearch.findOneUniqueTerm(
  //     q,
  //     this.entries
  //   );
  //   this.selectedEntry = result;
  //   this.selectedTermId = result?.term?.id;
  // }
  // private setDropboxes(dropboxes: DropdownData<string>[]) {
  //   if (typeof dropboxes === 'undefined') {
  //     return;
  //   }
  //   for (const d of dropboxes) {
  //     this.dropboxes.push(new ListVariable(d, 0, d.prompt, 'dropbox'));
  //   }
  // }
  // private setCheckboxes(checkboxes: DropdownData<boolean>[]) {
  //   if (typeof checkboxes === 'undefined') {
  //     return;
  //   }
  //   for (const c of checkboxes) {
  //     this.checkboxes.push(new ListVariable(c, 0, c.prompt, 'checkbox'));
  //   }
  // }
}
