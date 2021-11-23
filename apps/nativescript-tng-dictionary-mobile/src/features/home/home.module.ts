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

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'vocab', component: VocabularyListDetailComponent },
];

@NgModule({
  imports: [SharedModule, NativeScriptRouterModule.forChild(routes)],
  declarations: [...HOME_COMPONENTS, VocabularyListDetailComponent],
  exports: [...HOME_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
