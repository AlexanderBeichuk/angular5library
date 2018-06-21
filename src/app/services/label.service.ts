import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Label } from '../models/label';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

    constructor(private firebase: AngularFireDatabase) { }

    getConectToList() {
        return this.firebase.list('labels');
    }

    getList(): Observable<any[]> {
        return this.firebase.list('/labels').valueChanges();
    }

    add(label: Label) {
        this.getConectToList().push({
            name: label.name,
            color: label.color
        });
    }

    /*readLabel($key: string) {
        var x = this.getConectToList();
        var result = null;
        x.snapshotChanges().subscribe(item => {
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                if (y["$key"] === $key) {
                    return y;
                }
            });
        });
        //return result;
     }*/

    update(label: Label) {
        this.getConectToList().update(label.$key, {
            name: label.name,
            color: label.color
        });
    }

    delete($key: string) {
        this.getConectToList().remove($key);
    }
}
