import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    currentUser;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.readUser();
    }

    readUser(): void {
        this.userService.getConnectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const user: any = element.payload.toJSON();
                user['$key'] = element.key;
                if (user.id === _.split(this.router.url, '/user/')[1]) {
                    this.currentUser = user;
                }
            });
        });
    }
}
