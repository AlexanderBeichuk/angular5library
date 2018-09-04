import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import * as _ from 'lodash';
import { CommentService } from '../../services/comment.service';
import { TakeBookService } from '../../services/take-book.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

    @Input() book;
    @ViewChild('deleteModal') deleteModal;

    constructor(private bookService: BookService, private commentService: CommentService, private takeBookService: TakeBookService) {
    }

    ngOnInit() {
    }

    private deleteBookComments(book): void {
        this.commentService.getConnectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const comment = element.payload.toJSON();
                comment['$key'] = element.key;
                if (comment['book'] === book['$key']) {
                    this.commentService.delete(comment['$key']);
                }
            });
        });
    }

    private deleteBookTakeList(book): void {
        this.takeBookService.getConnectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const record = element.payload.toJSON();
                record['$key'] = element.key;
                if (record['book'] === book['$key']) {
                    this.takeBookService.delete(record['$key']);
                }
            });
        });
    }

    deleteBook(): void {
        this.deleteBookComments(this.book);
        this.deleteBookTakeList(this.book);
        this.bookService.delete(this.book['$key']);
        this.deleteModal.hide();
    }

}
