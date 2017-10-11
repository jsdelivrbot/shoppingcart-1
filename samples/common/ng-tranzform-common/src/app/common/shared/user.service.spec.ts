import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TranslateModule } from '@ngx-translate/core';

import { WebAuthenticationApi } from '@tranzform/client-auth';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        WebAuthenticationApi,
        UserService,
        {
          provide: XHRBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
