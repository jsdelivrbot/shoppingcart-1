package com.cognizant.tranzform.msgcenter.v2.vo;

import java.util.ArrayList;
import java.util.List;

import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


/**
 * The Class Message.
 */
@JsonInclude(Include.NON_NULL)
public class TrailMessageV2VO {

	
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
	private String createdDate;

	/** The modified date. */
	private String modifiedDate;
	
	private boolean readIndicator;
	
	private boolean isFwd;
	
	/** The Recipient list. */
	private List<RecipientVO> recipients  = new ArrayList<>();
	
	private SenderVO sender;
	
	private AttachmentVO attachment;



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
	 * @return the messageCategory
	 */
	public MessageCategory getMessageCategory() {
		return messageCategory;
	}

	/**
	 * @param messageCategory the messageCategory to set
	 */
	public void setMessageCategory(MessageCategory messageCategory) {
		this.messageCategory = messageCategory;
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
	 * @return the recipients
	 */
	public List<RecipientVO> getRecipients() {
		return recipients;
	}

	/**
	 * @param recipients the recipients to set
	 */
	public void setRecipients(List<RecipientVO> recipients) {
		this.recipients = recipients;
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


	public boolean getIsFwd() {
		return isFwd;
	}

	public void setIsFwd(boolean isFwd) {
		this.isFwd = isFwd;
	}

	/**
	 * @return the sender
	 */
	public SenderVO getSender() {
		return sender;
	}

	/**
	 * @param sender the sender to set
	 */
	public void setSender(SenderVO sender) {
		this.sender = sender;
	}

	/**
	 * @return the attachment
	 */
	public AttachmentVO getAttachment() {
		return attachment;
	}

	/**
	 * @param attachment the attachment to set
	 */
	public void setAttachment(AttachmentVO attachment) {
		this.attachment = attachment;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "TrailMessageV2VO [conversationId=" + conversationId + ", conversationCategory=" + conversationCategory
				+ ", subject=" + subject + ", messageId=" + messageId + ", messageBody=" + messageBody
				+ ", messageCategory=" + messageCategory + ", messageStatus=" + messageStatus + ", createdDate="
				+ createdDate + ", modifiedDate=" + modifiedDate + ", readIndicator=" + readIndicator + ", isFwd="
				+ isFwd + ", recipients=" + recipients + ", sender=" + sender + "]";
	}
	
	
	
}


