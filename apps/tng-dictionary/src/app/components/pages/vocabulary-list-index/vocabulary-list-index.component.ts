import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import VocabularyListSummaryViewModel, {
  VocabularyListSummaryDTO,
} from '../../../services/dictionary-data/view-models/vocabulary-list-summary-view-model';
import { TableClickEventData } from '../../widgets/table/table-click-event-data';
import { TableData } from '../../widgets/table/table-data';

@Component({
  selector: 'app-vocabulary-lists',
  templateUrl: './vocabulary-list-index.component.html',
  styleUrls: ['./vocabulary-list-index.component.css'],
})
export class VocabularyListIndexComponent implements OnInit {
  listSummaryTable: TableData<VocabularyListSummaryDTO>;

  constructor(private data: DictionaryDataService, private router: Router) {}

  ngOnInit(): void {
    this.data.getAllVocabularyListSummaries().subscribe((data) => {
      console.log(data);
      this.listSummaryTable = this.buildListSummaryTable(data);
    });
  }

  handleCellClick({ row }: TableClickEventData<VocabularyListSummaryDTO>) {
    const id = this.listSummaryTable.rows[row].id;

    this.router.navigateByUrl(`/lists/${id}`);

    // TODO if column === 'contributor' navigate to the contributor's bio page
  }

  private buildListSummaryTable(
    allListSummaries: VocabularyListSummaryViewModel[]
  ): TableData<VocabularyListSummaryDTO> {
    return {
      headings: ['name', 'nameEnglish'],
      rows: allListSummaries,
    };
  }
}
