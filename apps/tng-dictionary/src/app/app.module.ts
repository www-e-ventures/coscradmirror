import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import routes from './app.routes';
import { HomeComponent } from './components/pages/home/home.component';
import { VocabularyListIndexComponent } from './components/pages/vocabulary-list-index/vocabulary-list-index.component';
import { TableComponent } from './components/widgets/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VocabularyListIndexComponent,
    TableComponent,
  ],
  imports: [
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserModule,

    MatToolbarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
