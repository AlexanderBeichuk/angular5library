import { TestBed, inject } from '@angular/core/testing';

import { WaitBookService } from '../wait-book.service';

describe('WaitBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaitBookService]
    });
  });

  it('should be created', inject([WaitBookService], (service: WaitBookService) => {
    expect(service).toBeTruthy();
  }));
});
