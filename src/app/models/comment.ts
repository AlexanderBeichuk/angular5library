import { User } from './user';

export class Comment {
    $key: string;
    book: string;
    date: string;
    text: string;
    user: User;
    score: boolean;
}
