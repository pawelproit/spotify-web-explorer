import { TestBed } from '@angular/core/testing';

import { AccesToken } from './acces-token';

describe('AccesToken', () => {
  let service: AccesToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
