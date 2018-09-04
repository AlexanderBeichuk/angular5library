import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
    constructor(private firebase: AngularFireDatabase) {
    }

    getConnectToList() {
        return this.firebase.list('comments');
    }

    add(comment: Comment) {
        this.getConnectToList().push({
            book: comment.book,
            date: comment.date,
            text: comment.text,
            user: comment.user,
            score: comment.score
        });
    }

    update(comment: Comment) {
        this.getConnectToList().update(comment.$key, {
            book: comment.book,
            date: comment.date,
            text: comment.text,
            user: comment.user,
            score: comment.score
        });
    }

    delete($key: string) {
        this.getConnectToList().remove($key);
    }
}
