import { TestBed, inject } from '@angular/core/testing';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModalModule.forRoot(),
      ],
      providers: [
        ModalService,
      ],
    });
  });

  it('should ...', inject([ModalService], (service: ModalService) => {
    expect(service).toBeTruthy();
  }));
});
