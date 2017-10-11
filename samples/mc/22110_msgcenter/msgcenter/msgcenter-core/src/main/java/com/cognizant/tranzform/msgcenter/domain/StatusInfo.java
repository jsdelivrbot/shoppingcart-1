package com.cognizant.tranzform.msgcenter.domain;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Class StatusInfo.
 */
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class StatusInfo {

	/** The http status. */
	private HttpStatus httpStatus;

	/** The message id. */
	private String messageId;

	/** The message. */
	private String message;

	/**
	 * Instantiates a new status info.
	 * 
	 * @param httpStatus
	 *            the http status
	 * @param message
	 *            the message
	 */
	public StatusInfo(final HttpStatus httpStatus, final String message) {

		this.httpStatus = httpStatus;
		this.message = message;
	}
	
	/**
	 * Instantiates a new status info.
	 */
	public StatusInfo(){
		this.httpStatus = null;
		this.message = null;
		this.messageId = null;
		
	}

	/**
	 * Gets the http status.
	 * 
	 * @return the http status
	 */
	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	/**
	 * Sets the http status.
	 * 
	 * @param httpStatus
	 *            the new http status
	 */
	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	/**
	 * Gets the message id.
	 * 
	 * @return the message id
	 */
	public String getMessageId() {
		return messageId;
	}

	/**
	 * Sets the message id.
	 * 
	 * @param messageId
	 *            the new message id
	 */
	public void setMessageId(String messageId) {
		this.messageId = messageId;
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

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "StatusInfo [httpStatus=" + httpStatus + ", messageId="
				+ messageId + ", message=" + message + "]";
	}

}
