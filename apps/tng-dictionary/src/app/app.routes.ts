import { Route } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
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
];

export default routes;
