import { Directive, ElementRef, Renderer, HostListener, Input, Host, Optional} from '@angular/core';
import { AccessCheckService } from '../shared/access-check.service';
import { RoleBasedAccessControlApi, CapabilityMap } from '@tranzform/client-authorization';
import { AccessCheckProvider } from '../shared/access-check-aware';

@Directive({
  selector: '[tzfApplyAccessCheck]',
  providers: [RoleBasedAccessControlApi]
})
export class ApplyAccessCheckDirective {
  private items = [];
  private currentCapability: string[];

  @Input() capability: string[];

  constructor(
    @Optional() @Host() private parent: AccessCheckProvider,
    el: ElementRef,
    private renderer: Renderer,
    accessCheckService: AccessCheckService
  ) {
    // wait to process until capabilities are cached
    accessCheckService.getCapabilitesCached().subscribe(cache => {
      this.items = cache;
      this.applyCapabilityRules(el, accessCheckService);
    });
  }

  private applyCapabilityRules(el: ElementRef, accessCheckService: AccessCheckService) {
    const control = el.nativeElement;
    const capabilityKey = control.getAttribute('capability');
    const capabilities = accessCheckService.getCapabilities(capabilityKey);

    // If this is a tzform common control, pass capabilites to control for evaluation
    // This control should be using an interface with the applyAccessControl method implmented.
    if (this.parent) {
      this.parent.applyAccessControl({
        read: capabilities.indexOf('Read') >= 0,
        write: capabilities.indexOf('Write') >= 0,
        update: capabilities.indexOf('Update') >= 0,
        delete: capabilities.indexOf('Delete') >= 0,
      });
      return;
    }

    // disable the element first
    // to prevent the css effect delay caused by the service call
    control.setAttribute('disabled', 'disabled'); // Read Only

    // If no capabilities, remove
    if (!capabilities) {
      // Hide
      this.setDisplayNone(control);
      return;
    }

    if (capabilities && !capabilities.length) {
      // Hide
      this.setDisplayNone(control);
      return;
    }

    if (capabilities && capabilities.length === 1 && capabilities.indexOf('Read') !== -1) {
      // Keep read only attribute
      if (el.nativeElement.type === 'button') {
        // this.removeControl(control); MemberEngage version does this. Not a good angular 2 practice
        this.setDisplayNone(control);
      }
      return;
    }

    // Permission exists but != Read, Write, Update, Delete . Treat as read-only
    if (capabilities && capabilities.length === 1
      && capabilities.indexOf('Read') !== -1
      && capabilities.indexOf('Write') !== -1
      && capabilities.indexOf('Update') !== -1
      && capabilities.indexOf('Delete') !== -1) {
      // Keep read only attribute
      if (el.nativeElement.type === 'button') {
        // this.removeControl(control); MemberEngage version does this. Not a good angular 2 practice
        this.setDisplayNone(control);
      }
      return;
    }

    if (capabilities && capabilities.length && capabilities.length > 1) {
      // Full functionality. Remove read only attribute
      this.removeDisabledAttribute(control);
    }
  }

  private setDisplayNone(control) {
    control.setAttribute('style', 'display:none');
  }

  private removeControl(control) {
    control.remove();
  }

  private removeDisabledAttribute(control) {
    control.removeAttribute('disabled');
  }

  private addDisabledAttribute(control) {
    control.setAttribute('disabled', 'disabled');
  }

}
