import { TestBed } from '@angular/core/testing';

import { MainCategorysService } from './mainCategory.service';

describe('MainCategorysService', () => {
  let service: MainCategorysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainCategorysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
