import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PRO_NAME, ORG_NAME } from './../refferals.constants';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-service-provider-tab',
  templateUrl: './serviceProviderTab.component.html',
  styleUrls: ['./serviceProviderTab.component.scss']
})
export class ServiceProviderTabComponent implements OnInit {
  public form: FormGroup;
  readonly PRO_NAME = PRO_NAME;
  readonly ORG_NAME = ORG_NAME;
  public npiValidators = [Validators.minLength(10),Validators.pattern('[0-9]*')]
  public valMsg = {
  npi: [
      {
      validator: 'required',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.REQ'
    },
      {
      validator: 'pattern',
      message: 'Only alphanumeric characters are allowed'
    }, {
     validator: 'minlength',
      message: 'NPI should be 10 characters'
    }
    ], name: [
      {
      validator: 'required',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.REQ'
    },
      {
      validator: 'pattern',
      message: 'Only alphanumeric characters are allowed'
    }
    ]};

  constructor() {
    /**
      The Entry point for this Component and its DI declaration
    **/
  }

  ngOnInit() {
     this.form = new FormGroup({
      searchBy: new FormControl(PRO_NAME),
      npiForm: new FormGroup({
        npi: new FormControl('')
      }),
      nameForm: new FormGroup({
        lastname: new FormControl('', [Validators.pattern('[a-zA-Z0-9#-]*')]),
        firstname: new FormControl('', [Validators.pattern('[a-zA-Z0-9#-]*')]),
      })
    });

  }

}
