import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationMessage, PredefinedDateRange } from '@tranzform/common/form-fields';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { defaultClaimStatus } from './../claimStatusInquiry.constants';
import { ClaimStatusSearchCriteria, ClaimStatusInquiryConfiguration } from './../claimStatusInquiry.model';


@Component({
  selector: 'app-claim-search-form',
  templateUrl: './claim-search-form.component.html',
  styleUrls: ['./claim-search-form.component.scss']
})

export class ClaimSearchFormComponent implements OnInit {
  private static DATEUNIT: any = 'day';
  public selectedQuickView;
  public ranges: PredefinedDateRange[];
  public predefinedDateRange: number = 0;
  public valMsg: { [key: string]: ValidationMessage[] } = {
    claimId: [{
      validator: 'pattern',
      message: this.translationService.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.ALPHANUMERIC'),
    }],
    dateRangeValue: [
      {
        validator: 'validateDateRange',
        message: this.translationService.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.VALIDATEDATERANGE')
      }, {
        validator: 'dateMinMaxValidatorFrom',
        message: this.translationService.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.DATEMINMAXVALIDATORFROM')
      }, {
        validator: 'dateMinMaxValidatorTo',
        message: this.translationService.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.DATEMINMAXVALIDATORTO')
      }, {
        validator: 'required',
        message: this.translationService.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.REQUIRED')
      }
    ],
    providerIdValue: [
      {
        validator: 'required',
        message: this.translationService.getInstantText('CLAIMSSTATUS.SEARCHFORM.MESSAGES.REQUIRED')
      }
    ]
  };
  public boundRange: any = {
    start: '01/01/2017',
    end: new Date(),
  };

  @ViewChild('searchClaimsForm') searchClaimsForm;
  @Input() searchCriteria: ClaimStatusSearchCriteria;
  /*  configuration is an input from claimStatusInquiry.component.ts which contains quickViewTilesProcessed and claimStatus */
  @Input() configuration: ClaimStatusInquiryConfiguration;
  @Input() fromQuickView: Boolean = false;
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  constructor(private translationService: TranslationService) {
  }
  ngOnInit() {
    if (this.searchCriteria) {
      this.selectedQuickView = this.fromQuickView ? JSON.stringify(this.searchCriteria) : undefined;
      this.searchCriteria.range.fromdate = this.searchCriteria.range.fromdate ? new Date(this.searchCriteria.range.fromdate) : undefined;
      this.searchCriteria.range.todate = this.searchCriteria.range.todate ? new Date(this.searchCriteria.range.todate) : undefined;
    } else {
      this.searchCriteria = {
        claimid: undefined,
        providerid: undefined,
        claimstatus: defaultClaimStatus,
        range: { fromdate: undefined, todate: undefined }
      };
      if (this.configuration && this.configuration.providerOptions && Array.isArray(this.configuration.providerOptions)) {
        this.searchCriteria.providerid = this.configuration.providerOptions.length === 1 ?
          this.configuration.providerOptions[0].value : this.configuration.providerOptions.map(p => p.value);
      }
      this.searchClaimsForm.form.markAsDirty();
    }


    if (this.configuration) {
      this.ranges = this.configuration.dateConfig.map(d => {
        const c: PredefinedDateRange = Object.create({});
        c.text = d.value;
        c.start = { offset: -d.code, unit: ClaimSearchFormComponent.DATEUNIT };
        return c;
      });
    }
  }
  /**
   * reset formdata
   */
  public resetForm() {
    this.searchCriteria = <any>Object.keys(this.searchCriteria).reduce((p, k) => {
      p[k] = undefined;
      return p;
    }, {});
    this.predefinedDateRange = undefined;
    this.searchClaimsForm.form.markAsPristine();
  }

  /**
   * invoked on submit
   */
  public searchClaims() {
    this.searchClaimsForm.form.markAsPristine();
    Object.keys(this.searchCriteria).forEach(k => {
      if (!this.searchCriteria[k]) {
        delete this.searchCriteria[k];
      }
    });
    this.onSearch.emit(this.searchCriteria);
  }

  public updateDateRange(value) {
    if (value.fromdate && !value.todate) {
      value.todate = value.fromdate;
    }
    if (!value.fromdate && value.todate) {
      value.fromdate = value.todate;
    }
    Object.assign(this.searchCriteria.range, value);
  }
  /**
   * This method is invoked while selecting the quick view dropdown option
   */
  public settingSearchCriteria(quickViewModel) {
    this.selectedQuickView = quickViewModel;
    this.searchCriteria = JSON.parse(this.selectedQuickView);
    this.onSearch.emit(this.searchCriteria);
  }
}
