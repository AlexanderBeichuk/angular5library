import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    bookList;

    constructor(private bookService: BookService, private helperService: HelperService) {
    }

    ngOnInit() {
        this.setAllBooks();
    }

    private setAllBooks(): void {
        this.bookService.getConectToList().snapshotChanges().subscribe(item => {
            this.bookList = [];
            item.forEach(element => {
                const book = element.payload.toJSON();
                book['$key'] = element.key;
                book['active'] = false;
                book['labels'] = this.helperService.objectToArray(book['labels']);
                book['statuses'] = this.helperService.objectToArray(book['statuses']);
                this.bookList.push(book as Book);
            });
        });
    }
}
