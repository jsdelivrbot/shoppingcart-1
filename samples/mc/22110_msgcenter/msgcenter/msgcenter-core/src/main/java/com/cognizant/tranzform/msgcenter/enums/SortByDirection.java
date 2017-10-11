package com.cognizant.tranzform.msgcenter.enums;

/**
 * The Enum ConversationFields.
 */
public enum SortByDirection {

	ASCENDING("asc"),
	
	DESCENDING("desc");
	
	
	/** The value. */
	private String value;

	/**
	 * Instantiates a new Conversation Fields .
	 * 
	 * @param value
	 *            the value
	 */
	private SortByDirection(String value) {
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
	public static SortByDirection fromString(String value) {
		for (SortByDirection sortbyDirection : values()) {
			if (sortbyDirection.getValue().equalsIgnoreCase(value)) {
				return sortbyDirection;
			}
		}
		throw new IllegalArgumentException(value
				+ " is not a valid sort by direction field.");
	}

}
