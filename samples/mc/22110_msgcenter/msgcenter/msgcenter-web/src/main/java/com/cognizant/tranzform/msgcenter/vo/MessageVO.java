package com.cognizant.tranzform.msgcenter.vo;

import java.sql.Timestamp;
import java.util.List;

import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.v2.domain.From;
import com.cognizant.tranzform.msgcenter.v2.domain.To;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


/**
 * The Class Message.
 */
@JsonInclude(Include.NON_NULL)
public class MessageVO {

	/** The message id. */
	private String messageId;
	
	private From from;
	
	private List<To> to;

	/** The message body. */
	private String messageBody;

	/** The message category. */
	private MessageCategory messageCategory;

	/** The message status. */
	private List<MessageStatus> messageStatus;
	
	/** The conversation category. */
	private String conversationCategory;

	/** The subject. */
	private String subject;

	/** The created date. */
	private Timestamp createdDate;

	/** The modified date. */
	private Timestamp modifiedDate;
	
	private boolean isRead;
	
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
	 * Gets the created date.
	 *
	 * @return the created date
	 */
	public Timestamp getCreatedDate() {
		return createdDate;
	}

	/**
	 * Sets the created date.
	 *
	 * @param createdDate
	 *            the new created date
	 */
	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * Gets the modified date.
	 *
	 * @return the modified date
	 */
	public Timestamp getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * Sets the modified date.
	 *
	 * @param modifiedDate
	 *            the new modified date
	 */
	public void setModifiedDate(Timestamp modifiedDate) {
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
	public List<MessageStatus> getMessageStatus() {
		return messageStatus;
	}

	public void setMessageStatus(List<MessageStatus> messageStatus) {
		this.messageStatus = messageStatus;
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

	public From getFrom() {
		return from;
	}

	public void setFrom(From from) {
		this.from = from;
	}

	public List<To> getTo() {
		return to;
	}

	public void setTo(List<To> to) {
		this.to = to;
	}

	@Override
	public String toString() {
		return "MessageVO [messageId=" + messageId + ", messageBody=" + messageBody + ", messageCategory="
				+ messageCategory + ", messageStatus=" + messageStatus + ", createdDate=" + createdDate
				+ ", modifiedDate=" + modifiedDate + ", isRead=" + isRead + "]";
	}

	

	
}
