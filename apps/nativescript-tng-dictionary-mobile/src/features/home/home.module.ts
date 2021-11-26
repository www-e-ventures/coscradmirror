import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent, HOME_COMPONENTS } from './components';
import { VocabularyListDetailComponent } from './components/pages/vocabulary-list-detail/vocabulary-list-detail.component';
import { VocabularyListIndexComponent } from './components/pages/vocabulary-list-index/vocabulary-list-index.component';
import { TableComponent } from './components/widgets/table-component/table.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'vocabDetail', component: VocabularyListDetailComponent },
  { path: 'vocabIndex', component: VocabularyListIndexComponent },
];

@NgModule({
  imports: [SharedModule, NativeScriptRouterModule.forChild(routes)],
  declarations: [
    ...HOME_COMPONENTS,
    VocabularyListDetailComponent,
    VocabularyListIndexComponent,
    TableComponent,
  ],
  exports: [...HOME_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
