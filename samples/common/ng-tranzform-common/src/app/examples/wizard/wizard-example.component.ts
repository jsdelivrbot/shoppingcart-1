import { Component, OnInit } from '@angular/core';
import { Form, NgModel } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { CompleteEvent, PrepareEvent } from '../../common/wizard/wizard.component';

@Component({
  selector: 'tzf-wizard-example',
  templateUrl: './wizard-example.component.html',
  styleUrls: ['./wizard-example.component.scss']
})
export class WizardExampleComponent implements OnInit {
  memberInfoForm: Form;

  memberId: NgModel;
  dateOfBirth: NgModel;

  validationConfig: { [key: string]: { [key: string]: string }} = {
    memberId: {
      required: 'A member ID is required.',
    },
    dateOfBirth: {
      required: 'Date of birth is required.'
    }
  };

  constructor() { }

  ngOnInit() {
  }

  validateMember (e: CompleteEvent) {
    console.log('Clicked next');
    const obs = new Subject<any>();
    e.wait(obs);

    setTimeout(() => {
      console.log('Complete event finished');
      obs.next();
      obs.complete();
    }, 500);
  }

  initVerification (e: PrepareEvent) {
    console.log('Preparing next step');
    const obs = new Subject<any>();
    e.wait(obs);

    setTimeout(() => {
      console.log('Prepare event finished');
      obs.next();
      obs.complete();
    }, 500);
  }
}
