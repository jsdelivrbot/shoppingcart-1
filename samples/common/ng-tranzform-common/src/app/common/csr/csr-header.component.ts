import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

/**
 * Header to show for CSR users. Designed to be placed in the common shell.
 *
 * The application can show it as appropriate with *ngIf. The context and Exit link are displayed when context is defined.
 *
 * @example
 * <tzf-shell>
 *   <tzf-csr-header
 *     *ngIf="isCsrUser"
 *     [name]="csrUserName"
 *   ></tzf-csr-header>
 * </tzf-shell>
 */
@Component({
  selector: 'tzf-csr-header',
  templateUrl: './csr-header.component.html',
  styleUrls: ['./csr-header.component.scss']
})
export class CsrHeaderComponent {
  /**
   * The CSR's name.
   */
  @Input() name: string;

  /**
   * The CSR context, e.g. Provider View for Travis Montgomery
   */
  @HostBinding('class.has-context')
  @Input() context: string;

  /**
   * Text for exit link.
   */
  @Input() exitText = 'Exit';

  /**
   * User clicked the Logout link.
   */
  @Output() logout = new EventEmitter<void>();

  /**
   * User clicked the Exit link.
   */
  @Output() exit = new EventEmitter<void>();
}
