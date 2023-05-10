import { TestBed } from '@angular/core/testing';

import { PubgService } from './pubg.service';

describe('PubgService', () => {
  let service: PubgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
