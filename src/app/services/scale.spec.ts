import { TestBed } from '@angular/core/testing';

import { Scale } from './scale';

describe('Scale', () => {
  let service: Scale;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Scale);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
