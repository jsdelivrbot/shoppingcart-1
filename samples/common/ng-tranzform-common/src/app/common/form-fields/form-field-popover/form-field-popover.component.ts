import { Component, ViewChild, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, OnDestroy, forwardRef } from '@angular/core';

import { DomUtilities } from '../../shared/dom.utilities';
import { FormFieldChild } from '../form-field-child';

/**
 * Provide a button in the place of a field to open a large popover with a custom template.
 *
 * @example
 * <tzf-form-field-popover
 *   [actions]="true"
 *   (prepare)="preparePopoverData()"
 *   (accept)="copyDataFromPopover()"
 *   (reset)="clearPopoverData()"
 * >
 *   I can put whatever content I want here! How about a text box.
 *   <input type="text" [(ngModel)]="popoverData.value">
 * </tzf-form-field-popover>
 */
@Component({
  selector: 'tzf-form-field-popover',
  templateUrl: './form-field-popover.component.html',
  styleUrls: ['./form-field-popover.component.scss'],
  providers: [
    {
      provide: FormFieldChild,
      useExisting: forwardRef(() => FormFieldPopoverComponent)
    }
  ]
})
export class FormFieldPopoverComponent extends FormFieldChild implements OnInit, OnDestroy {
  /**
   * Display Reset and Done buttons at the bottom of the popover.
   */
  @Input() actions = true;

  /**
   * ID of popover element, also used to prefix action button IDs.
   */
  @Input() id: string;

  /**
   * Prevent keyboard access to the toggle button. Used when the button is needed for mouse users but there is an input for keybaord users.
   */
  @Input() disableToggleKeyAccess: boolean;

  /**
   * Disable this field. This should be handled by tzfFormField or other common component.
   */
  @Input() disabled: boolean;

  /**
   * Called before the popover is opened. If necessary, set up the
   * data bound to the fields in the popover.
   */
  @Output() prepare = new EventEmitter();

  /**
   * Called when the user has finished using the popover.
   */
  @Output() accept = new EventEmitter();

  /**
   * The data bound to the fields in the popover should be reset.
   */
  @Output() reset = new EventEmitter();

  /**
   * The container element of the popover.
   */
  @ViewChild('popover') private popoverRef: ElementRef;

  /**
   * The toggle button.
   */
  @ViewChild('toggleButton') private toggleButtonRef: ElementRef;

  /**
   * Initialized by FormFieldComponent parent.
   */
  label: string;

  /**
   * The popover should be displayed.
   *
   * Initialized to false instead of undefined for aria attributes.
   */
  open = false;

  /**
   * Global listener for focus events.
   */
  private docFocusListener: EventListener;

  /**
   * Set up listener for focus events to automatically close the popover.
   * @private
   */
  ngOnInit () {
    const listener = this.docFocusListener = event => {
      if (this.open && this.toggleButtonRef.nativeElement !== event.target && !this.popoverEl.contains(event.target)) {
        this.doAccept(false);
      }
    };

    document.addEventListener('focus', listener, true);
  }

  /**
   * Remove the focus event listener.
   * @private
   */
  ngOnDestroy () {
    document.removeEventListener('focus', this.docFocusListener);
  }

  /**
   * Accept the edits in the popover and close it.
   */
  doAccept (focusToggleOnClose?: boolean) {
    this.accept.emit();
    this.close(focusToggleOnClose);
  }

  /**
   * Reset the data in the popover and accept it, then close it.
   */
  private doReset () {
    this.reset.emit();
    this.accept.emit();
    this.close();
  }

  /**
   * Close the popover and return focus to the toggle button if desired.
   */
  private close (focusToggle = true) {
    if (focusToggle) {
      this.toggleButtonRef.nativeElement.focus();
    }

    this.open = false;
  }

  /**
   * Close the popup when Escape is pressed.
   */
  @HostListener('document:keyup', ['$event'])
  private closeOnEsc (event: KeyboardEvent) {
    if (this.open) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  }

  /**
   * Act as if Done was clicked when Enter is pressed.
   */
  closeOnEnter (event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.doAccept();
      return false;
    }
  }

  /**
   * Open or close the popover.
   */
  toggle () {
    if (this.open = !this.open) {
      this.prepare.emit();
      this.keepPopoverOnScreen();
      this.autoFocus();
    } else {
      this.popoverEl.style.right = 0;
      this.doAccept();
    }
  }

  /**
   * Attempt to focus on the first field in the popover.
   */
  private autoFocus () {
    setTimeout(() => {
      const inputs = this.popoverEl.getElementsByTagName('input');
      if (inputs.length) {
        inputs[0].select();
      }
    });
  }

  /**
   * Check if the popover is wide enough to go offscreen
   * and move to the left enough to bring it back on.
   */
  keepPopoverOnScreen () {
    if (this.open) {
      const popoverEl = this.popoverEl;
      const windowWidth = document.documentElement.clientWidth;

      // Reset before computing
      popoverEl.style.maxWidth = windowWidth + 'px';

      // Update the position
      const popoverRightCoordinate = popoverEl.offsetWidth + DomUtilities.getAbsoluteOffset(popoverEl.offsetParent).left;
      popoverEl.style.left = (popoverRightCoordinate > windowWidth) ? windowWidth - popoverRightCoordinate - 1 + 'px' : '-1px';
      popoverEl.style.right = 'auto';
    }
  }

  /**
   * Get the popover container's native element.
   */
  private get popoverEl () {
    return this.popoverRef.nativeElement;
  }
}
