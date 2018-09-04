import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TakeBookService } from '../../services/take-book.service';
import { BookService } from '../../services/book.service';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';

@Component({
    selector: 'app-return-book',
    templateUrl: './return-book.component.html',
    styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {

    @Input() takeBook;

    constructor(private takeBookService: TakeBookService, private bookService: BookService, private toastr: ToastrService, private eventService: EventService) {}

    ngOnInit() {
    }

    returnBook(): void {
        this.bookService.getConnectToList().snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const book: any = element.payload.toJSON();
                book['$key'] = element.key;
                this.updateBooks(book);
            });
        });
    }

    private updateBooks(book): void {
        if (book['$key'] === this.takeBook.book.id) {
            book.availableCount = book.availableCount + 1;
            this.bookService.update(book);
            this.takeBookService.delete(this.takeBook['$key']);
            this.toastr.success('You returned book ' + book.name + ' book!');
            this.eventService.add(new Event(
                this.takeBook.user,
                `returned ${book.name}`,
                new Date().toString()
            ));
        }
    }

}
