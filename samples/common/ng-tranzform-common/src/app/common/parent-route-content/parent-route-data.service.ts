import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

/**
 * Enable simple data passing between parent routes and their children.
 */
@Injectable()
export class ParentRouteDataService {
  private subjectsByParentId: { [ key: string ]: {
    toChild: Subject<any>;
    toParent: Subject<any>;
  }} = {};

  /**
   * Register a parent route. TO BE USED BY ParentRouteContentComponent ONLY!
   * @param parentId ID of the parent route content.
   */
  public registerParent<T> (parentId: string) {
    let subjects = this.subjectsByParentId[parentId];
    if (subjects) {
      throw new Error('Parent is already registered! (' + parentId + ')');
    }

    subjects = this.subjectsByParentId[parentId] = {
      toChild: new Subject<any>(),
      toParent: new Subject<any>(),
    };

    return {
      fromChild: subjects.toParent as Observable<any>,
      toChild: subjects.toChild as Observer<any>,
    };
  }

  /**
   * Unregister a parent route. TO BE USED BY ParentRouteContentComponent ONLY!
   * @param parentId ID of the parent route content.
   */
  public unregisterParent (parentId: string) {
    const subjects = this.subjectsByParentId;
    const subject = subjects[parentId];
    if (!subject) {
      throw new Error('Parent is not registered: ' + parentId);
    }

    subject.toChild.complete();
    subject.toParent.complete();
    delete subjects[parentId];
  }

  /**
   * Get an observable to receive data from a parent route.
   * @param parentId ID of the parent route content.
   */
  public observableFor (parentId: string) {
    const subjects = this.subjectsByParentId[parentId];
    if (!subjects) {
      throw new Error('Parent not found: ' + parentId);
    }

    return subjects.toChild as Observable<any>;
  }

  /**
   * Send data to a parent route.
   * @param parentId ID of the parent route content.
   * @param data Data to send.
   */
  public send (parentId: string, data: any) {
    const subjects = this.subjectsByParentId[parentId];
    if (!subjects) {
      throw new Error('Parent not found: ' + parentId);
    }

    subjects.toParent.next(data);
  }
}
