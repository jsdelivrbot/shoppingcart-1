package com.cognizant.tranzform.msgcenter.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(Include.NON_NULL)
public class ConversationDetailVO {

		/** The conversation id. */
		private String conversationId;

		/** The tenant enrollment id. */
		private String tenantEnrollmentId;

		/** The tenant id. */
		private String tenantId;

		/** The conversation category. */
		private String conversationCategory;

		/** The subject. */
		private String subject;

		
		/** The created date. */
		private String createdDate;

		/** The modified date. */
		private String modifiedDate;

		/**
		 * Gets the created date.
		 *
		 * @return the created date
		 */
		public String getCreatedDate() {
			return createdDate;
		}

		/**
		 * Sets the created date.
		 *
		 * @param createdDate
		 *            the new created date
		 */
		public void setCreatedDate(String createdDate) {
			this.createdDate = createdDate;
		}

		/**
		 * Gets the modified date.
		 *
		 * @return the modified date
		 */
		public String getModifiedDate() {
			return modifiedDate;
		}

		/**
		 * Sets the modified date.
		 *
		 * @param modifiedDate
		 *            the new modified date
		 */
		public void setModifiedDate(String modifiedDate) {
			this.modifiedDate = modifiedDate;
		}

		/** The messages. */
		private MessageVO messages;

		/**
		 * Gets the tenant id.
		 * 
		 * @return the tenant id
		 */
		public String getTenantId() {
			return tenantId;
		}

		/**
		 * Sets the tenant id.
		 * 
		 * @param tenantId
		 *            the new tenant id
		 */
		public void setTenantId(String tenantId) {
			this.tenantId = tenantId;
		}

		/**
		 * Gets the conversation id.
		 * 
		 * @return the conversation id
		 */
		public String getConversationId() {
			return conversationId;
		}

		/**
		 * Sets the conversation id.
		 * 
		 * @param conversationId
		 *            the new conversation id
		 */
		public void setConversationId(String conversationId) {
			this.conversationId = conversationId;
		}

		/**
		 * Gets the tenant enrollment id.
		 * 
		 * @return the tenant enrollment id
		 */
		public String getTenantEnrollmentId() {
			return tenantEnrollmentId;
		}

		/**
		 * Sets the tenant enrollment id.
		 * 
		 * @param tenantEnrollmentId
		 *            the new tenant enrollment id
		 */
		public void setTenantEnrollmentId(String tenantEnrollmentId) {
			this.tenantEnrollmentId = tenantEnrollmentId;
		}

		/**
		 * Gets the conversation category.
		 * 
		 * @return the conversation category
		 */
		public String getConversationCategory() {
			return conversationCategory;
		}

		/**
		 * Sets the conversation category.
		 * 
		 * @param conversationCategory
		 *            the new conversation category
		 */
		public void setConversationCategory(String conversationCategory) {
			this.conversationCategory = conversationCategory;
		}

		/**
		 * Gets the subject.
		 * 
		 * @return the subject
		 */
		public String getSubject() {
			return subject;
		}

		/**
		 * Sets the subject.
		 * 
		 * @param subject
		 *            the new subject
		 */
		public void setSubject(String subject) {
			this.subject = subject;
		}
		/**
		 * Gets the messages.
		 * 
		 * @return the messages
		 */
		public MessageVO getMessages() {
			return messages;
		}

		/**
		 * Sets the messages.
		 * 
		 * @param messages
		 *            the new messages
		 */
		public void setMessages(MessageVO messages) {
			this.messages = messages;
		}


	}



