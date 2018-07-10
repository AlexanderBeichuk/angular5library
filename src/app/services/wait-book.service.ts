import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { WaitBook } from '../models/reserveBook';
import {BookService} from './book.service';

@Injectable({
  providedIn: 'root'
})
export class WaitBookService {
    constructor(private firebase: AngularFireDatabase, private bookService: BookService) {
    }

    getConectToList() {
        return this.firebase.list('waitBooks');
    }

    add(book: WaitBook) {
        this.getConectToList().push({
            user: book.user,
            book: this.bookService.getBook(book.book),
        });
    }

    update(book: WaitBook) {
        this.getConectToList().update(book.$key, {
            user: book.user,
            book: this.bookService.getBook(book.book),
        });
    }

    delete($key: string) {
        this.getConectToList().remove($key);
    }
}
