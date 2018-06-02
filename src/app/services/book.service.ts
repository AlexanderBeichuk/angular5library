import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})

export class BookService {

    constructor(private firebase: AngularFireDatabase) { }

    private getConectToList() {
        return this.firebase.list('books');
    }

    getBookList() {
        var x = this.getConectToList();
        var list = [];
        x.snapshotChanges().subscribe(item => {
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                list.push(y as Book);
            });
        });
        return list;
    }

    addBook(book: Book) {
        this.getConectToList().push({
            name: book.name,
            author: book.author,
            imageLink: book.imageLink,
            description: book.description,
            count: book.count,
            status: book.status,
            labels: book.labels
        });
    }

    readBook($key: string) {
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
    }

    updateBook(book: Book) {
        this.getConectToList().update(book.$key, {
            name: book.name,
            author: book.author,
            imageLink: book.imageLink,
            description: book.description,
            count: book.count,
            status: book.status,
            labels: book.labels
        });
    }

    deleteBook($key: string) {
        this.getConectToList().remove($key);
    }
}
