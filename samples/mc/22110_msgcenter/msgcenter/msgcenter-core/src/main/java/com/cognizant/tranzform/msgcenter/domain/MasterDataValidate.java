package com.cognizant.tranzform.msgcenter.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Class MasterDataValidateVO.
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(Include.NON_NULL)
public class MasterDataValidate {

	/** The category. */
	private String category;

	/** The language. */
	private String language;

	/** The code. */
	private String code;

	/** The value. */
	private String value;

	/** The is valid. */
	private boolean isValid;

	/** The message code. */
	private String messageCode;

	/** The message. */
	private String message;

	/**
	 * Gets the message code.
	 *
	 * @return the message code
	 */
	public String getMessageCode() {
		return messageCode;
	}

	/**
	 * Sets the message code.
	 *
	 * @param messageCode
	 *            the new message code
	 */
	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}

	/**
	 * Gets the message.
	 *
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * Sets the message.
	 *
	 * @param message
	 *            the new message
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * Gets the category.
	 *
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * Sets the category.
	 *
	 * @param category
	 *            the new category
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * Gets the language.
	 *
	 * @return the language
	 */
	public String getLanguage() {
		return language;
	}

	/**
	 * Sets the language.
	 *
	 * @param language
	 *            the new language
	 */
	public void setLanguage(String language) {
		this.language = language;
	}

	/**
	 * Gets the code.
	 *
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * Sets the code.
	 *
	 * @param code
	 *            the new code
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * Gets the value.
	 *
	 * @return the value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * Sets the value.
	 *
	 * @param value
	 *            the new value
	 */
	public void setValue(String value) {
		this.value = value;
	}

	/**
	 * Checks if is valid.
	 *
	 * @return true, if is valid
	 */
	public boolean isValid() {
		return isValid;
	}

	/**
	 * Sets the valid.
	 *
	 * @param isValid
	 *            the new valid
	 */
	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "MasterDataValidateVO [category=" + category + ", language=" + language + ", code=" + code + ", value="
				+ value + ", isValid=" + isValid + ", messageCode=" + messageCode + ", message=" + message + "]";
	}

}
