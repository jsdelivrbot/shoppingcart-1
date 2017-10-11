import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BaseShell } from './shell.base';
import { ShellService } from './shell.service';
import { MenuItem } from './menu-item.model';
import { AuthorizationService } from '../security';

/**
 * Provide the application shell: header, navigation, and footer. This should be placed in the root component.
 *
 * @example
 * <tzf-shell
 *   [menuItems]="menuItems"
 *   [searchBox]="true"
 *   (search)="doSearch($event.value)"
 *   [notifications]="true"
 * >
 *   <img header src="assets/Logo.png">
 *   <img footer src="assets/Logo_Footer.png">
 *   <router-outlet></router-outlet>
 * </tzf-shell>
 *
 * @example
 * public class AppComponent {
 *   menuItems: MenuItem[] = [{
 *     label: 'Claims',
 *     routerPath: '/claims',
 *     svgPath: 'assets/menu-icons/Claims.svg',
 *   }, {
 *     label: 'Providers',
 *     routerPath: '/providers',
 *     svgPath: 'assets/menu-icons/Providers.svg',
 *   }];
 *
 *   notifications: Notification[];
 *
 *   constructor (
 *     private shellService: ShellService
 *   ) {
 *   }
 *
 *   doSearch (value: string) {
 *     // Perform search logic here
 *   }
 *
 *   loadNotifications () {
 *     this.client.getNotifications().subscribe(notifications => this.shellService.notificationCount = notifications.length);
 *   }
 * }
 */
@Component({
  selector: 'tzf-shell',
  templateUrl: './shell.component.html',
})
export class ShellComponent extends BaseShell {
  /**
   * Configure the items to put in the navigation menu.
   */
  @Input() menuItems: MenuItem[] = [];

  /**
   * Hide the navigation menu.
   */
  @Input() hideMenu: boolean;

  /**
   * Hide the user greeting and menu.
   */
  @Input() hideUser: boolean;

  /**
   * Show a search field in the header.
   */
  @Input() searchBox: boolean;

  /**
   * Show notifications in the header.
   */
  @Input() notifications: boolean;

  /**
   * Router link for messages. Setting this value will show the messages icon in the header.
   */
  @Input() messagesRouterLink: string | any[];

  /**
   * The user performed a search. The search term is available via $event.value
   *
   * @example
   * (search)="performSearch($event.value)"
   */
  @Output() search = new EventEmitter();

  /**
   * The user wants to log out.
   *
   * @example
   * (logout)="performLogout()"
   */
  @Output() logout = new EventEmitter();

  private searchValue = '';
  menuExpanded: boolean;
  userMenuOpen = false;

  constructor (
    private shellService: ShellService,
  ) {
    super();
  }

  private doSearch () {
    this.search.emit({
      value: this.searchValue,
    });
  }

  doLogOut () {
    this.logout.emit({});
  }
}
