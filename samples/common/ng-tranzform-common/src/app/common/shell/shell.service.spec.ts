import { TestBed, inject } from '@angular/core/testing';

import { ShellService } from './shell.service';

describe('ShellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShellService]
    });
  });

  it('should be created', inject([ShellService], (service: ShellService) => {
    expect(service).toBeTruthy();
  }));

  it('should show 5 messages', inject([ShellService], (service: ShellService) => {
    service.messageCount = 5;
    expect(service._messageCount).toBe(5);
  }));

  it('should not show 0 messages', inject([ShellService], (service: ShellService) => {
    service.messageCount = 0;
    expect(service._messageCount).toBeUndefined();
  }));

  it('should show 15 messages as 9+', inject([ShellService], (service: ShellService) => {
    service.messageCount = 15;
    expect(service._messageCount).toBe('9+');
  }));

  it('should show 5 notifications', inject([ShellService], (service: ShellService) => {
    service.notificationCount = 5;
    expect(service._notificationCount).toBe(5);
  }));

  it('should not show 0 notifications', inject([ShellService], (service: ShellService) => {
    service.notificationCount = 0;
    expect(service._notificationCount).toBeUndefined();
  }));

  it('should show 25 notifications as 19+', inject([ShellService], (service: ShellService) => {
    service.notificationCount = 25;
    expect(service._notificationCount).toBe('19+');
  }));
});
