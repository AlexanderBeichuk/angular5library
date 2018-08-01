import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import * as _ from 'lodash';
import {AuthorizeService} from '../../services/authorize.service';

@Component({
    selector: 'app-wait-list-book',
    templateUrl: './wait-list-book.component.html',
    styleUrls: ['./wait-list-book.component.scss']
})
export class WaitListBookComponent implements OnInit {

    book: Book;
    currentUser = this.authorizeService.getUser();

    constructor(private bookService: BookService, private router: Router, private authorizeService: AuthorizeService) {
    }

    ngOnInit() {
        this.readBook();
    }

    readBook(): void {
        this.bookService.getConectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const book: any = element.payload.toJSON();
                book['$key'] = element.key;
                if (book['$key'] === _.split(this.router.url, '/book/wait-book/')[1]) {
                    this.book = book;
                }
            });
        });
    }
}
