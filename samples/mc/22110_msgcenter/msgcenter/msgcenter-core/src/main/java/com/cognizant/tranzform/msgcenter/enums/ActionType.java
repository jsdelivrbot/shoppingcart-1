package com.cognizant.tranzform.msgcenter.enums;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Enum ActionType.
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreType(value=true)
public enum ActionType {

	SEND("send"),
	SAVE("draft");

	/** The value. */
	@JsonIgnore
	private String value;

	/**
	 * Instantiates a new message status.
	 * 
	 * @param value
	 *            the value
	 */
	private ActionType(String value) {
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
	public static ActionType fromString(String value) {
		for (ActionType status : values()) {
			if (status.getValue().equalsIgnoreCase(value)) {
				return status;
			}
		}
		throw new IllegalArgumentException(value
				+ " is not a valid action type.");
	}

}
