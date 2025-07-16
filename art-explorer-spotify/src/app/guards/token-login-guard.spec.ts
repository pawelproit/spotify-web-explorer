import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tokenLoginGuard } from './token-login-guard';

describe('tokenLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tokenLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
