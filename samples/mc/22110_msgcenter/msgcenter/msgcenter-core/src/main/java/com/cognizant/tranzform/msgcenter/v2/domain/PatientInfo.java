package com.cognizant.tranzform.msgcenter.v2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PatientInfo {

	private String tenantEnrollmentId;
	private String subscriberId;
	private String firstName;
	private String lastName;
	private String dob;
	private String gender;
	private String uri;
	/**
	 * @return the tenantEnrollmentId
	 */
	public String getTenantEnrollmentId() {
		return tenantEnrollmentId;
	}
	/**
	 * @param tenantEnrollmentId the tenantEnrollmentId to set
	 */
	public void setTenantEnrollmentId(String tenantEnrollmentId) {
		this.tenantEnrollmentId = tenantEnrollmentId;
	}
	/**
	 * @return the subscriberId
	 */
	public String getSubscriberId() {
		return subscriberId;
	}
	/**
	 * @param subscriberId the subscriberId to set
	 */
	public void setSubscriberId(String subscriberId) {
		this.subscriberId = subscriberId;
	}
	/**
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}
	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}
	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	/**
	 * @return the dob
	 */
	public String getDob() {
		return dob;
	}
	/**
	 * @param dob the dob to set
	 */
	public void setDob(String dob) {
		this.dob = dob;
	}
	/**
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}
	/**
	 * @param gender the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}
	/**
	 * @return the uri
	 */
	public String getUri() {
		return uri;
	}
	/**
	 * @param uri the uri to set
	 */
	public void setUri(String uri) {
		this.uri = uri;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "PatientInfo [tenantEnrollmentId=" + tenantEnrollmentId + ", subscriberId=" + subscriberId
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", dob=" + dob + ", gender=" + gender
				+ ", uri=" + uri + "]";
	}
	
	
}
