import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TakeBookService } from '../../services/take-book.service';
import { BookService } from '../../services/book.service';

@Component({
    selector: 'app-return-book',
    templateUrl: './return-book.component.html',
    styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {

    @Input() takeBook;

    constructor(private takeBookService: TakeBookService, private bookService: BookService, private toastr: ToastrService) {}

    ngOnInit() {
    }

    returnBook(): void {
        this.bookService.getConectToList().snapshotChanges().subscribe(item => {
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
            this.toastr.success('You return ' + book.name + ' book!');
        }
    }

}
