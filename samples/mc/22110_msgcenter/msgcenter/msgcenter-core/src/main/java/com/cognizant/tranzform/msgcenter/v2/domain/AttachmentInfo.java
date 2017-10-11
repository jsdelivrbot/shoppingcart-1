package com.cognizant.tranzform.msgcenter.v2.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AttachmentInfo {

	private PatientInfo patientInfo;
	private List<ClaimInfo> claimInfo;
	/**
	 * @return the patientInfo
	 */
	public PatientInfo getPatientInfo() {
		return patientInfo;
	}
	/**
	 * @param patientInfo the patientInfo to set
	 */
	public void setPatientInfo(PatientInfo patientInfo) {
		this.patientInfo = patientInfo;
	}
	/**
	 * @return the claimInfo
	 */
	public List<ClaimInfo> getClaimInfo() {
		if(claimInfo == null){
			claimInfo = new ArrayList<>();
		}
		return claimInfo;
	}
	/**
	 * @param claimInfo the claimInfo to set
	 */
	public void setClaimInfo(List<ClaimInfo> claimInfo) {
		this.claimInfo = claimInfo;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "AttachmentInfo [patientInfo=" + patientInfo + ", claimInfo=" + claimInfo + "]";
	}
	
	
}
