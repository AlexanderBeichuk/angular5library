import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    tabs = [
        {
            name: 'Home',
            path: '',
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

    constructor(location: Location) {
       this.getActiveTab(location.path());
    }

    getActiveTab(path) {
        this.tabs.map(function (tab) {
            if (path  === tab.path) {
                tab.active = true;
            } else {
                tab.active = false;
            }
            return tab;
        });
    }

  ngOnInit() {
  }

}
