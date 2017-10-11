import { Component } from '@angular/core';

import { TabItem } from '../../common/tabs';

@Component({
  selector: 'tzf-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['./tabs-example.component.scss']
})
export class TabsExampleComponent {
  tabItems: TabItem[] = [{
    routerPath: 'first',
    svgPath: 'assets/Referrals.svg',
    label: 'First',
    badge: 'Badge',
  }, {
    routerPath: 'second',
    svgPath: 'assets/common/icons/SearchIcon.svg',
    label: 'Second',
    disabled: true
  }];

  auxTabItems: TabItem[] = [{
    routerPath: 'auxTab1',
    svgPath: 'assets/Referrals.svg',
    label: 'Aux Tab 1',
  }, {
    routerPath: 'auxTab2',
    svgPath: 'assets/common/icons/SearchIcon.svg',
    label: 'Aux Tab 2',
  }];

  badgeValue = '2';
  disableFirstTab: boolean;

  progress: any = .5;
  autoProgress: boolean;

  toggleAutoProgress () {
    if (this.autoProgress) {
      this.advanceProgress();
    }
  }

  advanceProgress () {
    if (this.autoProgress) {
      const progressNum = parseFloat(this.progress);

      if (progressNum > 1) {
        this.progress = 0;
      } else {
        this.progress = progressNum + .01;
      }

      let time = 25;
      if (this.progress === 0 || this.progress >= 1) {
        time = 1000;
      }

      setTimeout(() => {
        this.advanceProgress();
      }, time);
    }
  }
}
