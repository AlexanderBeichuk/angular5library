import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthorizeService } from '../services/authorize.service';
import * as _ from 'lodash';
import { AuthService } from 'angular5-social-login';
import {SearchService} from '../services/search.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    private allTabs = [
        {
            name: 'Home',
            pathes: ['/home'],
            roles: ['user', 'admin'],
            active: true
        },
        {
            name: 'Books',
            pathes: ['/books'],
            roles: ['user', 'admin'],
            active: false
        },
        {
            name: 'Settings',
            pathes: ['/settings'],
            roles: ['admin'],
            active: false
        }

    ];
    showTabs = [];
    authorize = this.authorizeService;
    search: string;

    constructor(private location: Location, private authorizeService: AuthorizeService, private router: Router, private socialAuthService: AuthService, private searchService: SearchService) {}

    ngOnInit() {
        this.getShowTabs();
        this.getActiveTab([this.location.path()]);
    }

    getShowTabs(): void {
        _.forEach(this.allTabs, tab => {
            this.showTabs.push(tab);
        });
    }

    showTabByRole(tab): object {
        return this.authorize.getUser() && _.find(tab.roles, role => { return role === this.authorize.getUser().role });
    }

    getActiveTab(path): void {
        _.forEach(this.showTabs, tab => {
            if (_.find(tab.pathes, pth => { return pth === path[0] }) !== undefined) {
                this.router.navigate([tab.pathes[0]]);
                tab.active = true;
            } else {
                tab.active = false;
            }
        });
    }

    signOut(): void {
        this.socialAuthService.signOut().then(
            (response) => {
                this.authorizeService.clearUser();
                this.router.navigate(['/login']);
            }
        );
    }

    setSearch(): void {
        this.router.navigate(['/books']);
        this.searchService.setSeasch(this.search);
    }

}
