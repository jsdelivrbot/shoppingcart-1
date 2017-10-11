package com.cognizant.tranzform.msgcenter.v2.vo;

import java.util.ArrayList;
import java.util.List;

public class AttachmentVO {
	
	private String attachmentType;
	private List<AttachmentInfoVO> attachmentInfo;
	/**
	 * @return the attachmentType
	 */
	public String getAttachmentType() {
		return attachmentType;
	}
	/**
	 * @param attachmentType the attachmentType to set
	 */
	public void setAttachmentType(String attachmentType) {
		this.attachmentType = attachmentType;
	}
	/**
	 * @return the attachmentInfo
	 */
	public List<AttachmentInfoVO> getAttachmentInfo() {
		if(attachmentInfo == null){
			attachmentInfo = new ArrayList<>();
		}
		return attachmentInfo;
	}
	/**
	 * @param attachmentInfo the attachmentInfo to set
	 */
	public void setAttachmentInfo(List<AttachmentInfoVO> attachmentInfo) {
		this.attachmentInfo = attachmentInfo;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Attachment [attachmentType=" + attachmentType + ", attachmentInfo=" + attachmentInfo + "]";
	}
	

}
