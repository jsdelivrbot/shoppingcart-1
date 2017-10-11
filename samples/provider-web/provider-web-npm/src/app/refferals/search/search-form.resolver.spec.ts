import { TestBed, async, inject } from '@angular/core/testing';

import { SearchFormResolver } from './search-form.resolver';

import {MasterDataManagementApi} from '@tranzform/client-mdm/api/MasterDataManagementApi';

import { Observable } from 'rxjs/Observable';

describe('SearchResolverGuard', () => {
  const masterDataApi = jasmine.createSpyObj('masterDataApi', ['getCategories']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFormResolver,
      {provide: MasterDataManagementApi, useValue: masterDataApi}]
    });
  });

  it('should ...', inject([SearchFormResolver], (guard: SearchFormResolver) => {
    expect(guard).toBeTruthy();
  }));

    it('resolver to respond with object on success', inject([SearchFormResolver], (resolver: SearchFormResolver) => {
    masterDataApi.getCategories.and.returnValue(new Observable(observer => {
      observer.next([{data: 'response'}]);
    }));
    resolver.resolve(Object.create({}), Object.create({})).subscribe(
      data => {
        expect(data).toEqual({authorizationType: 'response'});
      }
    );
  }));

  it('resolver to respond with empty object on error', inject([SearchFormResolver], (resolver: SearchFormResolver) => {
    masterDataApi.getCategories.and.returnValue(new Observable(observer => {
      observer.error(new Error('some error'));
    }));
    resolver.resolve(Object.create({}), Object.create({})).subscribe(
      data => {
        expect(data).toEqual({});
      }
    );
  }));
});
