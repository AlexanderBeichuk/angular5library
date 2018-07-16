import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books/list/books-list.component';
import { AddBookComponent } from './books/add/add-book.component';
import { SettingsComponent } from './settings/settings.component';
import { LabelsComponent } from './settings/labels/labels.component';
import { LabelsAreaToggleComponent } from './books/labels-area-toggle/labels-area-toggle.component';
import { StatusesComponent } from './settings/statuses/statuses.component';
import { LoginComponent } from './login/login.component';
import { DeleteComponent } from './books/delete/delete.component';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentComponent } from './comments/add-comment/add-comment.component';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';
import { TakeBookComponent } from './books/take/take-book.component';
import { MyBooksComponent } from './books/my/my-books.component';
import { DescriptionBookComponent } from './books/description/description-book.component';
import { ReturnBookComponent } from './books/return/return-book.component';
import { BookFormComponent } from './books/form/book-form.component';
import { EditBookComponent } from './books/edit/edit-book.component';
import { TakenListComponent } from './books/taken-list/taken-list.component';
import { UserListComponent } from './settings/user-list/user-list.component';
import { UsersComponent } from './users/users.component';
import { appRoutes } from './route';
import { UserComponent } from './user/user.component';
import { WaitBookComponent } from './books/wait/wait-book.component';
import { WaitListComponent } from './wait-list-book/wait-list/wait-list.component';
import { WaitListBookComponent } from './wait-list-book/wait-list-book.component';
import { SortTableComponent } from './books/sort-table/sort-table.component';

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            /*{
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('Your-Facebook-app-id')
            },*/
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('430783499594-a06omktkcf2uf1t1drq3f8jfafluplt0.apps.googleusercontent.com')
            },
        ]
    );
    return config;
}

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
      SettingsComponent,
      LabelsComponent,
      LabelsAreaToggleComponent,
      StatusesComponent,
      LoginComponent,
      DeleteComponent,
      CommentsComponent,
      AddCommentComponent,
      CommentsListComponent,
      TakeBookComponent,
      MyBooksComponent,
      DescriptionBookComponent,
      ReturnBookComponent,
      BookFormComponent,
      EditBookComponent,
      TakenListComponent,
      UserListComponent,
      UsersComponent,
      UserComponent,
      WaitBookComponent,
      WaitListComponent,
      WaitListBookComponent,
      SortTableComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      HttpClientModule,
      MyDatePickerModule,
      MDBBootstrapModule.forRoot(),
      ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
      }),
      RouterModule.forRoot(appRoutes),
      FormsModule,
      SocialLoginModule,
      Ng2SearchPipeModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
      {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
