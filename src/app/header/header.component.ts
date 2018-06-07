import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { AuthorizeService } from '../services/authorize.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    tabs = [
        {
            name: 'Home',
            path: '/home',
            active: true
        },
        {
            name: 'Books',
            path: '/books',
            active: false
        },
        {
            name: 'Settings',
            path: '/settings',
            active: false
        }

    ];
    currentUser: any = this.authorizeService.currentUser;

    constructor(location: Location, private authorizeService: AuthorizeService) {
        this.getActiveTab(location.path());
    }

    getActiveTab(path) {
        this.tabs.map(function (tab) {
            if (path === tab.path) {
                tab.active = true;
            } else {
                tab.active = false;
            }
            return tab;
        });
    }

    ngOnInit() {
        this.currentUser = this.authorizeService.getUser();
        console.log(this.currentUser);
    }

}
