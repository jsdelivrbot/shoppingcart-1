import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import {  } from '@angular/common';

@Directive({
  selector: '[tzfClickOutside]',
})
export class ClickOutsideDirective {
  @Input('tzfClickOutside') enabled = true; // tslint:disable-line:no-input-rename

  @Input() ignoreOrphanTargetClicks: boolean;

  @Output() clickOutside = new EventEmitter();

  constructor(
    private _element: ElementRef,
  ) {
  }

  @HostListener('document:click', ['$event.target'])
  onOutsideClick (target) {
    if (this.enabled !== false && !this._element.nativeElement.contains(target)) {
      if (this.ignoreOrphanTargetClicks) {
        for (; target !== document.body; target = target.parentNode) {
          if (!target) {
            return;
          }
        }
      }

      this.clickOutside.emit();
    }
  }
}
