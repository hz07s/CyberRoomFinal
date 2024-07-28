import { TestBed } from '@angular/core/testing';

import { ConnectedUsersService } from './connected-users.service';

describe('ConnectedUsersService', () => {
  let service: ConnectedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
