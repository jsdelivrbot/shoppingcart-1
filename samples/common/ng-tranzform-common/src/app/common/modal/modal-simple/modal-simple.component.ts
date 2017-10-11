import { Component, EventEmitter, OnDestroy } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

/**
 * This component is not intended to be used directly. The ModalService uses it for Alert and Confirm modals.
 */
@Component({
  templateUrl: './modal-simple.component.html',
  styleUrls: ['./modal-simple.component.scss']
})
export class ModalSimpleComponent implements OnDestroy {
  public messages: string[];
  public headerText: string;
  public okText: string;
  public cancelText = '';

  constructor (
    public modal: NgbActiveModal,
  ) {
    if (document.body.className.indexOf('modal-open') >= 0) {
      document.body.className += ' two-modals';
    }
  }

  ngOnDestroy () {
    const body = document.body;
    if (body.className.indexOf('two-modals') >= 0) {
      body.className = 'modal-open ' + body.className.replace(/ ?two-modals/, '');
    }
  }

  /**
   * The user clicked the Submit button.
   */
  onSubmit () {
    this.modal.close();
  }

  /**
   * The user dismissed the modal.
   * @param reason Reason for dismissal.
   */
  onDismiss (reason) {
    this.modal.dismiss(reason);
  }
}
