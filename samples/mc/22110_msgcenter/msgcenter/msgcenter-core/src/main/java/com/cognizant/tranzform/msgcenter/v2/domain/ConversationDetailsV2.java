package com.cognizant.tranzform.msgcenter.v2.domain;

/**
 * The Class ConversationDetails.
 */
public class ConversationDetailsV2 {

	
	private String conversationId;
	

	/** The message id. */
	private String msgCounter;
	
	/** The message id. */
	private String context;
	
	/** The create date time. */
	private String createDateTime;
	
	private MessageDetailsV2 messages;

	/** The message id. */
	private String messageId;
	
	/** The message text. */
	private String messageText;


	public MessageDetailsV2 getMessages() {
		return messages;
	}

	public void setMessages(MessageDetailsV2 messages) {
		this.messages = messages;
	}

	
	/**
	 * Gets the message id.
	 *
	 * @return the message id
	 */
	public String getMessageId() {
		return messageId;
	}

	/**
	 * Sets the message id.
	 *
	 * @param messageId
	 *            the new message id
	 */
	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	/**
	 * Gets the message text.
	 *
	 * @return the message text
	 */
	public String getMessageText() {
		return messageText;
	}

	/**
	 * Sets the message text.
	 *
	 * @param messageText
	 *            the new message text
	 */
	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	/**
	 * Gets the creates the date time.
	 *
	 * @return the creates the date time
	 */
	public String getCreateDateTime() {
		return createDateTime;
	}

	/**
	 * Sets the creates the date time.
	 *
	 * @param createDateTime
	 *            the new creates the date time
	 */
	public void setCreateDateTime(String createDateTime) {
		this.createDateTime = createDateTime;
	}

	public String getMsgCounter() {
		return msgCounter;
	}

	public void setMsgCounter(String msgCounter) {
		this.msgCounter = msgCounter;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}
	
	/**
	 * @return the conversationId
	 */
	public String getConversationId() {
		return conversationId;
	}

	/**
	 * @param conversationId the conversationId to set
	 */
	public void setConversationId(String conversationId) {
		this.conversationId = conversationId;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ConversationDetails [  messageId=" + messageId + "messageText=" + messageText + ", createDateTime="
				+ createDateTime + ", messages=" + messages + "]";
	}

}
