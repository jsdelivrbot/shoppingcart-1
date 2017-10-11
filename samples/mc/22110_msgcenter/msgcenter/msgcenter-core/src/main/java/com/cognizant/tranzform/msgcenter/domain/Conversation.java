package com.cognizant.tranzform.msgcenter.domain;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.cognizant.tranzform.msgcenter.enums.ConversationStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Class Conversation.
 */
@Document(collection = "Conversation")
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Conversation{

	/** The id. */
	@Id
	private String id;

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

	/** The priority used for sorting purpose */
	private Long priority;

	/** The conversation status. */
	private ConversationStatus conversationStatus;

	
	/** The created date. */
	private Date createdDate;

	/** The modified date. */
	private Date modifiedDate;

	/** The messages. */
	private List<Message> messages;

	/**
	 * Gets the id.
	 * 
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets the id.
	 * 
	 * @param id
	 *            the new id
	 */
	public void setId(String id) {
		this.id = id;
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
	 * @return the priority
	 */
	public Long getPriority() {
		return priority;
	}

	/**
	 * @param priority
	 *            the priority to set
	 */
	public void setPriority(Long priority) {
		this.priority = priority;
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
	 * Gets the created date.
	 * 
	 * @return the created date
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * Sets the created date.
	 * 
	 * @param createdDate
	 *            the new created date
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * Gets the modified date.
	 * 
	 * @return the modified date
	 */
	public Date getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * Sets the modified date.
	 * 
	 * @param modifiedDate
	 *            the new modified date
	 */
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	
	/**
	 * Gets the messages.
	 * 
	 * @return the messages
	 */
	public List<Message> getMessages() {
		return messages;
	}

	/**
	 * Sets the messages.
	 * 
	 * @param messages
	 *            the new messages
	 */
	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Conversation [id=" + id + ", conversationId=" + conversationId
				+ ", tenantEnrollmentId=" + tenantEnrollmentId + ", tenantId="
				+ tenantId + ", conversationCategory=" + conversationCategory
				+ ", subject=" + subject + ", conversationStatus="
				+ conversationStatus + ", createdDate="
				+ createdDate + ", modifiedDate=" + modifiedDate
				+ ", messages=" + messages + "]";
	}

}
