package com.cognizant.tranzform.msgcenter.enums;

/**
 * The Enum ConversationFields.
 */
public enum MessageTypeV2 {

	NEW("NEW"),
	
	FORWARD("FORWARD"),
	
	REPLY("REPLY");

	/** The value. */
	private String value;

	/**
	 * Instantiates a new Message Type Fields .
	 * 
	 * @param value
	 *            the value
	 */
	private MessageTypeV2(String value) {
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
	 * @return the message type fields
	 */
	public static MessageTypeV2 fromString(String value) {
		for (MessageTypeV2 messageType : values()) {
			if (messageType.getValue().equalsIgnoreCase(value)) {
				return messageType;
			}
		}
		throw new IllegalArgumentException(value
				+ " is not a valid message type v2.");
	}

}
