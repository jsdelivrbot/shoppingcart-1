export const REFERRAL_TAB_ITEMS = [{
        id: 'search',
        routerPath: 'search',
        svgPath: '/assets/common/icons/SearchIcon.svg',
        label: 'Search Ref/Auth',
      },
      {
        id: 'create',
        routerPath: 'create',
        svgPath: '/assets/common/icons/icon_create.svg',
        label: 'Create Ref/Auth',
      }];

export const ORDERVALUE = ['memberfirstname','membermiddlename','memberlastname'];
export const ALPHANUMERIC_REGEX = '[a-zA-Z0-9]*';
export const ALPHANUMERICANDSPACE_REGEX = '[a-zA-Z0-9\\s]*';
export const MEMBERID_MAX_LENGTH = 12;
export const REQ_PROVIDER_MAX_LENGTH = 30;
export const REN_PROVIDER_MAX_LENGTH = 30;
export const AUTHORIZATION_MAX_LENGTH = 10;

export const MDM_QUERY_IDS = {
  REFERRAL_TYPES: 'ep_referraltypes',
  SERVICE_TYPES: 'ep_referralservicetypes',
  STATUS: 'ep_referralstatus'
};


export const  PLURAL_MESSAGES  = {
    '=0': 'REFERRALS.SEARCH.RESULTCOUNTNONE',
    '=1': 'REFERRALS.SEARCH.RESULTCOUNTONE',
    'other': 'REFERRALS.SEARCH.RESULTCOUNT'
  };

export const PAGINATION_PAGE_SIZE = 8;

export const DATE_QUERY_PROPS = ['startdate', 'enddate', 'submissionstartdate', 'submissionenddate'];

export const ASC =  'Asc';
export const DSC =  'Desc';
export const MALE = 'MALE';
export const referralDataDownloadPath = '/authnreferrals/search';
export const referralDetailDownloadPath = '/authnreferrals';
export const genderOption = "gender";
  export const YES = 'Yes';
  export const FSA = 'FSA';
  export const HSA = 'HSA';
  export const HRA = 'HRA';
  export const SUBSCRIBERASSETDELIMITER = ', ';
export const PRO_NAME = 'p';
export const ORG_NAME = 'o';
