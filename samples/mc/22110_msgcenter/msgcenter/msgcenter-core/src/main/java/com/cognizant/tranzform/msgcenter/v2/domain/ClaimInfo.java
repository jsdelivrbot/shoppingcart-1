package com.cognizant.tranzform.msgcenter.v2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ClaimInfo {

	private String  claimId;
	private String  claimType;
	private String  memberName;
	private String  uri;
	/**
	 * @return the claimId
	 */
	public String getClaimId() {
		return claimId;
	}
	/**
	 * @param claimId the claimId to set
	 */
	public void setClaimId(String claimId) {
		this.claimId = claimId;
	}
	/**
	 * @return the claimType
	 */
	public String getClaimType() {
		return claimType;
	}
	/**
	 * @param claimType the claimType to set
	 */
	public void setClaimType(String claimType) {
		this.claimType = claimType;
	}
	/**
	 * @return the memberName
	 */
	public String getMemberName() {
		return memberName;
	}
	/**
	 * @param memberName the memberName to set
	 */
	public void setMemberName(String memberName) {
		this.memberName = memberName;
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
		return "ClaimInfo [claimId=" + claimId + ", claimType=" + claimType + 
				", memberName=" + memberName + ", uri="
				+ uri + "]";
	}
	
	
}
