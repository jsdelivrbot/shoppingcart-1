package com.cognizant.tranzform.msgcenter.v2.domain;

import org.springframework.data.annotation.Id;


public class To {
	
	/** The id. */
	@Id
	private String id;
	
	/** The type. */
	private String type;
	
	/** The type. */
	private String userName;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "To [id=" + id + ", type=" + type + ", userName=" + userName + "]";
	}
	
	
	
}
