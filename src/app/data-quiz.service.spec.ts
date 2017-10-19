import { TestBed, inject } from '@angular/core/testing';

import { DataQuizService } from './data-quiz.service';

describe('DataQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataQuizService]
    });
  });

  it('should be created', inject([DataQuizService], (service: DataQuizService) => {
    expect(service).toBeTruthy();
  }));
});
