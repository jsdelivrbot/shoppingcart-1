import { Component, Input, HostBinding } from '@angular/core';

/**
 * Mask an element while content is being loaded.
 *
 * @example
 * <div [tzfLoading]="loading">
 *   My content.
 * </div>
 *
 * @example
 * private loading: boolean;
 *
 * loadContent () {
 *   this.client.load()
 *     .finally(() => this.loading = false)
 *     .subscribe(response => {
 *       // Handle response
 *     });
 *
 *   this.loading = true;
 * }
 */
@Component({
  selector: '[tzfLoading]', // tslint:disable-line:component-selector
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  /**
   * Cover content with loading mask and indicator.
   */
  @HostBinding('class.loading')
  @Input('tzfLoading') loading: boolean; // tslint:disable-line:no-input-rename
}
