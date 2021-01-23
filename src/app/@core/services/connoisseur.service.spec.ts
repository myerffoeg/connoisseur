import { TestBed } from '@angular/core/testing';

import { ConnoisseurService } from './connoisseur.service';

describe('ConnoisseurService', () => {
  let service: ConnoisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnoisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
