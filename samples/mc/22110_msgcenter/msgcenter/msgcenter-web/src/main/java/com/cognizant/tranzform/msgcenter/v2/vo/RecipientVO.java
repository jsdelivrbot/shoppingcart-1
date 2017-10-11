package com.cognizant.tranzform.msgcenter.v2.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class RecipientVO {

	/** The Recipient ID. */
	private String recipientId;
	
	/** The Recipient Name. */
	private String recipientName;
	
	/** The Recipient User Type. */
	private String recipientUserType;
	
	@JsonIgnore
	private boolean readIndicator;

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
	 * @return the recipientId
	 */
	public String getRecipientId() {
		return recipientId;
	}

	/**
	 * @param recipientId the recipientId to set
	 */
	public void setRecipientId(String recipientId) {
		this.recipientId = recipientId;
	}

	/**
	 * @return the recipientName
	 */
	public String getRecipientName() {
		return recipientName;
	}

	/**
	 * @param recipientName the recipientName to set
	 */
	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}

	/**
	 * @return the recipientUserType
	 */
	public String getRecipientUserType() {
		return recipientUserType;
	}

	/**
	 * @param recipientUserType the recipientUserType to set
	 */
	public void setRecipientUserType(String recipientUserType) {
		this.recipientUserType = recipientUserType;
	}
	
	
}
