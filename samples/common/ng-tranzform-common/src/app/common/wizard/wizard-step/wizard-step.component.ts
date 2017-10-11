import { Component, Input, Output, EventEmitter, ContentChildren, ViewChild, QueryList, AfterViewInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { WizardComponent, CompleteEvent, PrepareEvent } from '../wizard.component';

/**
 * A step in a wizard.
 */
@Component({
  selector: 'tzf-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss'],
})
export class WizardStepComponent implements AfterViewInit {
  /**
   * ID of the wizard step.
   */
  @Input() id: string;

  /**
   * Text to display in the navigation strip.
   */
  @Input() name = 'Name';

  /**
   * Header for the content of this step. If not defined, name is used.
   */
  @Input() header: string;

  /**
   * Text to display on the Next button.
   */
  @Input() nextButtonText = 'GLOBAL.NEXT_BUTTON_LABEL';

  @Input() models: NgModel[];

  /**
   * Notify that this step is about to become active.
   */
  @Output() prepare = new EventEmitter<PrepareEvent>();

  /**
   * Notify that this step has been completed.
   */
  @Output() complete = new EventEmitter<CompleteEvent>();

  @Output('form') formOutput = new EventEmitter<NgForm>(); // tslint:disable-line:no-output-rename

  @ViewChild('form') form: NgForm;

  /**
   * The parent wizard for this step.
   */
  wizard: WizardComponent;

  /**
   * This step is active.
   */
  active: boolean;

  ngAfterViewInit () {
    if (this.models) {
      this.models.forEach(control => this.form.addControl(control));
    }

    // This is for the form to be bound to a component in the content which will have already been initialized.
    // If emitted right away, the expression is changed within the change detection cycle and throws an error.
    setTimeout(() => {
      this.formOutput.emit(this.form);
    });
  }
}
