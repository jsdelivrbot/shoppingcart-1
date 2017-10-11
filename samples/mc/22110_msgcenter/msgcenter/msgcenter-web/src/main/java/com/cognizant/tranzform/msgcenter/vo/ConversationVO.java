package com.cognizant.tranzform.msgcenter.vo;

import java.util.List;

import com.cognizant.tranzform.msgcenter.enums.ConversationStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Class Conversation.
 */
@JsonInclude(Include.NON_NULL)
public class ConversationVO {

	/** The conversation id. */
	private String conversationId;

	/** The tenant enrollment id. */
	private String tenantEnrollmentId;

	/** The tenant id. */
	private String tenantId;

	/** The conversation category. */
	private String conversationCategory;

	/** The subject. */
	private String subject;

	/** The conversation status. */
	private ConversationStatus conversationStatus;

	/** The is read. */
	private boolean isRead;

	/** The created date. */
	private String createdDate;

	/** The modified date. */
	private String modifiedDate;
	
	/** The messages. */
	private List<MessageVO> messages;

	/**
	 * Gets the created date.
	 *
	 * @return the created date
	 */
	public String getCreatedDate() {
		return createdDate;
	}

	/**
	 * Sets the created date.
	 *
	 * @param createdDate
	 *            the new created date
	 */
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * Gets the modified date.
	 *
	 * @return the modified date
	 */
	public String getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * Sets the modified date.
	 *
	 * @param modifiedDate
	 *            the new modified date
	 */
	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	/**
	 * Gets the tenant id.
	 * 
	 * @return the tenant id
	 */
	public String getTenantId() {
		return tenantId;
	}

	/**
	 * Sets the tenant id.
	 * 
	 * @param tenantId
	 *            the new tenant id
	 */
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
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
	 * Gets the conversation status.
	 * 
	 * @return the conversation status
	 */
	public ConversationStatus getConversationStatus() {
		return conversationStatus;
	}

	/**
	 * Sets the conversation status.
	 * 
	 * @param conversationStatus
	 *            the new conversation status
	 */
	public void setConversationStatus(ConversationStatus conversationStatus) {
		this.conversationStatus = conversationStatus;
	}

	/**
	 * Checks if is read.
	 *
	 * @return true, if is read
	 */
	public boolean isRead() {
		return isRead;
	}

	/**
	 * Sets the read.
	 *
	 * @param isRead
	 *            the new read
	 */
	public void setRead(boolean isRead) {
		this.isRead = isRead;
	}

	/**
	 * Gets the messages.
	 * 
	 * @return the messages
	 */
	public List<MessageVO> getMessages() {
		return messages;
	}

	/**
	 * Sets the messages.
	 * 
	 * @param messages
	 *            the new messages
	 */
	public void setMessages(List<MessageVO> messages) {
		this.messages = messages;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ConversationVO [conversationId=" + conversationId + ", tenantEnrollmentId=" + tenantEnrollmentId
				+ ", tenantId=" + tenantId + ", conversationCategory=" + conversationCategory + ", subject=" + subject
				+ ", conversationStatus=" + conversationStatus + ", isRead=" + isRead + ", createdDate=" + createdDate
				+ ", modifiedDate=" + modifiedDate + ", messages=" + messages + "]";
	}

}
