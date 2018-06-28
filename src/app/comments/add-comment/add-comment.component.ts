import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

    @Input() book;
    comment: Comment = {
        $key: '',
        book: '',
        date: null,
        text: '',
        user: null,
        score: null
    };

    constructor(private commentService: CommentService, private authorizeService: AuthorizeService) {
    }

    ngOnInit() {
    }

    addComment(): void {
        if (this.comment.text) {
            this.comment = {
                $key: '',
                book: this.book['$key'] || this.book['id'],
                date: new Date(),
                text: this.comment.text,
                user: this.authorizeService.getUser(),
                score: this.comment.score
            };
            this.commentService.add(this.comment);
            this.comment.text = '';
            this.comment.score = null;
        }
    }

    toggleScore(score): void {
        if (this.comment.score === score) {
            this.comment.score = null;
        } else {
            this.comment.score = score;
        }
    }
}
