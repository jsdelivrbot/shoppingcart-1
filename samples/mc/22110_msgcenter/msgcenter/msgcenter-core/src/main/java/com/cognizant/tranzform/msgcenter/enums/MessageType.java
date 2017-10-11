package com.cognizant.tranzform.msgcenter.enums;

/**
 * The Enum ConversationFields.
 */
public enum MessageType {

	INBOX("inbox"),
	
	SENT("sent"),
	
	DRAFT("draft"),
	
	TRASH("trash");

	/** The value. */
	private String value;

	/**
	 * Instantiates a new Conversation Fields .
	 * 
	 * @param value
	 *            the value
	 */
	private MessageType(String value) {
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
	 * @return the conversation fields
	 */
	public static MessageType fromString(String value) {
		for (MessageType messageType : values()) {
			if (messageType.getValue().equalsIgnoreCase(value)) {
				return messageType;
			}
		}
		throw new IllegalArgumentException(value
				+ " is not a valid message type.");
	}

}
