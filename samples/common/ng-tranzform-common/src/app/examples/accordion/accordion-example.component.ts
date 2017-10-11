import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from 'angular2-logger/core';

import { ModalEvent, ModalService } from '../../common/modal';

@Component({
  selector: 'tzf-accordion-example',
  templateUrl: './accordion-example.component.html',
  styleUrls: ['./accordion-example.component.scss']
})
export class AccordionExampleComponent {
  modalRef: NgbModalRef;

  constructor (
    private modal: NgbModal,
    private modalService: ModalService,
    private log: Logger,
  ) {
  }

  openModal (template) {
    this.modalRef = this.modal.open(template, <any>{ size: 'md' });
    this.modalRef.result.catch(reason => {
      this.log.info('Modal closed by user: ' + reason);
    });
  }

  openConfirm () {
    this.modalService.confirm({
      headerText: 'Please Confirm',
      message: [
        'This is a confirmation message.',
        'Tell me what you want to do.'
      ],
      cancelText: 'Never Mind',
      okText: 'Do It!',
    })
    .then(
      () => this.log.info('Confirmed'),
      () => this.log.info('Not confirmed')
    );
  }

  openAlert () {
    this.modalService.alert({
      headerText: 'Alert!',
      message: 'This is an alert message.',
      okText: 'Looks Good',
    })
    .then(() => this.log.info('Alerted'));
  }

  modalAction (event: ModalEvent) {
    this.log.info('Do action: ' + event.actionId);
  }

  submitModal (event: ModalEvent) {
    this.log.info('Modal submitted');

    // The modal will automatically close when this observable is successful.
    // Normally, the observable returned from a service client would be set here.
    const sub = new Subject();
    event.observe = sub;

    sub.subscribe(response => {
      // Update the main screen
    }, err => {
      // When calling a real service, handle the error here
    });

    // Simulate waiting for service call
    setTimeout(() => {
      sub.next();
      sub.complete();
    }, 1000);
  }
}
