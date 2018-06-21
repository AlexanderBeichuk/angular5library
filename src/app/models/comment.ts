import { User } from './user';

export class Comment {
    $key: string;
    book: string;
    date: Date;
    text: string;
    user: User;
    score: boolean;
}
