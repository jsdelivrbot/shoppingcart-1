package com.cognizant.tranzform.msgcenter.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Class Conversation.
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(Include.NON_NULL)
public class NewMessageVO {

	/** The conversation id. */
	private String conversationId;

	/** The conversation category. */
	private String conversationCategory;

	/** The subject. */
	private String subject;

	/** The message body. */
	private String messageBody;

	/** The tenant enrollment id. */
	private String tenantEnrollmentId;

	/** The message id. */
	private String messageId;

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
	 * Gets the message body.
	 * 
	 * @return the message body
	 */
	public String getMessageBody() {
		return messageBody;
	}

	/**
	 * Sets the message body.
	 * 
	 * @param messageBody
	 *            the new message body
	 */
	public void setMessageBody(String messageBody) {
		this.messageBody = messageBody;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "NewMessageVO [conversationId=" + conversationId + ", conversationCategory=" + conversationCategory
				+ ", subject=" + subject + ", messageBody=" + messageBody + ", tenantEnrollmentId=" + tenantEnrollmentId
				+ ", messageId=" + messageId + "]";
	}

}
