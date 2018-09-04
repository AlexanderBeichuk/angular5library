export class Event {
    $key: string;
    user: string;
    description: string;
    date: string;
    constructor(
        user: string,
        description: string,
        date: string
    ) {
        this.user = user;
        this.description = description;
        this.date = date;
    }
}
