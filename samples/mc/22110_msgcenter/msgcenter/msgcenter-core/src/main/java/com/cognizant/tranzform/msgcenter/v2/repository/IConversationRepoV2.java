package com.cognizant.tranzform.msgcenter.v2.repository;

import java.util.List;

import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.ReadType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetail;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageMaster;


/**
 * The Interface IConversationRepo.
 */
public interface IConversationRepoV2 {

	/**
	 * Change isReadMessageIndicator.
	 * 
	 * @param message
	 *            the conversation
	 * @return void
	 * @throws BusinessException
	 *             the business exception
	 */

	ConversationV2 changeReadIndicator(String messageId, String userId, ReadType readType) throws BusinessException;

	
	/**
	 * Save new message. It is invoked when a user want to draft a drafted message or send a drafted message
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 * @throws RestException
	 *             the rest exception
	 */
	ConversationV2 saveNewMessage(ConversationV2 conversation) throws RestException;
	
	/**
	 * Save draft,exists update message. It is invoked when a user want to draft a drafted message or send a drafted message
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 * @throws RestException
	 *             the rest exception
	 */
	ConversationV2 updateDraftMessage(ConversationV2 conversation) throws RestException;

	/**
	 * List the conversation messages based on the member.
	 * 
	 * @param tenantId
	 *            the tenant id
	 * @param userId
	 *            the tenant enrollment id
	 * @param messageType
	 *            the message type
	 * @param conversationField
	 *            the conversation field
	 * @param sortDirection
	 *            the sort direction
	 * @param context TODO
	 * @return the conversation messages
	 * @throws BusinessException
	 *             the business exception
	 */
	List<ConversationDetailsV2> getConversationMessages(final String tenantId, final String userId,
			final MessageType messageType, final ConversationField conversationField,
			final SortByDirection sortDirection, final String conversationcategory, final String readindicator) throws BusinessException;

	/**
	 * Save audit.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 */
	ConversationV2 saveAudit(ConversationV2 conversation);



	/**
	 * Draft send message.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 */
	ConversationV2 draftSendMessage(ConversationV2 conversation);

	
	/**
	 * Method to fetch conversation details
	 * 
	 * @param messageId
	 * @param conversationId
	 * @param tenantId
	 * @param tenantEnrollmentId
	 * @return Conversation
	 */
	ConversationV2 getConversation(String messageId, String conversationId, String tenantId);

	void deleteMessage(String messageId, ConversationV2 conversation,
			MessageType messageType, String userId);
	
	List<MessageDetailsV2> getTrailMessages(String messageId, String tenantId,String userId);
	
	

	MessageDetail getMessageDetail(String messageId, String conversationId, String tenantId);
	
	MessageMaster getMessageMaster(String messageId, String tenantId);

	void deleteMessage(String messageId, MessageType messageType,String userId);
	
}
