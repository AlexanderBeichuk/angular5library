import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

    public tabs = [
        {
            name: 'all',
            count: 15,
            active: true
        },
        {
            name: 'available',
            count: 3,
            active: false
        },
        {
            name: 'unavailable',
            count: 4,
            active: false
        },
        {
            name: 'futures',
            count: 8,
            active: false
        },
        {
            name: 'my',
            count: 0,
            active: false
        },
        {
            name: 'add to desired',
            count: 0,
            active: false
        }
    ];
    public books: Book[];

    constructor(private booksService: BooksService) {
    }

    ngOnInit() {
      this.booksService.getBooks()
          .subscribe(response => {
            this.books = response;
            console.log(this.books);
        });
    }

    getActiveTab(name) {
        this.tabs.map(function (tab) {
            if (name  === tab.name) {
                tab.active = true;
            } else {
                tab.active = false;
            }
            return tab;
        });
    }

}
