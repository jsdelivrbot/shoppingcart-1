import { Component, Input } from '@angular/core';

/**
 * A progress bar. It will take up the width of its container.
 *
 * @example
 * <tzf-progress-bar [value]="finished / total"></tzf-progress-bar>
 */
@Component({
  selector: 'tzf-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  /**
   * A value between 0 and 1 to represent.
   *
   * Values less than 0 will be treated as 0 and those more than 1 as 1.
   */
  @Input() value: number;
}
