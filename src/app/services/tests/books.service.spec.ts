import { TestBed, inject } from '@angular/core/testing';

import { BooksService } from '../book.service';

describe('BooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksService]
    });
  });

  it('should be created', inject([BooksService], (service: BooksService) => {
    expect(service).toBeTruthy();
  }));
});
