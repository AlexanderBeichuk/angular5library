import {MyBooksComponent} from './pages/my-book-list/my-books.component';
import {LoginComponent} from './pages/login/login.component';
import {CabinetComponent} from './pages/cabinet/cabinet.component';
import {BooksComponent} from './pages/books/books.component';
import {EditBookComponent} from './partials/edit-book/edit-book.component';
import {Routes} from '@angular/router';
import {SettingsComponent} from './pages/settings/settings.component';
import {HomeComponent} from './pages/home/home.component';
import {AddBookComponent} from './partials/add-book/add-book.component';
import {UsersComponent} from './pages/users/users.component';
import {UserComponent} from './pages/user/user.component';
import {WaitListBookComponent} from './pages/wait-list-book/wait-list-book.component';

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
