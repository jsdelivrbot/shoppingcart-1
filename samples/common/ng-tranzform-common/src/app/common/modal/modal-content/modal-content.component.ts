import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import { ModalAction } from '../modal-action.model';
import { ModalEvent } from '../modal-event.model';

/**
 * Provide styles and plumbing for modal content in coordination with ng-boostrap.
 *
 * @example
 * <ng-template #modal>
 *   <tzf-modal-content
 *     [modal]="modalRef"
 *     headerText="FEATURE.MODAL_HEADER"
 *     backText="FEATURE.MODAL_BACK"
 *     (submit)="modalSubmitted($event)"
 *   >
 *     <div [main]>
 *       This is the main content.
 *     </div>
 *     <div [bottom]>
 *       This is additional content to put under the buttons, if necessary.
 *     </div>
 *   </tzf-modal-content>
 * </ng-template>
 *
 * @example
 * modalSubmitted (event: ModalEvent) {
 *   const obs = this.serviceClient.save();
 *
 *   // Setting the client return value to the event will automatically close the modal if it succeeds
 *   event.observe = obs;
 *
 *   obs.subscribe(response => {
 *     // Update the main screen
 *   }, err => {
 *     // Handle error
 *   });
 * }
 */
@Component({
  selector: 'tzf-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements AfterViewInit {
  /**
   * A reference to the modal containing this content.
   */
  @Input() modal: NgbModalRef;

  /**
   * Text to show in header of modal.
   */
  @Input() headerText: string;

  /**
   * Text to show above header in modal that will close it when clicked.
   */
  @Input() backText: string;

  /**
   * Text to show on the leftmost Cancel button.
   */
  @Input() cancelText = 'GLOBAL.CANCEL_BUTTON_LABEL';

  /**
   * Show the cancel button.
   */
  @Input() cancelButton = true;

  /**
   * Disable the cancel button.
   */
  @Input() disableCancel: boolean;

  /**
   * Text to show on the submit button.
   */
  @Input() submitText = 'GLOBAL.SAVE_BUTTON_LABEL';

  /**
   * Show the submit button.
   */
  @Input() submitButton = true;

  /**
   * A list of actions to create buttons for.
   */
  @Input() actions: ModalAction[];

  /**
   * Fired when the user submits the modal form.
   */
  @Output() submit = new EventEmitter<ModalEvent>();

  /**
   * Disable the Submit button.
   */
  @Input() disableSubmit: boolean;

  /**
   * Fired when the user clicks a custom action.
   */
  @Output() action = new EventEmitter<ModalEvent>();

  /**
   * Check that required inputs have been bound.
   */
  ngAfterViewInit () {
    if (!this.modal) {
      throw new Error('You must bind the NgbModalRef returned by NgbModal.open to [modal] on tzf-modal-content');
    }
  }

  /**
   * Notify that the modal form has been submitted.
   */
  doSubmit () {
    const event: ModalEvent = {};
    this.submit.emit(event);

    this.watch(event);
  }

  /**
   * Notify that the user has dismissed the modal.
   * @param reason Whether the user clicked Cancel or the Back text.
   */
  doDismiss (reason: string) {
    this.modal.dismiss(reason);
  }

  /**
   * Notify that an action has been triggered.
   * @param id The action ID.
   */
  doAction (id: any) {
    const event: ModalEvent = {
      actionId: id,
    };

    this.action.emit(event);

    this.watch(event);
  }

  /**
   * If an observable was set to the event, close the modal when it succeeds.
   * @param event The event passed to the implementer.
   */
  private watch (event: ModalEvent) {
    if (event.observe) {
      event.observe.first().subscribe(() => {
        this.modal.close();
      });
    }
  }
}
