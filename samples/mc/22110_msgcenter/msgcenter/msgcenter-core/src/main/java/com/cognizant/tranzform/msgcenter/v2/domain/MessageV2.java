package com.cognizant.tranzform.msgcenter.v2.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Class Message.
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(Include.NON_NULL)
public class MessageV2 {

	/**
	 * The From.
	 */
	private From from;
	
	/** The To. */
	private List<To> to;
	
	private String conversationId;


	/** The conversation category. */
	private String conversationCategory;
	
	/** The subject. */
	private String subject;

	/** The message id. */
	private String messageId;

	/** The message body. */
	private String messageBody;

	/** The message category. */
	private MessageCategory messageCategory;

	/** The message status. */
	private MessageStatus messageStatus;

	/** The created date. */
	private Date createdDate;

	/** The modified date. */
	private Date modifiedDate;
	
	private String trailMessageId;
	
	private boolean isFwd;
	

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
	public List<To> getTo() {
		if(to == null){
			to = new ArrayList<>();
		}
		return to;
	}

	/**
	 * @param to
	 */
	public void setTo(List<To> to) {
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
	 * @return the conversationId
	 */
	public String getConversationId() {
		return conversationId;
	}

	/**
	 * @param conversationId the conversationId to set
	 */
	public void setConversationId(String conversationId) {
		this.conversationId = conversationId;
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
				+ ", modifiedDate=" + modifiedDate + ", trailMessageId=" + trailMessageId + "]";
	}

}
