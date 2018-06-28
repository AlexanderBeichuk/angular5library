import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { TakeBook } from '../models/takeBook';

@Injectable({
  providedIn: 'root'
})
export class TakeBookService {
    constructor(private firebase: AngularFireDatabase) {
    }

    getConectToList() {
        return this.firebase.list('takeBooks');
    }

    add(takeBook: TakeBook) {
        this.getConectToList().push({
            startDate: takeBook.startDate,
            endDate: takeBook.endDate,
            book: this.getBook(takeBook.book),
            user: takeBook.user,
        });
    }

    /*readBook($key: string) {
     var x = this.getConectToList();
     x.snapshotChanges().subscribe(item => {
     item.forEach(element => {
     var y = element.payload.toJSON();
     y["$key"] = element.key;
     if (y["$key"] === $key) {
     return y;
     }
     });
     });
     return null;
     }*/

    update(takeBook: TakeBook) {
        this.getConectToList().update(takeBook.$key, {
            startDate: takeBook.startDate,
            endDate: takeBook.endDate,
            book: this.getBook(takeBook.book),
            user: takeBook.user,
        });
    }

    delete($key: string) {
        this.getConectToList().remove($key);
    }

    private getBook(book) {
        return {
            name: book.name,
            author: book.author,
            imageLink: book.imageLink,
            description: book.description,
            allCount: book.allCount,
            availableCount: book.availableCount,
            statuses: book.statuses,
            labels: book.labels
        };
    }
}
