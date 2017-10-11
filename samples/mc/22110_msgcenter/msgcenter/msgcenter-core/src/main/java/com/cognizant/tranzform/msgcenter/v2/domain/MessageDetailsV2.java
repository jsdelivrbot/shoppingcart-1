package com.cognizant.tranzform.msgcenter.v2.domain;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Field;

import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class MessageDetailsV2.
 */
@JsonIgnoreProperties(ignoreUnknown=true)
public class MessageDetailsV2 {

	
	/**
	 * The From.
	 */
	private From from;
	
	/** The To. */
	private To to ;
	
	/** The conversation category. */
	private String conversationCategory;
	
	/** The subject. */
	private String subject;

	/** The message id. */
	private String messageId;

	/** The message body. */
	private String messageBody;

	/** The message status. */
	private MessageStatus messageStatus;

	/** The created date. */
	private Date createdDate;

	/** The modified date. */
	private Date modifiedDate;
	
	/** The attachment. */
	private Attachment attachment;
	
	private String trailMessageId;
	
	private boolean isFwd;
	
	@Field(value="readIndicator")
	private boolean isRead;
	

	/**
	 * @return From
	 */
	public From getFrom() {
		return from;
	}

	/**
	 * @param from
	 */
	public void setFrom(From from) {
		this.from = from;
	}

	/**
	 * @return To
	 */
	public To getTo() {
		return to;
	}

	/**
	 * @param to
	 */
	public void setTo(To to) {
		this.to = to;
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

	/**
	 * Gets the message status.
	 *
	 * @return the message status
	 */
	public MessageStatus getMessageStatus() {
		return messageStatus;
	}

	/**
	 * Sets the message status.
	 *
	 * @param messageStatus
	 *            the new message status
	 */
	public void setMessageStatus(MessageStatus messageStatus) {
		this.messageStatus = messageStatus;
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

	public String getTrailMessageId() {
		return trailMessageId;
	}

	public void setTrailMessageId(String trailMessageId) {
		this.trailMessageId = trailMessageId;
	}
	
	
	/**
	 * @return String
	 */
	public String getConversationCategory() {
		return conversationCategory;
	}

	/**
	 * @param conversationCategory
	 */
	public void setConversationCategory(String conversationCategory) {
		this.conversationCategory = conversationCategory;
	}

	/**
	 * @return
	 */
	public String getSubject() {
		return subject;
	}

	/**
	 * @param subject
	 */
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	public boolean getIsFwd() {
		return isFwd;
	}

	public void setIsFwd(boolean isFwd) {
		this.isFwd = isFwd;
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
		return "MessageDetailsV2 [from=" + from + ", to=" + to
				+ ", conversationCategory=" + conversationCategory + ", subject=" + subject + ", messageId=" + messageId
				+ ", messageBody=" + messageBody +  ", messageStatus="
				+ messageStatus + ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate
				+ ", trailMessageId=" + trailMessageId + ", isFwd=" + isFwd + ", isRead=" + isRead + "]";
	}

	



}
