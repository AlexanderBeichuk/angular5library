import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() {
    }

    objectToArray(object): Array<any> {
        if (object) {
            return Object.keys(object).map(function (key) {
                return object[key];
            });
        }
        return [];
    }

    dateFormat(date: string): string {
        const d = new Date(date);
        return (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + '/' +
            (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '/' + d.getFullYear();
    }
}
