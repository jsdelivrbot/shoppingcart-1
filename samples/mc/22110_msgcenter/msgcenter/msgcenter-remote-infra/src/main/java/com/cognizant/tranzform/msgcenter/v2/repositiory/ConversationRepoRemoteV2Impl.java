package com.cognizant.tranzform.msgcenter.v2.repositiory;

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
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.Message;
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
import com.cognizant.tranzform.msgcenter.v2.domain.MessageV2;
import com.cognizant.tranzform.msgcenter.v2.repository.IConversationRepoV2;
import com.cognizant.tranzform.util.DozerUtil;

/**
 * The Class TextContentRepoImpl.
 */
@Named("conversationRepoV2Remote")
public class ConversationRepoRemoteV2Impl implements IConversationRepoV2 {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(ConversationRepoRemoteV2Impl.class);

	/** The config provider. */
	@Inject
	private IConfigProvider configProvider;

	@Inject
	private IHttpHeaderProvider contextProvider;



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
	public ConversationV2 saveNewMessage(ConversationV2 conversation) throws RestException {
		
		return null;
	}

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
	 * @return the conversation messages
	 * @throws BusinessException
	 *             the business exception
	 */
	@Override
	public List<ConversationDetailsV2> getConversationMessages(String tenantId, String userId,
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
	public ConversationV2 saveAudit(ConversationV2 conversation) {
		return null;
	}


	@Override
	public ConversationV2 draftSendMessage(ConversationV2 conversation) {
		return null;
	}

	@Override
	public ConversationV2 getConversation(String messageId, String conversationId, String tenantId) {
		return null;
	}

	@Override
	public void deleteMessage(String messageId, ConversationV2 conversation,
			MessageType messageType, String userId) {
		LOG.info("In Delete Message");
		LOG.trace("Enter deleteMessage method.");

		Message message = new Message();
		message.setMessageId(messageId);
		List<MessageStatus> status=new ArrayList<>();
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
	public List<MessageDetailsV2> getTrailMessages(String messageId, String tenantId, String userId) {
		LOG.debug("Entered trail message remote layer");
		LOG.debug("Exited trail message remote layer");
		return Collections.emptyList();
	}

	@Override
	public ConversationV2 changeReadIndicator(String messageId, String userId, ReadType readType)
			throws BusinessException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MessageDetail getMessageDetail(String messageId, String conversationId, String tenantId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public MessageMaster getMessageMaster(String messageId, String tenantId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteMessage(String messageId, MessageType messageType,String userId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ConversationV2 updateDraftMessage(ConversationV2 conversation) throws RestException {
		// TODO Auto-generated method stub
		return null;
	}

	

}
