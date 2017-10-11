package com.cognizant.tranzform.msgcenter.v2.vo;

import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


/**
 * The Class Message.
 */
@JsonInclude(Include.NON_NULL)
public class MessageVo {

	

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
	private String createdDate;
	
	/** The created By. */
	private String createdBy;

	/** The modified date. */
	private String modifiedDate;
	
	private boolean readIndicator;
	
	private boolean isFwd;
		
	/** The Recipient list. */
	private SenderVO senders;


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
	public String getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate the createdDate to set
	 */
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * @return the modifiedDate
	 */
	public String getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * @param modifiedDate the modifiedDate to set
	 */
	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	/**
	 * @return the readIndicator
	 */
	public boolean isReadIndicator() {
		return readIndicator;
	}

	/**
	 * @param readIndicator the readIndicator to set
	 */
	public void setReadIndicator(boolean readIndicator) {
		this.readIndicator = readIndicator;
	}
	
	/**
	 * @return the createdBy
	 */
	public String getCreatedBy() {
		return createdBy;
	}

	/**
	 * @param createdBy the createdBy to set
	 */
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	
	/**
	 * @return the senders
	 */
	public SenderVO getSenders() {
		return senders;
	}

	/**
	 * @param senders the senders to set
	 */
	public void setSenders(SenderVO senders) {
		this.senders = senders;
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

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "MessageVo [conversationCategory=" + conversationCategory + ", subject=" + subject + ", messageId="
				+ messageId + ", messageBody=" + messageBody + ", messageStatus=" + messageStatus + ", createdDate="
				+ createdDate + ", createdBy=" + createdBy + ", modifiedDate=" + modifiedDate + ", readIndicator="
				+ readIndicator + ", isFwd=" + isFwd + ", senders=" + senders + "]";
	}

	

	
}
