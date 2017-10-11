import { Component, OnInit, Input } from '@angular/core';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import {
  accidentType, state, conditionRelated, resultofaccident, AUTO, PLACEOFSERVICE,
  DEFAULTPLACEOFSERVICE, DEFAULTICD, ICD, NDC, MAXDAGNOSISCODEPERITEM, MAXDIAGNOSISCODEPERCLAIM
} from './../claimStatusInquiry.constants';
import { ClaimsApi } from '@tranzform/client-msclaims';

@Component({
  selector: 'app-cptLookUpModal',
  templateUrl: './cptLookUpModal.component.html',
  styleUrls: ['../diagnosisCodeLookUpModal/diagnosisCodeLookUpModal.component.scss']
})
export class CptLookUpModalComponent implements OnInit {
  // CPT LOOKUP VARAIBLES
  private selectedCptCode: string;
  public cptLookupData: Array<any>;
  public noCptLookupData = false;
  public cptLookupForm = new FormGroup({
    procedurecode: new FormControl(''),
    procedurecodedesc: new FormControl('')
  });

  constructor(public cptModalRef: NgbActiveModal,
  private fb: FormBuilder,
  private claimsApi: ClaimsApi) {
    /**
      The Entry point for this Component and its DI declaration
    **/
  }

  public loadCptLookupData(event) {
    this.cptLookupData = null;
    this.claimsApi.procedurecodesGet(this.cptLookupForm.value).subscribe(data => {
      if (data.length) {
        this.noCptLookupData = false;
        this.cptLookupData = data;
      } else {
        this.noCptLookupData = true;
      }
    });
    return false;
  }

  public uncheckOtherCptCodes(event) {
    this.selectedCptCode = event.target.checked ? event.target.defaultValue : null;
  }

  ngOnChanges(...args: any[]) {
    /**
      Only fired whenever @Input changes
    **/
  }

  ngOnInit() {
    /** Logic to get data from resolver modify to use
      this.route.data
      .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
        this.demo = data.demo;
      });
  */

  }

  ngAfterViewInit() {
    /**
      Fired after the component template has been initialized by the model
    **/
  }

  ngAfterViewChecked() {
    /**
      Fired after the component template has been fully updated by the model
    **/
  }

}
