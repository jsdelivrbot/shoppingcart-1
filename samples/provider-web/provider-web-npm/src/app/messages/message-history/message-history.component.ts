import { Component, OnInit, Input } from '@angular/core';
import { MessageConfigModule as MSG_CONST} from './../message-constant';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.scss']
})
export class MessageHistoryComponent implements OnInit {

  @Input() trailingMessages:any;
  @Input() messageDetails:any;
  private  messageType = MSG_CONST;

  constructor() { }


  ngOnInit(){   
  }


   public createDate(dateString):Date{
        return new Date(dateString);
    }
}
