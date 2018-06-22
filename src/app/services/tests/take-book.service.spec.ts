import { TestBed, inject } from '@angular/core/testing';

import { TakeBookService } from '../take-book.service';

describe('TakeBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TakeBookService]
    });
  });

  it('should be created', inject([TakeBookService], (service: TakeBookService) => {
    expect(service).toBeTruthy();
  }));
});
