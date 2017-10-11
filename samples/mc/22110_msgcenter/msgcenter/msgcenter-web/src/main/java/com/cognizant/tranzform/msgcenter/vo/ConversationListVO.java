package com.cognizant.tranzform.msgcenter.vo;

import java.util.List;
import java.util.Map;

import com.cognizant.tranzform.msgcenter.domain.StatusInfo;

public class ConversationListVO {

	private Map<String,String> metaInfo;
	

	private List<ConversationDetailVO> messages; 
	
	private StatusInfo statusInfo; 
	
	/**
	 * @return the metaInfo
	 */
	public Map<String, String> getMetaInfo() {
		return metaInfo;
	}

	/**
	 * @param metaInfo the metaInfo to set
	 */
	public void setMetaInfo(Map<String, String> metaInfo) {
		this.metaInfo = metaInfo;
	}

	public List<ConversationDetailVO> getMessages() {
		return messages;
	}

	public void setMessages(List<ConversationDetailVO> messages) {
		this.messages = messages;
	}

	public StatusInfo getStatusInfo() {
		return statusInfo;
	}

	public void setStatusInfo(StatusInfo statusInfo) {
		this.statusInfo = statusInfo;
	}

	

}
