import { Headers } from '@angular/http';
// externalized all hardcoded values to put in the env.js file for local ng serve
// for provider-web sb local deployment, all environment values will be driven from application-local.yml

export class AppSettings {
  // application deployment mode
  public static PROD_MODE = window['envs']['production'];

  // application UI Base Path
  public static UI_BASE_PATH = window['envs']['UI_BASE_PATH'];

  // application oidc settings and user settings
  public static OIDC_SETTINGS = window['envs']['oidc_settings'];
  public static USER_SETTINGS = window['envs']['user_settings'];

  // application api endpoint settings
  public static API_ENDPOINT = window['envs']['API_ENDPOINT'];
  public static API_ENDPOINT_AUTHV2 = window['envs']['API_ENDPOINT_AUTHV2'];

  // application basic settings
  public static LOGOUT_PATH = window['envs']['basic_settings']['LOGOUT_PATH'];
  public static DateFormat = window['envs']['basic_settings']['DateFormat'];
  public static DateTimeFormat = window['envs']['basic_settings']['DateTimeFormat'];
  public static currency = window['envs']['basic_settings']['currency'];
  public static currencyPrecision = window['envs']['basic_settings']['currencyPrecision'];
  public static tenantid = window['envs']['basic_settings']['tenantid'];
  public static userid = window['envs']['basic_settings']['userid'];
  public static ERRORTIMEOUT = window['envs']['basic_settings']['ERRORTIMEOUT'];
  public static PDF = window['envs']['basic_settings']['PDF'];
  public static EXCEL = window['envs']['basic_settings']['EXCEL'];

  // application microservices settings
  public static MSG_CENTER = window['envs']['ms_settings']['MSG_CENTER'];
  public static MDM_WEB = window['envs']['ms_settings']['MDM_WEB'];
  public static MSPROVIDER = window['envs']['ms_settings']['MSPROVIDER'];
  public static MSCLAIMS = window['envs']['ms_settings']['MSCLAIMS'];
  public static MSELIGIBILITY = window['envs']['ms_settings']['MSELIGIBILITY'];
  public static MSAUTHREFERRAL = window['envs']['ms_settings']['MSAUTHREFERRAL'];
  public static PROFILEWEB = window['envs']['ms_settings']['PROFILEWEB'];

  public static staticHeaders: Headers;
  public angularHeaders: Headers;

  static getHeaders() {
    if (!AppSettings.staticHeaders) {
      AppSettings.staticHeaders = new Headers();
    }
    return AppSettings.staticHeaders;
  }

  constructor() {
    this.angularHeaders = new Headers();
    this.angularHeaders.append('content-type', 'application/json');
  }

}
