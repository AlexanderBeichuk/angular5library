import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Book} from '../models/book';
import {BookService} from '../services/book.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-wait-list-book',
    templateUrl: './wait-list-book.component.html',
    styleUrls: ['./wait-list-book.component.scss']
})
export class WaitListBookComponent implements OnInit {

    book: Book;

    constructor(private bookService: BookService, private router: Router) {
    }

    ngOnInit() {
        this.readBook();
    }

    readBook(): void {
        this.bookService.getConectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const book: any = element.payload.toJSON();
                book['$key'] = element.key;
                if (book['$key'] === _.split(this.router.url, '/book/wait/')[1]) {
                    this.book = book;
                }
            });
        });
    }
}
