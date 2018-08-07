import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { HelperService } from '../../services/helper.service';
import {YayFonFactory} from '@efendizadeh/yayfon-web-sdk/lib/YayFonFactory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    bookList;
    incomingCall = false;
    connection;

    constructor(private bookService: BookService, private helperService: HelperService) {
    }

    ngOnInit() {
        this.setAllBooks();
        this.aa();
    }

    private setAllBooks(): void {
        this.bookService.getConectToList().snapshotChanges().subscribe(item => {
            this.bookList = [];
            item.forEach(element => {
                const book = element.payload.toJSON();
                book['$key'] = element.key;
                book['active'] = false;
                book['labels'] = this.helperService.objectToArray(book['labels']);
                book['statuses'] = this.helperService.objectToArray(book['statuses']);
                this.bookList.push(book as Book);
            });
        });
    }

    aa() {
        const clientData = {
            login: 'alexander.beichuk_gmail.com',
            password: 'CMJqZHdLNUID1faojoJDNJQILHEeClmSrvJAYKqMD9tGvaL5',
            displayName: undefined,
        };

        this.connection = new YayFonFactory(clientData, this.onCall);
        this.connection.start();
    }

    onCall(call, userName) {
        const isIncoming = call.isIncomingCall();
        if (isIncoming) {
            call.onEnd(() => {
               console.log('end');
            });
            call.onFail((e) => {
                console.log('onFail', e);
            });
            call.onProgress(() => {
                this.incomingCall = true;
                console.log('onProgress');
            });
        }

        if (!isIncoming) {
            call.onEnd(() => {
                console.log('end');
            });
            call.onFail((e) => {
                console.log('onFail', e);
            });
            call.onAnswer(() => {
                console.log('onAnswer');
            });
        }
    }

    answer(remoteAudio) {
        this.connection.getAgentCall().answer(function (e) {
            remoteAudio.srcObject = e.stream;
            remoteAudio.play();
        });
    }

    call(remoteAudio) {
        this.connection.call('375299601611', function (e) {
            remoteAudio.srcObject = e.stream;
            remoteAudio.play();
        });
    }
}
