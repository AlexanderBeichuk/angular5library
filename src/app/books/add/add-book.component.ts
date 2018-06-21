import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { NgForm } from '@angular/forms';
import { LabelService } from '../../services/label.service';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../services/book.service';
import { FormService } from '../../services/form.service';
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../models/upload';
import { StatusService } from '../../services/status.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

    book: Book = this.resetBook();

    allLabelList: Observable<any>;
    allStatusList: Observable<any>;
    selectedFiles: FileList;
    currentUpload: Upload;

    constructor(private bookService: BookService, private labelService: LabelService, private statusService: StatusService,
                private uploadService: UploadService, private tostr: ToastrService, private formService: FormService) { }

    ngOnInit() {
        this.allLabelList = this.labelService.getList();
        this.allStatusList = this.statusService.getList();
    }

    addBook(bookForm: NgForm): void {
        this.book.imageLink = this.currentUpload ? this.currentUpload.url : null;
        if (bookForm.value.$key == null) {
            this.bookService.add(this.book);
        } else {
            this.bookService.update(this.book);
        }
        /*this.resetForm();*/
        this.tostr.success('Success');
        this.allLabelList = this.labelService.getList();
    }

    setCounterAllBooks(count): void {
        console.log(this.book);
        if (count > 0 && count < 11) {
            this.book.allCount = count;
        }
    }

    setCounterAvailableBooks(count): void {
        if (count > 0 && count < 11) {
            this.book.availableCount = count;
        }
        if (this.book.availableCount > this.book.allCount) {
            this.book.availableCount = this.book.allCount;
        }
    }
    resetForm(): void {
        this.book = this.resetBook();
        this.allLabelList = this.labelService.getList();
    }

    private resetBook(): Book {
        return {
            $key: null,
            name: '',
            author: '',
            imageLink: '',
            description: '',
            allCount: 1,
            availableCount: 1,
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
        this.uploadSingle();
    }

    uploadSingle() {
        const file = this.selectedFiles.item(0);
        this.currentUpload = new Upload(file);
        this.uploadService.pushUpload(this.currentUpload);
    }
}
