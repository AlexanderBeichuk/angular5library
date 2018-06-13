import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';

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
            date: comment.date,
            text: comment.text,
            user: comment.user,
            score: comment.score
        });
    }

    update(comment: Comment) {
        this.getConectToList().update(comment.$key, {
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
