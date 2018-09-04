import {Component, OnInit, Input} from '@angular/core';
import {WaitBookService} from '../../services/wait-book.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import * as _ from 'lodash';
import {Book} from '../../models/book';

@Component({
    selector: 'app-wait-list',
    templateUrl: './wait-list.component.html',
    styleUrls: ['./wait-list.component.scss']
})
export class WaitListComponent implements OnInit {

    @Input() book;
    @Input() user;
    @Input() cardOrientation;

    bookList = [];
    userList = [];

    constructor(private waitBookService: WaitBookService, private userService: UserService) {
    }

    ngOnInit() {
        this.setWaitList();
    }

    private setWaitList(): void {
        this.waitBookService.getConnectToList().snapshotChanges().subscribe(item => {
            const userIdList = [];
            item.forEach(element => {
                const wb: any = element.payload.toJSON();
                wb['$key'] = element.key;
                if (this.book && this.book['$key'] === wb.book.id) {
                    userIdList.push(wb.user as string);
                } else if (this.user && this.user.id === wb.user) {
                    this.bookList.push(wb.book as Book);
                }
            });
            this.getUserListById(userIdList);
        });
    }

    private getUserListById(userIdList): void {
        this.userService.getConnectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const user: any = element.payload.toJSON();
                user['$key'] = element.key;
                if (_.find(userIdList, usrId => { return usrId === user.id; })) {
                    this.userList.push(user as User);
                }
            });
            _.reverse(this.userList);
        });
    }
}
