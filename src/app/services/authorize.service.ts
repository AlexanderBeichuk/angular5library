import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {
    constructor() {
    }

    setUser(user): void {
        localStorage.setItem('authorize', btoa(JSON.stringify(user)));
    }
    getUser(): any {
        return JSON.parse(atob(localStorage.getItem('authorize')));
    }
    clearUser(): any {
        localStorage.removeItem('authorize');
    }
}
