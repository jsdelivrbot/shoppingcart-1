package com.cognizant.tranzform.msgcenter.constants;

public class ApplicationConstants {

	public static final String CONVERSATION_VO_DOMAIN_MAPPING = "conversationvo_conversation_mapping";

	public static final String CONVERSATION_DOMAIN_VO_MAPPING = "conversation_conversationvo_mapping";
	
	
	public static final String CONVERSATION_V2_DOMAIN_VO_MAPPING = "conversationdetailV2_conversationdetailV2vo_mapping";
	
	public static final String SENT_TYPE = "sent";

    public static final String DRAFT_TYPE = "draft";
    
    public static final String SYSTEM = "SYSTEM";



	public static final String CONVERSATION_ID = "conversationId";

	public static final String TENANT_ID = "tenantId";

	public static final String TENANT_ENROLLMENT_ID = "tenantEnrollmentId";

	public static final String I_REGEX_OPT = "i";

	public static final String START_WITH_MONGO_REGEX = "^";

	public static final String END_WITH_MONGO_REGEX = "$";

	public static final String MESSAGES = "messages";
	
	public static final String MESSAGES_TO_UNWIND = "messages.to";

	public static final String CSR = "CSR";

	public static final String EMPTY_STR = "";

	public static final String CONVERSATION_CATEGORIES = "conversationCategories";
	
	public static final String PROVIDER_CATEGORIES = "providerCategories";
	
	public static final String CONVERSATION_CATEGORY = "conversationCategory";

	public static final String SUBJECT = "subject";

	public static final String MESSAGE_BODY = "messageBody";

	public static final String MESSAGE_STATUS = "messageStatus";

	public static final String MESSAGE_ATTACHMENT = "attachment";
	
	public static final String MESSAGE_ID_PREFIX = "MSG";

	public static final String CONVERSATION_ID_PREFIX = "CONV";

	public static final String CONVERSATION_STATUS = "conversationStatus";

	public static final String CONVERSATIONID = "conversationId";

	public static final String DELETE = "DELETE";

	public static final String MESSAGEID = "messages.messageId";

	public static final String MESSAGESTATUS = "messages.$.messageStatus";

	public final static String MODIFIED_DATE = "modifiedDate";

	public final static String IS_READ_INDICATOR = "messages.$.isRead";

	public static final String DOT_OPERATOR = ".";

	public static final String TYPE = "type";

	public static final String SORT_BY = "sortBy";

	public static final String ORDER_BY = "orderBy";

	public static final String UN_READ_COUNT = "unReadCount";

	public static final String TOTAL_COUNT = "totalCount";

	public static final String MEMBER_FIRST_NAME = "memberFirstName";

	public static final String MEMBER_LAST_NAME = "memberLastName";

	public static final String TIME_ZONE_UTC_FORMAT = "MM/dd/yyyy 'T'HH:mm:ss";

	public static final String TIME_ZONE_UTC = "UTC";

	public static final String MESSAGE_ID = "messageId";

	public static final int MAX_MESSAGE_CONTENT = 1000;

	public static final String ID = "_id";
	
	public final static String READ_INDICATOR = "messages.isRead";
	
	public static final String CONVERSATION_CATEGORY_V2 = "messages.conversationCategory";
	public static final String SUBJECT_V2 = "messages.subject";
	public final static String SENT_FROM_ID_V2 = "messages.from.id";
	public final static String SENT_FROM_TYPE_V2 = "messages.from.type";
	public final static String SENT_FROM_STATUS_V2 = "messages.from.status";
	public final static String INBOX_TO_ID_V2 = "messages.to.id";
	public final static String INBOX_TO_TYPE_V2 = "messages.to.type";
	public final static String INBOX_TO_STATUS_V2 = "messages.to.status";
	public final static String INBOX_TO_READ_INDICATOR_V2 = "messages.to.isRead";
	public static final String TO = "to";
	public static final String USERNAME = "userName";
	public static final String STATUS = "status";
	public static final String FROM = "from";
	public static final String IS_READ = "isRead";
	public static final String TO_ID = "messages.to._id";
	public static final String PAYER = "PAYER";
	public static final String PROVIDER = "Provider";
	public static final String ADMIN = "Admin";
	public final static String IS_READ_TO_INDICATOR = "to.$.isRead";
	
	public static final String MESSAGE_TRAILING_ID = "trailMessageId";

	public static final String VALUE = "value";

	public final static String CREATED_DATE = "createdDate";

	public final static String CONVERSATION = "Conversation";

	public final static String BACK_SLASH = "/";

	public final static String DOLLAR = "$";

	public static final String MESSAGE_CATEGORY = "messageCategory";

	public static final String MESSAGE = "message";

	public static final String EACH_OPERATOR = "$each";

	public static final String SORT_OPERATOR = "$sort";

	public static final String STAR_OPERATOR = "*";

	public static final int MAX_SUBJECT_CHARACTERS = 100;

	public static final String MESSAGE_CAPABILITY_ID = "MsgCenter.Messages";
	
	public static final String RECEIVE_MESSAGE_CAPABILITY_ID = "MsgCenter.ReceiveMessage";
	
	public static final String CONTENT_TYPE = "Content-Type";

	public static final String MESSAGES_MESSAGEID = "messages.messageId"; 

	public static final String MESSAGE_MESSAGECATEGORY = "messages.messageCategory";

	public static final String MESSAGE_MESSAGESTATUS = "messages.messageStatus";

	public static final String MESSAGE_MODIFIEDDATE = "modifiedDate";

	public static final String MOCK_SERVICE_ENABLER = "mockServiceEnable";
	
	public final static String READ = "READ";
	public final static String UNREAD = "UNREAD";
	
	public final static String MESSAGE_MASTER="MessageMaster";
	
	public final static String MESSAGE_DETAIL="MessageDetail";
	
	public final static String CLAIMS_DETIAL_URI="claims.detail.uri"; 
	
	public final static String EP_ENROLLMENT_ID="EPEnrollmentId";
	public final static String USER_TYPE="userType";
	public final static String FIRST_NAME="firstName";
	public final static String LAST_NAME="lastName";

	private ApplicationConstants() {
		// restrict instantiation
	}

}
