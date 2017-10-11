import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { MessageConfigModule as MSG_CONST } from "../message-constant";
export class ForwardMessage {
constructor(
    public category = '',
    public subject = '',
    public message = '',
    public messageId='',
    public conversationId = '',
    public recipients:Recipients[]=[],
    public attachment:Attachment=null) { }

  transform(actionParam) {
    const params = {
      action: actionParam,
      context: MSG_CONST.PROVIDER, 
      "messageBody":{ 
        'messageId':this.messageId,   
        'conversationCategory': this.category,
        'subject': this.subject,
        'messageBody': this.message,
        'isFwd' : false,
        'recipients': this.recipients,
        'messageType': 'FORWARD',
        'attachment': this.attachment
      }
    };
    return params;
  }
}


export class Attachment {

  constructor(
    public attachmentType = '',
    public attachmentInfo:AttachmentInfo[] = []
    ) { }
    
  }

  export class AttachmentInfo {

  constructor(
    public patientInfo:PatientInfo = null,
    public claimInfo:ClaimInfo[] = []
    ) { }
    
  }

  export class PatientInfo{
    constructor(    
    public tenantEnrollmentId = '',
    public subscriberId='',
    public firstName='',
    public lastName='',
    public dob='',
    public gender='',
    public uri=''){}
  }
  export class ClaimInfo{
    constructor(    
    public claimId = '',
    public claimType='',
    public uri='',
    public memberName=''){}
  }
  export class Recipients{
    constructor(
      public recipientId = '',
      public recipientName='',
      public recipientUserType = ''
    ){     
    }
  }

