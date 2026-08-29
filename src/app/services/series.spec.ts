import { TestBed } from '@angular/core/testing';

import { Series } from './series';

describe('Series', () => {
  let service: Series;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Series);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
