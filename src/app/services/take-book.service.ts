import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { TakeBook } from '../models/takeBook';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class TakeBookService {
    constructor(private firebase: AngularFireDatabase, private bookService: BookService) {
    }

    getConectToList() {
        return this.firebase.list('takeBooks');
    }

    add(takeBook: TakeBook) {
        this.getConectToList().push({
            startDate: takeBook.startDate,
            endDate: takeBook.endDate,
            book: this.bookService.getBook(takeBook.book),
            user: takeBook.user,
        });
    }

    update(takeBook: TakeBook) {
        this.getConectToList().update(takeBook.$key, {
            startDate: takeBook.startDate,
            endDate: takeBook.endDate,
            book: this.bookService.getBook(takeBook.book),
            user: takeBook.user,
        });
    }

    delete($key: string) {
        this.getConectToList().remove($key);
    }
}
