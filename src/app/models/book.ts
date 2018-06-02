import {Label} from "./label";

export class Book {
    $key: string;
    name: string;
    author: string;
    imageLink: string;
    description: string;
    count: number;
    status: string;
    labels: Label[];
}
