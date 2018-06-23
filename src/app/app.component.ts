import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from './services/authorize.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private authorizeService: AuthorizeService, private router: Router) {
    }

    ngOnInit () {
        if (!this.authorizeService.getUser()) {
            this.router.navigate(['/login']);
        }
    }
}
