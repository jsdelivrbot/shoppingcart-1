import { Injectable } from '@angular/core';

import { SVGCacheService } from 'ng-inline-svg';

@Injectable()
export class SvgService {
  constructor (
    svgCache: SVGCacheService,
  ) {
    const baseTags = document.getElementsByTagName('base');
    if (baseTags.length) {
      svgCache.setBaseUrl({
        baseUrl: baseTags[0].getAttribute('href')
      });
    }
  }
}
