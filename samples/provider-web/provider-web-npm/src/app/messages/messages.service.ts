import { Injectable } from '@angular/core';
import * as msgCenterClient from '@tranzform/client-msgcenter/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FilterOptions} from './filter.options';

  
@Injectable()
export class MessagesService {

    private msgDetails: any;
    private msgType: string;
    private subject = new Subject<any>();
    private errorSubject = new Subject<any>();
    private badgeSubject = new Subject<any>();
    private filterOptions: FilterOptions;
 

    constructor(private msgCenterApi: msgCenterClient.MessageCenterV2Api) { }

public getFilterOptions(): FilterOptions {
        return this.filterOptions;
    }
    //setting the message Details
    public setFilterOptions(category ,messageStatus): void {     
        this.filterOptions= new FilterOptions(category,messageStatus);
    }
    //setting the message Details
    public setMessageDetails(msgDetails): void {
        this.msgDetails = msgDetails;
    }

    //getting the message details
    public getMessageDetails(): any {
        return this.msgDetails;
    }

    //setting the message type
    public setMessageType(msgType): void {
        this.msgType = msgType;
    }

    //getting the message type
    public getMessageType(): string {
        return this.msgType;
    }
    setInfoMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearInfoMessage() {
        this.subject.next();
    }

    getInfoMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    setErrorMessage(message: string) {
        this.errorSubject.next({ text: message });
    }

    clearErrorMessage() {
        this.errorSubject.next();
    }

    getErrorMessage(): Observable<any> {
        return this.errorSubject.asObservable();
    }

    getDraftBadge(): Observable<any> {
        return this.badgeSubject.asObservable();
    }

    setDraftBadge(count: any) {
        this.badgeSubject.next({ badgeValue: count });
    }

    clearDraftBadge() {
        this.badgeSubject.next();
    }

}
