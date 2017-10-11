package com.cognizant.tranzform.msgcenter.domain;

/**
 * The Class ConversationDetails.
 */
public class ConversationDetails {

	/** The conversation id. */
	private String conversationId;

	/** The tenant enrollment id. */
	private String tenantEnrollmentId;

	/** The conversation status. */
	private String conversationStatus;

	/** The message id. */
	private String messageId;

	/** The conversation category. */
	private String conversationCategory;

	/** The subject. */
	private String subject;

	/** The message text. */
	private String messageText;

	/** The create date time. */
	private String createDateTime;
	
	private Message messages;

	public Message getMessages() {
		return messages;
	}

	public void setMessages(Message messages) {
		this.messages = messages;
	}

	/**
	 * Gets the conversation id.
	 *
	 * @return the conversation id
	 */
	public String getConversationId() {
		return conversationId;
	}

	/**
	 * Sets the conversation id.
	 *
	 * @param conversationId
	 *            the new conversation id
	 */
	public void setConversationId(String conversationId) {
		this.conversationId = conversationId;
	}

	/**
	 * Gets the tenant enrollment id.
	 *
	 * @return the tenant enrollment id
	 */
	public String getTenantEnrollmentId() {
		return tenantEnrollmentId;
	}

	/**
	 * Sets the tenant enrollment id.
	 *
	 * @param tenantEnrollmentId
	 *            the new tenant enrollment id
	 */
	public void setTenantEnrollmentId(String tenantEnrollmentId) {
		this.tenantEnrollmentId = tenantEnrollmentId;
	}

	/**
	 * Gets the conversation status.
	 *
	 * @return the conversation status
	 */
	public String getConversationStatus() {
		return conversationStatus;
	}

	/**
	 * Sets the conversation status.
	 *
	 * @param conversationStatus
	 *            the new conversation status
	 */
	public void setConversationStatus(String conversationStatus) {
		this.conversationStatus = conversationStatus;
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
	 * Gets the conversation category.
	 *
	 * @return the conversation category
	 */
	public String getConversationCategory() {
		return conversationCategory;
	}

	/**
	 * Sets the conversation category.
	 *
	 * @param conversationCategory
	 *            the new conversation category
	 */
	public void setConversationCategory(String conversationCategory) {
		this.conversationCategory = conversationCategory;
	}

	/**
	 * Gets the subject.
	 *
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}

	/**
	 * Sets the subject.
	 *
	 * @param subject
	 *            the new subject
	 */
	public void setSubject(String subject) {
		this.subject = subject;
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

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ConversationDetails [conversationId=" + conversationId + ", tenantEnrollmentId=" + tenantEnrollmentId
				+ ", conversationStatus=" + conversationStatus + ", messageId=" + messageId + ", conversationCategory="
				+ conversationCategory + ", subject=" + subject + ", messageText=" + messageText + ", createDateTime="
				+ createDateTime + ", messages=" + messages + "]";
	}

}
