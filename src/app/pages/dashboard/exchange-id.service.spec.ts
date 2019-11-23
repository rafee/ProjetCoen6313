import { TestBed } from '@angular/core/testing';

import { ExchangeIdService } from './exchange-id.service';

describe('ExchangeIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExchangeIdService = TestBed.get(ExchangeIdService);
    expect(service).toBeTruthy();
  });
});
