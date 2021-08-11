import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'coscrad-user-profile',
  template: ` <div *ngIf="auth.user$ | async as user">
    Welcome {{ user.name }}
  </div>`,
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
