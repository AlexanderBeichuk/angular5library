import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book";
import {Label} from "../../models/label";
import { NgForm } from '@angular/forms'
import { LabelService } from '../../services/label.service';
import { ToastrService } from 'ngx-toastr';
import {BookService} from "../../services/book.service";
import {FormService} from "../../services/form.service";
import {Status} from "../../models/status";
import {StatusService} from "../../services/status.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

    book: Book = this.resetBook();

    allLabelList: Label[];
    allStatusesList: Status[];

    constructor(private bookService: BookService, private labelService: LabelService, private statusService: StatusService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.allLabelList = this.labelService.getLabelList();
        this.allStatusesList = this.statusService.getStatusList();
    }

    addLabel(bookForm: NgForm): void {
        if (bookForm.value.$key == null) {
            this.bookService.addBook(this.book);
        } else {
            this.bookService.updateBook(this.book);
        }
        /*this.resetForm();*/
        this.tostr.success('Success');
        this.allLabelList = this.labelService.getLabelList();
    }

    setCounterOfBooks(count): void {
        if (count > 0 && count < 11) {
            this.book.count = count;
        }
    }

    resetForm(): void {
        this.book = this.resetBook();
        this.allLabelList = this.labelService.getLabelList();
    }

    resetBook(): Book {
        return {
            $key: null,
            name: '',
            author: '',
            imageLink: '',
            description: '',
            count: 1,
            statuses: [],
            labels: []
        };
    }

    setActiveLabels(labels) {
        this.book.labels = labels;
    }

    setActiveStatuses(statuses) {
        this.book.statuses = statuses;
    }
}
