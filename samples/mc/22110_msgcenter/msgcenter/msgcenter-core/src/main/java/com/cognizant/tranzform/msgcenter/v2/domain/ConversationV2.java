package com.cognizant.tranzform.msgcenter.v2.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * The Class Conversation.
 */

public class ConversationV2{

	
	private MessageMaster messageMaster;
	
	private List<MessageDetail> messageDetail = new ArrayList<>();
	

	/**
	 * @return the messageMaster
	 */
	public MessageMaster getMessageMaster() {
		return messageMaster;
	}

	/**
	 * @param messageMaster the messageMaster to set
	 */
	public void setMessageMaster(MessageMaster messageMaster) {
		this.messageMaster = messageMaster;
	}

	/**
	 * @return the messageDetail
	 */
	public List<MessageDetail> getMessageDetail() {
		return messageDetail;
	}

	/**
	 * @param messageDetail the messageDetail to set
	 */
	public void setMessageDetail(List<MessageDetail> messageDetail) {
		this.messageDetail = messageDetail;
	}

	
	
}
