import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

    @Input() activeBooks;
    @ViewChild('deleteModal') deleteModal;

    constructor(private bookService: BookService) {
    }

    ngOnInit() {
    }

    deleteBooks(): void {
        _.forEach(this.activeBooks, book => {
            this.bookService.delete(book['$key']);
        });
        this.deleteModal.hide();
    }

}
