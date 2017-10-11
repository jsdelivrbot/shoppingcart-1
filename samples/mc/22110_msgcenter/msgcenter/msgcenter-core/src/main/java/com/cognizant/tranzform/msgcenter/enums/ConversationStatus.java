package com.cognizant.tranzform.msgcenter.enums;

/**
 * The Enum MessageStatus.
 */
public enum ConversationStatus {

	/** The active. */
	ACTIVE("Active"),  /** The delete. */
	DELETE("Delete");

	/** The value. */
	private String value;

	/**
	 * Instantiates a new message status.
	 * 
	 * @param value
	 *            the value
	 */
	private ConversationStatus(String value) {
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
	public static ConversationStatus fromString(String value) {
		for (ConversationStatus status : values()) {
			if (status.getValue().equalsIgnoreCase(value)) {
				return status;
			}
		}
		throw new IllegalArgumentException(value
				+ " is not a valid message Status.");
	}

}
