package com.cognizant.tranzform.msgcenter.v2.rest;

import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.CLAIMS_DETIAL_URI;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.CONVERSATION;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.CSR;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MAX_MESSAGE_CONTENT;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MAX_SUBJECT_CHARACTERS;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MESSAGE;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MESSAGE_BODY;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MESSAGE_CAPABILITY_ID;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MESSAGE_ID;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.ORDER_BY;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.PAYER;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.SORT_BY;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.SUBJECT;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.TENANT_ENROLLMENT_ID;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.TOTAL_COUNT;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.TYPE;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.UN_READ_COUNT;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

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
import org.apache.http.client.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cognizant.tranzform.authorization.annotation.PublicAPI;
import com.cognizant.tranzform.authorization.annotation.RequiredPermission;
import com.cognizant.tranzform.authorization.annotation.RequiredPermission.PermissionValue;
import com.cognizant.tranzform.config.IConfig;
import com.cognizant.tranzform.config.IConfigProvider;
import com.cognizant.tranzform.context.provider.IHttpHeaderProvider;
import com.cognizant.tranzform.core.exception.BaseException;
import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.ValidationException;
import com.cognizant.tranzform.core.exception.vo.ErrorVO;
import com.cognizant.tranzform.core.logging.Log;
import com.cognizant.tranzform.core.logging.LogWrapper;
import com.cognizant.tranzform.core.util.RestClientUtil;
import com.cognizant.tranzform.core.util.TranzUtil;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.constants.MessageConstant;
import com.cognizant.tranzform.msgcenter.domain.StatusInfo;
import com.cognizant.tranzform.msgcenter.enums.ActionType;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.MessageTypeV2;
import com.cognizant.tranzform.msgcenter.enums.ReadType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.v2.domain.Attachment;
import com.cognizant.tranzform.msgcenter.v2.domain.AttachmentInfo;
import com.cognizant.tranzform.msgcenter.v2.domain.ClaimInfo;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationV2;
import com.cognizant.tranzform.msgcenter.v2.domain.From;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetail;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageMaster;
import com.cognizant.tranzform.msgcenter.v2.domain.PatientInfo;
import com.cognizant.tranzform.msgcenter.v2.domain.To;
import com.cognizant.tranzform.msgcenter.v2.service.IConversationServiceV2;
import com.cognizant.tranzform.msgcenter.v2.vo.AttachmentInfoVO;
import com.cognizant.tranzform.msgcenter.v2.vo.ClaimInfoVO;
import com.cognizant.tranzform.msgcenter.v2.vo.MessageListVOV2;
import com.cognizant.tranzform.msgcenter.v2.vo.MessageVo;
import com.cognizant.tranzform.msgcenter.v2.vo.NewMessageV2VO;
import com.cognizant.tranzform.msgcenter.v2.vo.PatientInfoVO;
import com.cognizant.tranzform.msgcenter.v2.vo.Recipient;
import com.cognizant.tranzform.msgcenter.v2.vo.SenderVO;
import com.cognizant.tranzform.msgcenter.v2.vo.TrailMessageV2VO;
import com.cognizant.tranzform.tzfutil.enums.UserType;
import com.cognizant.tranzform.tzfutil.user.LoggedInUser;
import com.cognizant.tranzform.util.DozerUtil;
import com.mongodb.BasicDBObject;

/**
 * The Class ConversationResource.
 */
@Named
@Singleton
@Path("/v2/")
public class ConversationResourceV2 {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(ConversationResourceV2.class);

	/** The message source. */
	@Autowired
	private MessageSource messageSource;

	/** The conversation service. */
	@Inject
	private IConversationServiceV2 conversationService;

	@Inject
	private LoggedInUser loggedInUser;

	@Inject
	private IConfigProvider configProvider;
	
	@Inject
	private IHttpHeaderProvider contextProvider;

	/**
	 * Conversation.
	 * 
	 * @return the string
	 */
	@GET
	@PublicAPI
	@Produces(MediaType.TEXT_PLAIN)
	public String conversation() {
		return CONVERSATION;
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
	@RequiredPermission(capabilityId = MESSAGE_CAPABILITY_ID, permission = PermissionValue.CREATE)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/message")
	public Response saveMessage(@QueryParam("action") ActionType actionType,
			NewMessageV2VO newMessageVO) throws BaseException {
		LOG.trace("Enter saveMessage method.");
		Response response;
		boolean status;
		LOG.debug(" Logged in User Detail :: " + loggedInUser);
		
	   //validate the mandatory
		checkMandatoryData(newMessageVO);
		
		final ConversationV2 conversation = setNewMessage(newMessageVO, 
				 false, actionType);
		String messageId =(newMessageVO.getMessageId()==null)?"":newMessageVO.getMessageId();
		if (conversation != null && StringUtils.isNotEmpty(conversation.getMessageMaster().getConversationCategory())) {
			conversationService.validateCategory(conversation);
		}

		// save new message in existing conversation.
		status = conversationService.saveMessage(conversation, actionType,messageId);

		if (status) {

			response = Response.status(Response.Status.OK)
					.entity(setStatusInfo(HttpStatus.OK, MessageConstant.MSG_ADDED_SUCCESS)).build();
		} else {
			throw new ValidationException(MessageConstant.MSG_ADDED_FAILED);
		}
		LOG.trace("Exit saveMessage method.");
		return response;
	}

	private ErrorVO populateErrorObject(String errorCode, String message, String fieldName) {
		ErrorVO errorVO = new ErrorVO(errorCode);
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
	@RequiredPermission(capabilityId = MESSAGE_CAPABILITY_ID, permission = PermissionValue.CREATE)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/message/reply")
	public Response saveMessageReply(NewMessageV2VO newMessageVO)
			throws BaseException {
		LOG.trace("Enter saveMessage method.");
		Response response;
		boolean status;
		LOG.debug(" Logged in User Details :: " + loggedInUser);

		// For saving message in existing conversation conversation Id is
		// mandatory.
		if (StringUtils.isBlank(newMessageVO.getMessageId())) {
			// Missing Conversation id
			String message = messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA,
					new Object[] { MESSAGE_ID }, TranzUtil.getLocale());
			ErrorVO errorVO = populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA, message, MESSAGE_ID);
			throw new ValidationException(errorVO);

		} else if (StringUtils.isBlank(newMessageVO.getTenantEnrollmentId())) {
			// Missing Tenant EnrollmentId
			String message = messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA,
					new Object[] { TENANT_ENROLLMENT_ID }, TranzUtil.getLocale());

			ErrorVO errorVO = populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA, message,
					TENANT_ENROLLMENT_ID);
			throw new ValidationException(errorVO);

		} 
		
		  //validate the mandatory
		checkMandatoryData(newMessageVO);
		// validating user details and new message details.
		// save csr replied new message in existing conversation.
		status = conversationService.saveMessage(setNewMessage(newMessageVO, 
				 true, ActionType.SEND), ActionType.SEND, newMessageVO.getMessageId());

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
	 * Check mandatory data.
	 *
	 * @param newMessageVO
	 *            the new message VO
	 * @throws ValidationException
	 *             the validation exception
	 */
	private void checkMandatoryData(NewMessageV2VO newMessageVO) throws ValidationException {

		if (StringUtils.isBlank(newMessageVO.getSubject())) {
			String message = messageSource.getMessage(MessageConstant.MISSING_MANDATORY_DATA, new Object[] { SUBJECT },
					TranzUtil.getLocale());

			ErrorVO errorVO = populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA, message, SUBJECT);

			throw new ValidationException(errorVO);

		} else if (StringUtils.length(newMessageVO.getSubject()) > MAX_SUBJECT_CHARACTERS) {
			String message = messageSource.getMessage(MessageConstant.EXCEED_SUBJECT_COUNT,
					new Object[] { MAX_SUBJECT_CHARACTERS }, TranzUtil.getLocale());
			ErrorVO errorVO = populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA, message, SUBJECT);

			throw new ValidationException(errorVO);

		}
		if (StringUtils.isNotBlank(newMessageVO.getMessageBody())
				&& StringUtils.length(newMessageVO.getMessageBody()) > MAX_MESSAGE_CONTENT) {
			String message = messageSource.getMessage(MessageConstant.EXCEED_MESSAGE_CONTENT,
					new Object[] { MAX_MESSAGE_CONTENT }, TranzUtil.getLocale());

			ErrorVO errorVO = populateErrorObject(MessageConstant.MISSING_MANDATORY_DATA, message, MESSAGE_BODY);

			throw new ValidationException(errorVO);

		}
	}

	

	

	// for lists
	public <T, U> List<U> convertList(List<T> from, Function<T, U> func) {
		return from.stream().map(func).collect(Collectors.toList());
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
	private ConversationV2 setNewMessage(NewMessageV2VO newMessageVO,
			boolean isCSR, ActionType actionType) throws ValidationException {
		LOG.trace("Enter setMessage method.");
		LOG.debug("New Message VO :: " + newMessageVO + " Is Valid CSR :: " + isCSR);

		
		// Setting Conversation details
		final ConversationV2 conversation = new ConversationV2();

		// setting Message Master detail
		final MessageMaster messageMaster = new MessageMaster();
		messageMaster.setConversationCategory(newMessageVO.getConversationCategory());
		messageMaster.setCreatedDate(now());
		messageMaster.setFrom(getFrom());
		messageMaster.setMessageBody(newMessageVO.getMessageBody());
		messageMaster.setModifiedDate(now());
		messageMaster.setSubject(newMessageVO.getSubject());
		messageMaster.setTenantId(loggedInUser.getTenantId());

		// setting the attachment for the claims
		if (newMessageVO.getAttachment() != null) {
			final Attachment attachment = getAttachment(newMessageVO);
			messageMaster.setAttachment(attachment);
		}

		List<Recipient> recipients = newMessageVO.getRecipients();
		if (recipients == null || recipients.isEmpty()) {
			throw new ValidationException(MessageConstant.RECIPIENTS_REQUIRED);
		}

		// setting the master message recipient address
		if (newMessageVO.getRecipients() != null && !newMessageVO.getRecipients().isEmpty()) {
			final List<To> toList = convertList(newMessageVO.getRecipients(), getToFunction(loggedInUser.getUserType()));
			// Setting To details
			messageMaster.setTo(toList);
		}
		conversation.setMessageMaster(messageMaster);

		// setting message detail for sender address
		final MessageDetail senderMsgDetail = setMessageDetail(newMessageVO, null, actionType);
		conversation.getMessageDetail().add(senderMsgDetail);

		// setting message detail for recipient address
		if (ActionType.SAVE != actionType && newMessageVO.getRecipients() != null && !newMessageVO.getRecipients().isEmpty()) {
				newMessageVO.getRecipients().forEach(recipient -> 
					conversation.getMessageDetail().add(setMessageDetail(newMessageVO, recipient, actionType))
				);			
		}

		LOG.trace("Exit setMessage method.");
		return conversation;
	}

	/**
	 * Attachment for the messages
	 * 
	 * @param newMessageVO
	 * @return the attachment for the messages
	 */
	private Attachment getAttachment(NewMessageV2VO newMessageVO) {
		IConfig config = configProvider.getConfig();
		final Attachment attachment = new Attachment();
		attachment.setAttachmentType(newMessageVO.getAttachment().getAttachmentType());
		final Optional<List<AttachmentInfoVO>> optionalAttachmentInfo = Optional
				.ofNullable(newMessageVO.getAttachment().getAttachmentInfo());
		if (optionalAttachmentInfo.isPresent()) {
			optionalAttachmentInfo.get().forEach(attachmentInfoVo -> {
				final AttachmentInfo attachmentInfo = new AttachmentInfo();
				final Optional<PatientInfoVO> optionalPatientInfo = Optional
						.ofNullable(attachmentInfoVo.getPatientInfo());
				if(optionalPatientInfo.isPresent()){
					final PatientInfoVO patientInfoVO = optionalPatientInfo.get();
					final PatientInfo patientInfo = getPatientInfo(patientInfoVO);
					attachmentInfo.setPatientInfo(patientInfo);
				}
				final Optional<List<ClaimInfoVO>> optionalClaimInfo = Optional
						.ofNullable(attachmentInfoVo.getClaimInfo());
				if (optionalClaimInfo.isPresent()) {
					optionalClaimInfo.get().forEach(claimInfoVo -> {
						final ClaimInfo claimInfo = getClaimInfo(config, claimInfoVo);
						attachmentInfo.getClaimInfo().add(claimInfo);

					});
				}
				attachment.getAttachmentInfo().add(attachmentInfo);
			});
		}
		return attachment;
	}



	private ClaimInfo getClaimInfo(IConfig config, ClaimInfoVO claimInfoVo) {
		final ClaimInfo claimInfo = new ClaimInfo();
		claimInfo.setClaimId(claimInfoVo.getClaimId());
		claimInfo.setClaimType(claimInfoVo.getClaimType());
		claimInfo.setMemberName(claimInfoVo.getMemberName());
		claimInfo.setUri(config.getString(CLAIMS_DETIAL_URI));
		return claimInfo;
	}


   /**
    * 
    * @param patientInfoVO
    * @return
    */
	private PatientInfo getPatientInfo(final PatientInfoVO patientInfoVO) {
		final PatientInfo patientInfo = new PatientInfo();
		patientInfo.setDob(patientInfoVO.getDob());
		patientInfo.setFirstName(patientInfoVO.getFirstName());
		patientInfo.setLastName(patientInfoVO.getLastName());
		patientInfo.setSubscriberId(patientInfoVO.getSubscriberId());
		patientInfo.setTenantEnrollmentId(patientInfoVO.getTenantEnrollmentId());
		patientInfo.setGender(patientInfoVO.getGender());
		patientInfo.setUri(patientInfoVO.getUri());
		return patientInfo;
	}

	/**
	 * 
	 * @return the to address
	 */
	private Function<Recipient, To> getToFunction(final UserType userType) {
		return recipient-> getFunctionTo(userType, recipient);
		
	}
	
	/**
	 * 
	 * @param userType
	 * @param recipient
	 * @return
	 */
	private To getFunctionTo(final UserType userType, Recipient recipient) {
		final To to = new To();
		// IF Context is Member then TO details is saved as CSR
		if (UserType.PROVIDER.equals(userType)) {
			// IF Context is Provider and Recipient is PAYER then TO
			// details is saved as PAYER
			if (recipient.getRecipientUserType().equalsIgnoreCase(PAYER)) {
				to.setId(recipient.getRecipientId());
				to.setType(PAYER);
				to.setUserName(PAYER);
			} else {
				to.setId(recipient.getRecipientId());
				to.setType(recipient.getRecipientUserType());
				to.setUserName(recipient.getRecipientName());

			}
		} else {
			to.setId(recipient.getRecipientId());
			to.setType(CSR);
			to.setUserName(CSR);

		}

		return to;
	}

	/**
	 * 
	 * @return the from address
	 */
	private From getFrom() {

		// Setting From details.
		From from = new From();
		if(UserType.PROVIDER.equals(loggedInUser.getUserType())){
			IConfig config = configProvider.getConfig();
			String endPointURI= config.getString("msprovider.providerdetail.uri");
			try {
	        	ResponseEntity<BasicDBObject> resource  = RestClientUtil.exchange(endPointURI, HttpMethod.GET, contextProvider.getAuthHeaders(), null, BasicDBObject.class);
	        	if (null != resource && null != resource.getBody()) {
	        		BasicDBObject provider = resource.getBody();
	    			LOG.debug("response :: " + provider);
	    			from.setId(provider.getString(ApplicationConstants.EP_ENROLLMENT_ID));
	    			from.setType(provider.getString(ApplicationConstants.USER_TYPE));
	    			from.setUserName(provider.getString(ApplicationConstants.FIRST_NAME)+","+provider.getString(ApplicationConstants.LAST_NAME));
	    		}

	        } catch (Exception e) {
	            ErrorVO error = new ErrorVO("provider detail", "", e.getMessage());
	            LOG.debug("Error getting provider detail ", e);
	            throw new BusinessException(error);
	        }
			
		}else{
			from.setId(loggedInUser.getTenantEnrollmentId());
			from.setType(loggedInUser.getUserType()==null?null:loggedInUser.getUserType().toString());
			from.setUserName(loggedInUser.getUserName());
		}
		

		return from;
	}

	/**
	 * 
	 * @param newMessageVO
	 * @param recipient
	 * @return the MessageDetail
	 */
	public MessageDetail setMessageDetail(NewMessageV2VO newMessageVO, Recipient recipient, 
			final ActionType actionType) {
		final MessageDetail messageDetail = new MessageDetail();
		messageDetail.setConversationCategory(newMessageVO.getConversationCategory());
		messageDetail.setFrom(getFrom());
		messageDetail.setIsFwd(newMessageVO.getIsFwd());
		if (ActionType.SAVE == actionType) {
			messageDetail.setMessageStatus(MessageStatus.DRAFT);
		} else {
			messageDetail.setMessageStatus(MessageStatus.ACTIVE);
		}

		if (MessageTypeV2.FORWARD == newMessageVO.getMessageType())
			messageDetail.setIsFwd(true);		
		messageDetail.setCreatedDate(now());
		messageDetail.setModifiedDate(now());
		if ((ActionType.SAVE != actionType) && recipient != null) {
			messageDetail.setTo(getToFunction(loggedInUser.getUserType()).apply(recipient));
		}
		messageDetail.setSubject(newMessageVO.getSubject());
		return messageDetail;
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
	@RequiredPermission(capabilityId = MESSAGE_CAPABILITY_ID, permission = PermissionValue.UPDATE)
	// @Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateReadIndicator(@PathParam("messageId") String messageId,
			@QueryParam("readtype") ReadType readType) throws BaseException {
		LOG.trace("Enter updateReadIndicator method.");
		StatusInfo statusInfo;
		LOG.debug(" Logged in User Details :: " + loggedInUser);
		String userId = getFrom().getId();
		if (ReadType.READ == readType) {
			/** to.setRead(true); */
			statusInfo = setStatusInfo(HttpStatus.OK, MessageConstant.CONV_MARK_READ);
		} else {
			/** to.setRead(false); */
			statusInfo = setStatusInfo(HttpStatus.OK, MessageConstant.CONV_MARK_UNREAD);
		}
		/** Update the read indicator to the opposite state */
		conversationService.updateReadIndicator(messageId, userId, readType);

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
	// @PublicAPI
	@RequiredPermission(capabilityId = MESSAGE_CAPABILITY_ID, permission = PermissionValue.READ)
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getConversationMessages(@QueryParam("type") @DefaultValue("inbox") MessageType messageType,
			@QueryParam("sortby") @DefaultValue("modifiedDate") ConversationField conversationField,
			@QueryParam("orderby") @DefaultValue("desc") SortByDirection sortByDirection,
			@QueryParam("conversationcategory") String conversationcategory,
			@QueryParam("readindicator") String readindicator) throws BusinessException {

		// fetch the user from the context

		MessageListVOV2 messageListVO = new MessageListVOV2();
		if (loggedInUser != null) {

			String userId = getFrom().getId();
			final List<ConversationDetailsV2> conversationMsgList = conversationService.getConversationMessages(
					loggedInUser.getTenantId(), userId, messageType, conversationField,
					sortByDirection, conversationcategory, readindicator);

			// no records found
			if (conversationMsgList == null || conversationMsgList.isEmpty()) {

				// informational message
				final Locale locale = TranzUtil.getLocale();
				final String infoMsg = messageSource.getMessage(MessageConstant.MESSAGE_NOT_FOUND, null, locale);
				final StatusInfo status = new StatusInfo();
				status.setHttpStatus(HttpStatus.NO_CONTENT);
				status.setMessage(infoMsg);
				return Response.ok().entity(status).build();

			}
			messageListVO = convertMessageDomainToVO(conversationMsgList);
			messageListVO.setMetaInfo(
					getMetaInfo(messageListVO.getMessages(), messageType, conversationField, sortByDirection));
		}

		return Response.ok().entity(messageListVO).build();
	}

	/**
	 * 
	 * @param conversationMsgList
	 * @return
	 */
	private MessageListVOV2 convertMessageDomainToVO(List<ConversationDetailsV2> conversationMsgList) {
		MessageListVOV2 messageListVO = new MessageListVOV2();
		List<MessageVo> messages = new ArrayList<>();		
		for (ConversationDetailsV2 conversationMsg : conversationMsgList) {
			MessageVo message = new MessageVo();
			message.setConversationCategory(conversationMsg.getMessages().getConversationCategory());
			message.setCreatedBy(loggedInUser.getUserId());
			message.setCreatedDate(DateUtils.formatDate(conversationMsg.getMessages().getCreatedDate()));			
			message.setMessageId(conversationMsg.getMessages().getMessageId());
			message.setMessageStatus(conversationMsg.getMessages().getMessageStatus());
			message.setModifiedDate(DateUtils.formatDate(conversationMsg.getMessages().getModifiedDate()));
			message.setSubject(conversationMsg.getMessages().getSubject());
			message.setReadIndicator(conversationMsg.getMessages().getIsRead());
			message.setIsFwd(conversationMsg.getMessages().getIsFwd());			
			if (conversationMsg.getMessages().getFrom() != null) {
				final SenderVO sender = new SenderVO();
				sender.setSenderId(conversationMsg.getMessages().getFrom().getId());
				sender.setSenderName(conversationMsg.getMessages().getFrom().getUserName());
				sender.setSenderUserType(conversationMsg.getMessages().getFrom().getType());
				message.setSenders(sender);
			}
			messages.add(message);

		}
		messageListVO.setMessages(messages);

		return messageListVO;

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
	private Map<String, String> getMetaInfo(final List<MessageVo> messageList, final MessageType messageType,
			final ConversationField conversationField, final SortByDirection sortByDirection) {

		Map<String, String> metaInfo = new HashMap<>();
		metaInfo.put(TYPE, messageType.getValue());
		metaInfo.put(SORT_BY, conversationField.getValue());
		metaInfo.put(ORDER_BY, sortByDirection.getValue());
		if (MessageType.INBOX == messageType) {
			metaInfo.put(UN_READ_COUNT, String.valueOf(getUnReadCount(messageList)));
		}
		metaInfo.put(TOTAL_COUNT, String.valueOf(messageList.size()));

		return metaInfo;
	}

	/**
	 * Gets the un read count.
	 * 
	 * @param converations
	 *            the converations
	 * @return the un read count
	 */
	private long getUnReadCount(final List<MessageVo> converations) {

		long unReadCnt = 0;

		if (converations != null && !converations.isEmpty()) {

			unReadCnt = converations.stream().filter(e -> !e.isReadIndicator()).count();

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
	@RequiredPermission(capabilityId = MESSAGE_CAPABILITY_ID, permission = PermissionValue.DELETE)
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteMessage(@PathParam("messageid") String messageId,
			@QueryParam("type") @DefaultValue("inbox") MessageType messageType) throws BaseException {
		LOG.trace("Start of the Method DELETE Messages");
		String tenantId = loggedInUser.getTenantId();
		LOG.debug("Message Id : " + messageId);

		if (MessageType.TRASH == messageType) {
			String message = messageSource.getMessage(MessageConstant.CAUNT_DELETE_TRASH, new Object[] { MESSAGE },
					TranzUtil.getLocale());

			ErrorVO errorVO = populateErrorObject(MessageConstant.CAUNT_DELETE_TRASH, message, MESSAGE);
			throw new ValidationException(errorVO);
			
		}

		if (StringUtils.isNotEmpty(messageId)) {
			String userId = getFrom().getId();
			conversationService.deleteMessage(messageId, messageType, tenantId, userId);
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
	public List<TrailMessageV2VO> getTrailMessages(@PathParam("messageid") String messageId) {
		LOG.trace("Start of the method Get Trail Messages");
		String tenantId = loggedInUser.getTenantId();
		LOG.debug("Message Id : " + messageId);
		List<MessageDetailsV2> msgList = null;
		if (StringUtils.isNotEmpty(messageId)) {
			String userId = getFrom().getId();
			msgList = conversationService.getTrailMessages(messageId, tenantId,userId);
		}
		List<TrailMessageV2VO> msgListVO = null;

		if (msgList != null && !msgList.isEmpty()) {
			LOG.debug("Message List in Trailing Message -> " + msgList);
			msgListVO = DozerUtil.copyList(msgList, TrailMessageV2VO.class, "trailMessage_V2_mapping");

		}
		LOG.trace("End of the method Get Trail Messages");
		Collections.reverse(msgListVO);
		return msgListVO;
	}

	
	

	/**
	 * 
	 * @return the currebnt system date
	 */
	private Date now() {

		return new Date();
	}

}
