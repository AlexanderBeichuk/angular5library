import { Component, OnInit } from '@angular/core';
import { BookService } from "../../services/book.service";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

    tabs = [
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

    bookList;

    constructor(private bookService: BookService) {
    }

    ngOnInit() {
        this.bookList = this.bookService.getList();
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
