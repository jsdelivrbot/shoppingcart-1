import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettings } from './../app-settings';
import { BASE_PATH as ClaimApi_BASE_PATH } from '@tranzform/client-msclaims';
import { BASE_PATH as Msgcenter_BASE_PATH } from '@tranzform/client-msgcenter';
import { BASE_PATH as MdmClient_BASE_PATH } from '@tranzform/client-mdm';
import { BASE_PATH as EligibilityApi_BASE_PATH } from '@tranzform/client-eligibility';
import { BASE_PATH as ProviderApi_BASE_PATH } from '@tranzform/client-msprovider';
import { BASE_PATH as AuthRef_BASE_PATH } from '@tranzform/client-ms-authreferral';
import { BASE_PATH as Profile_BASE_PATH } from '@tranzform/client-profile';
/** Generator: end of imports  */

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []

,providers:[
    {provide: ClaimApi_BASE_PATH,useValue: AppSettings.API_ENDPOINT+AppSettings.MSCLAIMS}
,{ provide: Msgcenter_BASE_PATH, useValue: AppSettings.API_ENDPOINT_AUTHV2+ AppSettings.MSG_CENTER}
,{ provide: MdmClient_BASE_PATH, useValue: AppSettings.API_ENDPOINT_AUTHV2 + AppSettings.MDM_WEB}
,{ provide: EligibilityApi_BASE_PATH, useValue: AppSettings.API_ENDPOINT + AppSettings.MSELIGIBILITY},
{ provide: ProviderApi_BASE_PATH, useValue: AppSettings.API_ENDPOINT + AppSettings.MSPROVIDER }
,{ provide: AuthRef_BASE_PATH, useValue: AppSettings.API_ENDPOINT + AppSettings.MSAUTHREFERRAL }
,{ provide: Profile_BASE_PATH, useValue: AppSettings.API_ENDPOINT + AppSettings.PROFILEWEB }
/** Generator: End of providers*/
  ]

})
export class ClientModule { }
