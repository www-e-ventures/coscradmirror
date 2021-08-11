import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, AuthButtonComponent, UserProfileComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-ne4y17z9.auth0.com',
      clientId: '8l2uydFmXezw3KooIfqjGPIYIWQLF2he',
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
