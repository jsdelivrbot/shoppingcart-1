import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ModalContentComponent } from './modal-content.component';
import { ModalEvent } from '../modal-event.model';

describe('ModalContentComponent', () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;
  let el: any;
  let mockModal: NgbModalRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      declarations: [
        ModalContentComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(inject([TranslateService], (translateService: TranslateService) => {
    fixture = TestBed.createComponent(ModalContentComponent);
    el = fixture.nativeElement;
    component = fixture.componentInstance;
    component.modal = mockModal = jasmine.createSpyObj('mockModal', [
      'close',
      'dismiss',
    ]);
    component.backText = 'Back';

    translateService.setDefaultLang('en');
    translateService.setTranslation('en', {
      'HEADER': 'Header',
      'BACK': 'Back',
      'CANCEL': 'Cancel',
      'SUBMIT': 'Submit',
      'ACTION': 'Action'
    });

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('throws error if modal is not bound', () => {
    fixture = TestBed.createComponent(ModalContentComponent);
    expect(() => fixture.detectChanges()).toThrowError();
  });

  it('translates text', () => {
    component.headerText = 'HEADER';
    component.cancelText = 'CANCEL';
    component.backText = 'BACK';
    component.submitText = 'SUBMIT';
    component.actions = [{
      id: 'action',
      text: 'ACTION',
    }];

    fixture.detectChanges();

    expect(el.querySelector('#modal-header').innerText).toMatch(/^Header/); // SVG gets added after this
    expect(el.querySelector('#modal-cancel').innerText).toEqual('Cancel');
    expect(el.querySelector('#modal-back').innerText).toEqual('Back');
    expect(el.querySelector('#modal-submit').innerText).toEqual('Submit');
    expect(el.querySelector('#action').innerText).toEqual('Action');
  });

  it('dismisses the modal when cancel is clicked', () => {
    const cancelBtn = el.querySelector('#modal-cancel');
    cancelBtn.click();
    expect(mockModal.dismiss).toHaveBeenCalledWith('cancel');
  });

  it('dismisses the modal when back is clicked', () => {
    const backLink = el.querySelector('#modal-back');
    backLink.click();
    expect(mockModal.dismiss).toHaveBeenCalledWith('back');
  });

  it('has cancel and submit buttons enabled by default', () => {
    expect(el.querySelector('#modal-cancel').disabled).toBeFalsy();
    expect(el.querySelector('#modal-submit').disabled).toBeFalsy();
  });

  it('can disable cancel and submit buttons', () => {
    component.disableCancel = component.disableSubmit = true;
    fixture.detectChanges();

    expect(el.querySelector('#modal-cancel').disabled).toBeTruthy();
    expect(el.querySelector('#modal-submit').disabled).toBeTruthy();
  });

  it('removes cancel and submit buttons', () => {
    component.cancelButton = component.submitButton = false;
    fixture.detectChanges();

    expect(el.querySelector('#modal-cancel')).toBeFalsy();
    expect(el.querySelector('#modal-submit')).toBeFalsy();
  });

  it('supports custom actions', () => {
    component.actions = [{
      id: 'testAction',
      text: 'Test Action',
    }];
    fixture.detectChanges();

    const actionBtn = el.querySelector('#testAction');
    expect(actionBtn).toBeTruthy();
    expect(actionBtn.innerText).toEqual('Test Action');
  });

  it('fires custom actions', () => {
    let actionId: string;
    component.action.subscribe((actionEvent: ModalEvent) => {
      actionId = actionEvent.actionId;
    });

    component.actions = [{
      id: 'testAction',
      text: 'Test Action',
    }];
    fixture.detectChanges();

    el.querySelector('#testAction').click();
    expect(actionId).toEqual('testAction');
  });

  it('fires submit action', () => {
    let submitted = false;
    component.submit.subscribe(() => {
      submitted = true;
    });

    el.querySelector('#modal-submit').click();
    expect(submitted).toEqual(true);
  });

  it('closes the modal after submit when observable is given', () => {
    const subject = new Subject();

    component.submit.subscribe((event: ModalEvent) => {
      event.observe = subject;
    });

    el.querySelector('#modal-submit').click();
    expect(mockModal.close).not.toHaveBeenCalled();

    subject.next();
    subject.complete();
    expect(mockModal.close).toHaveBeenCalled();
  });

  it('closes the modal after action when observable is given', () => {
    component.actions = [{
      id: 'testAction',
      text: 'Test Action',
    }];
    fixture.detectChanges();

    const subject = new Subject();

    component.action.subscribe((event: ModalEvent) => {
      event.observe = subject;
    });

    el.querySelector('#testAction').click();
    expect(mockModal.close).not.toHaveBeenCalled();

    subject.next();
    subject.complete();
    expect(mockModal.close).toHaveBeenCalled();
  });
});
