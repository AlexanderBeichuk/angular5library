import {MyBooksComponent} from './books/my/my-books.component';
import {LoginComponent} from './login/login.component';
import {CabinetComponent} from './cabinet/cabinet.component';
import {BooksComponent} from './books/books.component';
import {EditBookComponent} from './books/edit/edit-book.component';
import {Routes} from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {HomeComponent} from './home/home.component';
import {AddBookComponent} from './books/add/add-book.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {WaitListBookComponent} from './wait-list-book/wait-list-book.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
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
        path: 'books/my',
        component: MyBooksComponent
    },
    {
        path: 'book/add',
        component: AddBookComponent
    },
    {
        path: 'book/edit/:id',
        component: EditBookComponent
    },
    {
        path: 'book/wait/:id',
        component: WaitListBookComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'user/:id',
        component: UserComponent
    }
];
