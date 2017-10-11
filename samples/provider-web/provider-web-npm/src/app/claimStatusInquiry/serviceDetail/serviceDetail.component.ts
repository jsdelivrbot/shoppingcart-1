import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  accidentType, state, conditionRelated, resultofaccident, AUTO, PLACEOFSERVICE, CPT_MAX_LENGTH, CPT_END, CPT_START,
  MOD_END, MOD_START, DEFAULTPLACEOFSERVICE, DEFAULTICD, ICD, NDC, MAXDAGNOSISCODEPERITEM, MAXDIAGNOSISCODEPERCLAIM
  , IDC10REG, IDC9REG, DOLLARREGEX, MEMBERMAPPER, SUBSCRIBERMAPPER
} from './../claimStatusInquiry.constants';
import { MaxDateValidatorDirective } from './../../shared/validators/maxDateValidator.directive';
import { MinDateValidatorDirective } from './../../shared/validators/minDateValidator.directive';
import { DatepickerUtil } from '@tranzform/common/datepicker/datepicker-util';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DiagnosisCodeLookUpModalComponent } from '../diagnosisCodeLookUpModal/diagnosisCodeLookUpModal.component';
import { CptLookUpModalComponent } from '../cptLookUpModal/cptLookUpModal.component';
import { ModalEvent, ModalService } from '@tranzform/common/modal';
import { ClaimsApi} from '@tranzform/client-msclaims';
import { AppSettings as AppConfig } from './../../app-settings';

@Component({
  selector: 'app-service-detail',
  templateUrl: './serviceDetail.component.html',
  styleUrls: ['./serviceDetail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  public valMsg = {
    lookup: [
      {
        validator: 'minlength',
        message: 'NDC Code must be minimum of 11 characters'
      },
      {
        validator: 'max',
        message: 'Can\'t be greater than 999'
      },
      {
        validator: 'pattern',
        message: 'Only numerals are allowed'
      }, {
        validator: 'required',
        message: 'SERVICEDETAIL.LINEITEM.MESSAGES.REQ',
      }]
  };
  public serviceDetailForm: FormGroup;
  private ngbToday = DatepickerUtil.toNgbDate(new Date());
  @ViewChild('placeOfServiceTemplate') placeOfServiceTemplate: any;
  public placeOfServiceModalRef;
  @ViewChild('ndcTemplate') ndcTemplate: any;
  public ndcModalRef;
  public ndcLookupForm = new FormGroup({
    drugCode: new FormControl(''),
    drugUnits: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'),
    Validators.max(999)]),
    drugType: new FormControl('', [Validators.required])
  });
  public icdOptions;
  public placeOfServiceOptions;
  public ndcOptions;
  public totalChargeAmount: number;
  public ndcCodeValidator = [Validators.required, Validators.minLength(11), Validators.pattern('[0-9]*')];
  @Output() onFormChange = new EventEmitter();
  readonly AppConfig = AppConfig;

  constructor(private fb: FormBuilder,
  private modalService: NgbModal,
  private tzfModalService: ModalService,
  private claimsApi: ClaimsApi) {
    /**
      The Entry point for this Component and its DI declaration
    **/
  }

  ngOnInit() {
    this.claimsApi.claimsCategoryGet({ category: PLACEOFSERVICE })
      .subscribe(response => this.placeOfServiceOptions = response.data);
    this.claimsApi.claimsCategoryGet({ category: ICD })
      .subscribe(response => this.icdOptions = response.data);
    this.claimsApi.claimsCategoryGet({ category: NDC })
      .subscribe(response => this.ndcOptions = response.data);
    this.createServiceDetailForm(DEFAULTICD);
    // send the state on creation itself
    this.onFormChange.emit(this.serviceDetailForm);
    this.serviceDetailForm.statusChanges.subscribe( status => {
      this.onFormChange.emit(this.serviceDetailForm);
    })
  }

  private createServiceDetailForm(icdValue) {
    /** create service detail form */
    this.serviceDetailForm = this.fb.group({
      ICDType: new FormControl(icdValue, [Validators.required]),
      claimLineDetails: this.fb.array(
        [this.buildServiceDetailForm(),
        this.buildServiceDetailForm()]),
      acceptAssignment: new FormControl('')
    }, {
        validator: this.serviceDetailFormValidation.bind(this)
      });
    this.addDiagnosisCodeValidators(icdValue);

    // value changes
    this.serviceDetailForm.controls.ICDType.valueChanges.subscribe(v => {
      this.onIDCChange(v);
    });
  }

  private addDiagnosisCodeValidators(icdValue) {
    let diagnosisCodeRegex;
    if (icdValue === DEFAULTICD) {
      diagnosisCodeRegex = IDC10REG;
    } else {
      diagnosisCodeRegex = IDC9REG;
    }
    // adding array of validators here as serviceDetailForm should have been initialized eariler for these validators
    (<any>this.serviceDetailForm.controls.claimLineDetails)
      .controls.forEach(fg => fg.controls.diagnosisCode.setValidators([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9,. ]*'),
        // hack to wait for all the array controls to update so as to get the correct count of codes
        (formControl: FormControl) => {
          setTimeout(_ => {
            const totalDiagnosisCodes = formControl.parent.parent.value.
              reduce((c, v) => c += v.diagnosisCode ? v.diagnosisCode.split(',').filter(value => value).length : 0, 0);
            if (totalDiagnosisCodes > MAXDIAGNOSISCODEPERCLAIM) {
              formControl.setErrors({ 'cantBeGreaterThan12': true });
            }
          })
          if (formControl.value && formControl.value.split(',').length > MAXDAGNOSISCODEPERITEM) {
            return { 'cantBeGreaterThan8': true };
          }
          return null;
        },
        (fc: FormControl) => {
          let regexValid;
          if (fc.value) {
            fc.value.split(',').every(code => {
              if (!(regexValid = diagnosisCodeRegex.test(code))) {
                return false;
              } else {
                return true;
              }
            });
            if (!regexValid) {
              return { 'patternICD': true };
            } else {
              return null;
            }
          }
        }]));
  }

  /**
   * Create and return form item for each service line item
   * with default values and required validators
   */
  private buildServiceDetailForm(): FormGroup {
    const serviceFromControl = new FormControl('');
    const serviceToControl = new FormControl('');
    const placeOfService = new FormControl(DEFAULTPLACEOFSERVICE, [Validators.required]);
    const cpt = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]);
    const ndc = new FormControl(null);
    const modifiers = new FormControl('', [Validators.pattern('[a-zA-Z0-9, ]*')]);
    const ambulancePickUpZip = new FormControl('', [Validators.pattern('[0-9]*')]);
    const diagnosisCodes = new FormControl('');
    const charge = new FormControl('', [
      (formControl: FormControl) => {
        if (formControl.value) {
          if (formControl.value > 9999.99) {
            return { 'cantBeGreaterThan9999': true };
          }
          return null;
        }
      },
      (fc: FormControl) => {
        if (fc.value) {
          // regex to validate the dollar amount
          const valid = DOLLARREGEX.test(fc.value);
          if (!valid) {
            return { pattern: true };
          }
        }
        return null;
      },
      Validators.required
    ]);
    const units = new FormControl('', [
      Validators.max(999),
      Validators.pattern('[0-9]*'),
      Validators.required
    ]);
    serviceFromControl.setValidators([Validators.required,
    MaxDateValidatorDirective.getValidator(this.ngbToday),
    (formControl: FormControl) => {
      if (formControl.value) {
        const fromDate = DatepickerUtil.toNgbDate(new Date(formControl.value));
        const toDate = DatepickerUtil.toNgbDate(new Date(serviceToControl.value));
        if (DatepickerUtil.compare(fromDate, toDate) > 0) {
          return { 'dateMinMaxValidatorFrom': true };
        }
        return null;
      }
    }]);
    serviceToControl.setValidators([Validators.required,
    MaxDateValidatorDirective.getValidator(this.ngbToday),
    (formControl: FormControl) => {
      if (formControl.value) {
        const fromDate = DatepickerUtil.toNgbDate(new Date(serviceFromControl.value));
        const toDate = DatepickerUtil.toNgbDate(new Date(formControl.value));
        if (DatepickerUtil.compare(fromDate, toDate) > 0) {
          return { 'dateMinMaxValidatorFrom': true };
        }
        return null;
      }
    }]);
    return new FormGroup({
      serviceFromDate: serviceFromControl,
      serviceToDate: serviceToControl,
      placeOfService: placeOfService,
      placeOfServiceDescription: new FormControl(),
      procedureCode: cpt,
      procedureModifier: modifiers,
      serviceLocationZipCode: ambulancePickUpZip,
      diagnosisCode: diagnosisCodes,
      chargedAmount: charge,
      units: units,
      drugDetails: ndc
    })
  }

  private serviceDetailFormValidation (fg: FormGroup) {
      const atLeastOneFilled = (<any>fg.controls.claimLineDetails).controls.some( item =>  {
        return item.valid;
      });
      const unFilledButPristine = (<any>fg.controls.claimLineDetails).controls.every( item =>  {
        return item.valid || item.pristine;
      });
      if (atLeastOneFilled && unFilledButPristine) {
        return null;
      }else {
        return {serviceDetailFormInvalid: true};
      }
    }

    public openDiagnosisLookUp(form) {
    const diagnosisModalRef = this.modalService.open(DiagnosisCodeLookUpModalComponent, <any>{
      size: 'lg', windowClass: 'data-lookup-modal'
    });
    diagnosisModalRef.componentInstance.form = form;
    diagnosisModalRef.componentInstance.idcType = { diagnotype: this.serviceDetailForm.value.ICDType };
    diagnosisModalRef.result.then(((shadowedForm: FormGroup) => {
      return (data) => {
        shadowedForm.controls.diagnosisCode
          .setValue(data);
        shadowedForm.controls.diagnosisCode.markAsTouched();
        shadowedForm.controls.diagnosisCode.markAsDirty();
      }
    })(form), error => {
      console.log(error);
    });
  }

  public openCPTModal(form) {
    const cptModalRef = this.modalService.open(CptLookUpModalComponent, <any>{
      size: 'lg', windowClass: 'data-lookup-modal'
    });
    cptModalRef.result.then(((shadowForm: FormGroup) => {
      return data => {
        if (data.length === CPT_MAX_LENGTH) {
          shadowForm.controls.procedureCode.setValue(data.substring(CPT_START, CPT_END));
          shadowForm.controls.procedureModifier.setValue(data.substring(MOD_START, MOD_END));
          shadowForm.controls.procedureCode.markAsDirty();
          shadowForm.controls.procedureModifier.markAsDirty();
        } else {
          shadowForm.controls.procedureCode.setValue(data);
          shadowForm.controls.procedureCode.markAsDirty();
        }
      };
    })(form), error => {
      console.log(error);
    });
  }

  public onIDCChange(currentValue): void {
    // open the confirmation dialog if search details is dirty
    // get the value from event as the formControl value is not changed yet in this event.
    if (this.serviceDetailForm.controls.claimLineDetails.dirty) {
      this.tzfModalService.confirm({
        headerText: 'Please Confirm',
        message: [
          'Changing of ICD version will clear all the service line items entered so far'
        ],
        cancelText: 'Cancel',
        okText: 'Ok',
      })
        .then(
        () => {
          (<FormArray>this.serviceDetailForm.controls.claimLineDetails).reset();
          this.createServiceDetailForm(this.serviceDetailForm.controls.ICDType.value);
        },
        ((pc) => {
          return () => {
            this.serviceDetailForm.controls.ICDType.setValue(pc, { emitEvent: false });
          };
        })(this.serviceDetailForm.value.ICDType)
        );
    } else {
      this.createServiceDetailForm(currentValue);
    }
  }

  public openPlaceOfServiceInfo(form): void {
    this.placeOfServiceModalRef = this.modalService.open(this.placeOfServiceTemplate, <any>{
      size: 'md', windowClass: 'list-lookup-modal'
    });
  }

  public openNDCModal(form) {
    this.ndcModalRef = this.modalService.open(this.ndcTemplate, <any>{
      size: 'lg', windowClass: 'data-lookup-modal'
    });
    this.ndcModalRef.result.then(((shadowForm: FormGroup) => {
      return data => {
        shadowForm.controls.drugDetails.setValue(this.ndcLookupForm.value);
        shadowForm.controls.drugDetails.markAsDirty();
      };
    })(form), error => {
      console.log(error);
    });
  }

  public getTotalChargeAmount() {
    this.totalChargeAmount = this.serviceDetailForm.value.claimLineDetails.reduce((total, lineItem) => {
      total += lineItem.chargedAmount ? lineItem.chargedAmount : 0;
      return total;
    }, 0);
  }

  public addServiceDetailItem(index) {
    (<FormArray>this.serviceDetailForm.controls.claimLineDetails).push(this.buildServiceDetailForm());
    // need to update the diagnosis code validations for the newly added sevice detail form
    this.addDiagnosisCodeValidators(this.serviceDetailForm.controls.ICDType.value);
    this.serviceDetailForm.updateValueAndValidity();
  }

  public deleteServiceDetailItem(index) {
    (<FormArray>this.serviceDetailForm.controls.claimLineDetails).controls.splice(index, 1);
    this.serviceDetailForm.updateValueAndValidity();
  }

}
