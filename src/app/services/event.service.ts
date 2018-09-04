import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from '../models/event';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    constructor(private firebase: AngularFireDatabase) {
    }

    getConnectToList() {
        return this.firebase.list('events');
    }

    add(event: Event) {
        this.getConnectToList().push({
            user: event.user,
            description: event.description,
            date: event.date,
        });
    }

    update(event: Event) {
        this.getConnectToList().update(event.$key, {
            user: event.user,
            description: event.description,
            date: event.date,
        });
    }

    delete($key: string) {
        this.getConnectToList().remove($key);
    }
}
