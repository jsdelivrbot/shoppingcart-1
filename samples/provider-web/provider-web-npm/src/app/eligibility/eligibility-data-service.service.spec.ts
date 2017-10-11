import { TestBed, inject } from '@angular/core/testing';

import { EligibilityDataServiceService } from './eligibility-data-service.service';

describe('EligibilityDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EligibilityDataServiceService]
    });
  });

  it('should ...', inject([EligibilityDataServiceService], (service: EligibilityDataServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('getter and setter checking', inject([EligibilityDataServiceService], (service: EligibilityDataServiceService) => {
    expect(service.eligibilityResult).toBeUndefined();
    service.eligibilityResult = {};
    expect(service.eligibilityResult).toBeDefined();
    expect(service.searchedParams).toBeUndefined();
    service.searchedParams = {};
    expect(service.searchedParams).toBeDefined();
  }));
});
