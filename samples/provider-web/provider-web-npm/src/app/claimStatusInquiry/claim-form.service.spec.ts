import { TestBed, inject } from '@angular/core/testing';

import { ClaimFormService } from './claim-form.service';

describe('ClaimFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClaimFormService]
    });
  });

  it('should ...', inject([ClaimFormService], (service: ClaimFormService) => {
    expect(service).toBeTruthy();
  }));

  it('setter getter methods',  inject([ClaimFormService], (service: ClaimFormService) => {
    const data = {
      memberfirstname: '',
      membermiddlename: '',
      memberlastname: '',
    };
    service.setFormData(data);
    const getData = service.getFormData();
    expect(getData).toEqual(data);
  }));

});
