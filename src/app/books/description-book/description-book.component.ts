import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-description-book',
    templateUrl: './description-book.component.html',
    styleUrls: ['./description-book.component.scss']
})
export class DescriptionBookComponent implements OnInit {

    constructor() {
    }

    @Input() book;
    @Input() title;

    ngOnInit() {
    }

}
