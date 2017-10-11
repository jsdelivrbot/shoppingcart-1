package com.cognizant.tranzform.msgcenter.v2.vo;

import java.util.List;

import com.cognizant.tranzform.msgcenter.enums.MessageTypeV2;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Class Conversation.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class NewMessageV2VO {

	/** The conversation category. */
	private String conversationCategory;

	/** The subject. */
	private String subject;

	/** The message body. */
	private String messageBody;

	private List<Recipient> recipients;

	/** The message id. */
	private String messageId;

	/** The tenant enrollment id. */
	private String tenantEnrollmentId;

	private boolean isFwd;

	private MessageTypeV2 messageType;

	private AttachmentVO attachment;

	/**
	 * @return the messageType
	 */
	public MessageTypeV2 getMessageType() {
		return messageType;
	}

	/**
	 * @param messageType
	 *            the messageType to set
	 */
	public void setMessageType(MessageTypeV2 messageType) {
		this.messageType = messageType;
	}

	public boolean getIsFwd() {
		return isFwd;
	}

	public void setIsFwd(boolean isFwd) {
		this.isFwd = isFwd;
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

	public String getTenantEnrollmentId() {
		return tenantEnrollmentId;
	}

	public void setTenantEnrollmentId(String tenantEnrollmentId) {
		this.tenantEnrollmentId = tenantEnrollmentId;
	}

	public List<Recipient> getRecipients() {
		return recipients;
	}

	public void setRecipients(List<Recipient> recipients) {
		this.recipients = recipients;
	}

	/**
	 * @return the attachment
	 */
	public AttachmentVO getAttachment() {
		return attachment;
	}

	/**
	 * @param attachment
	 *            the attachment to set
	 */
	public void setAttachment(AttachmentVO attachment) {
		this.attachment = attachment;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "NewMessageV2VO [conversationCategory=" + conversationCategory + ", subject=" + subject
				+ ", messageBody=" + messageBody + ", recipients=" + recipients + ", messageId=" + messageId
				+ ", tenantEnrollmentId=" + tenantEnrollmentId + ", isFwd=" + isFwd + ", messageType=" + messageType
				+ ", attachment=" + attachment + "]";
	}


}
