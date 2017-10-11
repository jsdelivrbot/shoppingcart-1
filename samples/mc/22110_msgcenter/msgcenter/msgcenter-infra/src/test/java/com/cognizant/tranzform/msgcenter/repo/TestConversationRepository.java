package com.cognizant.tranzform.msgcenter.repo;

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
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.msgcenter.domain.Conversation;
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.ConversationStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.repository.IConversationRepo;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/test-msgcenterInfraContext.xml" })
public class TestConversationRepository {

	@Inject
	public IConversationRepo conversationRepo;
	
	private final static String TENANT_ID = "HZ0001";

	private final static String TENANT_ENROLLMENT_ID = "M1001";

	private Conversation conversation;

	@Before
	public void setUp() {
		conversation = new Conversation();
		conversation.setTenantId(TENANT_ID);
		conversation.setTenantEnrollmentId(TENANT_ENROLLMENT_ID);
		conversation.setConversationStatus(ConversationStatus.ACTIVE);
		conversation.setConversationCategory("Billing");
		conversation.setSubject("Where do i see my bills?");
		conversation.setCreatedDate(new Date());
		conversation.setModifiedDate(new Date());

		// Setting message details.
		Message message = new Message();
		List<MessageStatus> messageStatus = new ArrayList<>();
		messageStatus.add(MessageStatus.ACTIVE);
		message.setMessageStatus(messageStatus);
		message.setMessageCategory(MessageCategory.OUTBOUND);
		message.setMessageBody("can you provide the URL.");
		message.setCreatedDate(new Date());

		List<Message> messages = new ArrayList<>();
		messages.add(message);

		conversation.setMessages(messages);

	}
	
	/**
	 * Method to set the teardown values
	 * 
	 */
	@After
	public void tearDown() {

	}

	@Test
	public void testGetConversationMessageListDesc() throws BusinessException {

		List<ConversationDetails> inboxMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.INBOX, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null);

		List<ConversationDetails> sentItemsMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.SENT, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null);

		List<ConversationDetails> draftMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.DRAFT, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null);

		List<ConversationDetails> trashMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.TRASH, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null);

	}

	@Test
	public void testGetConversationMessageListAsc() throws BusinessException {

		List<ConversationDetails> inboxMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.INBOX, ConversationField.MODIFIED_DATE, SortByDirection.ASCENDING, null, null);

		List<ConversationDetails> sentItemsMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.SENT, ConversationField.MODIFIED_DATE, SortByDirection.ASCENDING, null, null);

		List<ConversationDetails> draftMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.DRAFT, ConversationField.MODIFIED_DATE, SortByDirection.ASCENDING, null, null);

		List<ConversationDetails> trashMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.TRASH, ConversationField.MODIFIED_DATE, SortByDirection.ASCENDING, null, null);
	}

	@Test
	public void testGetConversationMessageNotFound() throws BusinessException {

		String TENANT_ENROLLMENT_ID = "M009";

		List<ConversationDetails> inboxMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.INBOX, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID);
		assertTrue(inboxMsgList == null || inboxMsgList.isEmpty());

		List<ConversationDetails> sentItemsMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.SENT, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID);
		assertTrue(sentItemsMsgList == null || sentItemsMsgList.isEmpty());

		List<ConversationDetails> draftMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.DRAFT, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID);
		assertTrue(draftMsgList == null || draftMsgList.isEmpty());

		List<ConversationDetails> trashMsgList = conversationRepo.getConversationMessages(TENANT_ID, TENANT_ENROLLMENT_ID,
				MessageType.TRASH, ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, TENANT_ENROLLMENT_ID, TENANT_ENROLLMENT_ID);
		assertTrue(trashMsgList == null || trashMsgList.isEmpty());

	}

	@Test
	public void testchangeReadIndicator() throws BusinessException {
		Conversation conversation = new Conversation();
		conversation.setConversationId("CONV176");
		conversation.setConversationStatus(ConversationStatus.ACTIVE);
		conversation.setTenantEnrollmentId(TENANT_ENROLLMENT_ID);
		conversation.setTenantId(TENANT_ID);
		
		Message message=new Message();
		message.setMessageId("MSG423");
		message.setRead(false);
		boolean readIndicator=false;
		Conversation dbConversation = conversationRepo.changeReadIndicator(message);
		List<Message> messages=dbConversation.getMessages();
		for (Message messageObj : messages) {
			if(messageObj.getMessageId().equals("MSG423"))
			{
				readIndicator=messageObj.isRead();
			}
		}
		assertTrue(readIndicator);

	}

	@Test
	public void testSaveConversation() throws RestException {
		Conversation savedConversation = conversationRepo.saveConversation(conversation);
		assertNotNull(savedConversation.getId());
	}
	
	@Test
	public void testsaveExistingMessage()throws RestException {
		Conversation conversation = new Conversation();
		conversation.setConversationId("CONV176");
		conversation.setConversationStatus(ConversationStatus.ACTIVE);
		conversation.setTenantEnrollmentId(TENANT_ENROLLMENT_ID);
		conversation.setTenantId(TENANT_ID);
		
		Message message=new Message();
		message.setMessageId("MSG423");
		List<Message> messages = new ArrayList<>();
		messages.add(message);
		conversation.setMessages(messages);
		Conversation savedConversation = conversationRepo.saveExistingMessage(conversation);
		assertNotNull(savedConversation.getId());
	}

	@Test
	public void testSaveMessage() throws RestException {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		Conversation savedConversation = conversationRepo.saveNewMessage(conversation);

		assertNotNull(savedConversation);
	}

	@Test
	public void testsendDraftMessage_active() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG423");
		Conversation draftedConversation = conversationRepo.saveNewMessage(conversation);
		assertNotNull(draftedConversation);
	}
	
	@Test
	public void testsendDraftMessage_draft() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG419");
		Conversation draftedConversation = conversationRepo.saveNewMessage(conversation);
		assertNotNull(draftedConversation);
	}
	
	@Test
	public void testDraftSendMessage() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG419");
		Conversation draftedConversation = conversationRepo.draftSendMessage(conversation);
		assertNotNull(draftedConversation);
	}
	
	@Test
	public void testDeleteMessage() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG423");
		conversationRepo.deleteMessage("MSG423", conversation, MessageType.INBOX);;
	}
	
	@Test
	public void testDeleteMessage_MessagetypeSENT() {
		conversation.setConversationId("CONV176");
		conversation.setId("HZ0001/CONV176/M1001");
		
		conversation.getMessages().get(0).setMessageId("MSG423");
		conversationRepo.deleteMessage("MSG423", conversation, MessageType.SENT);;
	}
	
	@Test
	public void testGetConversation() {
		Conversation conversation = conversationRepo.getConversation("MSG419","CONV176","HZ0001","M1001");
		assertNotNull(conversation);
	}
	
	@Test
	public void testTrailMessages() {
		Conversation conversation = conversationRepo.getTrailMessages("MSG423", "HZ0001", "M1001");
		assertNotNull(conversation);
	}

}
