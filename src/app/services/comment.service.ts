import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
    constructor(private firebase: AngularFireDatabase) {
    }

    getConectToList() {
        return this.firebase.list('comments');
    }

    add(comment: Comment) {
        this.getConectToList().push({
            book: comment.book,
            date: comment.date,
            text: comment.text,
            user: comment.user,
            score: comment.score
        });
    }

    update(comment: Comment) {
        this.getConectToList().update(comment.$key, {
            book: comment.book,
            date: comment.date,
            text: comment.text,
            user: comment.user,
            score: comment.score
        });
    }

    delete($key: string) {
        this.getConectToList().remove($key);
    }
}
