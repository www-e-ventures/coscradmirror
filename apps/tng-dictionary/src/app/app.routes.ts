import { Route } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
];

export default routes;
