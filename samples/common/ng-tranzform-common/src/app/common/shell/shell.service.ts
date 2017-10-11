import { Injectable } from '@angular/core';

/**
 * Provides a way to interact with the common shell.
 */
@Injectable()
export class ShellService {
  private static MAX_MESSAGE_COUNT = 9;
  private static MAX_NOTIFICATION_COUNT = 19;

  _messageCount: string | number;
  _notificationCount: string | number;
  _userName: string;
  _lastLoggedIn: Date;

  /**
   * The number of messages to display in the header.
   */
  set messageCount (count: number) {
    this._messageCount = !count ? undefined
                       : count > ShellService.MAX_MESSAGE_COUNT ? ShellService.MAX_MESSAGE_COUNT + '+'
                       : count;
  }

  /**
   * The number of notifications to display in the header.
   */
  set notificationCount (count: number) {
    this._notificationCount = !count ? undefined
                            : count > ShellService.MAX_NOTIFICATION_COUNT ? ShellService.MAX_NOTIFICATION_COUNT + '+'
                            : count;
  }

  /**
   * Set the current user's name.
   */
  set userName (userName: string) {
    this._userName = userName;
  }

  /**
   * The date the user last logged in.
   */
  set lastLoggedIn (lastLoggedIn: Date) {
    this._lastLoggedIn = lastLoggedIn;
  }
}
