package com.cognizant.tranzform.msgcenter.v2.vo;

import com.cognizant.tranzform.msgcenter.v2.domain.MessageDetailsV2;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(Include.NON_NULL)
public class ConversationDetailV2VO {

		/** The conversation id. */
		private String conversationId;

		/** The tenant enrollment id. */
		private String tenantEnrollmentId;

		/** The tenant id. */
		private String tenantId;

		/** The messages. */
		private MessageVo messages;

		
		/** The created date. */
		private String createDateTime;

		/** The modified date. */
		private String modifiedDate;

		/**
		 * @return the conversationId
		 */
		public String getConversationId() {
			return conversationId;
		}

		/**
		 * @param conversationId the conversationId to set
		 */
		public void setConversationId(String conversationId) {
			this.conversationId = conversationId;
		}

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
		 * @return the tenantId
		 */
		public String getTenantId() {
			return tenantId;
		}

		/**
		 * @param tenantId the tenantId to set
		 */
		public void setTenantId(String tenantId) {
			this.tenantId = tenantId;
		}

		/**
		 * @return the messages
		 */
		public MessageVo getMessages() {
			return messages;
		}

		/**
		 * @param messages the messages to set
		 */
		public void setMessages(MessageVo messages) {
			this.messages = messages;
		}

		/**
		 * @return the createDateTime
		 */
		public String getCreateDateTime() {
			return createDateTime;
		}

		/**
		 * @param createDateTime the createDateTime to set
		 */
		public void setCreateDateTime(String createDateTime) {
			this.createDateTime = createDateTime;
		}

		/**
		 * @return the modifiedDate
		 */
		public String getModifiedDate() {
			return modifiedDate;
		}

		/**
		 * @param modifiedDate the modifiedDate to set
		 */
		public void setModifiedDate(String modifiedDate) {
			this.modifiedDate = modifiedDate;
		}

		

	}



