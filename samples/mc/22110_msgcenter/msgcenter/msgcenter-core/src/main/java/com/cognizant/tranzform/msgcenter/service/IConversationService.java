package com.cognizant.tranzform.msgcenter.service;

import java.util.List;

import com.cognizant.tranzform.core.exception.BaseException;
import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.msgcenter.domain.Conversation;
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;

/**
 * The Interface IConversationService.
 */
public interface IConversationService {

	/**
	 * Update the isRead Indicator.
	 * 
	 * @param message
	 *            the Conversation object
	 * @return void
	 * @throws BusinessException
	 *             the business exception
	 */

	void updateReadIndicator(Message conversation) throws BusinessException;

	/**
	 * Save message.
	 * 
	 * @param conversation
	 *            the conversation
	 * @return true, if successful
	 * @throws BaseException
	 *             the base exception
	 */
	boolean saveMessage(Conversation conversation) throws BaseException;

	/**
	 * Save conversation.
	 * 
	 * @param conversation
	 *            the conversation
	 * @return true, if successful
	 * @throws BaseException
	 *             the base exception
	 */
	boolean saveConversation(Conversation conversation) throws BaseException;

	/**
	 * Gets the conversation messages.
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

	void deleteMessage(String messageId, MessageType messageType, String tenantId, String tenantEnrollmentId)
			throws BusinessException;

	List<Message> getTrailMessages(String messageId, String tenantId, String tenantEnrollmentId);

	void validateCategory(Conversation setNewConversation);
}
