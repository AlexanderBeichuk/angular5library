import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book";
import {Label} from "../../models/label";
import { NgForm } from '@angular/forms'
import { LabelService } from '../../services/label.service';
import { ToastrService } from 'ngx-toastr';
import {BookService} from "../../services/book.service";
import {FormService} from "../../services/form.service";
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../models/upload';
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
    selectedFiles: FileList;
    currentUpload: Upload;

    constructor(private bookService: BookService, private labelService: LabelService, private statusService: StatusService,
                private uploadService: UploadService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.allLabelList = this.labelService.getList();
        this.allStatusesList = this.statusService.getList();
    }

    addBook(bookForm: NgForm): void {
        this.book.imageLink = this.currentUpload.url;
        if (bookForm.value.$key == null) {
            this.bookService.add(this.book);
        } else {
            this.bookService.update(this.book);
        }
        /*this.resetForm();*/
        this.tostr.success('Success');
        this.allLabelList = this.labelService.getList();
    }

    setCounterOfBooks(count): void {
        if (count > 0 && count < 11) {
            this.book.count = count;
        }
    }

    resetForm(): void {
        this.book = this.resetBook();
        this.allLabelList = this.labelService.getList();
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

    detectFiles(event) {
        this.selectedFiles = event.target.files;
    }

    uploadSingle() {
        let file = this.selectedFiles.item(0);
        this.currentUpload = new Upload(file);
        this.uploadService.pushUpload(this.currentUpload)
    }
}
