import { Label } from './label';
import { Status } from './status';

export class Book {
    $key: string;
    name: string;
    author: string;
    imageLink: string;
    description: string;
    count: number;
    statuses: Status[];
    labels: Label[];
}
