import { TestBed } from '@angular/core/testing';

import { Summary, SummaryService } from './summary';

describe('Summary', () => {
  let service: SummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
