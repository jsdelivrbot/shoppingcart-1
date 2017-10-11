package com.cognizant.tranzform.msgcenter.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;

import com.cognizant.tranzform.authorization.annotation.PublicAPI;
import com.cognizant.tranzform.authorization.annotation.RequiredPermission;
import com.cognizant.tranzform.authorization.annotation.RequiredPermission.PermissionValue;
import com.cognizant.tranzform.core.exception.BaseException;
import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.ValidationException;
import com.cognizant.tranzform.core.exception.vo.ErrorVO;
import com.cognizant.tranzform.core.logging.Log;
import com.cognizant.tranzform.core.logging.LogWrapper;
import com.cognizant.tranzform.core.util.TranzUtil;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.constants.MessageConstant;
import com.cognizant.tranzform.msgcenter.domain.Conversation;
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.domain.StatusInfo;
import com.cognizant.tranzform.msgcenter.enums.ActionType;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.ConversationStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.ReadType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.service.IConversationService;
import com.cognizant.tranzform.msgcenter.vo.ConversationDetailVO;
import com.cognizant.tranzform.msgcenter.vo.ConversationListVO;
import com.cognizant.tranzform.msgcenter.vo.MessageVO;
import com.cognizant.tranzform.msgcenter.vo.NewMessageVO;
import com.cognizant.tranzform.tzfutil.user.LoggedInUser;
import com.cognizant.tranzform.util.DozerUtil;

/**
 * The Class ConversationResource.
 */
@Named
@Singleton
@Path("/")
public class ConversationResource {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(ConversationResource.class);

	/** The message source. */
	@Autowired
	private MessageSource messageSource;

	/** The conversation service. */
	@Inject
	private IConversationService conversationService;

	@Inject
	private LoggedInUser loggedInUser;

	/**
	 * Conversation.
	 * 
	 * @return the string
	 */
	@GET
	@PublicAPI
	@Produces(MediaType.TEXT_PLAIN)
	public String conversation() {
		return ApplicationConstants.CONVERSATION;
	}

	/**
	 * Save conversation.
	 * 
	 * @param newMessageVO
	 *            the new message VO
	 * @return the response
	 * @throws BaseException
	 *             the base exception
	 */
	@POST
	//@RequiredPermission(capabilityId = ApplicationConstants.MESSAGE_CAPABILITY_ID, permission = PermissionValue.CREATE)
	@PublicAPI
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/conversation")
	public Response saveConversation(@QueryParam("action") ActionType actionType, NewMessageVO newMessageVO)
			throws BaseException {
		LOG.trace("Enter saveConversation method.");
		Response response;
		boolean status;
		LOG.debug(" Logged in User Details:: " + loggedInUser);

		if (actionType != null && ("SEND").equals(actionType.getName())) {
			validateNewMessageDetails(newMessageVO);
		}
		
		// validating user details and new message details.
		Conversation conversation = setNewConversation(newMessageVO, loggedInUser.getTenantId(),
				loggedInUser.getTenantEnrollmentId(), actionType);
		
		if (conversation != null && StringUtils.isNotEmpty(conversation.getConversationCategory())) {
			conversationService.validateCategory(conversation);
		}

		// save conversation
		status = conversationService.saveConversation(conversation);

		if (status) {
			response = Response.status(Response.Status.OK)
					.entity(setStatusInfo(HttpStatus.OK, MessageConstant.CONV_ADDED_SUCCESS)).build();
		} else {
			throw new ValidationException(MessageConstant.MSG_ADDED_FAILED);
		}
		LOG.trace("Exit saveConversation method.");
		return response;
	}

	/**
	 * Save message.
	 * 
	 * @param newMessageVO
	 *            the new message VO
	 * @return the response
	 * @throws BaseException
	 *             the base exception
	 */
	@POST
	@PublicAPI
	//@RequiredPermission(capabilityId = ApplicationConstants.MESSAGE_CAPABILITY_ID, permission = PermissionValue.CREATE)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/message")
	public Response saveMessage(@QueryParam("action") ActionType actionType, NewMessageVO newMessageVO)
			throws BaseException {
		LOG.trace("Enter saveMessage method.");
		Response response;
		boolean status;
		LOG.debug(" Logged in User Detail :: " + loggedInUser);

		// For saving message in existing conversation conversation Id is
		// mandatory.
		if (StringUtils.isBlank(newMessageVO.getConversationId())) {
			// Missing Conversation id
			String message=	messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA, new Object[] { ApplicationConstants.CONVERSATION_ID}, TranzUtil.getLocale());
			
			ErrorVO errorVO =populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA,message, ApplicationConstants.CONVERSATION_ID);					
			throw new ValidationException(errorVO);
		}
		Conversation conversation=setNewMessage(newMessageVO, loggedInUser.getTenantId(),
				loggedInUser.getTenantEnrollmentId(), false, actionType);
		
		if (conversation != null && StringUtils.isNotEmpty(conversation.getConversationCategory())) {
			conversationService.validateCategory(conversation);
		}

		// save new message in existing conversation.
		status = conversationService.saveMessage(conversation);

		if (status) {

			response = Response.status(Response.Status.OK)
					.entity(setStatusInfo(HttpStatus.OK, MessageConstant.MSG_ADDED_SUCCESS)).build();
		} else {
			throw new ValidationException(MessageConstant.MSG_ADDED_FAILED);
		}
		LOG.trace("Exit saveMessage method.");
		return response;
	}

	private ErrorVO populateErrorObject(String errorCode,String message, String fieldName) {
		ErrorVO errorVO=new ErrorVO(errorCode);
		errorVO.setMessage(message);
		errorVO.setFieldName(fieldName);
		return errorVO;
	}

	/**
	 * Save message.
	 * 
	 * @param newMessageVO
	 *            the new message VO
	 * @return the response
	 * @throws BaseException
	 *             the base exception
	 */
	@POST
	@RequiredPermission(capabilityId = ApplicationConstants.RECEIVE_MESSAGE_CAPABILITY_ID, permission = PermissionValue.CREATE)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/message/reply")
	public Response saveMessageReply(NewMessageVO newMessageVO) throws BaseException {
		LOG.trace("Enter saveMessage method.");
		Response response;
		boolean status;
		LOG.debug(" Logged in User Details :: " + loggedInUser);

		// For saving message in existing conversation conversation Id is
		// mandatory.
		if (StringUtils.isBlank(newMessageVO.getConversationId())) {
			// Missing Conversation id
			String message=	messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA, new Object[] { ApplicationConstants.CONVERSATION_ID}, TranzUtil.getLocale());			
			ErrorVO errorVO =populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA,message, ApplicationConstants.CONVERSATION_ID);					
			throw new ValidationException(errorVO);
			
		} else if (StringUtils.isBlank(newMessageVO.getTenantEnrollmentId())) {
			// Missing Tenant EnrollmentId
			String message=	messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA, new Object[] { ApplicationConstants.TENANT_ENROLLMENT_ID}, TranzUtil.getLocale());
			
			ErrorVO errorVO =populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA,message, ApplicationConstants.TENANT_ENROLLMENT_ID);					
			throw new ValidationException(errorVO);
			
		} else if (StringUtils.isBlank(newMessageVO.getMessageId())) {
			// Missing messageId
			String message=	messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA, new Object[] { ApplicationConstants.MESSAGE_ID}, TranzUtil.getLocale());
			
			ErrorVO errorVO =populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA,message, ApplicationConstants.MESSAGE_ID);					
			throw new ValidationException(errorVO);			
		}

		// validating user details and new message details.
		// save csr replied new message in existing conversation.
		status = conversationService.saveMessage(setNewMessage(newMessageVO, loggedInUser.getTenantId(),
				newMessageVO.getTenantEnrollmentId(), true, ActionType.SEND));

		if (status) {

			response = Response.status(Response.Status.OK)
					.entity(setStatusInfo(HttpStatus.OK, MessageConstant.MSG_ADDED_SUCCESS)).build();
		} else {
			throw new ValidationException(MessageConstant.MSG_ADDED_FAILED);
		}
		LOG.trace("Exit saveMessage method.");
		return response;
	}

	/**
	 * Sets the status info.
	 * 
	 * @param httpStatus
	 *            the http status
	 * @param messageId
	 *            the message id
	 * @return the status info
	 */
	private StatusInfo setStatusInfo(HttpStatus httpStatus, String messageId) {
		StatusInfo statusInfo = new StatusInfo();
		statusInfo.setHttpStatus(httpStatus);
		statusInfo.setMessageId(messageId);
		statusInfo.setMessage(messageSource.getMessage(messageId, null, TranzUtil.getLocale()));

		return statusInfo;
	}

	/**
	 * @param newMessageVO
	 */
	private void validateNewMessageDetails(NewMessageVO newMessageVO) throws ValidationException {
		if (StringUtils.isBlank(newMessageVO.getConversationCategory())) {
		String message=	messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA, new Object[] {ApplicationConstants.CONVERSATION_CATEGORY}, TranzUtil.getLocale());
		
		ErrorVO errorVO =populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA,message, ApplicationConstants.CONVERSATION_CATEGORY);					
		throw new ValidationException(errorVO);		
		}
		checkMandatoryData(newMessageVO);

	}

	/**
	 * Check mandatory data.
	 *
	 * @param newMessageVO
	 *            the new message VO
	 * @throws ValidationException
	 *             the validation exception
	 */
	private void checkMandatoryData(NewMessageVO newMessageVO) throws ValidationException {

		if (StringUtils.isBlank(newMessageVO.getSubject())) {
			String message=	messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA, new Object[] { ApplicationConstants.SUBJECT }, TranzUtil.getLocale());
			
			ErrorVO errorVO =populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA,message, ApplicationConstants.SUBJECT);					

			throw new ValidationException(errorVO);		
			
		} else if (StringUtils.length(newMessageVO.getSubject()) > ApplicationConstants.MAX_SUBJECT_CHARACTERS) {
			String message=	messageSource.getMessage(MessageConstant.EXCEED_SUBJECT_COUNT, new Object[] { ApplicationConstants.MAX_SUBJECT_CHARACTERS}, TranzUtil.getLocale());
			ErrorVO errorVO =populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA,message, ApplicationConstants.SUBJECT);					

			throw new ValidationException(errorVO);	
			
		}
		if (StringUtils.isNotBlank(newMessageVO.getMessageBody())
				&& StringUtils.length(newMessageVO.getMessageBody()) > ApplicationConstants.MAX_MESSAGE_CONTENT) {
			String message=	messageSource.getMessage(MessageConstant.EXCEED_MESSAGE_CONTENT, new Object[] { ApplicationConstants.MAX_MESSAGE_CONTENT}, TranzUtil.getLocale());
			
			ErrorVO errorVO =populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA,message, ApplicationConstants.MESSAGE_BODY);					

			throw new ValidationException(errorVO);	
			
		}
	}

	/**
	 * Sets the conversation.
	 * 
	 * @param newMessageVO
	 *            the new message VO
	 * @param tenantId
	 *            the tenant id
	 * @param tenantEnrollmentId
	 *            the tenant enrollment id
	 * @return the conversation
	 * @throws ValidationException
	 *             the validation exception
	 */
	private Conversation setNewConversation(NewMessageVO newMessageVO, String tenantId, String tenantEnrollmentId,
			ActionType actionType) throws ValidationException {
		LOG.trace("Enter setConversation method.");
		LOG.debug("New Message VO :: " + newMessageVO + " , Tenant Id :: " + tenantId + " , Tenant Enrollment Id :: "
				+ tenantEnrollmentId);
		// Setting Conversation details
		Conversation conversation = new Conversation();
		conversation.setTenantId(tenantId);
		conversation.setTenantEnrollmentId(tenantEnrollmentId);
		conversation.setConversationStatus(ConversationStatus.ACTIVE);
		conversation.setConversationCategory(newMessageVO.getConversationCategory());
		conversation.setSubject(newMessageVO.getSubject());
		conversation.setCreatedDate(new Date());
		conversation.setModifiedDate(new Date());

		// Setting message details.
		Message message = new Message();
		message.setMessageStatus(getMessageStatus(actionType));
		if (ActionType.SEND == actionType) {
			message.setMessageCategory(MessageCategory.OUTBOUND);
		}
		message.setMessageBody(newMessageVO.getMessageBody());
		message.setCreatedDate(new Date());
		message.setModifiedDate(new Date());

		List<Message> messages = new ArrayList<>();
		messages.add(message);

		conversation.setMessages(messages);
		LOG.trace("Exit setConversation method.");
		return conversation;
	}

	/**
	 * Gets the message status.
	 *
	 * @param actionType
	 *            the action type
	 * @param isCSR
	 *            the is CSR
	 * @return the message status
	 * @throws ValidationException
	 *             the validation exception
	 */
	private List<MessageStatus> getMessageStatus(ActionType actionType) throws ValidationException {
		LOG.trace("Enter getMessageStatus method.");
		List<MessageStatus> messageStatus = new ArrayList<>();
		if (ActionType.SAVE == actionType) {
			messageStatus.add(MessageStatus.DRAFT);
		} else {
			messageStatus.add(MessageStatus.ACTIVE);
		}
		LOG.trace("Exit getMessageStatus method.");
		return messageStatus;
	}

	/**
	 * Sets the message.
	 * 
	 * @param newMessageVO
	 *            the new message VO
	 * @param tenantId
	 *            the tenant id
	 * @param tenantEnrollmentId
	 *            the tenant enrollment id
	 * @param isCSR
	 *            the is CSR
	 * @return the conversation
	 * @throws ValidationException
	 *             the validation exception
	 */
	private Conversation setNewMessage(NewMessageVO newMessageVO, String tenantId, String tenantEnrollmentId,
			boolean isCSR, ActionType actionType) throws ValidationException {
		LOG.trace("Enter setMessage method.");
		LOG.debug("New Message VO :: " + newMessageVO + " , Tenant Id :: " + tenantId + " , Tenant Enrollment Id :: "
				+ tenantEnrollmentId + " Is Valid CSR :: " + isCSR);

		// Setting Conversation details
		Conversation conversation = new Conversation();
		conversation.setTenantId(tenantId);
		conversation.setTenantEnrollmentId(tenantEnrollmentId);
		conversation.setConversationId(newMessageVO.getConversationId());
		conversation.setModifiedDate(new Date());
		conversation.setSubject(newMessageVO.getSubject());
		conversation.setConversationCategory(newMessageVO.getConversationCategory());
		
		// Setting message details.
		Message message = new Message();
		message.setMessageBody(newMessageVO.getMessageBody());
		message.setMessageId(newMessageVO.getMessageId());
		message.setModifiedDate(new Date());
		message.setCreatedDate(new Date());
		message.setMessageStatus(getMessageStatus(actionType));

		if (isCSR) {
			// If the logged in user is CSR then message category for the member
			// is INBOUND.
			message.setMessageCategory(MessageCategory.INBOUND);
		} else {
			if (ActionType.SEND == actionType) {
				message.setMessageCategory(MessageCategory.OUTBOUND);
			}

		}

		List<Message> messages = new ArrayList<>();
		messages.add(message);

		conversation.setMessages(messages);
		LOG.trace("Exit setMessage method.");
		return conversation;
	}

	/**
	 * Update read indicator.
	 * 
	 * @param conversationId
	 *            the conversation id
	 * @return the response
	 * @throws BaseException
	 *             the base exception
	 */
	@PUT
	@Path("/message/{messageId}")
	@RequiredPermission(capabilityId = ApplicationConstants.MESSAGE_CAPABILITY_ID, permission = PermissionValue.UPDATE)
	//@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateReadIndicator(@PathParam("messageId") String messageId,
			@QueryParam("readtype") ReadType readType) throws BaseException {
		LOG.trace("Enter updateReadIndicator method.");
		StatusInfo statusInfo;
		LOG.debug(" Logged in User Details :: " + loggedInUser);

		// Setting conversation details
		Message message = new Message();
		message.setMessageId(messageId);

		if (ReadType.READ == readType) {
			message.setRead(true);
			statusInfo = setStatusInfo(HttpStatus.OK, MessageConstant.CONV_MARK_READ);
		} else {
			message.setRead(false);
			statusInfo = setStatusInfo(HttpStatus.OK, MessageConstant.CONV_MARK_UNREAD);
		}

		// Update the read indicator to the opposite state
		conversationService.updateReadIndicator(message);

		LOG.trace("Exit updateReadIndicator method.");
		return Response.status(Response.Status.OK).entity(statusInfo).build();

	}

	/**
	 * Gets the conversation messages.
	 * 
	 * @param messageType
	 *            the message type
	 * @param conversationField
	 *            the conversation field
	 * @param sortByDirection
	 *            the sort by direction
	 * @return the conversation messages
	 * @throws BusinessException
	 *             the business exception
	 */
	@GET
	@Path("/messages")
	@PublicAPI
	//@RequiredPermission(capabilityId = ApplicationConstants.MESSAGE_CAPABILITY_ID, permission = PermissionValue.READ)
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ConversationListVO getConversationMessages(
			@QueryParam("type") @DefaultValue("inbox") MessageType messageType,
			@QueryParam("sortby") @DefaultValue("modifiedDate") ConversationField conversationField,
			@QueryParam("orderby") @DefaultValue("desc") SortByDirection sortByDirection, 
			@QueryParam("conversationcategory") String conversationcategory, 
			@QueryParam("readindicator") String readindicator) throws BusinessException {

		ConversationListVO conversationListVO = new ConversationListVO();
		// fetch the user from the context
		List<ConversationDetails> conversationMsgList;
		List<ConversationDetailVO> conversations;
		if (loggedInUser != null) {

			String tenantId = loggedInUser.getTenantId();
			String tenantEnrollmentId = loggedInUser.getTenantEnrollmentId();

			conversationMsgList = conversationService.getConversationMessages(tenantId, tenantEnrollmentId, messageType,
					conversationField, sortByDirection, conversationcategory, readindicator);

			// no records found
			if (conversationMsgList == null || conversationMsgList.isEmpty()) {
				// informational message
				final Locale locale = TranzUtil.getLocale();
				String infoMsg = messageSource.getMessage(MessageConstant.MESSAGE_NOT_FOUND, null, locale);
				if(MessageType.INBOX == messageType){
					infoMsg = messageSource.getMessage(MessageConstant.NO_NEW_MESSAGES_FOUND, null, locale);
				}else if(MessageType.SENT == messageType){
					infoMsg = messageSource.getMessage(MessageConstant.NO_SENT_MESSAGES_FOUND, null, locale);
				}else if(MessageType.DRAFT == messageType){
					infoMsg = messageSource.getMessage(MessageConstant.NO_DRAFTS_MESSAGES_SAVED, null, locale);
				}
				StatusInfo status = new StatusInfo();
				status.setHttpStatus(HttpStatus.NO_CONTENT);
				status.setMessage(infoMsg);
				conversationListVO.setStatusInfo(status);
				return conversationListVO;

			}

			// conversion from domain to value object
			conversations = DozerUtil.copyList(conversationMsgList, ConversationDetailVO.class,
					"conversationdetail_conversationdetailvo_mapping");

			// build the value object

			if (conversations != null && !conversations.isEmpty()) {
				conversationListVO.setMessages(conversations);
				conversationListVO
						.setMetaInfo(getMetaInfo(conversations, messageType, conversationField, sortByDirection));
			}

		}

		return conversationListVO;
	}

	/**
	 * Gets the meta info.
	 * 
	 * @param converations
	 *            the converations
	 * @param user
	 *            the user
	 * @param messageType
	 *            the message type
	 * @param conversationField
	 *            the conversation field
	 * @param sortByDirection
	 *            the sort by direction
	 * @return the meta info
	 */
	private Map<String, String> getMetaInfo(final List<ConversationDetailVO> converations,
			final MessageType messageType, final ConversationField conversationField,
			final SortByDirection sortByDirection) {

		Map<String, String> metaInfo = new HashMap<>();
		metaInfo.put(ApplicationConstants.TYPE, messageType.getValue());
		metaInfo.put(ApplicationConstants.SORT_BY, conversationField.getValue());
		metaInfo.put(ApplicationConstants.ORDER_BY, sortByDirection.getValue());
		if (MessageType.INBOX == messageType) {
			metaInfo.put(ApplicationConstants.UN_READ_COUNT, String.valueOf(getUnReadCount(converations)));
		}
		metaInfo.put(ApplicationConstants.TOTAL_COUNT, String.valueOf(converations.size()));

		return metaInfo;
	}

	/**
	 * Gets the un read count.
	 * 
	 * @param converations
	 *            the converations
	 * @return the un read count
	 */
	private int getUnReadCount(final List<ConversationDetailVO> converations) {

		int unReadCnt = 0;

		for (ConversationDetailVO conversationVO : converations) {
			if (!conversationVO.getMessages().isRead()) {
				unReadCnt++;
			}
		}

		return unReadCnt;

	}

	/**
	 * Delete message.
	 *
	 * @param messageId
	 *            the message id
	 * @param messageType
	 *            the message type
	 * @return the response
	 * @throws BusinessException
	 *             the business exception
	 * @throws BaseException
	 */
	@DELETE
	@Path("/message/{messageid}")
	@RequiredPermission(capabilityId = ApplicationConstants.MESSAGE_CAPABILITY_ID, permission = PermissionValue.DELETE)
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteMessage(@PathParam("messageid") String messageId,
			@QueryParam("type") @DefaultValue("inbox") MessageType messageType) throws BaseException {
		LOG.trace("Start of the Method DELETE Messages");
		String tenantId = loggedInUser.getTenantId();
		String tenantEnrollmentId = loggedInUser.getTenantEnrollmentId();
		LOG.debug("Message Id : " + messageId);

		if (MessageType.TRASH == messageType) {
			String message=	messageSource.getMessage(MessageConstant.CAUNT_DELETE_TRASH, new Object[] {ApplicationConstants.MESSAGE}, TranzUtil.getLocale());
			
			ErrorVO errorVO =populateErrorObject(MessageConstant.CAUNT_DELETE_TRASH,message, ApplicationConstants.MESSAGE);					
			throw new ValidationException(errorVO);		
			/*throw new ValidationException(
					new ErrorVO(MessageConstant.CAUNT_DELETE_TRASH, new Object[] { ApplicationConstants.MESSAGE }));*/
		}

		if (StringUtils.isNotEmpty(messageId)) {
			conversationService.deleteMessage(messageId, messageType, tenantId, tenantEnrollmentId);
		}
		StatusInfo statusInfo = new StatusInfo();
		statusInfo.setMessageId(messageId);
		statusInfo.setMessage(messageSource.getMessage(MessageConstant.MESSAGE_DELTED,
				new String[] { messageId, messageType.toString() }, null));

		LOG.trace("End of the Method DELETE Messages");
		return Response.status(Status.OK).entity(statusInfo).build();
	}

	@GET
	@Path("/message/{messageid}")
	@PublicAPI
	@Produces(MediaType.APPLICATION_JSON)
	public List<MessageVO> getTrailMessages(@PathParam("messageid") String messageId) {
		LOG.trace("Start of the method Get Trail Messages");
		String tenantId = loggedInUser.getTenantId();
		String tenantEnrollmentId = loggedInUser.getTenantEnrollmentId();
		LOG.debug("Message Id : " + messageId);
		List<Message> msgList = null;
		if (StringUtils.isNotEmpty(messageId)) {
			msgList = conversationService.getTrailMessages(messageId, tenantId, tenantEnrollmentId);
		}
		List<MessageVO> msgListVO = DozerUtil.copyList(msgList, MessageVO.class, "message_messagevo_mapping");
		LOG.trace("End of the method Get Trail Messages");
		return msgListVO;
	}

}
