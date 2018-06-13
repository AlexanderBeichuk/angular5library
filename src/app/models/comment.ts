import { User } from './user';

export class Comment {
    $key: string;
    date: Date;
    text: string;
    user: User;
    score: string;
}
