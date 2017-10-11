package com.cognizant.tranzform.msgcenter.repository;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.inject.Named;

import org.apache.commons.lang.StringUtils;
import org.javers.spring.annotation.InsertUpdateAuditable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.logging.Log;
import com.cognizant.tranzform.core.logging.LogWrapper;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.domain.Conversation;
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.Counters;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;

import com.mongodb.BasicDBObject;

/**
 * The Class TextContentRepoImpl.
 */
@Named("conversationRepoLocal")
public class ConversationRepoImpl implements IConversationRepo {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(ConversationRepoImpl.class);

	/** The mongo operations. */
	@Resource(name = "mongoTemplate")
	private MongoOperations mongoOperations;

	/**
	 * Gets the next sequence value.
	 *
	 * @param sequenceName
	 *            the sequence name
	 * @param increment
	 *            the increment
	 * @return the next sequence value
	 */
	private int getNextSequenceValue(String sequenceName, int increment) {
		LOG.trace("Enter getNextSequenceValue method.");
		LOG.debug("Sequence Name :: " + sequenceName + " , Increment by :: " + increment);
		int sequenceValue = 0;
		Query query = new Query();
		query.addCriteria(Criteria.where(ApplicationConstants.ID).is(sequenceName));
		Update update = new Update();
		update.inc(ApplicationConstants.VALUE, increment);
		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);
		Counters counters = mongoOperations.findAndModify(query, update, options, Counters.class);
		if (counters != null) {
			sequenceValue = counters.getValue();
		}
		LOG.trace("Exit getNextSequenceValue method.");
		return sequenceValue;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * saveConversation(com.cognizant.tranzform.msgcenter.domain.Conversation)
	 */
	@Override
	public Conversation saveConversation(Conversation conversation) {
		LOG.trace("Enter saveConversation method.");
		conversation.setConversationId(ApplicationConstants.CONVERSATION_ID_PREFIX
				+ getNextSequenceValue(ApplicationConstants.CONVERSATION_ID, 1));
		conversation.getMessages().get(0).setMessageId(
				ApplicationConstants.MESSAGE_ID_PREFIX + getNextSequenceValue(ApplicationConstants.MESSAGE_ID, 1));
		conversation
				.setId(conversation.getTenantId() + ApplicationConstants.BACK_SLASH + conversation.getConversationId()
						+ ApplicationConstants.BACK_SLASH + conversation.getTenantEnrollmentId());
		mongoOperations.save(conversation);
		LOG.trace("Exit saveConversation method.");
		return conversation;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * saveMessage (com.cognizant.tranzform.msgcenter.domain.Conversation)
	 */
	@Override
	public Conversation saveNewMessage(Conversation conversation) {
		LOG.trace("Enter saveMessage method.");
		Query query = getConversationSearchQuery(conversation.getTenantId(), conversation.getTenantEnrollmentId(),
				conversation.getConversationId());

		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);

		conversation.getMessages().get(0).setMessageId(
				ApplicationConstants.MESSAGE_ID_PREFIX + getNextSequenceValue(ApplicationConstants.MESSAGE_ID, 1));

		Update modifiedObject = new Update();
		modifiedObject.push(ApplicationConstants.MESSAGES).atPosition(0).each(conversation.getMessages());
		modifiedObject.set(ApplicationConstants.MODIFIED_DATE, conversation.getModifiedDate());

		Conversation savedConversation = mongoOperations.findAndModify(query, modifiedObject, options,
				Conversation.class);

		LOG.trace("Exit saveMessage method.");
		return savedConversation;
	}

	/**
	 * Send draft message.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 */
	@Override
	public Conversation saveExistingMessage(Conversation conversation) {
		LOG.trace("Enter replyToAnExistingMessage method.");

		String messagesPrefix = ApplicationConstants.MESSAGES + ApplicationConstants.DOT_OPERATOR
				+ ApplicationConstants.DOLLAR + ApplicationConstants.DOT_OPERATOR;
		Message message = conversation.getMessages().get(0);

		Query query = getConversationSearchQuery(conversation.getTenantId(), conversation.getTenantEnrollmentId(),
				conversation.getConversationId());

		query.addCriteria(Criteria.where(ApplicationConstants.MESSAGEID).is(message.getMessageId()));
		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);
		Update modifiedObject = new Update();
		modifiedObject.set(ApplicationConstants.CONVERSATION_CATEGORY, conversation.getConversationCategory());
		modifiedObject.set(ApplicationConstants.SUBJECT, conversation.getSubject());
		modifiedObject.set(ApplicationConstants.MODIFIED_DATE, conversation.getModifiedDate());
		modifiedObject.set(messagesPrefix + ApplicationConstants.MESSAGE_CATEGORY, message.getMessageCategory());
		modifiedObject.set(messagesPrefix + ApplicationConstants.MESSAGE_STATUS, message.getMessageStatus());
		modifiedObject.set(messagesPrefix + ApplicationConstants.MODIFIED_DATE, message.getModifiedDate());
		modifiedObject.set(messagesPrefix + ApplicationConstants.MESSAGE_BODY, message.getMessageBody());

		Conversation savedConversation = mongoOperations.findAndModify(query, modifiedObject, options,
				Conversation.class);

		LOG.trace("Exit replyToAnExistingMessage method.");
		return savedConversation;
	}

	/**
	 * Sort by modified date.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 */
	private Conversation sortByModifiedDate(Conversation conversation) {
		LOG.trace("Enter sendDraftMessage method.");
		Query query = getConversationSearchQuery(conversation.getTenantId(), conversation.getTenantEnrollmentId(),
				conversation.getConversationId());

		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);

		BasicDBObject sort = new BasicDBObject();
		BasicDBObject orderBy = new BasicDBObject();
		orderBy.put(ApplicationConstants.MODIFIED_DATE, -1);

		sort.put(ApplicationConstants.EACH_OPERATOR, new ArrayList<>());
		sort.put(ApplicationConstants.SORT_OPERATOR, orderBy);

		Update modifiedObject = new Update();
		modifiedObject.push(ApplicationConstants.MESSAGES).value(sort);

		Conversation savedConversation = mongoOperations.findAndModify(query, modifiedObject, options,
				Conversation.class);

		LOG.trace("Exit sendDraftMessage method.");
		return savedConversation;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cognizant.tranzform.msgcenter.repository.IConversationRepo#saveAudit(
	 * com.cognizant.tranzform.msgcenter.domain.Conversation)
	 */
	@InsertUpdateAuditable
	@Override
	public Conversation saveAudit(Conversation conversation) {
		LOG.debug("Conversation Auditing :: " + conversation);
		return conversation;
	}

	/**
	 * Gets the user search query.
	 * 
	 * @param tenantId
	 *            the tenant id
	 * @param tenantEnrollmentId
	 *            the tenant enrollment id
	 * @param conversationId
	 *            the conversation id
	 * @return the user search query
	 */
	private Query getConversationSearchQuery(String tenantId, String tenantEnrollmentId, String conversationId) {
		LOG.trace("Enter getConversationSearchQuery method.");
		Query query = new Query();
		String id = tenantId + ApplicationConstants.BACK_SLASH + conversationId + ApplicationConstants.BACK_SLASH
				+ tenantEnrollmentId;
		query.addCriteria(Criteria.where(ApplicationConstants.ID).is(id).and(ApplicationConstants.CONVERSATION_STATUS)
				.is(MessageStatus.ACTIVE));

		LOG.trace("Exit getConversationSearchQuery method.");
		return query;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * changeReadIndicator (java.lang.Void)
	 */
	@Override
	public Conversation changeReadIndicator(Message message) throws BusinessException {
		LOG.trace("Enter updateReadIndicator method.");
		LOG.debug("Message :: " + message);

		Query query = new Query();
		query.addCriteria(Criteria.where(ApplicationConstants.MESSAGEID).is(message.getMessageId()));

		List<Conversation> savedConversationList = mongoOperations.find(query, Conversation.class);
		Conversation savedConversation = null;
		if (!savedConversationList.isEmpty()) {
			savedConversationList.stream().flatMap(conversation -> conversation.getMessages().stream())
					.filter(message1 -> message1.equals(message1.getMessageId()));
			Query newquery = new Query();
			newquery.addCriteria(Criteria.where(ApplicationConstants.MESSAGEID).is(message.getMessageId()));

			Update modifiedObj = new Update();
			modifiedObj.set(ApplicationConstants.IS_READ_INDICATOR, message.isRead());
			FindAndModifyOptions options = new FindAndModifyOptions();
			options.returnNew(true);
			savedConversation = mongoOperations.findAndModify(newquery, modifiedObj, Conversation.class);
		}
		LOG.trace("Exit updateReadIndicator method.");
		return savedConversation;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * getConversationMessages(java.lang.String, java.lang.String,
	 * com.cognizant.tranzform.msgcenter.enums.MessageType,
	 * com.cognizant.tranzform.msgcenter.enums.ConversationFields,
	 * com.cognizant.tranzform.msgcenter.enums.SortByDirection)
	 */
	@Override
	public List<ConversationDetails> getConversationMessages(final String tenantId, final String tenantEnrollmentId,
			final MessageType messageType, final ConversationField conversationField,
			final SortByDirection sortDirection, final String conversationcategory, final String readindicator) throws BusinessException {
		LOG.trace("Start of getConversationMessages");
		MessageCategory msgCategory = null;		
		String sort;
		sort = (conversationField == ConversationField.MODIFIED_DATE) ? "modifiedDate" : conversationField.getValue();
		LOG.debug("Sort is : \n" + sort + "conversation Filed value : " + conversationField.getValue());
		Aggregation aggregation = null;
		
		Criteria criteria = Criteria.where(ApplicationConstants.TENANT_ENROLLMENT_ID).is(tenantEnrollmentId);
		if(conversationcategory != null && !conversationcategory.isEmpty())
			criteria.and(ApplicationConstants.CONVERSATION_CATEGORY).is(conversationcategory);
		
		if (messageType != MessageType.DRAFT && messageType != MessageType.TRASH) {			
			//get the inbox or sent items criteria
			aggregation = getInboxCriteria(messageType, readindicator, criteria);
			
		} else if (messageType == MessageType.TRASH) {			
			//get the trash items criteria
			aggregation = getTrashCriteria( criteria);

		} else if (messageType == MessageType.DRAFT) {
			//get the draft items criteria
			aggregation = getDraftCriteria( criteria);

		}

		LOG.debug("Message category is : \n" + msgCategory + " Message Aggregation is : \n " + aggregation);
		AggregationResults<ConversationDetails> groupResults = mongoOperations.aggregate(aggregation,
				Conversation.class, ConversationDetails.class);
		List<ConversationDetails> conversationDetails = new ArrayList<>();
		if (groupResults != null) {
			conversationDetails = groupResults.getMappedResults();
		}
		LOG.trace("End of getConversationMessages");
		return conversationDetails;

	}

	/**
	 * 
	 * @param messageType
	 * @param readindicator
	 * @param criteria
	 * @return
	 */
	private Aggregation getInboxCriteria(final MessageType messageType,
			final String readindicator, final Criteria criteria
			){
		 Aggregation aggregation = null;
		
		if (messageType != MessageType.DRAFT && messageType != MessageType.TRASH) {
			final MessageCategory msgCategory = (messageType == MessageType.INBOX) ? 
					MessageCategory.INBOUND : MessageCategory.OUTBOUND;
			final List<MessageStatus> messageStatus  = checkMessageStatus(msgCategory);	
			
			if(messageType == MessageType.INBOX && readindicator != null && !readindicator.isEmpty()){
				if(readindicator.equalsIgnoreCase(ApplicationConstants.READ))
					criteria.and(ApplicationConstants.READ_INDICATOR).is(true);
				else if(readindicator.equalsIgnoreCase(ApplicationConstants.UNREAD)){
					criteria.and(ApplicationConstants.READ_INDICATOR).is(false);
				}
			}
			aggregation = Aggregation.newAggregation(Conversation.class, match(criteria),
					unwind(ApplicationConstants.MESSAGES),
					match(Criteria.where(ApplicationConstants.MESSAGE_MESSAGECATEGORY).is(msgCategory)
							.and(ApplicationConstants.MESSAGE_MESSAGESTATUS).nin(messageStatus)),
					sort(Sort.Direction.DESC, ApplicationConstants.MESSAGE_MODIFIEDDATE),
					project(ApplicationConstants.CONVERSATION_ID, ApplicationConstants.CONVERSATION_CATEGORY,
							ApplicationConstants.SUBJECT, ApplicationConstants.MESSAGES));

		}
		return aggregation;
	}
	
	/**
	 * 
	 * @param criteria
	 * @return
	 */
	private Aggregation getDraftCriteria(final Criteria criteria) {
		final List<MessageStatus> messageStatus = new ArrayList<>();
		messageStatus.add(MessageStatus.DRAFT);
		Aggregation	aggregation = Aggregation.newAggregation(Conversation.class, match(criteria),
				unwind(ApplicationConstants.MESSAGES),
				match(Criteria.where(ApplicationConstants.MESSAGE_MESSAGESTATUS).in(messageStatus)),
				sort(Sort.Direction.DESC, ApplicationConstants.MESSAGE_MODIFIEDDATE),
				project(ApplicationConstants.CONVERSATION_ID, ApplicationConstants.CONVERSATION_CATEGORY,
						ApplicationConstants.SUBJECT, ApplicationConstants.MESSAGES));
		return aggregation;
	}

	/**
	 * 
	 * @param criteria
	 * @return
	 */
	private Aggregation getTrashCriteria(final  Criteria criteria) {
		final List<MessageStatus> messageStatus = new ArrayList<>();		
		messageStatus.add(MessageStatus.DRAFT);
		messageStatus.add(MessageStatus.ACTIVE);
		Aggregation aggregation = Aggregation.newAggregation(Conversation.class, match(criteria),
				unwind(ApplicationConstants.MESSAGES),
				match(Criteria.where(ApplicationConstants.MESSAGE_MESSAGESTATUS).nin(messageStatus)),
				sort(Sort.Direction.DESC, ApplicationConstants.MESSAGE_MODIFIEDDATE),
				project(ApplicationConstants.CONVERSATION_ID, ApplicationConstants.CONVERSATION_CATEGORY,
						ApplicationConstants.SUBJECT, ApplicationConstants.MESSAGES));
		return aggregation;
	}
	
	/**
	 * @param msgCategory
	 * @return
	 */
	private List<MessageStatus> checkMessageStatus(MessageCategory msgCategory) {
		List<MessageStatus> messageStatus = new ArrayList<>();
		messageStatus.add(MessageStatus.DRAFT);
		if (msgCategory == MessageCategory.INBOUND) {
			messageStatus.add(MessageStatus.DELETE_INBOX);
		} else if (msgCategory == MessageCategory.OUTBOUND) {
			messageStatus.add(MessageStatus.DELETE_SENTITEMS);

		}
		return messageStatus;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * draftSendMessage(com.cognizant.tranzform.msgcenter.domain.Conversation)
	 */
	@InsertUpdateAuditable
	@Override
	public Conversation draftSendMessage(Conversation conversation) {
		LOG.trace("Enter draftSendMessage method.");

		List<MessageStatus> messageStatusList = new ArrayList<>();
		messageStatusList.add(MessageStatus.DRAFT);

		String messagesPrefix = ApplicationConstants.MESSAGES + ApplicationConstants.DOT_OPERATOR
				+ ApplicationConstants.DOLLAR + ApplicationConstants.DOT_OPERATOR;
		Message message = conversation.getMessages().get(0);

		Query query = getConversationSearchQuery(conversation.getTenantId(), conversation.getTenantEnrollmentId(),
				conversation.getConversationId());
		query.addCriteria(Criteria.where(ApplicationConstants.MESSAGEID).is(message.getMessageId()));

		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);

		Update modifiedObject = new Update();
		modifiedObject.set(ApplicationConstants.MODIFIED_DATE, new Date());
		modifiedObject.set(ApplicationConstants.IS_READ_INDICATOR, false);
		modifiedObject.set(messagesPrefix + ApplicationConstants.MESSAGE_CATEGORY, null);
		modifiedObject.set(messagesPrefix + ApplicationConstants.MESSAGE_STATUS, messageStatusList);
		modifiedObject.set(messagesPrefix + ApplicationConstants.MODIFIED_DATE, new Date());

		mongoOperations.findAndModify(query, modifiedObject, options, Conversation.class);

		Conversation savedConversation = sortByModifiedDate(conversation);

		LOG.trace("Exit draftSendMessage method.");
		return savedConversation;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * deleteMessage(java.lang.String,
	 * com.cognizant.tranzform.msgcenter.domain.Conversation,
	 * com.cognizant.tranzform.msgcenter.enums.MessageType)
	 */
	@Override
	public void deleteMessage(String messageId, Conversation conversation, MessageType messageType) {
		LOG.trace("Start of the method Delete Message In Repo");
		MessageCategory msgCategory = null;
		if (!messageType.equals(MessageType.DRAFT)) {
			msgCategory = (messageType == MessageType.INBOX) ? MessageCategory.INBOUND : MessageCategory.OUTBOUND;
		}
		if (conversation.getMessages() != null) {
			for (Message message : conversation.getMessages()) {
				LOG.debug("Message Id :" + messageId);
				if (message.getMessageId().equalsIgnoreCase(messageId)) {
					updateMessageStatus(message.getMessageStatus(), msgCategory, messageId, messageType);
					break;
				}
			}

		}
		LOG.trace("End of the method Delete Message In Repo");
	}

	/**
	 * Method to update message status
	 * 
	 * @param messageStatus
	 * @param msgCategory
	 * @param messageId
	 * @param messageType
	 */
	private void updateMessageStatus(List<MessageStatus> messageStatus, MessageCategory msgCategory, String messageId,
			MessageType messageType) {
		LOG.trace("Updating Message Status start");
		boolean draftedFlag = false;
		List<MessageStatus> newStatus = new ArrayList<>();
		LOG.debug("Message Status: " + messageStatus + "message type : " + messageType);
		if (messageStatus.contains(MessageStatus.ACTIVE) && messageType == MessageType.INBOX) {
			newStatus.add(MessageStatus.DELETE_INBOX);
		} else if (messageStatus.contains(MessageStatus.ACTIVE) && messageType == MessageType.SENT) {
			newStatus.add(MessageStatus.DELETE_SENTITEMS);
		} else if (messageStatus.contains(MessageStatus.DRAFT) && messageType == MessageType.DRAFT) {
			newStatus = new ArrayList<>();
			newStatus.add(MessageStatus.DELETE);
			draftedFlag = true;
		}
		addToExixtingList(messageStatus, msgCategory, newStatus, messageId, messageType, draftedFlag);
		LOG.trace("Updating Message Status end");
	}

	/**
	 * @param messageStatus
	 * @param msgCategory
	 * @param newStatus
	 * @param messageId
	 * @param msgType
	 * @param draftedFlag
	 */
	private void addToExixtingList(List<MessageStatus> messageStatus, MessageCategory msgCategory,
			List<MessageStatus> newStatus, String messageId, MessageType msgType, boolean draftedFlag) {
		Update update = new Update();
		Query query = new Query();
		LOG.debug("Message Status : " + messageStatus + "messageType" + msgType + "new Status" + newStatus
				+ "Drafted Flag : " + draftedFlag);
		if (messageStatus.contains(MessageStatus.DELETE_INBOX) && msgType == MessageType.SENT) {
			messageStatus.add(MessageStatus.DELETE_SENTITEMS);
			newStatus.addAll(messageStatus);
		} else if (messageStatus.contains(MessageStatus.DELETE_SENTITEMS) && msgType == MessageType.INBOX) {
			messageStatus.add(MessageStatus.DELETE_INBOX);
			newStatus.addAll(messageStatus);
		} else if (msgCategory == null && !draftedFlag) {
			messageStatus.add(MessageStatus.DELETE_DRAFT);
			newStatus.addAll(messageStatus);
		}
		LOG.debug("Message Status : " + messageStatus + "Final Status List :" + newStatus);
		update.set("messages.$.messageStatus", newStatus);
		query.addCriteria(Criteria.where(ApplicationConstants.MESSAGES_MESSAGEID).is(messageId));
		mongoOperations.findAndModify(query, update, Conversation.class);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * getConversation(java.lang.String, java.lang.String, java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public Conversation getConversation(String messageId, String conversationId, String tenantId,
			String tenantEnrollmentId) {
		LOG.trace("Start of the method Get Conversation in Repo");
		LOG.debug("Message Id : " + messageId + "ConversationId : " + conversationId + "Tenant Id : " + tenantId
				+ "TenantEnrollment ID : " + tenantEnrollmentId);
		Query query = new Query();
		query.addCriteria(Criteria.where("tenantId").is(tenantId).and("tenantEnrollmentId").is(tenantEnrollmentId)
				.and("messages.messageId").is(messageId));

		if (null != conversationId) {
			query.addCriteria(Criteria.where(ApplicationConstants.CONVERSATION_ID).is(conversationId));
		}

		Conversation conversation = mongoOperations.findOne(query, Conversation.class);
		LOG.debug("Conversation : " + conversation);
		LOG.trace("End of the method Get Conversation in Repo");
		return conversation;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * getTrailMessages(java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public Conversation getTrailMessages(String messageId, String tenantId, String tenantEnrollmentId) {

		LOG.trace("Get Trail Messages From Db Start");
		Query query = new Query();
		query.addCriteria(Criteria.where("messages.messageId").is(messageId).and("tenantId").is(tenantId)
				.and("tenantEnrollmentId").is(tenantEnrollmentId));
		Conversation conversation = mongoOperations.findOne(query, Conversation.class);
		LOG.trace("Get Trail Messages From Db End");
		return conversation;

	}

}
