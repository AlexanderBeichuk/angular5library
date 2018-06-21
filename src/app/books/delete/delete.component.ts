import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import * as _ from 'lodash';
import { CommentService } from '../../services/comment.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

    @Input() activeBooks;
    @ViewChild('deleteModal') deleteModal;

    constructor(private bookService: BookService, private commentService: CommentService) {
    }

    ngOnInit() {
    }

    private deleteBookComments(book): void {
        this.commentService.getConectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const comment = element.payload.toJSON();
                comment['$key'] = element.key;
                if (comment['book'] === book['$key']) {
                    this.commentService.delete(comment['$key']);
                }
            });
        });
    }

    deleteBooks(): void {
        _.forEach(this.activeBooks, book => {
            this.deleteBookComments(book);
            this.bookService.delete(book['$key']);
        });
        this.deleteModal.hide();
    }

}
