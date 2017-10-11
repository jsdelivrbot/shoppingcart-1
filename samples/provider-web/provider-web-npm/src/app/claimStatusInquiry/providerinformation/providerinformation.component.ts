import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { ValidationMessage, PredefinedDateRange } from '@tranzform/common/form-fields';

import { ProviderApi } from '@tranzform/client-msprovider';
import { ClaimsApi  } from '@tranzform/client-msclaims';
import { ProviderAddress } from '@tranzform/client-msprovider/model/ProviderAddress';
import { claimType } from './../claimStatusInquiry.constants';

@Component({
  selector: 'app-provider-information',
  templateUrl: './providerinformation.component.html',
  styleUrls: ['./providerinformation.component.scss']
})
export class ProviderinformationComponent implements OnInit {
  @Input() providerform: FormGroup;
  @Output() onProviderSelect: any = new EventEmitter<any>();
  public claimTypeOptions: any;
  public providerOptions: Array<ProviderAddress>;
  public providerUIOptions = [];
  public providerUIAddressOptions = [];

  constructor(private claimApi: ClaimsApi, private providerApi: ProviderApi) { }

  ngOnInit() {
    // get claim type options
    this.claimApi.claimsCategoryGet({ category: claimType }).subscribe(data => {
      this.claimTypeOptions = data.data;
    });

    // set the provider options and the corresponding adddresses
    this.providerApi.providerAddressGet().subscribe(data => {
      this.providerOptions = data;
      this.providerUIOptions = [];
      if (Array.isArray(data)) {
        this.providerUIOptions = data.map(p => {
          const provider = Object.create({});
          provider.text = p.providerFirstName + ' ' + p.providerLastName;
          provider.value = p.providerId;
          return provider;
        });
      }
      this.setProviderAddressOptions(this.providerUIOptions[0].value);
      setTimeout(_ => {
        this.providerform.markAsPristine();
      });
    });

     this.providerform.controls.providername.valueChanges.forEach(value => {
       setTimeout(_ => {
         this.setProviderAddressOptions(value);

       });
    });
  }

/**
 * Set provider address options on change of
 * provider
 * @param providerId
 */
  setProviderAddressOptions(providerId: string) {
    if (providerId) {
      const index = this.providerOptions.findIndex(p => p.providerId === providerId);
      if (index !== -1) {
        this.providerUIAddressOptions =  this.providerOptions[index].providerAddress.map((a, i) => {
          const result = Object.create({});
          result.value = i + '';
          result.text = [ a.address1, a.address2, a.address3, a.city, a.state, a.zip].join(',');
          return result;
        });
        // set the defualt slected address as the first one
        if (this.providerUIAddressOptions.length) {
          this.providerform.controls.serviceaddress.setValue(this.providerUIAddressOptions[0].value)
        }
        this.setProvidersValue();
      }
    }
  }

  private setProvidersValue () {
    // selected provider
    const index = this.providerOptions.findIndex(p => p.providerId === this.providerform.controls.providername.value);
    if (index !== -1) {
      const provider = this.providerOptions[index];
      provider.providerAddress = [provider.providerAddress[this.providerform.controls.serviceaddress.value]];
      this.onProviderSelect.emit({providers: [provider]});
    }
  }

}



