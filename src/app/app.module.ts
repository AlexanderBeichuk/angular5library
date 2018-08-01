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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { BooksComponent } from './pages/books/books.component';
import { BooksListComponent } from './partials/book-list/books-list.component';
import { AddBookComponent } from './partials/add-book/add-book.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LabelsComponent } from './partials/labels/labels.component';
import { LabelsAreaToggleComponent } from './partials/labels-area-toggle/labels-area-toggle.component';
import { StatusesComponent } from './partials/statuses/statuses.component';
import { LoginComponent } from './pages/login/login.component';
import { DeleteComponent } from './partials/delete-book/delete.component';
import { CommentsComponent } from './partials/comments/comments.component';
import { AddCommentComponent } from './partials/comments/add-comment/add-comment.component';
import { CommentsListComponent } from './partials/comments/comments-list/comments-list.component';
import { TakeBookComponent } from './partials/take-book/take-book.component';
import { MyBooksComponent } from './pages/my-book-list/my-books.component';
import { DescriptionBookComponent } from './partials/description-book/description-book.component';
import { ReturnBookComponent } from './partials/return-book/return-book.component';
import { BookFormComponent } from './partials/form-book/book-form.component';
import { EditBookComponent } from './partials/edit-book/edit-book.component';
import { TakenListComponent } from './partials/taken-list/taken-list.component';
import { UserListComponent } from './partials/user-list/user-list.component';
import { UsersComponent } from './pages/users/users.component';
import { appRoutes } from './route';
import { UserComponent } from './pages/user/user.component';
import { WaitBookComponent } from './partials/wait-book/wait-book.component';
import { WaitListComponent } from './partials/wait-list/wait-list.component';
import { WaitListBookComponent } from './pages/wait-list-book/wait-list-book.component';
import { SortTableComponent } from './partials/sort-table/sort-table.component';

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
      Ng2SearchPipeModule,
      NgMultiSelectDropDownModule.forRoot()
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
