import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs/Observable';
import { StatusService } from '../../services/status.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

    tabs = [
        {
            name: 'All',
            count: 15,
            active: true
        },
        {
            name: 'Available',
            count: 3,
            active: false
        },
        {
            name: 'Unavailable',
            count: 4,
            active: false
        },
        {
            name: 'Futures',
            count: 8,
            active: false
        },
        {
            name: 'My',
            count: 0,
            active: false
        },
        {
            name: 'add to desired',
            count: 0,
            active: false
        }
    ];
    filterEnable:boolean = false;
    filterLabels: any[] = [];

    bookList;
    allBookList;

    constructor(private bookService: BookService, private statusService: StatusService) {
    }

    ngOnInit() {
        this.setAllBooks();
        console.log(this.bookList);
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

    /*private objectToArray(object): Array<any> {
        if (object) {
            return Object.keys(object).map(function (key) {
                return object[key];
            });
        }
        return [];
    }*/

    /*getList() {
        return ;
        /!*.map(book => {
            book.labels = this.objectToArray(book.labels);
            book.statuses = this.objectToArray(book.statuses);
            return book;*!/
        // });
    }*/
    addLabelToFilterFiltering(array, field, label): void {
        this.filterLabels.push(label);
        this.bookList = this.filterByLabel(array, field);
        console.log(this.bookList);
    }
    removeLabelFromFilterFiltering(labelName): void {
        _.remove(this.filterLabels, label => {
            return label.name === labelName;
        });
        if (this.filterLabels.length < 1) {
            this.clearSortAndFilters();
        } else {
            this.bookList = _.concat(this.filterByLabel(this.allBookList, 'labels'), this.filterByLabel(this.allBookList, 'statuses'));
        }
    }
    filterByLabel(array, field): any[] {
        let resArray = [];
        _.map(array, book => {
            if (book[field] && _.intersectionBy(book[field], this.filterLabels, 'name').length > 0) {
                resArray.push(book);
            }
            return book;
        });
        this.filterEnable = true;
        return resArray;
    }
    setAllBooks(): void {
        this.bookService.getList().subscribe(books => {
            this.bookList = books as Book[];
            this.allBookList = this.bookList;
        });
    }

    clearSortAndFilters(): void {
        this.setAllBooks();
        this.filterLabels = [];
        this.filterEnable = false;
    }

}
