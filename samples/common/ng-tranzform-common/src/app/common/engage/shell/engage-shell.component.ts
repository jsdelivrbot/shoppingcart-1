import { Component, Input, HostBinding } from '@angular/core';

import { BaseShell } from '../../shell/shell.base';

@Component({
  selector: 'tzf-engage-shell',
  templateUrl: './engage-shell.component.html',
  styleUrls: ['./engage-shell.component.scss']
})
export class EngageShellComponent extends BaseShell {
  @Input() sidebar: boolean;

  @HostBinding('class.touch')
  private touch = 'ontouchstart' in document.documentElement;

  @HostBinding('class.no-touch')
  private noTouch = !this.touch;
}
