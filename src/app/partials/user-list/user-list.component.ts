import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import * as _ from 'lodash';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    @Input() count;
    userList;

    ngOnInit() {
        this.setList();
    }

    private setList(): void {
        this.userService.getConnectToList().snapshotChanges().subscribe(item => {
            this.userList = [];
            item.forEach(element => {
                const user = element.payload.toJSON();
                user['$key'] = element.key;
                if (this.userList.length !== this.count) {
                    this.userList.push(user as User);
                }
            });
            this.userList = _.sortBy(this.userList, user => { return user.name; });
        });
    }

}
