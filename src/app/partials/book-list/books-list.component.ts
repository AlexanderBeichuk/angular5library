import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { AuthorizeService } from '../../services/authorize.service';
import * as _ from 'lodash';
import { HelperService } from '../../services/helper.service';
import { SearchService } from '../../services/search.service';
import { LabelService } from '../../services/label.service';
import { StatusService } from '../../services/status.service';

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
            name: 'add-book to desired',
            count: 0,
            active: false
        }
    ];
    filterEnable = false;
    showAllLabels = false;
    labelList = [];
    dropdownSelectLabels = [];

    bookList: Book[];
    allBookList: Book[];

    currentUser: any = this.authorizeService.getUser();

    constructor(private bookService: BookService, private authorizeService: AuthorizeService, private helperService: HelperService,
                public searchService: SearchService, private labelService: LabelService, private statusService: StatusService) {}

    ngOnInit() {
        this.setAllBooks();
        this.setLabelStatusList();
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

    removeLabelFromFilterFiltering(labelName): void {
        _.remove(this.dropdownSelectLabels, label => {
            return label.name === labelName;
        });
        if (this.dropdownSelectLabels.length < 1) {
            this.clearSortAndFilters();
        } else {
            this.bookList = _.concat(this.filterByLabels(this.allBookList, 'labels', null), this.filterByLabels(this.allBookList, 'statuses', null));
        }
    }

    filterByLabels(array, field, currentArray): any[] {
        let resArray = [];
        _.map(array, book => {
            if (book[field] && _.intersectionBy(book[field], this.dropdownSelectLabels, 'name').length > 0) {
                resArray.push(book);
            }
            return book;
        });
        if (currentArray && this.dropdownSelectLabels.length > 1) {
            resArray = _.uniq(_.concat(currentArray, resArray));
        }
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
        this.dropdownSelectLabels = [];
        this.filterEnable = false;
    }

    sortList(bookList): void {
        this.bookList = bookList;
    }

    private setLabelStatusList(): void {
        this.statusService.getConectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const status = element.payload.toJSON();
                status['id'] = element.key + '-field-statuses';
                this.labelList.push(status);
            });
            this.setLabelList();
        });
    }
    private setLabelList(): void {
        this.labelService.getConectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const label = element.payload.toJSON();
                label['id'] = element.key + '-field-labels';
                this.labelList.push(label);
            });
            this.showAllLabels = true;
        });
    }

    setLabelSettings() {
        return {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            enableCheckAll: true,
            allowSearchFilter: true
        };
    }

    onItemSelect(label: any) {
        if (this.dropdownSelectLabels.length > 0) {
            this.bookList = this.filterByLabels(this.allBookList, label.id.split('-field-')[1], this.bookList);
        } else {
            this.clearSortAndFilters();
        }
    }
    OnItemDeSelect(label: any) {
        this.removeLabelFromFilterFiltering(label.name);
    }
    onSelectAll(labels: any) {
        this.bookList = this.allBookList;
    }
    onDeSelectAll(labels: any) {
        this.clearSortAndFilters();
    }
}
