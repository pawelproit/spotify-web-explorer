import { TestBed } from '@angular/core/testing';

import { SearchServ } from './search-serv';

describe('SearchServ', () => {
  let service: SearchServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
