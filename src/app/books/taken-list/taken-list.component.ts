import { Component, OnInit, Input } from '@angular/core';
import {TakeBookService} from '../../services/take-book.service';
import {TakeBook} from '../../models/takeBook';

@Component({
  selector: 'app-taken-list',
  templateUrl: './taken-list.component.html',
  styleUrls: ['./taken-list.component.scss']
})
export class TakenListComponent implements OnInit {

    @Input() user;
    myBookList;

    constructor(private takeBookService: TakeBookService) {}

    ngOnInit() {
        this.setMyTakeBookList();
    }

    private setMyTakeBookList() {
        this.takeBookService.getConectToList().snapshotChanges().subscribe(item => {
            this.myBookList = [];
            item.forEach(element => {
                const takeBook: any = element.payload.toJSON();
                takeBook['$key'] = element.key;
                if (takeBook['user'] === this.user.id) {
                    takeBook.startDateStr = this.DateToStringFormat(new Date(takeBook.startDate));
                    takeBook.endDateStr = this.DateToStringFormat(new Date(takeBook.endDate));
                    this.myBookList.push(takeBook as TakeBook);
                }
            });
        });
    }

    private DateToStringFormat(date: Date): string {
        return (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + '.' +
            (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '.' + date.getFullYear();
    }

}
