package com.cognizant.tranzform.msgcenter.v2.vo;

import java.util.ArrayList;
import java.util.List;

public class AttachmentInfoVO {

	private PatientInfoVO patientInfo;
	private List<ClaimInfoVO> claimInfo;
	/**
	 * @return the patientInfo
	 */
	public PatientInfoVO getPatientInfo() {
		return patientInfo;
	}
	/**
	 * @param patientInfo the patientInfo to set
	 */
	public void setPatientInfo(PatientInfoVO patientInfo) {
		this.patientInfo = patientInfo;
	}
	/**
	 * @return the claimInfo
	 */
	public List<ClaimInfoVO> getClaimInfo() {
		if(claimInfo == null){
			claimInfo = new ArrayList<>();
		}
		return claimInfo;
	}
	/**
	 * @param claimInfo the claimInfo to set
	 */
	public void setClaimInfo(List<ClaimInfoVO> claimInfo) {
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
