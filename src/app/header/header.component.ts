import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthorizeService } from '../services/authorize.service';
import * as _ from 'lodash';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    tabs = [
        {
            name: 'Home',
            path: ['/home', '', '/login'],
            active: true
        },
        {
            name: 'Books',
            path: ['/books'],
            active: false
        },
        {
            name: 'Settings',
            path: ['/settings'],
            active: false
        }

    ];
    currentUser: any = this.authorizeService.getUser();

    constructor(location: Location, private authorizeService: AuthorizeService, private router: Router) {
        this.getActiveTab([location.path()]);
    }

    getActiveTab(path) {
        _.map(this.tabs, tab => {
            if (_.find(tab.path, pth => {return pth === path[0]}) !== undefined) {
                this.router.navigate([tab.path[0]]);
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
