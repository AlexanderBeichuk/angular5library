import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Status } from '../models/status';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

    constructor(private firebase: AngularFireDatabase) { }

    getConnectToList() {
        return this.firebase.list('statuses');
    }

    getList(): Observable<any[]> {
        return this.firebase.list('/statuses').valueChanges();
    }

    add(status: Status) {
        this.getConnectToList().push({
            name: status.name
        });
    }

    update(status: Status) {
        this.getConnectToList().update(status.$key, {
            name: status.name
        });
    }

    delete($key: string) {
        this.getConnectToList().remove($key);
    }
}
