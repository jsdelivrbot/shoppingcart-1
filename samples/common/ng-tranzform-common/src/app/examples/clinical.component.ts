import { Component } from '@angular/core';

import { MenuItem } from '../common';
import { ShellService } from '../common/shell/shell.service';

@Component({
  selector: 'tzf-clinical',
  templateUrl: './clinical.component.html',
  styleUrls: ['./clinical.component.scss']
})
export class ClinicalComponent {
  showCsr: boolean;

  menuItems: MenuItem[] = [{
    label: 'Dropdown',
    routerPath: '/clinical/dropdown',
    svgPath: 'assets/menu-icons/ClaimStatusInquiry.svg',
  }, {
    label: 'Tables',
    routerPath: '/clinical/tables',
    svgPath: 'assets/menu-icons/ReferralDecisionSupport.svg',
  }, {
    label: 'Form Fields',
    routerPath: '/clinical/formFields',
    svgPath: 'assets/menu-icons/Dashboard.svg',
  }, {
    label: 'Tabs and Progress Bar',
    routerPath: '/clinical/tabs',
    svgPath: 'assets/Referrals.svg',
  }, {
    label: 'Accordion and Modal',
    routerPath: '/clinical/accordion',
    svgPath: 'assets/menu-icons/PatientList.svg',
  }, {
    label: 'Use',
    routerPath: '/clinical/use',
    svgPath: 'assets/menu-icons/CareFeed.svg',
  }, {
    label: 'Access Check',
    routerPath: '/clinical/accessCheck',
    svgPath: 'assets/menu-icons/CareProfile.svg',
  }, {
    label: 'Routing',
    routerPath: '/clinical/routing',
    svgPath: 'assets/menu-icons/EligibilityCheck.svg',
  }, {
    label: 'Wizard',
    routerPath: '/clinical/wizard',
    svgPath: 'assets/menu-icons/EligibilityCheck.svg',
  }];

  constructor (
    shellService: ShellService,
  ) {
    shellService.userName = 'Awesome User';
    shellService.lastLoggedIn = new Date(2017, 7, 9, 17, 40);
  }

  logSearch (value) {
    console.log('Search: ' + value);
  }
}
