import {Component, OnInit} from '@angular/core';
import {TakeBookService} from '../../services/take-book.service';
import {AuthorizeService} from '../../services/authorize.service';
import {TakeBook} from '../../models/takeBook';

@Component({
    selector: 'app-my-books',
    templateUrl: './my-books.component.html',
    styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {

    constructor(private authorizeService: AuthorizeService) {}

    currentUser = this.authorizeService.getUser();

    ngOnInit() {

    }

}
