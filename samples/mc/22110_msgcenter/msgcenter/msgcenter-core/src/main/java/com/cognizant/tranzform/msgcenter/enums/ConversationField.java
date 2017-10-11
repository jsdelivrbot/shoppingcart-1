package com.cognizant.tranzform.msgcenter.enums;

/**
 * The Enum ConversationFields.
 */
public enum ConversationField {

	CREATED_DATE("createdDate"),
	
	MODIFIED_DATE("modifiedDate"),
	
	CONVERSATION_CATEGORY("conversationCategory"),
	
	CONVERSATION_SUBJECT("subject");

	/** The value. */
	private String value;

	/**
	 * Instantiates a new Conversation Fields .
	 * 
	 * @param value
	 *            the value
	 */
	private ConversationField(String value) {
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
	public static ConversationField fromString(String value) {
		for (ConversationField conversationField : values()) {
			if (conversationField.getValue().equalsIgnoreCase(value)) {
				return conversationField;
			}
		}
		throw new IllegalArgumentException(value
				+ " is not a valid conversation field.");
	}

}
