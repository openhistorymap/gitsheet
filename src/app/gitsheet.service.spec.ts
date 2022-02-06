import { TestBed } from '@angular/core/testing';

import { GitsheetService } from './gitsheet.service';

describe('GitsheetService', () => {
  let service: GitsheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitsheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
