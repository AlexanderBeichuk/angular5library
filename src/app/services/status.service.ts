import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import {Status} from "../models/status";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

    constructor(private firebase: AngularFireDatabase) { }

    private getConectToList() {
        return this.firebase.list('statuses');
    }

    getStatusList() {
        var x = this.getConectToList();
        var list = [];
        x.snapshotChanges().subscribe(item => {
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                list.push(y as Status);
            });
        });
        return list;
    }

    addStatus(status: Status) {
        this.getConectToList().push({
            name: status.name,
            color: status.color
        });
    }

    /*readStatus($key: string) {
        var x = this.getConectToList();
        x.snapshotChanges().subscribe(item => {
            debugger;
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                if (y["$key"] === $key) {
                    return y;
                }
            });
        });
        return null;
    }*/

    updateStatus(status: Status) {
        this.getConectToList().update(status.$key, {
            name: status.name,
            color: status.color
        });
    }

    deleteStatus($key: string) {
        this.getConectToList().remove($key);
    }
}
