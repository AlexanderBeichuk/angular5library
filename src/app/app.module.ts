import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../environments/environment'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { BooksPanelComponent } from './books/books-panel/books-panel.component';
import { SettingsComponent } from './settings/settings.component';
import { LabelsComponent } from './settings/labels/labels.component';

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
    },
    {
        path: 'book/add',
        component: AddBookComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
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
      BooksListComponent,
      AddBookComponent,
      BooksPanelComponent,
      SettingsComponent,
      LabelsComponent
  ],
  imports: [
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      HttpClientModule,
      MDBBootstrapModule.forRoot(),
      ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
      }),
      RouterModule.forRoot(appRoutes),
      FormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
