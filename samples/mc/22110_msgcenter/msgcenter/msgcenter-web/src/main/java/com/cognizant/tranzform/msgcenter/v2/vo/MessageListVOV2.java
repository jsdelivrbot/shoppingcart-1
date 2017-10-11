package com.cognizant.tranzform.msgcenter.v2.vo;

import java.util.List;
import java.util.Map;

import com.cognizant.tranzform.msgcenter.domain.StatusInfo;		

public class MessageListVOV2 {

	private Map<String,String> metaInfo;
	

	private List<MessageVo> messages; 
	
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

	

	/**
	 * @return the messages
	 */
	public List<MessageVo> getMessages() {
		return messages;
	}

	/**
	 * @param messages the messages to set
	 */
	public void setMessages(List<MessageVo> messages) {
		this.messages = messages;
	}

	public StatusInfo getStatusInfo() {
		return statusInfo;
	}

	public void setStatusInfo(StatusInfo statusInfo) {
		this.statusInfo = statusInfo;
	}

	

}
