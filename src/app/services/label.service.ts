import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Label } from '../models/label';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

    constructor(private firebase: AngularFireDatabase) { }

    getConnectToList() {
        return this.firebase.list('labels');
    }

    getList(): Observable<any[]> {
        return this.firebase.list('/labels').valueChanges();
    }

    add(label: Label) {
        this.getConnectToList().push({
            name: label.name
        });
    }

    update(label: Label) {
        this.getConnectToList().update(label.$key, {
            name: label.name
        });
    }

    delete($key: string) {
        this.getConnectToList().remove($key);
    }
}
