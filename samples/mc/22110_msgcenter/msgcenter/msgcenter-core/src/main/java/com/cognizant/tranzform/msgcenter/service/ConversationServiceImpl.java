package com.cognizant.tranzform.msgcenter.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.GrantedAuthority;

import com.cognizant.tranzform.config.IConfig;
import com.cognizant.tranzform.config.IConfigProvider;
import com.cognizant.tranzform.core.exception.BaseException;
import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.core.exception.SystemException;
import com.cognizant.tranzform.core.exception.vo.ErrorVO;
import com.cognizant.tranzform.core.logging.Log;
import com.cognizant.tranzform.core.logging.LogWrapper;
import com.cognizant.tranzform.event.EventPublisher;
import com.cognizant.tranzform.event.domain.Event;
import com.cognizant.tranzform.event.domain.EventCategory;
import com.cognizant.tranzform.event.domain.EventName;
import com.cognizant.tranzform.event.domain.EventType;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.constants.MessageConstant;
import com.cognizant.tranzform.msgcenter.domain.Conversation;
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.MasterDataValidate;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.ConversationStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.repository.IConversationRepo;
import com.cognizant.tranzform.msgcenter.repository.IMetaDataRepo;
import com.cognizant.tranzform.tzfutil.user.LoggedInUser;

/**
 * The Class ConversationServiceImpl.
 */
@Named
public class ConversationServiceImpl implements IConversationService {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(ConversationServiceImpl.class);

	/** The conversation repo. */
	@Named("conversationRepoLocal")
	@Inject
	private IConversationRepo conversationRepo;

	@Inject
	private IConfigProvider configProvider;

	/** The conversation repo remote. */
	@Named("conversationRepoRemote")
	@Inject
	private IConversationRepo conversationRepoRemote;

	@Inject
	private LoggedInUser loggedInUser;

	@Inject
	private EventPublisher eventPublisher;

	/** The message source. */
	@Autowired
	private MessageSource messageSource;

	/** The meta data repo. */
	@Inject
	private IMetaDataRepo metaDataRepo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.service.IConversationService#
	 * saveConversation(com.cognizant.tranzform.msgcenter.domain.Conversation)
	 */
	@Override
	public boolean saveConversation(Conversation conversation) throws BaseException {
		LOG.trace("Enter saveConversation method.");
		LOG.debug("Conversation :: " + conversation);
		boolean isConversationSaved = false;

		if (conversation != null && CollectionUtils.isNotEmpty(conversation.getMessages())) {

			Conversation savedConversation = conversationRepo.saveConversation(conversation);

			// If the saved conversation is having the mongo generated id then
			// the conversation is saved or updated successfully if not failed.
			LOG.debug("Saved Conversation : " + savedConversation);
			if (savedConversation != null && StringUtils.isNotBlank(savedConversation.getId())) {
				conversationRepo.saveAudit(savedConversation);
				isConversationSaved = true;
				IConfig config = configProvider.getConfig();
				boolean mockServiceEnable = config.getBoolean(ApplicationConstants.MOCK_SERVICE_ENABLER);
				saveConversationMessage(savedConversation, mockServiceEnable);
			}
		}
		LOG.trace("Exit saveConversation method.");
		return isConversationSaved;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.service.IConversationService#
	 * saveMessage (com.cognizant.tranzform.msgcenter.domain.Conversation)
	 */
	@Override
	public boolean saveMessage(Conversation conversation) throws BaseException {
		LOG.trace("Enter saveMessage method.");
		LOG.debug("Conversation :: " + conversation);
		boolean isMessageSaved = false;
		Conversation savedConversation = null;

		if (conversation != null && CollectionUtils.isNotEmpty(conversation.getMessages())) {

			// retrieve saved conversation details.
			if (StringUtils.isNotBlank(conversation.getConversationId())) {
				savedConversation = getSavedConversation(conversation);

			}

			// save message in conversation if the conversation status is active
			if (savedConversation != null && savedConversation.getConversationStatus() == ConversationStatus.ACTIVE) {
				conversationRepo.saveAudit(savedConversation);
				isMessageSaved = true;
				IConfig config = configProvider.getConfig();
				boolean mockServiceEnable = config.getBoolean(ApplicationConstants.MOCK_SERVICE_ENABLER);
				saveConversationMessage(savedConversation, mockServiceEnable);
			} else {
				// In valid conversation Id
				throw new BusinessException(new ErrorVO(MessageConstant.INVALID_DATA));
			}
		}

		LOG.trace("Exit saveMessage method.");
		return isMessageSaved;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.service.IConversationService#
	 * deleteMessage(java.lang.String,
	 * com.cognizant.tranzform.msgcenter.enums.MessageType, java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public void deleteMessage(String messageId, MessageType messageType, String tenantId, String tenantEnrollmentId)
			throws BusinessException {
		LOG.debug("Start of Delete Message in Service");
		Conversation conversation = conversationRepo.getConversation(messageId, null, tenantId, tenantEnrollmentId);
		LOG.debug("Conversation : " + conversation);
		if (conversation == null || conversation.getConversationStatus() == ConversationStatus.DELETE) {
			throw new BusinessException(messageSource.getMessage(MessageConstant.CAN_NOT_DELETE_MESSAGE,
					new String[] { messageId, tenantEnrollmentId, messageType.toString() }, null));
		}
		checkMessageDeleted(conversation, messageId, messageType);
		IConfig config = configProvider.getConfig();
		boolean mockServiceEnable = config.getBoolean(ApplicationConstants.MOCK_SERVICE_ENABLER);
		if (messageType == MessageType.INBOX && mockServiceEnable) {
			try {
				conversationRepoRemote.deleteMessage(messageId, conversation, messageType);
			} catch (RestException restException) {
				LOG.error("Error in saving Message in tenant DB", restException);
			}

		}
		conversationRepo.deleteMessage(messageId, conversation, messageType);

		LOG.debug("End of Delete Message in Service");

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.service.IConversationService#
	 * getConversationMessages(java.lang.String, java.lang.String,
	 * com.cognizant.tranzform.msgcenter.enums.MessageType,
	 * com.cognizant.tranzform.msgcenter.enums.ConversationFields,
	 * com.cognizant.tranzform.msgcenter.enums.SortByDirection)
	 */
	@Override
	public List<ConversationDetails> getConversationMessages(final String tenantId, final String tenantEnrollmentId,
			final MessageType messageType, final ConversationField conversationField,
			final SortByDirection sortDirection, final String conversationcategory, final String readindicator) throws BusinessException {
		LOG.trace("getConversationMessages Start ");
		List<ConversationDetails> conversations = conversationRepo.getConversationMessages(tenantId, tenantEnrollmentId,
				messageType, conversationField, sortDirection, conversationcategory, readindicator);

		LOG.trace("getConversationMessages End ");
		return conversations;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.service.IConversationService#
	 * getTrailMessages(java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public List<Message> getTrailMessages(String messageId, String tenantId, String tenantEnrollmentId) {
		LOG.trace("getTrailMessages Start");
		Conversation conversation = conversationRepo.getTrailMessages(messageId, tenantId, tenantEnrollmentId);
		List<Message> messageList = null;
		if (conversation != null) {
			messageList = conversation.getMessages();
			if (messageList != null && !messageList.isEmpty()) {
				LOG.debug("Message List " + messageList);
				messageList = getTrailMessagesFromMessageList(messageList, messageId);
				messageList.removeIf(message -> message.getMessageId().equalsIgnoreCase(messageId));
			}
		}

		if (messageList == null || messageList.isEmpty()) {
			throw new BusinessException("There are no trail messages for this message");
		}
		LOG.trace("getTrailMessages End");
		return messageList;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cognizant.tranzform.content.msgcenter.service.IConversationService#
	 * updateReadIndicator(java.util.function)
	 */
	@Override
	public void updateReadIndicator(Message message) throws BusinessException {
		LOG.trace("Enter updateReadIndicator method.");
		LOG.debug("Message :: " + message);

		if (message != null && StringUtils.isNotBlank(message.getMessageId())) {
			Conversation savedConversation = conversationRepo.changeReadIndicator(message);

			if (savedConversation != null && StringUtils.isNotBlank(savedConversation.getId())) {
				conversationRepo.saveAudit(savedConversation);
			} else {
				// In valid conversation Id
				throw new BusinessException(
						new ErrorVO(MessageConstant.INVALID_DATA, new Object[] { ApplicationConstants.MESSAGE_ID }));
			}

		}
		LOG.trace("Exit updateReadIndicator method.");

	}

	/**
	 * Validate category.
	 *
	 * @param conversation
	 *            the conversation
	 * @param headers
	 *            the headers
	 * @throws RestException
	 *             the rest exception
	 * @throws BusinessException
	 *             the business exception
	 */
	public void validateCategory(Conversation conversation) throws BusinessException {
		LOG.trace("Enter validateCategoryAndSubject method.");
		MasterDataValidate masterDataValidateReq = new MasterDataValidate();
		masterDataValidateReq.setCategory(ApplicationConstants.CONVERSATION_CATEGORIES);
		masterDataValidateReq.setLanguage(loggedInUser.getPreferredLanguage().substring(0, 2));
		masterDataValidateReq.setCode(conversation.getConversationCategory());
		LOG.debug("Master Data Req :: " + masterDataValidateReq);

		MasterDataValidate masterDataValidateResp = metaDataRepo.validateMasterData(masterDataValidateReq);

		if (masterDataValidateResp != null) {
			if (!masterDataValidateResp.isValid()) {
				ErrorVO errorVO = new ErrorVO();
				errorVO.setMessage(masterDataValidateResp.getMessage());
				throw new BusinessException(errorVO);
			}
		} else {
			// meta data not configured.
			throw new BusinessException(MessageConstant.METADATA_NOT_CONFIGURED);
		}

		LOG.trace("Exit validateCategoryAndSubject method.");
	}

	/**
	 * Method to save conversationMessage in tenant specified location and send
	 * inapp notification if the role of the user is CSR
	 * 
	 * @param savedConversation
	 * @param mockServiceEnable
	 * @throws BusinessException
	 */
	private void saveConversationMessage(Conversation savedConversation, boolean mockServiceEnable)
			throws BusinessException {

		if (mockServiceEnable) { // save the details in tenant DB
			try {
				conversationRepoRemote.saveNewMessage(savedConversation);
			} catch (Exception exception) {
				LOG.error("Error in saving message in tenant DB", exception);
				conversationRepo.draftSendMessage(savedConversation);
				throw new BusinessException(MessageConstant.DRAFTED_SEND_MESSAGE);
			}
		}

		boolean flag = checkForCSRRole();
		if (flag) {
			sendInappNotification(savedConversation);
		}
	}

	/**
	 * Method to check whether the roles of the user contains CSR as a role or
	 * not
	 * 
	 * @return boolean
	 */
	private boolean checkForCSRRole() {
		boolean csrCheck = false;
		LOG.trace("Enter checkForCSRRole method");
		Collection<? extends GrantedAuthority> authorityCollection = null;
		if (null != loggedInUser) {
			authorityCollection = loggedInUser.getAssignedRoles();
		}
		if (authorityCollection != null) {
			Iterator<? extends GrantedAuthority> iterator = authorityCollection.iterator();
			while (iterator.hasNext()) {
				GrantedAuthority roles = iterator.next();
				LOG.trace("Roles are : " + roles.toString());
				if (roles.getAuthority().toUpperCase().contains(ApplicationConstants.CSR)) {
					csrCheck = true;
					break;
				}
			}
		}
		LOG.trace("Exit checkForCSRRole method");
		return csrCheck;
	}

	/**
	 * Method to reply to a message or save an existing(drafted) message by
	 * sending it or again drafting the same message
	 * 
	 * @param conversation
	 * @return Conversation
	 * @throws RestException
	 */
	private Conversation getSavedConversation(Conversation conversation) throws RestException {
		Conversation savedConversation;
		// Sending the drafted message
		Message message = conversation.getMessages().get(0);
		Conversation queriedConversation = conversationRepo.getConversation(message.getMessageId(),
				conversation.getConversationId(), conversation.getTenantId(), conversation.getTenantEnrollmentId());
		boolean flag;
		if (null == queriedConversation) {
			return null;
		}
		checkCategory(conversation, queriedConversation);
		validateSubject(conversation ,queriedConversation);			
		flag = checkMessageActiveStatus(queriedConversation, message);

		if (flag) {
			message.setTrailMessageId(message.getMessageId());
			savedConversation = conversationRepo.saveNewMessage(conversation);
		} else {
			savedConversation = conversationRepo.saveExistingMessage(conversation);
		}

		return savedConversation;
	}

	/**
	 * It will check if action type is send and subject of existing conversation in
	 * db and subject passed via request are empty throws Bussiness exception 
	 * 
	 * @param requestConversation
	 * @param queriedConversation
	 */
	private void validateSubject(Conversation requestConversation, Conversation queriedConversation) {
		Message message = requestConversation.getMessages().get(0);		
		if(StringUtils.isEmpty(requestConversation.getSubject())
				&& StringUtils.isEmpty(queriedConversation.getSubject())
				&& message.getMessageStatus().contains(MessageStatus.ACTIVE)) {
			throw new BusinessException(
					new ErrorVO(MessageConstant.MISSING_MANDATORY_DATA, new Object[] { ApplicationConstants.SUBJECT }));
		}

		
	}

	/**
	 * Method to check whether conversationCategory of existing conversation in
	 * db and conversation passed via request are empty and messageStatus is not
	 * ACTIVE. If above conditions are satisfied along with messageStatus as
	 * SEND, then send a BusinessException
	 * 
	 * @param requestConversation
	 * @param queriedConversation
	 */
	private void checkCategory(Conversation requestConversation, Conversation queriedConversation) {

		Message message = requestConversation.getMessages().get(0);

		if (StringUtils.isEmpty(queriedConversation.getConversationCategory())
				&& StringUtils.isEmpty(requestConversation.getConversationCategory())
				&& message.getMessageStatus().contains(MessageStatus.ACTIVE)) {
			throw new BusinessException(MessageConstant.MISSING_CONVERSATION_CATEGORY);
		}
	}

	/**
	 * Method to check whether the message status is active or not
	 * 
	 * @param conversation
	 */
	private boolean checkMessageActiveStatus(Conversation conversation, Message requestMessage) {
		return conversation.getMessages().stream()
				.filter(message -> message.getMessageId().equals(requestMessage.getMessageId())).findFirst()
				.filter(message -> message.getMessageStatus().contains(MessageStatus.ACTIVE)).isPresent();

	}

	/**
	 * Check message deleted.
	 *
	 * @param conversation
	 *            the conversation
	 * @param messageId
	 *            the message id
	 * @param messageType
	 *            the message type
	 * @throws BusinessException
	 *             the business exception
	 */
	private void checkMessageDeleted(Conversation conversation, String messageId, MessageType messageType)
			throws BusinessException {
		LOG.trace("Start of checkMessageDeleted");
		if (conversation.getMessages() != null) {
			for (Message message : conversation.getMessages()) {
				LOG.debug("Message Category : " + message.getMessageCategory() + "Message type : " + messageType);
				if (messageId.equalsIgnoreCase(message.getMessageId()) && messageType != MessageType.DRAFT) {
					validateMessages(message, messageType);
				} else if (messageId.equalsIgnoreCase(message.getMessageId()) && (message.getMessageStatus().contains(MessageStatus.DELETE_DRAFT)
						|| message.getMessageStatus().contains(MessageStatus.DELETE))
						&& messageType == MessageType.DRAFT) {
					throw new BusinessException(
							messageSource.getMessage(MessageConstant.MESSAGE_ALREADY_DELETED, null, null));
				}
			}

		}
		LOG.trace("End of checkMessageDeleted");

	}

	/**
	 * Validate messages.
	 *
	 * @param message
	 *            the message
	 * @param messageType
	 *            the message type
	 * @throws BusinessException
	 *             the business exception
	 */
	private void validateMessages(Message message, MessageType messageType) throws BusinessException {
		if (message.getMessageCategory() != null) {
			validateMessageInFolders(message.getMessageStatus(), messageType);
		} else {
			// Throw exception if message id is of type draft and type of the
			// message given in the request is other than draft
			throw new BusinessException(messageSource.getMessage(MessageConstant.INVALID_MESSAGE_TYPE, null, null));
		}

	}

	/**
	 * Validate message in folders.
	 *
	 * @param messageStatus
	 *            the message status
	 * @param messageType
	 *            the message type
	 * @throws BusinessException
	 *             the business exception
	 */
	private void validateMessageInFolders(List<MessageStatus> messageStatus, MessageType messageType)
			throws BusinessException {
		LOG.debug("Messag Status : " + messageStatus + "message Type : " + messageType);
		if ((messageStatus.contains(MessageStatus.DELETE_INBOX) && messageType == MessageType.INBOX)
				|| (messageStatus.contains(MessageStatus.DELETE_SENTITEMS) && messageType == MessageType.SENT)) {
			throw new BusinessException(messageSource.getMessage(MessageConstant.MESSAGE_ALREADY_DELETED, null, null));
		}
	}

	private void sendInappNotification(Conversation conversation) {
		LOG.trace("Start of the method Send InappNotification");
		Event event = new Event();
		event.setCategory(EventCategory.MEMBER);
		event.setName(EventName.MESSAGE);
		event.setPreferredLanguage(loggedInUser.getPreferredLanguage());
		Map<String, Object> data = new HashMap<>();
		if (conversation != null) {
			event.setUserId(conversation.getTenantEnrollmentId());
			event.setCategoryId(conversation.getTenantEnrollmentId());
			event.setTenantId(conversation.getTenantId());
			event.setTime(new Timestamp(conversation.getCreatedDate().getTime()));
			event.setType(EventType.NEW);
			event.setTheme("Messages");
			data.put("isRead", false);
			data.put("Created Date", new Date());
			data.put("message", "You have a new message");
			event.setData(data);
		}
		LOG.debug("EVENT Details :: " + event);
		try {
			eventPublisher.publishEvent(event);
		} catch (Exception e) {
			LOG.error("Exception in tibco", e);
			throw new SystemException(e);
		}
		LOG.trace("End of the method Send InappNotification");

	}

	private List<Message> getTrailMessagesFromMessageList(List<Message> messageList, String messageId) {
		LOG.trace("getTrailMessagesFromMessageList Start");
		List<Message> msgList = new ArrayList<>();
		Message messageIdSet = new Message();
		messageIdSet.setMessageId(messageId);
		messageList.forEach(message -> {
			if (message.getMessageId().equals(messageIdSet.getMessageId())) {
				messageIdSet.setMessageId(message.getTrailMessageId());
				msgList.add(message);
			}
		});
		messageList.removeIf(message -> message.getMessageCategory() != null);

		LOG.debug("Message List : " + msgList);
		return msgList;
	}

}
