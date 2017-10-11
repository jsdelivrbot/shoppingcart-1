import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { tzfCommonEnvironment as environment } from './environment';
import { AuthorizationService } from './security';

/**
 * Bootstrap the module with any necessary common functionality.
 * @param module The module to bootstrap.
 * @param env Angular CLI environment config.
 * @deprecated This isn't compatible with production builds.
 */
export function bootstrap (module: any, env: any) {
  Object.assign(environment, env);
  AuthorizationService.instance().signedIn().subscribe(() => {
    platformBrowserDynamic().bootstrapModule(module);
  });
}
