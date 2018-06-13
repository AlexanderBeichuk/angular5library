import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private firebase: AngularFireDatabase) {
    }

    getConnectToList() {
        return this.firebase.list('users');
    }

    add(user) {
        this.getConnectToList().push({
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            id: user.id
        });
    }

        update(key, user) {
        this.getConnectToList().update(key, {
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            id: user.id
        });
    }

    delete($key: string) {
        this.getConnectToList().remove($key);
    }
}
