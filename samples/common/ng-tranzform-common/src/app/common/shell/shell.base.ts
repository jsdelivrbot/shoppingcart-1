import { HostBinding, HostListener } from '@angular/core';

/**
 * Common functionality for Clinical and Engage shells.
 */
export class BaseShell {
  /**
   * This class is added to remove the outline shown on focused elements in certain browsers.
   * However, the outline must remain for keyboard users so clicks and keys are detected below.
   *
   * This is a port of functionality originally created by the Chromium team:
   * https://chromium.googlesource.com/chromium/src/+/master/ui/webui/resources/js/cr/ui/focus_outline_manager.js
   */
  @HostBinding('class.focus-outline-hidden')
  private hideFocusOutline: boolean;

  private focusByKeyboard = true;

  constructor () {
    document.addEventListener('focus', () => this.focus(), true);
  }

  @HostListener('document:keydown')
  private keydown () {
    this.focusByKeyboard = true;
  }

  @HostListener('document:mousedown')
  private mousedown () {
    this.focusByKeyboard = false;
  }

  // @HostListener('document:focus')
  private focus () {
    this.updateVisibility();
  }

  @HostListener('document:focusout')
  private focusout () {
    window.setTimeout(() => {
      if (!document.hasFocus()) {
        this.focusByKeyboard = true;
        this.updateVisibility();
      }
    });
  }

  private updateVisibility () {
    this.hideFocusOutline = !this.focusByKeyboard;
  }
}
