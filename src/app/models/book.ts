import { Label } from './label';
import { Status } from './status';

export class Book {
    $key: string;
    name: string;
    author: string;
    imageLink: string;
    description: string;
    allCount: number;
    availableCount: number;
    statuses: Status[];
    labels: Label[];
}
