import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books-list/books-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cabinet',
    component: CabinetComponent
  },
  {
      path: 'books',
      component: BooksComponent
  }
  /*{
   path: 'hero/:id',
   component: HeroDetailComponent
   },
   {
   path: 'heroes',
   component: HeroListComponent,
   data: { title: 'Heroes List' }
   },
   {
   path: '**', component: PageNotFoundComponent
   }*/
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CabinetComponent,
    BooksComponent,
    BooksListComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
