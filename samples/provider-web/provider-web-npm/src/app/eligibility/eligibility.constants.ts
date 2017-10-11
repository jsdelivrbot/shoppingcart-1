export const PRIMARY = 'Primary';
export const SECONDARY = 'Secondary';

export const benefitColumns = [
  {
    field: 'coverageLevel',
    header: 'Coverage Level'
  },
  {
    field: 'serviceType',
    header: 'Service Type'
  },
   {
    field: 'insuranceType',
    header: 'Insurance Type'
  },
   {
    field: 'description',
    header: 'Description'
  },
   {
    field: 'amount',
    header: 'Amount'
  },
   {
    field: 'priorAuthRequired',
    header: 'Authorization'
  },
   {
    field: 'networkIndicator',
    header: 'Network Indicator'
  },
   {
    field: 'diagnosisCode',
    header: 'Diagnosis Code'
  }
];

export const benefitAccordianLineItems = [
  {
    title: 'Active Coverage',
    id: 'Active Coverage'
  },
  {
    title: 'Benefit Disclaimer',
    id: 'Benefit Disclaimer'
  },
  {
    title: 'Deductible',
    id: 'Deductible'
  },
  {
    title: 'Out of Pocket (Stop Loss)',
    id: 'Out of Pocket Maximum'
  },
  {
    title: 'Co-Insurance',
    id: 'Co-Insurance'
  },
  {
    title: 'Co-Payment',
    id: 'Co-Payment'
  },
  {
    title: 'Limitations',
    id: 'Limitations'
  },
 
];

export const NETWORKINDICATOR = 'networkIndicator';
export const INNETWORKCODE = 'IN';
export const OUTNETWORKCODE = 'ON';
export const DEDUCTIBLEID = 'Deductible';
export const OUTOFPOCKETID = 'Out of Pocket Maximum';
export const AMOUNT = 'amount';
export const AMOUNTREMAINING = 'amountRemaining';
export const MALE = 'Male';
export const ELIGIBLE = 'Yes';
export const COINSURANCE = 'Co-Insurance';
export const COPAYMENT = 'Co-Payment';
export const AUTHORIZATION = 'priorAuthRequired';
export const LIMITATION= 'Limitations';
export const YES = 'Yes';
export const NO = 'No';
export const eligibilityDataDownloadPath = '/mseligibility/eligibility';
