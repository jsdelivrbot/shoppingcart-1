package com.cognizant.tranzform.msgcenter.v2.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Message Master Data collection
 */
@Document(collection = "MessageMaster")
@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageMaster {

	/** The id. */
	@Id
	private String id;
	
	/** The tenant id. */
	private String tenantId;
	
	/** The message id. */
	private String messageId;
	
	/**
	 * The From.
	 */
	private From from;
	
	/** The To. */
	private List<To> to  = new ArrayList<>();
	
	/** The conversation category. */
	private String conversationCategory;
	
	/** The subject. */
	private String subject;
	
	/** The trailing message ID. */
	private String trailMessageId;
	
	/** The message body. */
	private String messageBody;
	
	/** The attachment. */
	private Attachment attachment;
	
	/** The created date. */
	private Date createdDate;

	/** The modified date. */
	private Date modifiedDate;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the tenantId
	 */
	public String getTenantId() {
		return tenantId;
	}

	/**
	 * @param tenantId the tenantId to set
	 */
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	/**
	 * @return the messageId
	 */
	public String getMessageId() {
		return messageId;
	}

	/**
	 * @param messageId the messageId to set
	 */
	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	/**
	 * @return the from
	 */
	public From getFrom() {
		return from;
	}

	/**
	 * @param from the from to set
	 */
	public void setFrom(From from) {
		this.from = from;
	}

	/**
	 * @return the to
	 */
	public List<To> getTo() {
		return to;
	}

	/**
	 * @param to the to to set
	 */
	public void setTo(List<To> to) {
		this.to = to;
	}

	/**
	 * @return the conversationCategory
	 */
	public String getConversationCategory() {
		return conversationCategory;
	}

	/**
	 * @param conversationCategory the conversationCategory to set
	 */
	public void setConversationCategory(String conversationCategory) {
		this.conversationCategory = conversationCategory;
	}

	/**
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}

	/**
	 * @param subject the subject to set
	 */
	public void setSubject(String subject) {
		this.subject = subject;
	}

	/**
	 * @return the trailMessageId
	 */
	public String getTrailMessageId() {
		return trailMessageId;
	}

	/**
	 * @param trailMessageId the trailMessageId to set
	 */
	public void setTrailMessageId(String trailMessageId) {
		this.trailMessageId = trailMessageId;
	}

	/**
	 * @return the messageBody
	 */
	public String getMessageBody() {
		return messageBody;
	}

	/**
	 * @param messageBody the messageBody to set
	 */
	public void setMessageBody(String messageBody) {
		this.messageBody = messageBody;
	}

	/**
	 * @return the createdDate
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate the createdDate to set
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * @return the modifiedDate
	 */
	public Date getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * @param modifiedDate the modifiedDate to set
	 */
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	/**
	 * @return the attachment
	 */
	public Attachment getAttachment() {
		return attachment;
	}

	/**
	 * @param attachment the attachment to set
	 */
	public void setAttachment(Attachment attachment) {
		this.attachment = attachment;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "MessageMaster [id=" + id + ", tenantId=" + tenantId + ", messageId=" + messageId + ", from=" + from
				+ ", to=" + to + ", conversationCategory=" + conversationCategory + ", subject=" + subject
				+ ", trailMessageId=" + trailMessageId + ", messageBody=" + messageBody + ", attachment=" + attachment
				+ ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate + "]";
	}

	
	
}
