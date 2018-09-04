import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';
import * as _ from 'lodash';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {reject} from "q";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    eventList = [];
    dateFormat = this.helperService.dateFormat;
    constructor(private eventService: EventService, private helperService: HelperService, private userService: UserService) {
    }

    ngOnInit() {
        this.getUsers()
            .then((users) => {
                this.setEvents(users);
            });
    }

    private setEvents(users: Array<User>): void {
        this.eventService.getConnectToList().snapshotChanges().subscribe(item => {
            this.eventList = [];
            item.forEach(element => {
                const event = element.payload.toJSON();
                event['$key'] = element.key;
                event['user'] = _.find(users, (user) => {
                    return user.id === event['user'];
                });
                this.eventList.push(event);
            });
            this.eventList = _.reverse(this.eventList);
        });
    }

    private getUsers(): Promise<Array<User>> {
        return new Promise((resolve, rej) => {
            this.userService.getConnectToList().snapshotChanges().subscribe(item => {
                const userList: Array<User> = [];
                item.forEach(element => {
                    const user = element.payload.toJSON();
                    user['$key'] = element.key;
                    userList.push(user as User);
                });
                resolve(userList);
            }, (error) => {
                rej(error);
            });
        });
    }
}
