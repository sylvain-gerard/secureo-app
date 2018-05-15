import { TestBed, inject } from '@angular/core/testing';

import { PostingService } from './posting.service';

describe('PostingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostingService]
    });
  });

  it('should be created', inject([PostingService], (service: PostingService) => {
    expect(service).toBeTruthy();
  }));
});
