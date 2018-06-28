import {Component, OnInit} from '@angular/core';
import {TakeBookService} from '../../services/take-book.service';
import {AuthorizeService} from '../../services/authorize.service';
import {BookService} from '../../services/book.service';
import {TakeBook} from '../../models/takeBook';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-my-books',
    templateUrl: './my-books.component.html',
    styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {

    myBookList;

    constructor(private takeBookService: TakeBookService, private authorizeService: AuthorizeService) {}

    ngOnInit() {
        this.setMyTakeBookList();
    }

    private setMyTakeBookList() {
        this.takeBookService.getConectToList().snapshotChanges().subscribe(item => {
            this.myBookList = [];
            item.forEach(element => {
                const takeBook: any = element.payload.toJSON();
                takeBook['$key'] = element.key;
                if (takeBook['user'] === this.authorizeService.getUser().id) {
                    takeBook.startDateStr = this.DateToStringFormat(new Date(takeBook.startDate));
                    takeBook.endDateStr = this.DateToStringFormat(new Date(takeBook.endDate));
                    this.myBookList.push(takeBook as TakeBook);
                }
            });
            console.log(this.myBookList);
        });
    }

    private DateToStringFormat(date: Date): string {
        return (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + '.' +
            (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '.' + date.getFullYear();
    }
}
