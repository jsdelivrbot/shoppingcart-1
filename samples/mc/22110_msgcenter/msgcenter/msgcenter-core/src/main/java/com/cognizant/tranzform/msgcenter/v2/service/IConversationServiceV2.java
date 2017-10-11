package com.cognizant.tranzform.msgcenter.v2.service;

import java.util.List;

import com.cognizant.tranzform.core.exception.BaseException;
import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.msgcenter.enums.ActionType;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.ReadType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetailsV2;

/**
 * The Interface IConversationService.
 */
public interface IConversationServiceV2 {

	/**
	 * Update the isRead Indicator.
	 * @param userId 
	 * @param readType 
	 * 
	 * @param message
	 *            the Conversation object
	 * @return void
	 * @throws BusinessException
	 *             the business exception
	 */

	void updateReadIndicator(String messageId, String userId, ReadType readType) throws BusinessException;

	/**
	 * Save message.
	 * 
	 * @param conversation
	 *            the conversation
	 * @param actionType TODO
	 * @return true, if successful
	 * @throws BaseException
	 *             the base exception
	 */
	boolean saveMessage(ConversationV2 conversation, ActionType actionType, String messageId) throws BaseException;

	/**
	 * Gets the conversation messages.
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

	void deleteMessage(String messageId, MessageType messageType, String tenantId, String userId)
			throws BusinessException;

	List<MessageDetailsV2> getTrailMessages(String messageId, String tenantId,String userId);

	void validateCategory(ConversationV2 setNewConversation);
}
