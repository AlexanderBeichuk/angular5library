import { Injectable, Inject } from '@angular/core';
import { Upload } from "../models/upload";
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

    constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) public firebaseApp: firebase.app.App) { }

    private basePath:string = '/uploads';
    private uploadTask: firebase.storage.UploadTask;

    pushUpload(upload: Upload) {
        const storageRef = this.firebaseApp.storage().ref();
        this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // загрузка в процессе
                var snapshotRef = snapshot as firebase.storage.UploadTaskSnapshot;
                var bytesTransferred = (snapshotRef).bytesTransferred;
                var totalBytes = (snapshotRef).totalBytes;
                upload.progress = (bytesTransferred / totalBytes) * 100;
            },
            (error) => {
                // ошибка при загрузке
                console.warn(error);
            },
            () => {
                // загрузка успешна
                upload.url = this.uploadTask.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.saveFileData(upload);
            }
        );
        return this.uploadTask;
    }

    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
    }

    deleteUpload(upload: Upload) {
        this.deleteFileData(upload.$key)
            .then( () => {
                this.deleteFileStorage(upload.name)
            })
            .catch(error => console.log(error))
    }

    // Deletes the file details from the realtime db
    private deleteFileData(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name:string) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete()
    }

}
