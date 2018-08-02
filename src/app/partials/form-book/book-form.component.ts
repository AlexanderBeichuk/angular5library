import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book';
import { NgForm } from '@angular/forms';
import { LabelService } from '../../services/label.service';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../models/upload';
import { StatusService } from '../../services/status.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})

export class BookFormComponent implements OnInit {

    @Input() book;

    allLabelList: Observable<any>;
    allStatusList: Observable<any>;
    currentUpload: Upload;
    event: string;

    constructor(private bookService: BookService, private labelService: LabelService, private statusService: StatusService,
                private uploadService: UploadService, private tostr: ToastrService, private router: Router) { }

    ngOnInit() {
        this.book = this.book || this.resetBook();
        this.allLabelList = this.labelService.getList();
        this.allStatusList = this.statusService.getList();
        this.event = _.split(this.router.url, '/')[2];
    }

    addBook(bookForm: NgForm): void {
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
        const selectedFiles = event.target.files;
        this.uploadSingle(selectedFiles);
    }

    uploadSingle(selectedFiles) {
        const file = selectedFiles.item(0);
        this.currentUpload = new Upload(file);
        this.uploadService.pushUpload(this.currentUpload).then(response => {
            this.book.imageLink = this.currentUpload ? this.currentUpload.url : null;
        });
    }
}
