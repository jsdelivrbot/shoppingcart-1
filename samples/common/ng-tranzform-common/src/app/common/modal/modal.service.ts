import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

import { ModalSimpleComponent } from './modal-simple/modal-simple.component';

/**
 * Parameters for the ALert modal.
 */
export interface ModalAlertParams {
  /**
   * Main message to display. An array can be passed to display multiple paragraphs.
   */
  message: string | string[];

  /**
   * Text to display in the header.
   */
  headerText: string;

  /**
   * Text to display on the OK button.
   */
  okText: string;
}

/**
 * Parameters for the Confirm modal.
 */
export interface ModalConfirmParams extends ModalAlertParams {
  /**
   * Text to display on the Cancel button.
   */
  cancelText: string;
}

/**
 * Boilerplate code for working with modals.
 */
@Injectable()
export class ModalService {
  constructor (
    private modal: NgbModal
  ) {
  }

  /**
   * Open a modal with a message and a single button.
   * @param params Text values.
   * @return A promise that resolves when the user closes the modal.
   */
  public alert (params: ModalAlertParams) {
    return new Promise(resolve => {
      this.confirm({
        message: params.message,
        headerText: params.headerText,
        okText: params.okText,
        cancelText: '',
      })
      .then(() => resolve(), () => resolve());
    });
  }

  /**
   * Open a modal with a message and ok/cancel buttons.
   * @param params Text values.
   * @return A promise that resolves when the user click the OK button or is rejected when they cancel or close it.
   */
  public confirm (params: ModalConfirmParams) {
    const modalRef = this.modal.open(ModalSimpleComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    const modalCmp = modalRef.componentInstance as ModalSimpleComponent;
    modalCmp.modal = modalRef;
    modalCmp.messages = Array.isArray(params.message) ? params.message : [ params.message ];
    modalCmp.headerText = params.headerText;
    modalCmp.okText = params.okText;
    modalCmp.cancelText = params.cancelText;

    return modalRef.result;
  }
}
