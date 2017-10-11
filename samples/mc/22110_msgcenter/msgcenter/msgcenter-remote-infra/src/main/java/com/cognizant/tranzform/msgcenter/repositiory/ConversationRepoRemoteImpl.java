package com.cognizant.tranzform.msgcenter.repositiory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.core.MediaType;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cognizant.tranzform.config.IConfig;
import com.cognizant.tranzform.config.IConfigProvider;
import com.cognizant.tranzform.context.provider.IHttpHeaderProvider;
import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.core.logging.Log;
import com.cognizant.tranzform.core.logging.LogWrapper;
import com.cognizant.tranzform.core.util.RestClientUtil;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.domain.Conversation;
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.repository.IConversationRepo;
import com.cognizant.tranzform.util.DozerUtil;

/**
 * The Class TextContentRepoImpl.
 */
@Named("conversationRepoRemote")
public class ConversationRepoRemoteImpl implements IConversationRepo {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(ConversationRepoRemoteImpl.class);

	/** The config provider. */
	@Inject
	private IConfigProvider configProvider;

	@Inject
	private IHttpHeaderProvider contextProvider;

	/**
	 * Change read indicator.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 * @throws BusinessException
	 *             the business exception
	 */
	@Override
	public Conversation changeReadIndicator(Message message) throws BusinessException {
		return null;
	}

	/**
	 * Save conversation.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 * @throws RestException
	 *             the rest exception
	 */
	@Override
	public Conversation saveConversation(Conversation conversation) throws RestException {
		LOG.trace("Enter saveConversation method.");
		LOG.debug("Saved Conversation :: " + conversation);
		if (conversation != null
				&& conversation.getMessages().get(0).getMessageStatus().contains(MessageStatus.ACTIVE)) {
			ConversationDetails newConversation = DozerUtil.copy(conversation, ConversationDetails.class,
					"conversation_to_tenantConversation");
			IConfig config = configProvider.getConfig();
			String requestURL = config.getString("tenant.save.conversation");
			HttpHeaders httpHeaders = contextProvider.getAuthHeaders();
			httpHeaders.add(ApplicationConstants.CONTENT_TYPE, MediaType.APPLICATION_JSON);
			ResponseEntity<String> responseEntity = RestClientUtil.dataServiceExchange(requestURL, HttpMethod.POST, httpHeaders,
					newConversation, String.class);

			if (responseEntity != null && HttpStatus.OK == responseEntity.getStatusCode()) {
				LOG.debug("Message :: " + responseEntity.getBody());
			}
		}
		LOG.trace("Exit saveConversation method.");
		return conversation;
	}

	/**
	 * Save message.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 * @throws RestException
	 *             the rest exception
	 */
	@Override
	public Conversation saveNewMessage(Conversation conversation) throws RestException {
		LOG.trace("Enter saveMessage method.");
		LOG.debug("Saved Message :: " + conversation);
		if (conversation != null
				&& conversation.getMessages().get(0).getMessageStatus().contains(MessageStatus.ACTIVE)) {
			ConversationDetails newMessage = DozerUtil.copy(conversation, ConversationDetails.class,
					"message_to_tenantMessage");
			IConfig config = configProvider.getConfig();
			String requestURL = config.getString("tenant.save.message");
			HttpHeaders httpHeaders = contextProvider.getAuthHeaders();
			httpHeaders.add(ApplicationConstants.CONTENT_TYPE, MediaType.APPLICATION_JSON);
			ResponseEntity<String> responseEntity = RestClientUtil.dataServiceExchange(requestURL, HttpMethod.POST, httpHeaders,
					newMessage, String.class);

			if (responseEntity != null && HttpStatus.OK == responseEntity.getStatusCode()) {
				LOG.debug("Message :: " + responseEntity.getBody());
			}
		}
		LOG.trace("Exit saveMessage method.");
		return conversation;
	}

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
	@Override
	public List<ConversationDetails> getConversationMessages(String tenantId, String tenantEnrollmentId,
			MessageType messageType, ConversationField conversationField, SortByDirection sortDirection,
			String conversationcategory, String readindicator)
			throws BusinessException {
		return Collections.emptyList();
	}

	/**
	 * Save audit.
	 *
	 * @param conversation
	 *            the conversation
	 * @return the conversation
	 */
	@Override
	public Conversation saveAudit(Conversation conversation) {
		return null;
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
		return null;
	}

	@Override
	public Conversation draftSendMessage(Conversation conversation) {
		return null;
	}

	@Override
	public Conversation getConversation(String messageId, String conversationId, String tenantId,
			String tenantEnrollmentId) {
		return null;
	}

	@Override
	public void deleteMessage(String messageId, Conversation conversation,
			MessageType messageType) {
		LOG.info("In Delete Message");
		LOG.trace("Enter deleteMessage method.");

		Message message = new Message();
		message.setMessageId(messageId);
		List<MessageStatus> status=new ArrayList<MessageStatus>();
		status.add(MessageStatus.DELETE);
		message.setMessageStatus(status);


		IConfig config = configProvider.getConfig();
		String requestURL = config.getString("tenant.delete.message");
		requestURL = requestURL + ApplicationConstants.BACK_SLASH + messageId
				+ ApplicationConstants.BACK_SLASH + "status"
				+ ApplicationConstants.BACK_SLASH
				+ message.getMessageStatus().get(0);
		HttpHeaders httpHeaders = contextProvider.getAuthHeaders();
		httpHeaders.add(ApplicationConstants.CONTENT_TYPE,
				MediaType.APPLICATION_JSON);
		ResponseEntity<String> responseEntity = RestClientUtil.dataServiceExchange(
				requestURL, HttpMethod.DELETE, httpHeaders, message,
				String.class);

		if (responseEntity != null
				&& HttpStatus.OK == responseEntity.getStatusCode()) {
			LOG.debug("Message :: " + responseEntity.getBody());
		}
		LOG.trace("Exit deleteMessage method.");

	}

	@Override
	public Conversation getTrailMessages(String messageId, String tenantId, String tenantEnrollmentId) {
		LOG.debug("Entered trail message remote layer");
		LOG.debug("Exited trail message remote layer");
		return null;
	}

}
