import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { AuthorizeService } from '../../services/authorize.service';
import * as _ from 'lodash';
import { HelperService } from '../../services/helper.service';
import { SearchService } from '../../services/search.service';

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
    filterEnable = false;
    filterLabels: any[] = [];
    allCheckBox = false;
    activeBooksArray = [];

    bookList: Book[];
    allBookList: Book[];

    currentUser: any = this.authorizeService.getUser();

    constructor(private bookService: BookService, private authorizeService: AuthorizeService, private helperService: HelperService, public searchService: SearchService) {}

    ngOnInit() {
        this.setAllBooks();
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

    addLabelToFilterFiltering(array, field, label): void {
        this.filterLabels.push(label);
        this.bookList = this.filterByLabel(array, field);
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
        const resArray = [];
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
        this.bookService.getConectToList().snapshotChanges().subscribe(item => {
            this.bookList = [];
            this.allBookList = [];
            item.forEach(element => {
                const book = element.payload.toJSON();
                book['$key'] = element.key;
                book['active'] = false;
                book['labels'] = this.helperService.objectToArray(book['labels']);
                book['statuses'] = this.helperService.objectToArray(book['statuses']);
                this.bookList.push(book as Book);
                this.allBookList.push(book as Book);
            });
        });
    }

    clearSortAndFilters(): void {
        this.setAllBooks();
        this.filterLabels = [];
        this.filterEnable = false;
    }

    toggleAllCheckBox(): void {
        if (this.activeBooksArray.length > 0) {
            this.activeBooksArray = [];
            _.forEach(this.bookList, book => {
                book.active = false;
            });
        } else {
            _.forEach(this.bookList, book => {
                book.active = true;
                this.activeBooksArray.push(book);
            });
        }
    }

    toggleBookCheckBox(book): void {
        if (book.active) {
            this.activeBooksArray.push(book);
        } else {
            _.remove(this.activeBooksArray, bk => {
                return bk['$key'] === book['$key'];
            });
        }
        if (this.activeBooksArray.length > 0) {
            this.allCheckBox = true;
        } else {
            this.allCheckBox = false;
        }
    }

    setAllCheckBox(allCheckBox): void {
        this.allCheckBox = allCheckBox;
        this.activeBooksArray = [];
    }

    sortList(bookList): void {
        this.bookList = bookList;
    }
}
