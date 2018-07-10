import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})

export class BookService {
    constructor(private firebase: AngularFireDatabase) {
    }

    getConectToList() {
        return this.firebase.list('books');
    }

    add(book: Book) {
        this.getConectToList().push({
            name: book.name,
            author: book.author,
            imageLink: book.imageLink || '',
            description: book.description,
            allCount: book.allCount,
            availableCount: book.availableCount,
            statuses: book.statuses,
            labels: book.labels
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

    update(book: Book) {
        this.getConectToList().update(book.$key, {
            name: book.name,
            author: book.author,
            imageLink: book.imageLink || '',
            description: book.description,
            allCount: book.allCount,
            availableCount: book.availableCount,
            status: book.statuses,
            labels: book.labels
        });
    }

    delete($key: string) {
        this.getConectToList().remove($key);
    }

    getBook(book) {
        return {
            id: book['$key'],
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
