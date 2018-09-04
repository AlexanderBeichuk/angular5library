import { Component, OnInit, Input } from '@angular/core';
import {TakeBookService} from '../../services/take-book.service';
import {TakeBook} from '../../models/takeBook';
import * as _ from 'lodash';

@Component({
  selector: 'app-taken-list',
  templateUrl: './taken-list.component.html',
  styleUrls: ['./taken-list.component.scss']
})
export class TakenListComponent implements OnInit {

    @Input() user;
    @Input() cardOrientation;
    @Input() selectSortSelected;
    myBookList;

    private defaultMyBookList;

    currentDate = new Date();

    constructor(private takeBookService: TakeBookService) {}

    ngOnInit() {
        this.setMyTakeBookList();
    }

    private setMyTakeBookList() {
        this.takeBookService.getConnectToList().snapshotChanges().subscribe(item => {
            this.myBookList = [];
            item.forEach(element => {
                const takeBook: any = element.payload.toJSON();
                takeBook['$key'] = element.key;
                if (takeBook['user'] === this.user.id) {
                    takeBook.startDate = new Date(takeBook.startDate);
                    takeBook.endDate = new Date(takeBook.endDate);
                    takeBook.startDateStr = this.DateToStringFormat(takeBook.startDate);
                    takeBook.endDateStr = this.DateToStringFormat(takeBook.endDate);
                    this.myBookList.push(takeBook as TakeBook);
                }
            });
            this.defaultMyBookList = this.myBookList;
            if (this.selectSortSelected !== 'default') {
                this.myBookList = _.sortBy(this.myBookList, book => {
                    return book.endDate;
                });
            }
        });
    }

    private DateToStringFormat(date: Date): string {
        return (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + '.' +
            (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '.' + date.getFullYear();
    }

    selectSortChange(sortValue) {
        this.myBookList = sortValue === 'default' ? this.defaultMyBookList :
            _.sortBy(this.myBookList, book => {
                const sortValueSplit = sortValue.split('.');
                if (sortValueSplit[0] === 'book') {
                    return book.book[sortValueSplit[1]];
                }
                return book[sortValue];
            });
    }

}
