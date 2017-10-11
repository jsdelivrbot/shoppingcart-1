import { Component, OnChanges, SimpleChanges, Input, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';

/**
 * Display custom or validation messages.
 *
 * @example
 * <tzf-message message="An error occurred."></tzf-message>
 *
 * @example
 * <form #myForm="ngForm">
 *   <tzf-message
 *     form="myForm"
 *     validationMessages="valMsgs"
 *   ></tzf-message>
 *   <input type="text"
 *     [(ngModel)]="field1"
 *     name="field1"
 *     required
 *   >
 * </form>
 *
 * @example
 * validationMessages = {
 *   field1: {
 *     required: 'Field #1 is required.',
 *   },
 * };
 */
@Component({
  selector: 'tzf-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {
  /**
   * Validation messages for the form controls. It is keyed by control name and references objects with messages keyed by validator.
   */
  @Input() validationMessages: { [key: string]: { [key: string]: string }};

  /**
   * The form to show validation messages for.
   */
  @Input() form: NgForm;

  /**
   * Multiple messages to display.
   */
  @Input() messages: string[];

  /**
   * A single message to display.
   */
  @Input() message: string;

  /**
   * The message type.
   */
  @HostBinding('class')
  @Input() type: 'error' | 'success' = 'error';

  /**
   * Icons for the different message types.
   */
  private icons = {
    error: 'assets/common/icons/icon_hide.svg',
    success: 'assets/common/icons/icon_tick.svg',
  };

  _messages: string[] = [];
  valMessages: string[] = [];

  /**
   * When a form is set, add hooks to detect validation changes.
   */
  ngOnChanges (changes: SimpleChanges) {
    if (changes.message) {
      this._messages = this.message ? [this.message] : [];
    } else if (changes.messages) {
      this._messages = this.messages || [];
    }

    const form = this.form;
    if (changes.form && form) {
      const updateMessages = () => {
        const messages = this.valMessages = [];
        if (form.invalid) {
          const valMsgs = this.validationMessages;
          for (const controlName in valMsgs) { // tslint:disable-line:forin
            const control = form.controls[controlName];
            if (!control) {
              console.warn('Validation message for non-existant control: ' + controlName);
              continue;
            }
            if (control.errors && control.touched) {
              const controlMessages = valMsgs[controlName];
              for (const validator in controlMessages) {
                if (control.errors[validator]) {
                  messages.push(controlMessages[validator]);
                }
              }
            }
          }
        }
      };

      // There is no hook for the touched event so patch one in.
      // Consider refactoring into replacement for FormControl.
      for (const controlName in form.controls) { // tslint:disable-line:forin
        const control = form.controls[controlName];
        (<any>control)._tzf_markAsTouched = control.markAsTouched;
        control.markAsTouched = function (onlySelf) {
          (<any>this)._tzf_markAsTouched(onlySelf);
          updateMessages();
        };
      }

      form.statusChanges.subscribe(updateMessages);
    }
  }
}
