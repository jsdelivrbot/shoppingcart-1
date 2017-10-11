package com.cognizant.tranzform.msgcenter.v2.repository;

import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.BACK_SLASH;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.CONVERSATION_ID;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.ID;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MESSAGE_ID;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MESSAGE_ID_PREFIX;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MESSAGE_MASTER;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MESSAGE_MODIFIEDDATE;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.MODIFIED_DATE;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.READ;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.UNREAD;
import static com.cognizant.tranzform.msgcenter.constants.ApplicationConstants.VALUE;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.inject.Named;

import org.javers.spring.annotation.InsertUpdateAuditable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.core.logging.Log;
import com.cognizant.tranzform.core.logging.LogWrapper;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.domain.Counters;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.ReadType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.v2.domain.Attachment;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetail;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageMaster;
import com.cognizant.tranzform.msgcenter.v2.domain.To;
import com.cognizant.tranzform.tzfutil.user.LoggedInUser;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

/**
 * The Class TextContentRepoImpl.
 */
@Named("conversationRepoV2Local")
public class ConversationRepoV2Impl implements IConversationRepoV2 {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(ConversationRepoV2Impl.class);

	/** The mongo operations. */
	@Resource(name = "mongoTemplate")
	private MongoOperations mongoOperations;

	@Inject
	private LoggedInUser loggedInUser;

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
		query.addCriteria(Criteria.where(ID).is(sequenceName));
		Update update = new Update();
		update.inc(VALUE, increment);
		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);
		Counters counters = mongoOperations.findAndModify(query, update, options, Counters.class);
		if (counters != null) {
			sequenceValue = counters.getValue();
		}
		LOG.trace("Exit getNextSequenceValue method.");
		return sequenceValue;
	}

	

	/**
	 * 
	 * @param msgMaster
	 * @return the saved msg master
	 */
	private MessageMaster saveMessageMaster(final MessageMaster msgMaster, final String msgId) {
		LOG.trace("Enter saveMessageMaster method.");
		msgMaster.setMessageId(msgId);
		msgMaster.setId(msgMaster.getTenantId() + BACK_SLASH + msgMaster.getMessageId());
		mongoOperations.save(msgMaster);
		LOG.trace("Exit saveMessageMaster method.");
		return msgMaster;
	}

	/**
	 * 
	 * @param msgMaster
	 * @return the saved msg detail
	 */
	private List<MessageDetail> saveMessageDetail(final List<MessageDetail> msgDetailList, final String msgId) {
		LOG.trace("Enter saveMessageDetail method.");
		msgDetailList.forEach(msgDtl -> {
			msgDtl.setMessageId(msgId);
			String recipientId = null;
			if (msgDtl.getTo() != null) {
				recipientId = msgDtl.getTo().getId();
			} else {
				recipientId = msgDtl.getFrom().getId();
			}

			msgDtl.setId(recipientId + BACK_SLASH + msgDtl.getMessageId());
			mongoOperations.save(msgDtl);

		});

		LOG.trace("Exit saveMessageDetail method.");
		return msgDetailList;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * saveMessage (com.cognizant.tranzform.msgcenter.domain.Conversation)
	 */
	@Override
	public ConversationV2 saveNewMessage(ConversationV2 conversation) {

		LOG.trace("Enter saveConversation method.");

		final String msgId = MESSAGE_ID_PREFIX + getNextSequenceValue(MESSAGE_ID, 1);

		// save to Message Master
		saveMessageMaster(conversation.getMessageMaster(), msgId);

		// save to Message Detail
		saveMessageDetail(conversation.getMessageDetail(), msgId);

		LOG.trace("Exit saveConversation method.");
		return conversation;
	}

	@Override
	public ConversationV2 updateDraftMessage(ConversationV2 conversation) throws RestException {

		LOG.trace("Enter saveConversation method.");

		String msgId = conversation.getMessageMaster().getMessageId();
		if (msgId == null || msgId.trim().length() == 0) {
			msgId = MESSAGE_ID_PREFIX + getNextSequenceValue(MESSAGE_ID, 1);
		}

		// save to Message Master
		saveMessageMaster(conversation.getMessageMaster(), msgId);

		// save to Message Detail
		saveMessageDetail(conversation.getMessageDetail(), msgId);

		LOG.trace("Exit saveConversation method.");

		return null;
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
	public ConversationV2 saveAudit(ConversationV2 conversation) {
		LOG.debug("Conversation Auditing :: " + conversation);
		return conversation;
	}


	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * changeReadIndicator (java.lang.Void)
	 */
	@Override
	public ConversationV2 changeReadIndicator(String messageId, String userId, ReadType readType)
			throws BusinessException {
		LOG.trace("Enter updateReadIndicator method.");
		LOG.debug("MessageId :: " + messageId);
		Query query = new Query();		
		ConversationV2 savedConversation = new ConversationV2();
		Criteria msgStatusCriteria = Criteria.where("to._id").is(userId).and("messageStatus").is(MessageStatus.ACTIVE);
		msgStatusCriteria.and("messageId").is(messageId);
		query.addCriteria(msgStatusCriteria);
		Update updatefield = new Update();
		if (ReadType.READ == readType)
			updatefield.set(ApplicationConstants.IS_READ, true);
		else
			updatefield.set(ApplicationConstants.IS_READ, false);
		MessageDetail updatedMesssage = mongoOperations.findAndModify(query, updatefield,
				new FindAndModifyOptions().returnNew(true), MessageDetail.class);
		List<MessageDetail> messageDetailList = new ArrayList<>();
		messageDetailList.add(updatedMesssage);
		savedConversation.setMessageDetail(messageDetailList);

		LOG.trace("Exit updateReadIndicator method.");
		return savedConversation;
	}



	@Override
	public List<ConversationDetailsV2> getConversationMessages(final String tenantId, final String userId,
			final MessageType messageType, final ConversationField conversationField,
			final SortByDirection sortDirection, final String conversationcategory, final String readindicator
			) throws BusinessException {
		LOG.trace("Start of getConversationMessages");
		MessageCategory msgCategory = null;
		List<MessageStatus> messageStatus = new ArrayList<>();
		List<ConversationDetailsV2> conversationDetails = new ArrayList<>();
		String sort;
		sort = (conversationField == ConversationField.MODIFIED_DATE) ? MODIFIED_DATE : conversationField.getValue();
		LOG.debug("Sort is : \n" + sort + "conversation Filed value : " + conversationField.getValue());
		Query query = null;
		if (messageType != MessageType.DRAFT && messageType != MessageType.TRASH) {
			if (messageType == MessageType.INBOX) {
				query = getInboxCriteria(userId, readindicator);
				LOG.debug("\n\n\n\n\n\n\nInbox Query:: " + query + "\n\n\n\n\n\n");
			} else if (messageType == MessageType.SENT) {
				query = getSentOrDraftsItemsCriteria(userId, messageType);
				LOG.debug("\n\n\n\n\n\n\nSent  Query:: " + query + "\n\n\n\n\n\n");
			}

		} else if (messageType == MessageType.DRAFT) {
			query = getSentOrDraftsItemsCriteria(userId, messageType);
			LOG.debug("\n\n\n\n\n\n\nDraft Query:: " + query + "\n\n\n\n\n\n");
		} else if (messageType == MessageType.TRASH) {
			query = getDeletedCriteria(userId);
			LOG.debug("\n\n\n\n\n\n\nDeleted Query:: " + query + "\n\n\n\n\n\n");
		}
		LOG.debug("Message category is : \n" + msgCategory + " Message Status is : \n " + messageStatus);

		List<MessageDetail> detailedMessageList = mongoOperations.find(query, MessageDetail.class);
		/**List<MessageMaster> messageMasterList = null;
		List<String> messageIDList = new ArrayList<String>();
		if (detailedMessageList.isEmpty()) {
			LOG.debug("Message Details Table  not configured .");
		} else {

			for (MessageDetail detailMsg : detailedMessageList) {
				messageIDList.add(detailMsg.getMessageId());
			}
			if (null != messageIDList) {
				messageMasterList = findMessageMasterList(messageIDList, tenantId);
			}
			
		}*/
		for (MessageDetail detailMsg : detailedMessageList) {
			conversationDetails.add(prepareConversationObject( detailMsg));
		}
		LOG.trace("End of getConversationMessages");
		return conversationDetails;
	}

	/**
	 * Method to prepare the query to fetch Deleted Message list
	 * 
	 * @param userId
	 * @return
	 */
	private Query getDeletedCriteria(final String userId) {		
		Query query = new Query();
		List<String> DeleteMessageStatus = new ArrayList<>();
		DeleteMessageStatus.add(MessageStatus.DELETE_INBOX.toString());
		DeleteMessageStatus.add(MessageStatus.DELETE_DRAFT.toString());
		DeleteMessageStatus.add(MessageStatus.DELETE_SENTITEMS.toString());

		Criteria userIdCriteria = new Criteria();
		userIdCriteria.orOperator(Criteria.where("to._id").is(userId), Criteria.where("from._id").is(userId));
		Criteria msgStatusCriteria = Criteria.where("messageStatus").in(DeleteMessageStatus);
		Criteria andOperator = userIdCriteria.andOperator(msgStatusCriteria);
		query.addCriteria(andOperator);
		query.with(new Sort(Sort.Direction.DESC, MESSAGE_MODIFIEDDATE));
		return query;
	}

	/**
	 * Method to prepare the query to fetch Sent Items/ Drafts Message list
	 * 
	 * @param userId
	 * @param messageType
	 * @return
	 */
	private Query getSentOrDraftsItemsCriteria(final String userId, final MessageType messageType) {		
		Criteria fromIdCriteria = new Criteria();		
		Query query = new Query();
		final Criteria msgStatusCriteria = Criteria.where("from._id").is(userId);
		if (messageType == MessageType.SENT){
			Criteria andOperator = fromIdCriteria.orOperator(Criteria.where("to._id").is(null), Criteria.where("to._id").is(userId));
			msgStatusCriteria.andOperator(andOperator);
			msgStatusCriteria.and("messageStatus").is(MessageStatus.ACTIVE);
		}
		else
			msgStatusCriteria.and("messageStatus").is(MessageStatus.DRAFT);
		query.addCriteria(msgStatusCriteria);
		query.with(new Sort(Sort.Direction.DESC, MESSAGE_MODIFIEDDATE));
		return query;
		
		
	}

	/**
	 * Method to prepare the query to fetch Inbox Message list
	 * 
	 * @param userId
	 * @param readindicator
	 * @return
	 */
	private Query getInboxCriteria(final String userId, final String readindicator) {		
		Query query = new Query();
		Criteria msgStatusCriteria = Criteria.where("to._id").is(userId).and("messageStatus").is(MessageStatus.ACTIVE);
		if (readindicator != null && !readindicator.isEmpty()) {
			if (readindicator.equalsIgnoreCase(READ)) {
				msgStatusCriteria.and("isRead").is(true);
			} else if (readindicator.equalsIgnoreCase(UNREAD)) {
				msgStatusCriteria.and("isRead").is(false);
			}
		}
		query.addCriteria(msgStatusCriteria);
		query.with(new Sort(Sort.Direction.DESC, MESSAGE_MODIFIEDDATE));

		return query;
	}

	/**
	 * Method to prepare the Custom Domain object required for Domain to VO
	 * conversion
	 * 
	 * @param messageMasterList
	 * @param detailedMessage
	 * @param context
	 * @return
	 */
	private ConversationDetailsV2 prepareConversationObject(
			MessageDetail detailedMessage) {
		ConversationDetailsV2 conversationDetails = new ConversationDetailsV2();
		MessageDetailsV2 messageDetails = new MessageDetailsV2();		
		conversationDetails.setMessageId(detailedMessage.getMessageId());		

		messageDetails.setConversationCategory(detailedMessage.getConversationCategory());
		messageDetails.setCreatedDate(detailedMessage.getCreatedDate());
		messageDetails.setFrom(detailedMessage.getFrom());	
		messageDetails.setMessageId(detailedMessage.getMessageId());
		messageDetails.setMessageStatus(detailedMessage.getMessageStatus());
		messageDetails.setModifiedDate(detailedMessage.getModifiedDate());
		messageDetails.setIsRead(detailedMessage.getIsRead());
		messageDetails.setSubject(detailedMessage.getSubject());
		messageDetails.setIsFwd(detailedMessage.getIsFwd());
		conversationDetails.setMessages(messageDetails);

		return conversationDetails;
	}


	

	

	@Override
	public void deleteMessage(String messageId, MessageType messageType,String userId) {

		LOG.trace("Start of the method Delete Message In Repo");

		final List<MessageIds> trailingIdsList = getTrailingMsgQuery(messageId, loggedInUser.getTenantId());

		if (!trailingIdsList.isEmpty()) {

			final List<String> idList = new ArrayList<>();
			trailingIdsList.forEach(message -> 
				idList.add(userId+ BACK_SLASH + message.getMessageId())
			);

			Query query = new Query();
			query.addCriteria(Criteria.where("_id").in(idList));
			Update update = new Update();
			if (MessageType.INBOX == messageType)
				update.set("messageStatus", MessageStatus.DELETE_INBOX);
			else if (MessageType.SENT == messageType)
				update.set("messageStatus", MessageStatus.DELETE_SENTITEMS);
			else
				update.set("messageStatus", MessageStatus.DELETE_DRAFT);
			LOG.debug("Delete Query->" + query);
			final FindAndModifyOptions modifyOptns = new FindAndModifyOptions();
			modifyOptns.returnNew(true);

			mongoOperations.updateMulti(query, update, ApplicationConstants.MESSAGE_DETAIL);
		}

		LOG.trace("End of the method Delete Message In Repo");
	}


	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * getConversation(java.lang.String, java.lang.String, java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public ConversationV2 getConversation(String messageId, String conversationId, String tenantId) {
		LOG.trace("Start of the method Get Conversation in Repo");
		LOG.debug("Message Id : " + messageId + "ConversationId : " + conversationId + "Tenant Id : " + tenantId);
		Query query = new Query();
		query.addCriteria(Criteria.where("tenantId").is(tenantId).and("messages.messageId").is(messageId));

		if (null != conversationId) {
			query.addCriteria(Criteria.where(CONVERSATION_ID).is(conversationId));
		}

		ConversationV2 conversation = mongoOperations.findOne(query, ConversationV2.class);
		LOG.debug("Conversation : " + conversation);
		LOG.trace("End of the method Get Conversation in Repo");
		return conversation;
	}

	@Override
	public MessageDetail getMessageDetail(String messageId, String conversationId, String tenantId) {
		LOG.trace("Start of the method Get Conversation in Repo");
		LOG.debug("Message Id : " + messageId + "Tenant Id : " + tenantId);
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(loggedInUser.getUserId() + BACK_SLASH + messageId)
				.and("messageStatus").in(MessageStatus.ACTIVE, MessageStatus.DRAFT));

		MessageDetail msgDetail = mongoOperations.findOne(query, MessageDetail.class);
		LOG.debug("MessageDetail : " + msgDetail);
		LOG.trace("End of the method Get Conversation in Repo");
		return msgDetail;
	}
	
	@Override
	public MessageMaster getMessageMaster(String messageId, String tenantId) {
		LOG.trace("Start of the method Get Conversation in Repo");
		LOG.debug("Message Id : " + messageId + "Tenant Id : " + tenantId);
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(tenantId + BACK_SLASH + messageId));

		MessageMaster msgMaster = mongoOperations.findOne(query, MessageMaster.class);
		LOG.debug("MessageMaster : " + msgMaster);
		LOG.trace("End of the method Get Conversation in Repo");
		return msgMaster;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IConversationRepo#
	 * getTrailMessages(java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public List<MessageDetailsV2> getTrailMessages(String messageId, String tenantId,String userId) {

		LOG.trace("Get Trail Messages From Db Start");
		List<MessageDetailsV2> msgDetailV2List = getTrailingMessageAsList(messageId, tenantId,userId);
				LOG.trace("Get Trail Messages From Db End");
		return msgDetailV2List;

	}

	/**
	 * 
	 * @param messageId
	 * @param tenantId
	 * @return
	 */
	private List<MessageDetailsV2> getTrailingMessageAsList(final String messageId, final String tenantId,String userId) {

		final List<MessageDetailsV2> msgDetailList = new ArrayList<>();

		final List<MessageIds> trailingIdsList = getTrailingMsgQuery(messageId, tenantId);

		if (!trailingIdsList.isEmpty()) {

			final List<String> idList = new ArrayList<>();
			trailingIdsList.forEach(message ->
					idList.add(userId + BACK_SLASH + message.getMessageId())

			);

			Query query = new Query();
			query.addCriteria(Criteria.where("_id").in(idList));

			final List<MessageDetail> messageDetailList = mongoOperations.find(query, MessageDetail.class);

			if (messageDetailList != null && !messageDetailList.isEmpty()) {
				messageDetailList.forEach(msgDetail -> {
					final MessageDetailsV2 msgDetailV2 = new MessageDetailsV2();
					msgDetailV2.setMessageId(msgDetail.getMessageId());
					msgDetailV2.setCreatedDate(msgDetail.getCreatedDate());
					msgDetailV2.setFrom(msgDetail.getFrom());
					msgDetailV2.setIsFwd(msgDetail.getIsFwd());
					msgDetailV2.setIsRead(msgDetail.getIsRead());
					msgDetailV2.setMessageBody(getMessageText(msgDetail.getMessageId(), trailingIdsList));
					msgDetailV2.setConversationCategory(msgDetail.getConversationCategory());
					msgDetailV2.setMessageStatus(msgDetail.getMessageStatus());
					msgDetailV2.setModifiedDate(msgDetail.getModifiedDate());
					msgDetailV2.setSubject(msgDetail.getSubject());
					msgDetailV2.setTo(getMessageTo(msgDetail.getMessageId(), trailingIdsList));
					//setting the attachment
					msgDetailV2.setAttachment(getMessageAttachment(msgDetail.getMessageId(), trailingIdsList));
					msgDetailList.add(msgDetailV2);
				});

			}

		}
		return msgDetailList;
	}

	/**
	 * 
	 * @param messageId
	 * @param tenantId
	 * @return
	 */
	private List<MessageIds> getTrailingMsgQuery(final String messageId, final String tenantId) {

		final DBCollection collection = mongoOperations.getCollection(MESSAGE_MASTER);

		final List<BasicDBObject> pipeline = new ArrayList<>();

		final DBObject graphLookup = new BasicDBObject("from", MESSAGE_MASTER).append("startWith", "$messageId")
				.append("connectFromField", "trailMessageId").append("connectToField", "messageId")
				.append("as", "messages");

		final BasicDBObject graphCriteria = new BasicDBObject("$graphLookup", graphLookup);

		final BasicDBObject criteria = new BasicDBObject();
		criteria.put("tenantId", tenantId);
		criteria.put("messageId", messageId);

		final BasicDBObject matchCriteria = new BasicDBObject("$match", criteria);

		final BasicDBObject theProjections = new BasicDBObject();
		theProjections.put("messages.messageId", 1);
		theProjections.put("messages.messageBody", 1);
		theProjections.put("messages.to", 1);
		theProjections.put("messages.attachment", 1);
		

		final BasicDBObject projectCriteria = new BasicDBObject("$project", theProjections);

		pipeline.add(graphCriteria);
		pipeline.add(matchCriteria);
		pipeline.add(projectCriteria);

		LOG.debug("Trailing Query=>" + pipeline);

		final AggregationOutput aggregationOutput = collection.aggregate(pipeline);

		final Iterable<DBObject> iterable = aggregationOutput.results();

		final List<MessageIds> trailingIdsList = new ArrayList<>();
		if (iterable != null) {
			iterable.forEach(dbObject -> {
				DBObject dbObj = (DBObject) dbObject.get("messages");
				if (dbObj != null) {
					dbObj.keySet().forEach(key -> {
						final MessageIds msgObj = mongoOperations.getConverter().read(MessageIds.class,
								(DBObject) dbObj.get(key));
						trailingIdsList.add(msgObj);
					});
				}
			});
		}

		return trailingIdsList;
	}

	/**
	 * 
	 * @param messageId
	 * @param trailingIdsList
	 * @return the message text
	 */
	private String getMessageText(final String messageId, final List<MessageIds> trailingIdsList) {

		String msgBody = null;
		if (trailingIdsList != null) {
			final MessageIds optionalMsg = trailingIdsList.stream()
					.filter(msgId -> msgId.getMessageId().equals(messageId)).findFirst().orElse(null);
			if (optionalMsg != null) {
				msgBody = optionalMsg.getMessageBody();
			}
		}

		return msgBody;

	}

	/**
	 * 
	 * @param messageId
	 * @param trailingIdsList
	 * @return the to address
	 */
	private To getMessageTo(final String messageId, final List<MessageIds> trailingIdsList) {

		To msgTo = null;
		if (trailingIdsList != null) {
			final MessageIds optionalMsg = trailingIdsList.stream()
					.filter(msgId -> msgId.getMessageId().equals(messageId)).findFirst().orElse(null);
			if (optionalMsg != null && null != optionalMsg.getTo()) {
				msgTo = optionalMsg.getTo().get(0);
			}
		}

		return msgTo;

	}
	
	
	/**
	 * 
	 * @param messageId
	 * @param trailingIdsList
	 * @return the attachment
	 */
	private Attachment getMessageAttachment(final String messageId, final List<MessageIds> trailingIdsList) {

		Attachment attachment = null;
		if (trailingIdsList != null) {
			final MessageIds optionalMsg = trailingIdsList.stream()
					.filter(msgId -> msgId.getMessageId().equals(messageId)).findFirst().orElse(null);
			if (optionalMsg != null && optionalMsg.getAttachment()!=null) {
				attachment = optionalMsg.getAttachment();
			}
		}

		return attachment;

	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	 class MessageIds {

		private String messageId;

		private String messageBody;

		private List<To> to = new ArrayList<>();
		
		private Attachment attachment;

		/**
		 * @return the messageId
		 */
		public String getMessageId() {
			return messageId;
		}

		/**
		 * @param messageId
		 *            the messageId to set
		 */
		public void setMessageId(String messageId) {
			this.messageId = messageId;
		}

		/**
		 * @return the messageBody
		 */
		public String getMessageBody() {
			return messageBody;
		}

		/**
		 * @param messageBody
		 *            the messageBody to set
		 */
		public void setMessageBody(String messageBody) {
			this.messageBody = messageBody;
		}

		/**
		 * @return the to
		 */
		public List<To> getTo() {
			return to;
		}

		/**
		 * @param to
		 *            the to to set
		 */
		public void setTo(List<To> to) {
			this.to = to;
		}

		/**
		 * @return the attachment
		 */
		public Attachment getAttachment() {
			return attachment;
		}

		/**
		 * @param attachment the attachment to set
		 */
		public void setAttachment(Attachment attachment) {
			this.attachment = attachment;
		}

		/* (non-Javadoc)
		 * @see java.lang.Object#toString()
		 */
		@Override
		public String toString() {
			return "MessageIds [messageId=" + messageId + ", messageBody=" + messageBody + ", to=" + to
					+ ", attachment=" + attachment + "]";
		}

		

	}

	@Override
	public ConversationV2 draftSendMessage(ConversationV2 conversation) {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public void deleteMessage(String messageId, ConversationV2 conversation, MessageType messageType, String userId) {
		// TODO Auto-generated method stub
		
	}

}
