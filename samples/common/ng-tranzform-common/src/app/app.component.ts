import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { MenuItem } from './common';
import { AuthHeaderService, ConfigModule, MemberContext } from './common';
import {AccessCheckService} from './common/shared/access-check.service';

@Component({
  selector: 'tzf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MemberContext,
    AccessCheckService
  ]
})
export class AppComponent implements OnInit {
  title = 'TranZform Common';

  constructor(
    translate: TranslateService,
    private authService: AuthHeaderService,
    private accessCheckService: AccessCheckService,
    private memberContext: MemberContext,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en-US');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en-US');
  }

  ngOnInit() {
    // let auth: any;

    this.authService.setFakeHeaders();

    /*
    // Commenting out for now to remove need for mock services running.
    const authRequest = this.authService.getHeaders().subscribe(res =>
      auth = res
    );

    this.authService.setHeaders();
    */

    this.accessCheckService.getCapabilitesCached().subscribe(result => {
      // console.log('Static capabilities returned');
    });
  }
}
