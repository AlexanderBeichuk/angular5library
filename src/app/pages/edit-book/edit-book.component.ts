import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import * as _ from 'lodash';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

    book: Book;

    constructor(private router: Router, private bookService: BookService) {
    }

    ngOnInit() {
        this.readBook();
    }

    readBook(): void {
        this.bookService.getConnectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const book: any = element.payload.toJSON();
                book['$key'] = element.key;
                if (book['$key'] === _.split(this.router.url, '/book/edit/')[1]) {
                    this.book = book;
                }
            });
        });
    }

}
