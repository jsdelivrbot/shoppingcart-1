import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShellService } from '@tranzform/common/shell/shell.service';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { MessageConfigModule as MSG_CONST } from './messages/message-constant';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './shared/authenticate/auth.service';
import { HttpModule, Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AppStorageService } from './app-storage.service';
import { Logger } from 'angular2-logger/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'TranZform Common';
  exitText = 'Exit provider view';
  
  private isCSR: boolean = false;
  private isProviderImpersonator: boolean = false;
  private context: string = '';
  MESSAGE_CONST = MSG_CONST;
  impersonatorSubsciption: Subscription;

  private CSR_USER: string;
  loggedInUserSubsciption: Subscription;

  menuItems: any[] = [{
    label: 'Dashboard',
    routerPath: '/dashboard',
    svgPath: 'assets/menu-icons/Dashboard.svg',
  }, {
    label: 'Care Profile',
    routerPath: '/careprofile',
    svgPath: 'assets/menu-icons/CareProfile.svg',
  },
  {
    label: 'Patient List',
    routerPath: '/patientlist',
    svgPath: 'assets/menu-icons/PatientList.svg',
  }, {
    label: 'Eligibility',
    routerPath: '/eligibility',
    svgPath: 'assets/menu-icons/EligibilityCheck.svg',
  },
  {
    label: 'Referrals & Authorizations',
    routerPath: '/referrals',
    svgPath: 'assets/menu-icons/Referral.svg',
  }, {
    label: 'Claim Status Inquiry',
    routerPath: '/claimstatusinquiry',
    svgPath: 'assets/menu-icons/ClaimStatusInquiry.svg',
  },
  {
    label: 'Messages',
    routerPath: '/messages',
    svgPath: 'assets/menu-icons/Messages.svg',
  }, {
    label: 'Care Feed',
    routerPath: '/carefeed',
    svgPath: 'assets/menu-icons/CareFeed.svg',
  }];

  constructor(
    private translate: TranslateService,
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private shellService: ShellService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private http: Http,
    private storageService: AppStorageService,
    private log: Logger) {
    /**
     * get the isCSR and isProviderImpersonator values from sessionStorage.
     * Use case for the bowser refresh
     */
    this.loggedInUserSubsciption = appService.getUserLoggedInSubject().subscribe(val => {
     
      this.isCSR = this.storageService.getCSRFromSession();

      // invoke inbox unread service
      if (!this.isCSR) {
        this.inboxUnReadService();
      }
      /** */
      let impersonatorVal = this.storageService.getProviderImpersonatorFromSession();
      this.isProviderImpersonator = impersonatorVal ? impersonatorVal : false;
      console.log("isCSR:"+this.isCSR+" isProviderImpersonator:"+this.isProviderImpersonator);
      let userObj = this.storageService.getUserFromSession();
      if (userObj) {
        this.appService.getLoggedUserName().subscribe(object => {
          this.CSR_USER = object.username;
        });
          this.setUserContext(JSON.parse(userObj));
      }
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');
       
    });
    if (document.getElementById('user-name')) {
      this.appService.getLoggedUserName().subscribe(object => {
        console.log('App component logged user name' + object.username);
        document.getElementById('user-name').innerHTML = object.username;
      });
    }
    this.impersonatorSubsciption = this.appService.getImpersonatorSubject().subscribe(impersonatorObj => {
      this.isProviderImpersonator = impersonatorObj.isProviderImpersonator;
      if (impersonatorObj.user) {
        this.setUserContext(impersonatorObj.user);
      }
    });
   }
  setUserContext(userObj) {
    let userName = userObj.userFirstName + ' ' + userObj.userLastName;
    this.translate.get('CSR.PROVIDERVIEWFOR').subscribe((res: string) => {
      this.context = res + ' ' + userName;
    });
  }
  ngAfterViewInit() {
  }
  logSearch(value) {
    console.log('Search: ' + value);
  }
  openInbox(value) {
    console.log('Value :' + value);
    this.router.navigate([MSG_CONST.INBOX_ROUTE], {});
  }
  ngOnInit() {}

  inboxUnReadService() {
    const param: any = {
      'type': MSG_CONST.TYPE_INBOX,
      'sortby': MSG_CONST.MODIFIED_DATE,
      'orderby': MSG_CONST.MSG_ORDER_DESC,
      'readindicator': MSG_CONST.UNREAD
    };
    this.msgCenterApi.getConversationMessagesV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      if (data != undefined && data.metaInfo != undefined) {
        this.shellService.messageCount = data.metaInfo.unReadCount;
      } else {
        this.shellService.messageCount = undefined;
      }
    });
  }
  exitProviderView() {
    this.log.info('CSR exiting Provider View');
    /**
     * Reset isProviderImpersonator and user in sessionStorage
     */
    this.isProviderImpersonator=false;
    this.storageService.removeProviderImpersonatorFromSession();
    this.appService.clearImpersonatorSubject();
    this.context = '';
    this.storageService.removeUserFromSession();
    this.router.navigate(['home'], { skipLocationChange: true });
  }

  logout() {
    if(this.isCSR && this.isProviderImpersonator){
      this.exitProviderView()
    }else if(this.isCSR){
      this.csrLogout() ;
    }else{
      this.authService.startSignoutMainWindow();
    }
  }
  csrLogout() {
    this.storageService.removeProviderImpersonatorFromSession();
    this.appService.clearImpersonatorSubject();
    this.context = '';
    this.storageService.removeUserFromSession();
    this.storageService.removeCSRFromSession();
    this.authService.startSignoutMainWindow();
     
  }
  
}