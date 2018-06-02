import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book";
import {Label} from "../../models/label";
import { NgForm } from '@angular/forms'
import { LabelService } from '../../services/label.service';
import { ToastrService } from 'ngx-toastr';
import {BookService} from "../../services/book.service";
import {FormService} from "../../services/form.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

    book: Book = {
        $key: null,
        name: '',
        author: '',
        imageLink: '',
        description: '',
        count: 1,
        status: '',
        labels: []
    };

    allLabelList: Label[];

    resetForm(form): void {
        this.formService.resetForm(form);
        this.allLabelList = this.labelService.getLabelList();
        this.book.labels = [];
        this.book.count = 1;
    }

    constructor(private bookService: BookService, private labelService: LabelService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.allLabelList = this.labelService.getLabelList();
    }

    addLabel(bookForm: NgForm): void {
        if (bookForm.value.$key == null) {
            this.bookService.addBook(this.book);
        } else {
            this.bookService.updateBook(this.book);
        }
        this.resetForm(bookForm);
        this.tostr.success('Success');
        this.allLabelList = this.labelService.getLabelList();
    }

    toggleLabelsInArray(arrayFrom, arrayTo, item): void {
        var index = arrayFrom.indexOf(item);
        if (index > -1) {
            arrayFrom.splice(index, 1);
            arrayTo.push({
                name: item.name,
                color: item.color
            });
        }
    }

    setCounterOfBooks(count): void {
        if (this.validateCounter(count)) {
            this.book.count = count;
        }
    }

    validateCounter(count): boolean {
        return count > 0 && count < 11 ? true : false;
    }

}
