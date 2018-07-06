import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { TakeBook } from '../../models/takeBook';
import { BookService } from '../../services/book.service';
import { TakeBookService } from '../../services/take-book.service';
import { AuthorizeService } from '../../services/authorize.service';
import { FormService } from '../../services/form.service';

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

    private todayDate = new Date();
    myDatePickerOptions: IMyDpOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        disableUntil: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() - 1 }
    };

    constructor(private tostr: ToastrService, private bookService: BookService, private takeBookService: TakeBookService, private authorizeService: AuthorizeService, private formService: FormService) {}

    ngOnInit() {
        this.selectTake = this.resetTake();
    }

    takeBook(): void {
        this.fillData();
        if (this.selectTake.$key == null && this.book.availableCount > 0) {
            this.takeBookService.add(this.selectTake);
            this.book.availableCount = this.book.availableCount - 1;
            this.bookService.update(this.book);
        }
        this.takeModal.hide();
        this.tostr.success('You take ' + this.book.name + ' book!');
    }

    fillData(): void {
        this.selectTake.endDate = this.date.to.jsdate.toString();
        this.selectTake.startDate = this.date.from.jsdate.toString();
        this.selectTake.book = this.book;
        this.selectTake.user = this.authorizeService.getUser().id;
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
}
