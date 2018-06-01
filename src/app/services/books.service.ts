import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
      return this.http.get<Book[]>('/assets/data/books.json')
          .catch(this.errorHandler);

  }

  errorHandler(error: HttpErrorResponse) {
      return Observable.throw(error.message || 'Server error');
  }
}