import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {
    constructor() {
    }

    currentUser = this.getUser() || null;
    setUser(user): void {
        this.currentUser = user;
        localStorage.setItem('authorize', JSON.stringify(user));
    }
    getUser(): any {
        return JSON.parse(localStorage.getItem('authorize'));
    }
}
