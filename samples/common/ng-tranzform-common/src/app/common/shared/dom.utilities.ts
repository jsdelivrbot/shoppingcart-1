import { Injectable } from '@angular/core';

export interface DomOffset {
  left: number;
  top: number;
}

export class DomUtilities {
  public static getAbsoluteOffset (element: any) {
    const offset: DomOffset = {
      left: 0,
      top: 0,
    };

    while (element) {
      offset.left += element.offsetLeft;
      offset.top += element.offsetTop;
      element = element.offsetParent;
    }

    return offset;
  }

  public static scrollTo (element: any) {
    window.scroll(0, DomUtilities.getAbsoluteOffset(element).top - 40);
  }
}
