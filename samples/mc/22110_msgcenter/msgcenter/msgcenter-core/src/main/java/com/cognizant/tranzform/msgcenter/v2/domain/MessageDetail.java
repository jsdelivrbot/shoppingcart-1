package com.cognizant.tranzform.msgcenter.v2.domain;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The User specific copy of Message Details
 */
@Document(collection = "MessageDetail")
@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageDetail {

	/** The id. */
	@Id
	private String id;
	
	/** The message id. */
	private String messageId;
	
	/**
	 * The From.
	 */
	private From from;
	
	/** The To. */
	private To to;
	
	/** The conversation category. */
	private String conversationCategory;
	
	/** The subject. */
	private String subject;
	
	/** The is read. */
	private boolean isRead;
	
	/** The is forward */
	private boolean isFwd;
	
	/** The message status. */
	private MessageStatus messageStatus;
	
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
	public To getTo() {
		return to;
	}

	/**
	 * @param to the to to set
	 */
	public void setTo(To to) {
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
	 * @return the isRead
	 */
	public boolean getIsRead() {
		return isRead;
	}

	/**
	 * @param isRead the isRead to set
	 */
	public void setIsRead(boolean isRead) {
		this.isRead = isRead;
	}

	/**
	 * @return the isFwd
	 */
	public boolean getIsFwd() {
		return isFwd;
	}

	/**
	 * @param isFwd the isFwd to set
	 */
	public void setIsFwd(boolean isFwd) {
		this.isFwd = isFwd;
	}

	/**
	 * @return the messageStatus
	 */
	public MessageStatus getMessageStatus() {
		return messageStatus;
	}

	/**
	 * @param messageStatus the messageStatus to set
	 */
	public void setMessageStatus(MessageStatus messageStatus) {
		this.messageStatus = messageStatus;
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

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "MessageDetail [id=" + id + ", messageId=" + messageId + ", from=" + from + ", to=" + to
				+ ", conversationCategory=" + conversationCategory + ", subject=" + subject + ", isRead=" + isRead
				+ ", isFwd=" + isFwd + ", messageStatus=" + messageStatus + ", createdDate=" + createdDate
				+ ", modifiedDate=" + modifiedDate + "]";
	}
	
	

	
}
