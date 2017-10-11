package com.cognizant.tranzform.msgcenter.enums;

/**
 * The Enum MessageStatus.
 */
public enum MessageStatus {

	/** The active. */
	ACTIVE("Active"),
	/** The draft. */
	DRAFT("Draft"),
	/** The delete. */
	DELETE("Delete"),
	/** The delete draft. */
	DELETE_DRAFT("Delete Draft"),
	/** The delete inbox. */
	DELETE_INBOX("Delete Inbox"),
	/** The delete sentitems. */
	DELETE_SENTITEMS("Delete SentItems");

	/** The value. */
	private String value;

	/**
	 * Instantiates a new message status.
	 * 
	 * @param value
	 *            the value
	 */
	private MessageStatus(String value) {
		this.value = value;
	}

	/**
	 * Gets the value.
	 * 
	 * @return the value
	 */
	public String getValue() {
		return this.value;
	}

	/**
	 * Gets the name.
	 * 
	 * @return the name
	 */
	public String getName() {
		return this.name();
	}

	/**
	 * From string.
	 * 
	 * @param value
	 *            the value
	 * @return the message status
	 */
	public static MessageStatus fromString(String value) {
		for (MessageStatus status : values()) {
			if (status.getValue().equalsIgnoreCase(value)) {
				return status;
			}
		}
		throw new IllegalArgumentException(value + " is not a valid message Status.");
	}

}
