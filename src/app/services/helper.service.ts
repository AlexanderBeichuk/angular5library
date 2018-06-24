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
}
