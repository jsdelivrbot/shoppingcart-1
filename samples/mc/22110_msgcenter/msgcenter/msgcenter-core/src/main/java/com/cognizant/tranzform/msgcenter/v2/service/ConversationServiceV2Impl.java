package com.cognizant.tranzform.msgcenter.v2.service;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

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
import com.cognizant.tranzform.msgcenter.domain.MasterDataValidate;
import com.cognizant.tranzform.msgcenter.enums.ActionType;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.ReadType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetail;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageMaster;
import com.cognizant.tranzform.msgcenter.v2.repository.IConversationRepoV2;
import com.cognizant.tranzform.msgcenter.v2.repository.IMetaDataRepoV2;
import com.cognizant.tranzform.tzfutil.enums.UserType;
import com.cognizant.tranzform.tzfutil.user.LoggedInUser;

/**
 * The Class ConversationServiceImpl.
 */
@Named
public class ConversationServiceV2Impl implements IConversationServiceV2 {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(ConversationServiceV2Impl.class);

	/** The conversation repo. */
	@Named("conversationRepoV2Local")
	@Inject
	private IConversationRepoV2 conversationRepo;

	@Inject
	private IConfigProvider configProvider;

	/** The conversation repo remote. */
	@Named("conversationRepoV2Remote")
	@Inject
	private IConversationRepoV2 conversationRepoRemote;

	@Inject
	private LoggedInUser loggedInUser;

	@Inject
	private EventPublisher eventPublisher;

	/** The message source. */
	@Autowired
	private MessageSource messageSource;

	/** The meta data repo. */
	@Inject
	private IMetaDataRepoV2 metaDataRepo;

	/**
	 * Method to check whether there is a same message already saved as draft.
	 * Method required when we need to update an existing draft message from
	 * drafts list tab
	 * 
	 * @param messageId
	 * @return
	 */
	private boolean checkDraftsTab(String messageId) {

		MessageDetail messageDetails = conversationRepo.getMessageDetail(messageId, null, loggedInUser.getTenantId());
		boolean isMessageDraftExist;
		if (null != messageDetails && messageDetails.getMessageStatus() == MessageStatus.DRAFT) {
			isMessageDraftExist = true;
		} else
			isMessageDraftExist = false;

		return isMessageDraftExist;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.service.IConversationService#
	 * saveMessage (com.cognizant.tranzform.msgcenter.domain.Conversation)
	 */
	@Override
	public boolean saveMessage(ConversationV2 conversation, ActionType actionType, String messageId)
			throws BaseException {
		boolean isConversationSaved = false;

		LOG.trace("Enter saveMessage method.");
		LOG.debug("Conversation :: " + conversation);

		if (conversation != null && conversation.getMessageDetail() != null) {

			ConversationV2 savedConversation;
			boolean isDraftMessage = checkDraftsTab(messageId);

			if (isDraftMessage) {
				savedConversation = saveDraftMessage(conversation, actionType, messageId);

			} else {

				conversation.getMessageMaster().setTrailMessageId(messageId);
				savedConversation = conversationRepo.saveNewMessage(conversation);
			}

			// If the saved conversation is having the mongo generated id then
			// the conversation is saved or updated successfully if not failed.
			LOG.debug("Saved Conversation : " + savedConversation);
			isConversationSaved = true;
			if (UserType.MEMBER.equals(loggedInUser.getUserType()) && savedConversation != null
					&& StringUtils.isNotBlank(savedConversation.getMessageMaster().getId())) {
				conversationRepo.saveAudit(savedConversation);
				isConversationSaved = true;
				IConfig config = configProvider.getConfig();
				boolean mockServiceEnable = config.getBoolean(ApplicationConstants.MOCK_SERVICE_ENABLER);
				saveConversationMessage(savedConversation, mockServiceEnable);
			}
		}
		LOG.trace("Exit saveMessage method.");
		return isConversationSaved;

	}

	/**
	 * 
	 * @param conversation
	 * @param actionType
	 * @param messageId
	 * @return
	 */
	private ConversationV2 saveDraftMessage(ConversationV2 conversation, ActionType actionType, String messageId) {		 
		conversation.getMessageMaster().setMessageId(messageId);
		// Setting the existing message Id
		if (conversation.getMessageDetail() != null && !conversation.getMessageDetail().isEmpty()) {
			conversation.getMessageDetail().get(0).setMessageId(messageId);
			if (actionType == ActionType.SEND) {
				conversation.getMessageDetail().get(0).setMessageStatus(MessageStatus.ACTIVE);
			} else if (actionType == ActionType.SAVE) {
				conversation.getMessageDetail().get(0).setMessageStatus(MessageStatus.DRAFT);
			}
		}
		// setting trailing message ID by fetching from db
		// TODO this is not required
		MessageMaster existingConversation = conversationRepo.getMessageMaster(messageId,
				loggedInUser.getTenantId());
		conversation.getMessageMaster().setTrailMessageId(existingConversation.getTrailMessageId());
		ConversationV2 savedConversation = conversationRepo.updateDraftMessage(conversation);
		return savedConversation;
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
	public void deleteMessage(String messageId, MessageType messageType, String tenantId, String userId)
			throws BusinessException {
		LOG.debug("Start of Delete Message in Service");
		final MessageDetail messageDetail = conversationRepo.getMessageDetail(messageId, null, tenantId);
		LOG.debug("messageDetail : " + messageDetail);

		if (messageDetail == null || messageDetail.getMessageStatus() == MessageStatus.DELETE) {
			throw new BusinessException(messageSource.getMessage(MessageConstant.CAN_NOT_DELETE_MESSAGE,
					new String[] { messageId, messageType.toString() }, null));
		}
		
		conversationRepo.deleteMessage(messageId, messageType, userId);

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
	public List<ConversationDetailsV2> getConversationMessages(final String tenantId, final String userId,
			final MessageType messageType, final ConversationField conversationField,
			final SortByDirection sortDirection, final String conversationcategory, final String readindicator)
			throws BusinessException {
		LOG.trace("getConversationMessages Start ");
		List<ConversationDetailsV2> conversations = conversationRepo.getConversationMessages(tenantId, userId,
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
	public List<MessageDetailsV2> getTrailMessages(String messageId, String tenantId, String userId) {
		LOG.trace("getTrailMessages Start");
		List<MessageDetailsV2> messageList = conversationRepo.getTrailMessages(messageId, tenantId, userId);

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
	public void updateReadIndicator(String messageId, String userId, ReadType readType) throws BusinessException {
		LOG.trace("Enter updateReadIndicator method.");
		LOG.debug("MessageId :: " + messageId);

		if (StringUtils.isNotBlank(messageId)) {
			conversationRepo.changeReadIndicator(messageId, userId, readType);
			

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
	@Override
	public void validateCategory(ConversationV2 conversation) throws BusinessException {

		LOG.trace("Enter validateCategoryAndSubject method.");
		MasterDataValidate masterDataValidateReq = new MasterDataValidate();
		if (UserType.MEMBER.equals(loggedInUser.getUserType())) {
			masterDataValidateReq.setCategory(ApplicationConstants.CONVERSATION_CATEGORIES);
		} else {
			masterDataValidateReq.setCategory(ApplicationConstants.PROVIDER_CATEGORIES);
		}
		masterDataValidateReq.setLanguage(loggedInUser.getPreferredLanguage().substring(0, 2));
		masterDataValidateReq.setCode(conversation.getMessageMaster().getConversationCategory());
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
	private void saveConversationMessage(ConversationV2 savedConversation, boolean mockServiceEnable)
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

	private void sendInappNotification(ConversationV2 conversation) {
		LOG.trace("Start of the method Send InappNotification");
		Event event = new Event();
		event.setCategory(EventCategory.MEMBER);
		event.setName(EventName.MESSAGE);
		event.setPreferredLanguage(loggedInUser.getPreferredLanguage());
		Map<String, Object> data = new HashMap<>();
		if (conversation != null) {			
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


}
