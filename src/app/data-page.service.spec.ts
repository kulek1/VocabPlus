import { TestBed, inject } from '@angular/core/testing';

import { DataPageService } from './data-page.service';

describe('DataPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataPageService]
    });
  });

  it('should be created', inject([DataPageService], (service: DataPageService) => {
    expect(service).toBeTruthy();
  }));
});
