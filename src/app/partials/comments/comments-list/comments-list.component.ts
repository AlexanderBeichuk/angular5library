import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import {AuthorizeService} from '../../../services/authorize.service';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html',
    styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

    @Input() book;
    @Output() outputList = new EventEmitter();
    commentList = [];
    currentUser = this.authorizeService.getUser();

    constructor(private commentService: CommentService, private authorizeService: AuthorizeService) {
    }

    ngOnInit() {
        this.setAllComments();
    }

    private setAllComments(): void {
        this.commentService.getConectToList().snapshotChanges().subscribe(item => {
            this.commentList = [];
            item.forEach(element => {
                const comment = element.payload.toJSON();
                comment['$key'] = element.key;
                if (comment['book'] === this.book['$key'] || comment['book'] === this.book['id']) {
                    this.commentList.push(comment as Comment);
                }
            });
            this.outputList.emit(this.commentList);
        });
    }

    removeComment(comment): void {
        this.commentService.delete(comment['$key']);
    }

    dateFormat(date): string {
        date = new Date(date);
        return (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + '/' +
            (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '/' + date.getFullYear();
    }
}
