import { TestBed } from '@angular/core/testing';

import { CategorysService } from './category.service';

describe('CategorysService', () => {
  let service: CategorysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
