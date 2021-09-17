import { Route } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { VocabularyListDetailComponent } from './components/pages/vocabulary-list-detail/vocabulary-list-detail.component';
import { VocabularyListIndexComponent } from './components/pages/vocabulary-list-index/vocabulary-list-index.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'lists',
    component: VocabularyListIndexComponent,
  },
  {
    path: 'lists/:id',
    component: VocabularyListDetailComponent,
  },
];

export default routes;
