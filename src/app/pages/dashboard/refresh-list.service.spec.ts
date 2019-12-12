import { TestBed } from '@angular/core/testing';

import { RefreshListService } from './refresh-list.service';

describe('RefreshListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshListService = TestBed.get(RefreshListService);
    expect(service).toBeTruthy();
  });
});
