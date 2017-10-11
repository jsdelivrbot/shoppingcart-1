import { Component, OnInit, Input } from '@angular/core';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import {
  accidentType, state, conditionRelated, resultofaccident, AUTO, PLACEOFSERVICE,
  DEFAULTPLACEOFSERVICE, DEFAULTICD, ICD, NDC, MAXDAGNOSISCODEPERITEM, MAXDIAGNOSISCODEPERCLAIM,
  IDC10REG, IDC9REG
} from './../claimStatusInquiry.constants';
import { ClaimsApi } from '@tranzform/client-msclaims';

@Component({
  selector: 'app-diagnosis-code-lookup-modal',
  templateUrl: './diagnosisCodeLookUpModal.component.html',
  styleUrls: ['./diagnosisCodeLookUpModal.component.scss']
})
export class DiagnosisCodeLookUpModalComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() idcType: any;
  // diagnosis data
  private diagnosisData;

  public diagnosisLookupForm = new FormGroup({
    diagnocode: new FormControl('', [Validators.pattern('[a-zA-Z0-9.]*')]),
    diagnocodedesc: new FormControl('', [Validators.pattern('[a-zA-Z0-9]*')])
  });

  public valMsg = {
    diagnocode: [
      {
      validator: 'required',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.REQ'
    },
      {
      validator: 'pattern',
      message: 'Only alphanumeric characters and period(.) is allowed'
    }],
  diagnocodedesc: [
      {
      validator: 'required',
      message: 'SERVICEDETAIL.LINEITEM.MESSAGES.REQ'
    },
      {
      validator: 'pattern',
      message: 'Only alphanumeric characters are allowed'
    }
    ],
   msg: [
      {
        validator: 'pattern',
        message: 'Invalid IDC code'
      }]};

  public diagnosisCodeFormArray: FormArray;

  constructor(public diagnosisModalRef: NgbActiveModal,
  private fb: FormBuilder,
  private claimsApi: ClaimsApi) {
  }

  ngOnInit() {
    const diagnosisCodes = this.form.controls.diagnosisCode.value.split(',');
    this.diagnosisCodeFormArray = this.fb.array(
      Array.from(Array(MAXDAGNOSISCODEPERITEM).keys()).map(i => new FormGroup({
        data: new FormControl('', [Validators.pattern(this.idcType.diagnotype === DEFAULTICD ? IDC10REG : IDC9REG )])
      }))
      );
    this.diagnosisCodeFormArray.reset();
    this.diagnosisCodeFormArray.
    controls.forEach((fc: FormGroup, i) => fc.controls.data.setValue(diagnosisCodes[i]));
}



  public addDiagnosisCode(code: string): void {
    this.diagnosisCodeFormArray.controls.every((fc: FormGroup) => {
      if (!fc.controls.data.value) {
        fc.controls.data.setValue(code);
        fc.controls.data.markAsDirty();
        return false;
      } else {
        return true;
      }
    })
  }

  public isAllSelected() {
    return this.diagnosisCodeFormArray.controls.every(fc => fc.value.data);
  }

  public searchDiagnosisCode(event: Event) {
    this.diagnosisData = undefined;
    this.claimsApi.diagnosiscodesGet(Object.assign(this.diagnosisLookupForm.value, this.idcType))
      .subscribe(response => this.diagnosisData = response);
    return false;
  }

  public closeModal() {
    const result = this.diagnosisCodeFormArray.
        controls.map((fc: FormGroup) => fc.controls.data.value).filter(v => v).join(',');

    this.diagnosisModalRef.close(result);
  }

}
