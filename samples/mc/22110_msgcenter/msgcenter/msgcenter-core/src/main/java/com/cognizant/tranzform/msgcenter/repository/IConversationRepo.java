package com.cognizant.tranzform.msgcenter.repository;

import java.util.List;

import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.msgcenter.domain.Conversation;
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;


/**
 * The Interface IConversationRepo.
 */
public interface IConversationRepo {

	/**
	 * Change isReadMessageIndicator.
	 * 
	 * @param message
	 *            the conversation
	 * @return void
	 * @throws BusinessException
	 *             the business exception
	 */

	Conversation changeReadIndicator(Message message) throws BusinessException;

	/**
	 * Save conversation.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 * @throws RestException
	 *             the rest exception
	 */
	Conversation saveConversation(Conversation conversation) throws RestException;

	/**
	 * Save new message. It is invoked when a user want to draft a drafted message or send a drafted message
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 * @throws RestException
	 *             the rest exception
	 */
	Conversation saveNewMessage(Conversation conversation) throws RestException;

	/**
	 * List the conversation messages based on the member.
	 * 
	 * @param tenantId
	 *            the tenant id
	 * @param tenantEnrollmentId
	 *            the tenant enrollment id
	 * @param messageType
	 *            the message type
	 * @param conversationField
	 *            the conversation field
	 * @param sortDirection
	 *            the sort direction
	 * @return the conversation messages
	 * @throws BusinessException
	 *             the business exception
	 */
	List<ConversationDetails> getConversationMessages(final String tenantId, final String tenantEnrollmentId,
			final MessageType messageType, final ConversationField conversationField,
			final SortByDirection sortDirection, final String conversationcategory, final String readindicator) throws BusinessException;

	/**
	 * Save audit.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 */
	Conversation saveAudit(Conversation conversation);

	/**
	 * The method is invoked when a user replies to an ACTIVE message and then drafting or sending it. In this case 
	 * a new message will be created with the trialMessageId as the messageId passes via request
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 */
	Conversation saveExistingMessage(Conversation conversation);

	/**
	 * Draft send message.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 */
	Conversation draftSendMessage(Conversation conversation);

	
	/**
	 * Method to fetch conversation details
	 * 
	 * @param messageId
	 * @param conversationId
	 * @param tenantId
	 * @param tenantEnrollmentId
	 * @return Conversation
	 */
	Conversation getConversation(String messageId, String conversationId, String tenantId, String tenantEnrollmentId);

	void deleteMessage(String messageId, Conversation conversation,
			MessageType messageType);
	
	Conversation getTrailMessages(String messageId, String tenantId, String tenantEnrollmentId);
	
}
