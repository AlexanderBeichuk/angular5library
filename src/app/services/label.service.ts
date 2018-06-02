import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { Label } from '../models/label';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

    constructor(private firebase: AngularFireDatabase) { }

    private getConectToList() {
        return this.firebase.list('labels');
    }

    getLabelList() {
        var x = this.getConectToList();
        var list = [];
        x.snapshotChanges().subscribe(item => {
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                list.push(y as Label);
            });
        });
        return list;
    }

    addLabel(label: Label) {
        this.getConectToList().push({
            name: label.name,
            color: label.color
        });
    }

    readLabel($key: string) {
        var x = this.getConectToList();
        x.snapshotChanges().subscribe(item => {
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                if (y["$key"] === $key) {
                    return y;
                }
            });
        });
        return null;
     }

    updateLabel(label: Label) {
        this.getConectToList().update(label.$key, {
            name: label.name,
            color: label.color
        });
    }

    deleteLabel($key: string) {
        this.getConectToList().remove($key);
    }
}
