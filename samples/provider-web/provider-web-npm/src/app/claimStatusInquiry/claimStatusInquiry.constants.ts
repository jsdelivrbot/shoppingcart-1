export const serviceTypeCodeProps: any = {
  left:[
    { label: 'CLAIMDETAIL.LINEITEM.PROCEDURECODES', prop: 'procedureCode' },
    { label: 'CLAIMDETAIL.LINEITEM.PROOCEDURECODEDESC', prop: 'procedureCodeDescription' },
    { label: 'CLAIMDETAIL.LINEITEM.DIAGNOSISCODE', prop: 'diagnosisCode' },
    { label: 'CLAIMDETAIL.LINEITEM.DIAGNOSISDESC', prop: 'diagnosisDescription' },
    { label: 'CLAIMDETAIL.LINEITEM.CHARGEDUNITS', prop: 'chargedUnits' },
  ],
  right:[
    { label: 'CLAIMDETAIL.LINEITEM.CHARGEDAMOUNT', prop: 'chargedAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.PLANNEGOTIATEDRATE', prop: 'planDiscount' },
    { label: 'CLAIMDETAIL.LINEITEM.ALLOWEDAMOUNT', prop: 'allowedAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.PAIDAMOUNT', prop: 'paidAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.DEDUCTIBLEAMOUNT', prop: 'deductibleAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.COPAYAMOUNT', prop: 'copayAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.COINSURANCEAMOUNT', prop: 'coinsuranceAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.NONCOVEREDAMOUNT', prop: 'notCoveredAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.HRAPAIDAMOUNT', prop: 'hraPaidAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.PATIENTRESP', prop: 'patientResponsibility' }
  ]
};
export const claimTypeCodeProps: any = {
  left: [
    { label: 'CLAIMDETAIL.LINEITEM.CHARGEDUNITS', prop: 'totalChargedUnits' },
    { label: 'CLAIMDETAIL.LINEITEM.CLAIMMSGCODE', prop: 'claimMessageCode' }
  ],
  right: [
    { label: 'CLAIMDETAIL.LINEITEM.CHARGEDAMOUNT', prop: 'totalChargedAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.PLANNEGOTIATEDRATE', prop: 'totalPlanDiscount' },
    { label: 'CLAIMDETAIL.LINEITEM.ALLOWEDAMOUNT', prop: 'totalAllowedAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.PAIDAMOUNT', prop: 'totalPaidAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.DEDUCTIBLEAMOUNT', prop: 'totalDeductibleAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.COPAYAMOUNT', prop: 'totalCopay' },
    { label: 'CLAIMDETAIL.LINEITEM.COINSURANCEAMOUNT', prop: 'totalCoinsurance' },
    { label: 'CLAIMDETAIL.LINEITEM.NONCOVEREDAMOUNT', prop: 'totalNotCovered' },
    { label: 'CLAIMDETAIL.LINEITEM.HRAPAIDAMOUNT', prop: 'totalHRAPaidAmount' },
    { label: 'CLAIMDETAIL.LINEITEM.PATIENTRESP', prop: 'totalPatientResponsibility' }
  ]
};
export const lineItemLeftPropsTop: any = [
    { label: 'CLAIMDETAIL.LINEITEM.PLACEOFSERVICE', prop: 'placeOfService' },
    { label: 'CLAIMDETAIL.LINEITEM.SERVICEDATES', prop: 'displayDate' }];

export const claimStatusProps = {
  pending: 'Pending',
  finalized: 'Finalized',
  received : 'Received'
};

export const claimid = 'claimid';
export const claimStatus = 'claimStatus';
export const claimType = 'claimType';
export const dateConfig = 'dateConfig';
// TODO should be removed and taken from context once login is in place
export const mappingid = '99887766';
export const defaultClaimStatus = ['Pending', 'Received', 'Finalized'];

export const claimDetailTable: any = [
  {
    'header': 'Claim ID',
    'field': 'claimId',
    'rwidth': 100
  },
  {
    'header': 'Member ID',
    'field': 'tenantEnrollmentId',
    'rwidth': '100'
  },
  {
    'header': 'Member Last Name',
    'field': 'memberLastName',
    'rwidth': '150'
  },
  {
    'header': 'Member First & Middle',
    'field': 'memberFirstName',
    'rwidth': '150'
  },
  {
    'header': 'Service Dates',
    'field': 'lowServiceDate',
    'rwidth': '100'
  },
  {
    'header': 'Provider Name',
    'field': 'serviceProviderName',
    'rwidth': '100'
  },
  {
    'header': 'Status',
    'field': 'claimStatus',
    'rwidth': '100'
  },
  {
    'header': 'Alert',
    'field': 'totalPaidAmount',
    'rwidth': '100'
  },
  {
    'header': 'Patient Account #',
    'field': 'patientAccountNumber',
    'rwidth': '100'
  },
  {
    'header': 'Claim Type',
    'field': 'claimType',
    'rwidth': '100'
  },
  {
    'header': 'Charge',
    'field': 'totalChargedAmount',
    'rwidth': '100'
  },
  {
    'header': 'Date of Birth',
    'field': 'memberDOB',
    'rwidth': '100'
  },
  {
    'header': 'Claim Sub Type',
    'field': 'claimSubType',
    'rwidth': '100'
  },
  {
    'header': 'Paid Amount',
    'field': 'totalPaidAmount',
    'rwidth': '100'
  },
  {
    'header': 'Place of Service',
    'field': 'placeOfService',
    'rwidth': '100'
  },
  {
    'header': 'Submission Date',
    'field': 'claimRecievedDate',
    'rwidth': '100'
  },
  {
    'header': 'Settled Date',
    'field': 'claimPaidDate',
    'rwidth': '100'
  },
  {
    'header': 'Check ID#',
    'field': 'checkNumber',
    'rwidth': '100'
  }];
  export const claimStatusPageSize: number = 50;
  export const claimDataDownloadPath = '/msclaims/claims';
  export const YES = 'Yes';
  export const FSA = 'FSA';
  export const HSA = 'HSA';
  export const HRA = 'HRA';
  export const SUBSCRIBERASSETDELIMITER = ', ';
  export const genderOption = 'gender';
  export const accidentType = "ep_accident_type";
  export const state = "ep_state";
  export const conditionRelated = 'ep_condition_types';
  export const resultofaccident = 'resultofaccident';
  export const AUTO = 'auto';
  export const PLACEOFSERVICE = 'placeOfService';
  export const DEFAULTPLACEOFSERVICE = '11';
  export const DEFAULTICD = 'ICD-10';
  export const ICD = 'icd';
  export const MODIFIERS_MAX_LENGTH = 14;
  export const AMB_ZIP_MAX_LENGTH = 5;
  export const CPT_MAX_LENGTH = 7;
  export const MAXDAGNOSISCODEPERITEM = 8;
  export const MAXDIAGNOSISCODEPERCLAIM = 12;
  export const NDC = 'ndcCodeType';
  export const CPT_START = 0;
  export const CPT_END = 5;
  export const MOD_START = 5;
  export const MOD_END =7;
  export const IDC10MAX = 8;
  export const IDC10REG = /^(?:([A-T]|[V-Z])(\d)(\d|[a-t]|[v-z]|[A-T]|[V-Z])|([A-T]|[V-Z])(\d)(\d|[a-t]|[v-z]|[A-T]|[V-Z])\.(\d|[a-t]|[v-z]|[A-T]|[V-Z]){1,4})$/;
  export const IDC9REG = /^(?:(\d|V|E)(\d){2,3}|(\d|V|E)(\d){2}\.(\d){1,2}|(\d|V|E)(\d){3}\.(\d){1})$/;
  export const DOLLARREGEX = /^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/;
  export const MAXSERVICELINEITEMS = 50;
  export const MEMBERMAPPER = {
  'tenantEnrollmentId': 'tenantEnrollmentId',
  'memberId': 'memberId',
  'firstName': 'memberFirstName',
  'middleName': 'memberMiddleName',
  'lastName': 'memberLastName',
  'dob': 'memberDOB',
  'groupId': 'memberGroupId',
  'gender': 'memberGender',
  'originalEffectiveDate': 'memberOriginalEffective',
  'eligibleAsOf': 'memberEligibleAsOf',
  'memberStatus': 'memberStatus'}

  export const SUBSCRIBERMAPPER = {
    'subscriberId': 'subscriberId',
    'firstName': 'subscriberFirstName',
    'middleName': 'subscriberMiddleName',
    'lastName': 'subscriberLastName',
    'dob': 'subscriberDOB',
    'groupId': 'subscriberGroupId',
    'gender': 'subscriberGender',
    'originalEffectiveDate': 'subscriberOriginalEffective',
    'eligibleAsOf': 'subscriberEligibleAsOf',
    'subscriberStatus': 'subscriberStatus',
    'subscriberAssets': 'subscriberAssets',
    'relationship': 'memberRelationshipToSubscriber'
  }


