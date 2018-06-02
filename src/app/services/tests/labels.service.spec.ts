import { TestBed, inject } from '@angular/core/testing';

import { LabelsService } from '../label.service';

describe('LabelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabelsService]
    });
  });

  it('should be created', inject([LabelsService], (service: LabelsService) => {
    expect(service).toBeTruthy();
  }));
});
