package com.cognizant.tranzform.msgcenter.v2.repository;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.ConversationStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.ReadType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageV2;
import com.cognizant.tranzform.msgcenter.v2.domain.To;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/test-msgcenterInfraContext.xml" })
public class ConversationRepoV2ImplTest {/*

	@Inject
	@Qualifier("conversationRepoV2Local")
	public IConversationRepoV2 conversationRepo;
	
	private final static String TENANT_ID = "HZ0001";

	private final static String TENANT_ENROLLMENT_ID = "M1001";

	private ConversationV2 conversation;

	@Before
	public void setUp() {
		conversation = new ConversationV2();
		conversation.setTenantId(TENANT_ID);
		//conversation.setTenantEnrollmentId(TENANT_ENROLLMENT_ID);
		conversation.setConversationStatus(ConversationStatus.ACTIVE);
		//conversation.setConversationCategory("Billing");
		//conversation.setSubject("Where do i see my bills?");
		conversation.setCreatedDate(new Date());
		conversation.setModifiedDate(new Date());


		// Setting message details.
		MessageV2 message = new MessageV2();
		List<MessageStatus> messageStatus = new ArrayList<>();
		messageStatus.add(MessageStatus.ACTIVE);
		//message.setMessageStatus(messageStatus);
		message.setMessageCategory(MessageCategory.OUTBOUND);
		message.setMessageBody("can you provide the URL.");
		message.setCreatedDate(new Date());

		List<MessageV2> messages = new ArrayList<MessageV2>();
		messages.add(message);

		conversation.setMessages(messages);

	}
	
	*//**
	 * Method to set the teardown values
	 * 
	 *//*
	@After
	public void tearDown() {

	}
	
	@Test
	public void testGetConversationMessageListDesc() throws BusinessException {

		List<ConversationDetailsV2> inboxMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.INBOX, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null, null);

		List<ConversationDetailsV2> sentItemsMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.SENT, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null, null);

		List<ConversationDetailsV2> draftMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.DRAFT, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null, null);

		List<ConversationDetailsV2> trashMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.TRASH, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null, null);

	}

	@Test
	public void testGetConversationMessageListAsc() throws BusinessException {

		List<ConversationDetailsV2> inboxMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.INBOX, ConversationField.MODIFIED_DATE, SortByDirection.ASCENDING, null, null, null);

		List<ConversationDetailsV2> sentItemsMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.SENT, ConversationField.MODIFIED_DATE, SortByDirection.ASCENDING, null, null, null);

		List<ConversationDetailsV2> draftMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.DRAFT, ConversationField.MODIFIED_DATE, SortByDirection.ASCENDING, null, null, null);

		List<ConversationDetailsV2> trashMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.TRASH, ConversationField.MODIFIED_DATE, SortByDirection.ASCENDING, null, null, null);
	}

	@Test
	public void testGetConversationMessageNotFound() throws BusinessException {

		String TENANT_ENROLLMENT_ID = "M009";

		List<ConversationDetailsV2> inboxMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.INBOX, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID);
		assertTrue(inboxMsgList == null || inboxMsgList.isEmpty());

		List<ConversationDetailsV2> sentItemsMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.SENT, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID);
		assertTrue(sentItemsMsgList == null || sentItemsMsgList.isEmpty());

		List<ConversationDetailsV2> draftMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.DRAFT, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID);
		assertTrue(draftMsgList == null || draftMsgList.isEmpty());

		List<ConversationDetailsV2> trashMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.TRASH, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID);
		assertTrue(trashMsgList == null || trashMsgList.isEmpty());

	}

	@Test
	public void testchangeReadIndicator() throws BusinessException {
		ConversationV2 conversation = new ConversationV2();
		conversation.setConversationId("CONV176");
		conversation.setConversationStatus(ConversationStatus.ACTIVE);
		//conversation.setTenantEnrollmentId(TENANT_ENROLLMENT_ID);
		conversation.setTenantId(TENANT_ID);
		To to = new To();
		to.setRead(false);
		to.setId("PR002");
		List<To> toList =  new ArrayList<To>();
		toList.add(to);
		MessageV2 message=new MessageV2();
		message.setMessageId("MSG423");
		message.setTo(toList);
		boolean readIndicator=false;
		ConversationV2 dbConversation = conversationRepo.changeReadIndicator(message,"PR002",ReadType.READ);
		List<MessageV2> messages=dbConversation.getMessages();
		for (MessageV2 messageObj : messages) {
			if(messageObj.getMessageId().equals("MSG423"))
			{	
				readIndicator=messageObj.getTo().get(0).isRead();
			}
		}
		assertTrue(readIndicator);

	}

	@Test
	public void testSaveConversation() throws RestException {
		ConversationV2 savedConversation = conversationRepo.saveConversation(conversation);
		assertNotNull(savedConversation.getId());
	}
	
	@Test
	public void testsaveExistingMessage()throws RestException {
		ConversationV2 conversation = new ConversationV2();
		conversation.setConversationId("CONV176");
		conversation.setConversationStatus(ConversationStatus.ACTIVE);
		//conversation.setTenantEnrollmentId(TENANT_ENROLLMENT_ID);
		conversation.setTenantId(TENANT_ID);
		
		MessageV2 message=new MessageV2();
		message.setMessageId("MSG423");
		List<MessageV2> messages = new ArrayList<>();
		messages.add(message);
		conversation.setMessages(messages);
		ConversationV2 savedConversation = conversationRepo.saveExistingMessage(conversation);
		assertNotNull(savedConversation.getId());
	}

	@Test
	public void testSaveMessage() throws RestException {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		ConversationV2 savedConversation = conversationRepo.saveNewMessage(conversation);

		assertNotNull(savedConversation);
	}

	@Test
	public void testsendDraftMessage_active() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG423");
		ConversationV2 draftedConversation = conversationRepo.saveNewMessage(conversation);
		assertNotNull(draftedConversation);
	}
	
	@Test
	public void testsendDraftMessage_draft() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG419");
		ConversationV2 draftedConversation = conversationRepo.saveNewMessage(conversation);
		assertNotNull(draftedConversation);
	}
	
	@Test
	public void testDraftSendMessage() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG419");
		ConversationV2 draftedConversation = conversationRepo.draftSendMessage(conversation);
		assertNotNull(draftedConversation);
	}
	
	@Test
	public void testDeleteMessage() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG423");
		conversationRepo.deleteMessage("MSG423", conversation, MessageType.INBOX, null);
	}
	
	@Test
	public void testDeleteMessage_MessagetypeSENT() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG423");
		conversationRepo.deleteMessage("MSG423", conversation, MessageType.SENT, null);;
	}
	
	@Test
	public void testGetConversation() {
		ConversationV2 conversation = conversationRepo.getConversation("MSG419","CONV176","HZ0001");
		assertNotNull(conversation);
	}
	
	@Test
	public void testTrailMessages() {
		ConversationV2 conversation = conversationRepo.getTrailMessages("MSG423", "HZ0001", "M1001");
		assertNotNull(conversation);
	}
*/}
