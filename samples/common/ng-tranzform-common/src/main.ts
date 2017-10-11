import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { tzfCommonEnvironment } from './app/common/environment';
import { AuthorizationService } from './app/common/security';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Copy the app environment to the common environment
Object.assign(tzfCommonEnvironment, environment);

// Bootstrap Angular if we're signed in
AuthorizationService.instance().signedIn().subscribe(() => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
