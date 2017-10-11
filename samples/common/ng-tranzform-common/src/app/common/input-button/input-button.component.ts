import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

/**
 * Add a button to an input field.
 *
 * @example
 * <tzf-input-button
 *   [btnSVG]="'assets/image.svg'"
 *   btnTitle="Click this button"
 *   (btnClick)="buttonClicked()"
 * >
 *   <input type="text" [(ngModel)]="value">
 * </tzf-input-button>
 */
@Component({
  selector: 'tzf-input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.scss']
})
export class InputButtonComponent {
  /**
   * ID of the button.
   */
  @Input() id: string;

  /**
   * Path to SVG to show in button.
   */
  @Input() btnSVG: string;

  /**
   * The HTML title for the button.
   */
  @Input() btnTitle: string;

  /**
   * Display the button.
   */
  @HostBinding('class.has-btn')
  @Input() btnIf = true;

  @Input() btnTabindex: number;

  /**
   * Button click event.
   */
  @Output() btnClick = new EventEmitter<void>();
}
