import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { TakeBook } from '../../models/takeBook';
import { BookService } from '../../services/book.service';
import { TakeBookService } from '../../services/take-book.service';
import { AuthorizeService } from '../../services/authorize.service';
import {WaitBookService} from '../../services/wait-book.service';
import {WaitBook} from '../../models/reserveBook';
import * as _ from 'lodash';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';

@Component({
    selector: 'app-take-book',
    templateUrl: './take-book.component.html',
    styleUrls: ['./take-book.component.scss']
})
export class TakeBookComponent implements OnInit {

    @Input() book;
    @ViewChild('takeModal') takeModal;

    selectTake: TakeBook = this.resetTake();
    date = {
        from: null,
        to: null
    };
    dateValid = false;
    currentUser;
    takenBook = null;
    private waitingList;

    private todayDate = new Date();
    myDatePickerOptions: IMyDpOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        disableUntil: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() - 1 }
    };

    constructor(private tostr: ToastrService, private bookService: BookService, private takeBookService: TakeBookService,
    private eventService: EventService, private authorizeService: AuthorizeService, private waitBookService: WaitBookService) {}

    ngOnInit() {
        this.setTakenBooks();
        this.selectTake = this.resetTake();
        this.currentUser = this.authorizeService.getUser();
    }

    takeBook(): void {
        this.fillData();
        if (this.selectTake.$key == null && this.book.availableCount > 0) {
            this.takeBookService.add(this.selectTake);
            this.book.availableCount = this.book.availableCount - 1;
            this.bookService.update(this.book);
            this.removeWaitingByUserBook(this.currentUser.id, this.book['$key']);
        }
        this.takeModal.hide();
        this.tostr.success('You taked book ' + this.book.name + ' book!');
        this.eventService.add(new Event(
            this.currentUser.id,
            `taked ${this.book.name}`,
            new Date().toString()
        ));
    }

    private fillData(): void {
        this.selectTake.endDate = this.date.to.jsdate.toString();
        this.selectTake.startDate = this.date.from.jsdate.toString();
        this.selectTake.book = this.book;
        this.selectTake.user = this.authorizeService.getUser().id;
    }

    private removeWaitingByUserBook(userId, bookId): void {
        this.waitBookService.getConnectToList().snapshotChanges().subscribe(item => {
            let removeWaitBook = null;
            item.forEach(element => {
                const waitBook: any = element.payload.toJSON();
                waitBook['$key'] = element.key;
                if (waitBook.book.id === bookId && waitBook.user === userId) {
                    removeWaitBook = waitBook;
                }
            });
            if (removeWaitBook !== null) {
                this.waitBookService.delete(removeWaitBook['$key']);
            }
        });
    }

    onDateChanged(event: IMyDateModel) {
        if ((this.date.from && this.date.from.jsdate > event.jsdate) ||
            (this.date.to && this.date.to.jsdate < event.jsdate)) {
            this.dateValid = false;
            this.tostr.error('The start date is longer than the end date');
        } else {
            this.dateValid = true;
        }
    }

    resetTake(): TakeBook {
        return {
            $key: null,
            startDate: null,
            endDate: null,
            book: null,
            user: '',
        };
    }

    private setTakenBooks(): void {
        this.takeBookService.getConnectToList().snapshotChanges().subscribe(item => {
            this.takenBook = null;
            item.forEach(element => {
                const takeBook = element.payload.toJSON();
                takeBook['$key'] = element.key;
                this.findTakenBook(takeBook);
            });
            this.findBookWaiting();
        });
    }

    private findTakenBook(takeBook): void {
        if (takeBook.book.id === this.book['$key'] && takeBook.user === this.authorizeService.getUser().id) {
            this.takenBook = takeBook;
        }
    }

    private findBookWaiting(): void {
        this.waitBookService.getConnectToList().snapshotChanges().subscribe(item => {
            this.waitingList = [];
            item.forEach(element => {
                const waitBook: any = element.payload.toJSON();
                waitBook['$key'] = element.key;
                if (waitBook.book.id === this.book['$key']) {
                    this.waitingList.push(waitBook as WaitBook);
                }
            });
        });
    }
    getCountWaitingForMe(): number {
        const userLength = _.findIndex(this.waitingList, waitBook => {
                return waitBook.user === this.authorizeService.getUser().id && waitBook.book.id === this.book['$key'];
            }) + 1;
        return userLength === 0 ? this.getWaitingListLength() : userLength;
    }

    private getWaitingListLength(): number {
        return this.waitingList ? this.waitingList.length + 1 : 0;
    }
}
