import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {
    constructor() {
    }

    setUser(user): void {
        localStorage.setItem('authorize', JSON.stringify(user));
    }
    getUser(): any {
        return JSON.parse(localStorage.getItem('authorize'));
    }
}
