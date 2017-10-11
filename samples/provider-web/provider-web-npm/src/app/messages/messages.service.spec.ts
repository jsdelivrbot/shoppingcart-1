import { TestBed, inject } from '@angular/core/testing';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
    let component: MessagesService;
     let msgCenterApi: any
  beforeEach(() => {
     msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['getFilterOptions', 'getMessageType', 'getMessageDetails', 'getConversationMessages']);
     component = new MessagesService(
      msgCenterApi);

  });

  it('should create', () => {
    expect(component).toBeTruthy(true);
  });

  it('should call  all get functions', () => {
    component.getFilterOptions();
    component.getMessageDetails();
     component.getMessageType(); 
        component.getDraftBadge();
        component.getInfoMessage();
    component.getErrorMessage();
  });
  
  it('should call  clear info message', () => {
        component.clearInfoMessage();
        component.clearErrorMessage();
        component.clearDraftBadge();
  });
}); 
