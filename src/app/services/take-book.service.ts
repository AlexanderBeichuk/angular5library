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

    add(book: TakeBook) {
        this.getConectToList().push({
            startDate: book.startDate,
            endDate: book.endDate,
            book: book.book,
            user: book.user,
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

    update(book: TakeBook) {
        this.getConectToList().update(book.$key, {
            startDate: book.startDate,
            endDate: book.endDate,
            book: book.book,
            user: book.user,
        });
    }

    delete($key: string) {
        this.getConectToList().remove($key);
    }
}
