import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import {AuthorizeService} from '../../../services/authorize.service';
import {HelperService} from '../../../services/helper.service';

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
    dateFormat = this.helperService.dateFormat;

    constructor(private commentService: CommentService, private authorizeService: AuthorizeService, private helperService: HelperService) {
    }

    ngOnInit() {
        this.setAllComments();
    }

    private setAllComments(): void {
        this.commentService.getConnectToList().snapshotChanges().subscribe(item => {
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
}
