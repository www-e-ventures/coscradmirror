import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-ne4y17z9.auth0.com',
      clientId: '8l2uydFmXezw3KooIfqjGPIYIWQLF2he',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
