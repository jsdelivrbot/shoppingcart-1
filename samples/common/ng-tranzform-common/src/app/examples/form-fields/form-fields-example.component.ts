import { Component, OnInit } from '@angular/core';

import { ValidationMessage, PredefinedDateRange } from '../../common/form-fields';

@Component({
  selector: 'tzf-form-fields-example',
  templateUrl: './form-fields-example.component.html',
  styleUrls: ['./form-fields-example.component.scss']
})
export class FormFieldsExampleComponent {
  buttonDisabled: boolean;

  valMsg: { [key: string]: ValidationMessage[] } = {
    claimId: [{
      validator: 'required',
      message: 'Claim ID is required.',
    }],
    dateRange: [{
      validator: 'required',
      message: 'Date range is required.',
    }],
  };

  data = {
    claimId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    memberId: '',
    status: ['f', 'p', 'r'],
    claimType: 'm',
    serviceFromDate: '04/25/2017',
    serviceToDate: new Date(),
    dateRangeStart: '05/03/2017',
    dateRangeEnd: '05/18/2017',
    providers: [],
    birthDate: undefined,
  };

  statusOptions = [{
    name: 'Finalized',
    value: 'f',
  }, {
    name: 'Received',
    value: 'r',
  }, {
    name: 'Pending',
    value: 'p',
  }];

  claimTypeOptions = [{
    name: 'Medical',
    value: 'm',
  }, {
    name: 'Dental',
    value: 'd',
  }, {
    name: 'Hospital',
    value: 'h',
  }];

  providerOptions = [{
    id: '1',
    name: 'Diesel, Vin, M.D.',
  }, {
    id: '6',
    name: 'Gibson, Tyrese, M.D.',
  }, {
    id: '3',
    name: 'Johnson, Dwayne, D.O.',
  }, {
    id: '5',
    name: 'Ludacris, M.D.',
  }, {
    id: '2',
    name: 'Rodriguez, Michelle, M.D.',
  }, {
    id: '4',
    name: 'Statham, Jason, M.D.',
  }, {
    id: '7',
    name: 'Walker, Paul, M.D.',
  }];

  working: any = {};
  boundRange: any = {
    start: '05/01/2017',
    end: new Date(),
  };

  ranges: PredefinedDateRange[] = [{
    text: 'Last 15 Days',
    start: {
      offset: -15,
      unit: 'day',
    },
  }, {
    text: 'Last 30 Days',
    start: {
      offset: -30,
      unit: 'day',
    }
  }, {
    text: 'Last 60 Days',
    start: {
      offset: -60,
      unit: 'day',
    }
  }];

  none: any;

  prepareNames () {
    const data = this.data;
    this.working = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    };
  }

  resetNames () {
    this.working = {
      firstName: '',
      middleName: '',
      lastName: '',
    };
  }

  updateDateRange (value) {
    Object.assign(this.data, value);
  }

  acceptNames () {
    Object.assign(this.data, this.working);
  }
}
