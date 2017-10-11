package com.cognizant.tranzform.msgcenter.domain;

import java.util.Date;
import java.util.List;

import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;

/**
 * The Class Message.
 */
public class Message {

	/** The message id. */
	private String messageId;

	/** The message body. */
	private String messageBody;

	/** The message category. */
	private MessageCategory messageCategory;

	/** The message status. */
	private List<MessageStatus> messageStatus;

	/** The created date. */
	private Date createdDate;

	/** The modified date. */
	private Date modifiedDate;
	
	/** The is read. */
	private boolean isRead;
	
	private String trailMessageId;
	
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
	 * Gets the message category.
	 * 
	 * @return the message category
	 */
	public MessageCategory getMessageCategory() {
		return messageCategory;
	}

	/**
	 * Sets the message category.
	 * 
	 * @param messageCategory
	 *            the new message category
	 */
	public void setMessageCategory(MessageCategory messageCategory) {
		this.messageCategory = messageCategory;
	}

	/**
	 * Gets the message status.
	 *
	 * @return the message status
	 */
	public List<MessageStatus> getMessageStatus() {
		return messageStatus;
	}

	/**
	 * Sets the message status.
	 *
	 * @param messageStatus
	 *            the new message status
	 */
	public void setMessageStatus(List<MessageStatus> messageStatus) {
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

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Message [messageId=" + messageId + ", messageBody=" + messageBody + ", messageCategory="
				+ messageCategory + ", messageStatus=" + messageStatus + ", createdDate=" + createdDate
				+ ", modifiedDate=" + modifiedDate + ", isRead=" + isRead + ", trailMessageId=" + trailMessageId + "]";
	}

}
