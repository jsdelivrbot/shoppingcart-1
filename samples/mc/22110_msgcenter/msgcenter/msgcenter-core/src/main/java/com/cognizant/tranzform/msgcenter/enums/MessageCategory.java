package com.cognizant.tranzform.msgcenter.enums;

/**
 * The Enum MessageStatus.
 */
public enum MessageCategory {

	INBOUND("Inbound"),OUTBOUND("Outbound");

	/** The value. */
	private String value;

	/**
	 * Instantiates a new message status.
	 * 
	 * @param value
	 *            the value
	 */
	private MessageCategory(String value) {
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
	public static MessageCategory fromString(String value) {
		for (MessageCategory messageCategory : values()) {
			if (messageCategory.getValue().equalsIgnoreCase(value)) {
				return messageCategory;
			}
		}
		throw new IllegalArgumentException(value
				+ " is not a valid message Category.");
	}

}
