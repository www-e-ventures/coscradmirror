import { Component } from '@angular/core';
import { setStatusBarColor } from '../../../utils';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  ngOnInit() {
    setStatusBarColor('dark', '#c20000');
  }
}
