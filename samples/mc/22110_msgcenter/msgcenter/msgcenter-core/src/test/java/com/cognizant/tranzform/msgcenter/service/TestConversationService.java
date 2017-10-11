package com.cognizant.tranzform.msgcenter.service;

import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.context.MessageSource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.test.util.ReflectionTestUtils;

import com.cognizant.tranzform.config.ConfigProvider;
import com.cognizant.tranzform.config.IConfig;
import com.cognizant.tranzform.config.IConfigProvider;
import com.cognizant.tranzform.core.exception.BaseException;
import com.cognizant.tranzform.core.exception.BusinessException;
import com.cognizant.tranzform.core.exception.SystemException;
import com.cognizant.tranzform.event.EventPublisher;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.domain.Conversation;
import com.cognizant.tranzform.msgcenter.domain.ConversationDetails;
import com.cognizant.tranzform.msgcenter.domain.MasterDataValidate;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.domain.TenantMetaData;
import com.cognizant.tranzform.msgcenter.enums.ConversationField;
import com.cognizant.tranzform.msgcenter.enums.ConversationStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.SortByDirection;
import com.cognizant.tranzform.msgcenter.repository.IConversationRepo;
import com.cognizant.tranzform.msgcenter.repository.IMetaDataRepo;
import com.cognizant.tranzform.test.util.TestRestHelper;
import com.cognizant.tranzform.tzfutil.user.LoggedInUser;

/**
 * Unit test for simple App.
 */
public class TestConversationService {
	private ConversationServiceImpl conversationServiceImpl;
	private EventPublisher eventPublisher;
	private Conversation conversation;
	private LoggedInUser loggedInUser;

	private Conversation newConversation;
	private TenantMetaData tenantMetaData;
	private MasterDataValidate masterDataValidate;

	@Mock
	private IConversationRepo conversationRepo;

	@Mock
	private IConversationRepo conversationRepoRemote;

	@Mock
	private IMetaDataRepo metaDataRepo;

	@Mock
	private MessageSource messageSource;

	private Map<String, String> headers;
	@Inject
	private IConfigProvider configProvider;
	IConfig config;

	@Before
	public void setup() {
		masterDataValidate = new MasterDataValidate();
		masterDataValidate.setCategory(ApplicationConstants.CONVERSATION_CATEGORIES);
		masterDataValidate.setCode("ENROLLMENT");
		masterDataValidate.setLanguage("en");
		masterDataValidate.setValid(true);

		conversation = new Conversation();
		conversation.setConversationId("100");
		conversation.setConversationStatus(ConversationStatus.ACTIVE);

		newConversation = new Conversation();
		newConversation.setTenantId("HZ0001");
		newConversation.setTenantEnrollmentId("M1001");
		newConversation.setConversationStatus(ConversationStatus.ACTIVE);
		newConversation.setConversationCategory("Billing");
		newConversation.setSubject("Where do i see my bills?");
		newConversation.setCreatedDate(new Date());
		newConversation.setModifiedDate(new Date());
		configProvider = Mockito.mock(ConfigProvider.class);

		Message message = new Message();
		message.setMessageCategory(MessageCategory.OUTBOUND);
		message.setMessageBody("Can i know my claims status");
		List<MessageStatus> messageStatus = new ArrayList<>();
		messageStatus.add(MessageStatus.ACTIVE);
		message.setMessageStatus(messageStatus);
		message.setCreatedDate(new Date());

		List<Message> messages = new ArrayList<Message>();
		messages.add(message);

		newConversation.setMessages(messages);

		tenantMetaData = new TenantMetaData();
		tenantMetaData.setTenantId("HZ0001");
		tenantMetaData.setAttributeId(ApplicationConstants.CONVERSATION_CATEGORIES);

		List<String> conversationCategories = new ArrayList<String>();
		conversationCategories.add("Billing");
		tenantMetaData.setAttributeValue(conversationCategories);

		conversationServiceImpl = new ConversationServiceImpl();
		conversationRepo = Mockito.mock(IConversationRepo.class);
		conversationRepoRemote = Mockito.mock(IConversationRepo.class);
		messageSource = Mockito.mock(MessageSource.class);
		metaDataRepo = Mockito.mock(IMetaDataRepo.class);
		ReflectionTestUtils.setField(conversationServiceImpl, "conversationRepo", conversationRepo);
		ReflectionTestUtils.setField(conversationServiceImpl, "conversationRepoRemote", conversationRepoRemote);
		ReflectionTestUtils.setField(conversationServiceImpl, "messageSource", messageSource);
		ReflectionTestUtils.setField(conversationServiceImpl, "metaDataRepo", metaDataRepo);
		config = Mockito.mock(IConfig.class);
		Mockito.when(configProvider.getConfig()).thenReturn(config);
		loggedInUser = Mockito.mock(LoggedInUser.class);
		ReflectionTestUtils.setField(conversationServiceImpl, "loggedInUser", loggedInUser);
		ReflectionTestUtils.setField(conversationServiceImpl, "configProvider", configProvider);
		eventPublisher = Mockito.mock(EventPublisher.class);
		ReflectionTestUtils.setField(conversationServiceImpl, "eventPublisher", eventPublisher);
		headers = new HashMap<String, String>();
		//headers.put(TranzformConstants.HEADER_AUTHORIZATION, TranzformConstants.HEADER_BEARER + " 12345");
		//headers.put(TranzformConstants.HEADER_PREFERRED_LANGUAGE, "en-US");

	}
	@Test
	public void testSaveConversation() throws BaseException {
		newConversation.setId("348677974");
		Mockito.when(conversationRepo.saveConversation(Mockito.any(Conversation.class))).thenReturn(newConversation);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.saveConversation(newConversation);
	}
	@SuppressWarnings("unchecked")
	@Test(expected = SystemException.class)
	public void testSaveConversation_publisherFailed() throws BaseException {
		newConversation.setId("348677974");
		
		Mockito.when(conversationRepo.saveConversation(Mockito.any(Conversation.class))).thenReturn(newConversation);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doThrow(SystemException.class).when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		Collection authorityCollection = new ArrayList<GrantedAuthority>();
		GrantedAuthority role=new GrantedAuthority() {			
			@Override
			public String getAuthority() {
				return "CSR";
			}
		};
		authorityCollection.add(role);		
		Mockito.when(loggedInUser.getAssignedRoles()).thenReturn(authorityCollection);
	
		conversationServiceImpl.saveConversation(newConversation);
	}

	@Test
	public void testSaveConversationMetaNotConfig() throws BaseException {
		tenantMetaData.setAttributeValue(null);
		Mockito.when(metaDataRepo.validateMasterData(Mockito.any(MasterDataValidate.class)))
				.thenReturn(masterDataValidate);
		conversationServiceImpl.saveConversation(newConversation);
	}

	@Test
	public void testSaveConversationInvalidCategory() throws BaseException {
		List<String> conversationCategories = new ArrayList<String>();
		conversationCategories.add("Billings");
		tenantMetaData.setAttributeValue(conversationCategories);
		Mockito.when(metaDataRepo.validateMasterData(Mockito.any(MasterDataValidate.class)))
				.thenReturn(masterDataValidate);
		conversationServiceImpl.saveConversation(newConversation);
	}

	@Test
	public void testSaveConversationInvalidSubject() throws BaseException {
		List<String> conversationCategories = new ArrayList<String>();
		conversationCategories.add("Billings");
		tenantMetaData.setAttributeValue(conversationCategories);
		Mockito.when(metaDataRepo.validateMasterData(Mockito.any(MasterDataValidate.class)))
				.thenReturn(masterDataValidate);
		conversationServiceImpl.saveConversation(newConversation);
	}

	@Test
	public void testSaveMessage() throws BaseException {
		newConversation.setId("348");
		newConversation.setConversationId("CONV102");
		
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString(), Mockito.anyString())).thenReturn(dummyConversationList());
		
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(Conversation.class))).thenReturn(newConversation);
		
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		conversationServiceImpl.saveMessage(newConversation);
	}

	@Test(expected = BusinessException.class)
	public void testSaveMessageWithoutSubject() throws BaseException {
		newConversation.setId("348");
		newConversation.setConversationId("CONV126");
		newConversation.setSubject("");
		
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString(), Mockito.anyString())).thenReturn(dummyConversationWithoutSubject());
		
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(Conversation.class))).thenReturn(newConversation);
		
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		conversationServiceImpl.saveMessage(newConversation);
	}
	@Test(expected = BusinessException.class)
	public void testSaveMessageWithoutCategory() throws BaseException {
		newConversation.setId("348");
		newConversation.setConversationId("CONV126");
		newConversation.setSubject("");
		
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString(), Mockito.anyString())).thenReturn(dummyConversationWithoutCategory());
		
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(Conversation.class))).thenReturn(newConversation);
		
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		conversationServiceImpl.saveMessage(newConversation);
	}
	private Conversation dummyConversationWithoutCategory() {
		newConversation.setId("348");
		newConversation.setConversationId("CONV126");
		newConversation.setConversationCategory("");
		return conversation;
	}

	private Conversation dummyConversationWithoutSubject() {
		newConversation.setId("348");
		newConversation.setConversationId("CONV126");
		newConversation.setSubject("");
		return conversation;
		
	}

	@Test(expected = BusinessException.class)
	public void testSaveMessageInvalidConvId() throws BaseException {
		newConversation.setId("348677974");
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(Conversation.class))).thenReturn(newConversation);
		conversationServiceImpl.saveMessage(newConversation);
	}

	@Test
	public void testupdateReadIndicator() throws BusinessException {
		newConversation.setId("348677974");
		newConversation.setConversationId("CONV101");

		Message message = new Message();
		message.setMessageId("MSG132");
		message.setRead(false);

		Mockito.when(conversationRepo.changeReadIndicator(message)).thenReturn(newConversation);
		Mockito.when(conversationRepo.saveAudit(newConversation)).thenReturn(newConversation);
		conversationServiceImpl.updateReadIndicator(message);
	}

	@Test(expected = BusinessException.class)
	public void testupdateReadIndicatorInvalidConvId() throws BusinessException {
		newConversation.setId("");
		newConversation.setConversationId("CONV101");

		Message message = new Message();
		message.setMessageId("MSG132");
		message.setRead(false);

		Mockito.when(conversationRepo.changeReadIndicator(message)).thenReturn(newConversation);
		Mockito.when(conversationRepo.saveAudit(newConversation)).thenReturn(newConversation);
		conversationServiceImpl.updateReadIndicator(message);
	}

	/**
	 * Testget conversation messages.
	 *
	 * @throws BusinessException
	 *             the business exception
	 */
	/*@Test
	public void testgetConversationMessages() throws BusinessException {

		Mockito.when(conversationRepo.getConversationMessages(Mockito.anyString(), Mockito.anyString(),
				Mockito.any(MessageType.class), Mockito.any(ConversationField.class),
				Mockito.any(SortByDirection.class), null, null)).thenReturn(dummyConversationDetailsList());

		List<ConversationDetails> conversationMessages = conversationServiceImpl.getConversationMessages(
				newConversation.getTenantId(), newConversation.getTenantEnrollmentId(), MessageType.INBOX,
				ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null);
		assertTrue(1 == conversationMessages.size());
	}*/

	/**
	 * Testget conversation messages.
	 *
	 * @throws BusinessException
	 *             the business exception
	 */
	/*@Test
	public void testgetConversationMessagesForSentItems() throws BusinessException {

		Mockito.when(conversationRepo.getConversationMessages(Mockito.anyString(), Mockito.anyString(),
				Mockito.any(MessageType.class), Mockito.any(ConversationField.class),
				Mockito.any(SortByDirection.class), null, null)).thenReturn(dummyConversationDetailsList());

		List<ConversationDetails> conversationMessages = conversationServiceImpl.getConversationMessages(
				newConversation.getTenantId(), newConversation.getTenantEnrollmentId(), MessageType.SENT,
				ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null);

		assertTrue(1 == conversationMessages.size());
	}*/

	/**
	 * Testget conversation messages.
	 *
	 * @throws BusinessException
	 *             the business exception
	 */
	/*@Test
	public void testgetConversationMessagesForDrafts() throws BusinessException {

		Mockito.when(conversationRepo.getConversationMessages(Mockito.anyString(), Mockito.anyString(),
				Mockito.any(MessageType.class), Mockito.any(ConversationField.class),
				Mockito.any(SortByDirection.class), null, null)).thenReturn(dummyConversationDetailsList());

		List<ConversationDetails> conversationMessages = conversationServiceImpl.getConversationMessages(
				newConversation.getTenantId(), newConversation.getTenantEnrollmentId(), MessageType.DRAFT,
				ConversationField.MODIFIED_DATE, SortByDirection.DESCENDING, null, null);
		assertTrue(1 == conversationMessages.size());
	}*/

	@Test
	public void testGetTrailMessages() {
		Mockito.when(conversationRepo.getTrailMessages("MSG423", "HZ0001", "M1001"))
				.thenReturn(dummyConversationList());
		List<Message> messageList = conversationServiceImpl.getTrailMessages("MSG423", "HZ0001", "M1001");
		assertTrue(messageList.size() > 0);
	}

	@Test(expected = BusinessException.class)
	public void testGetTrailMessages_MessagesNull() {
		Mockito.when(conversationRepo.getTrailMessages("MSG415", "HZ0001", "M1001"))
				.thenReturn(dummyConversationList());
		List<Message> messageList = conversationServiceImpl.getTrailMessages("MSG415", "HZ0001", "M1001");
		assertTrue(messageList.size() == 0);
	}

	private Conversation dummyConversationList() {
		Conversation conversation = TestRestHelper.getInstance().getObjectFromJsonFile("test/Conversation.json",
				Conversation.class);
		return conversation;
	}

	/**
	 * Dummy inbox list.
	 *
	 * @return the list
	 * @throws IOException
	 *             Signals that an I/O exception has occurred.
	 */
	private List<ConversationDetails> dummyConversationDetailsList() {
		List<ConversationDetails> conversationDetailsList = TestRestHelper.getInstance()
				.getListFromJsonFile("test/ConversationDetails.json", ConversationDetails.class);
		return conversationDetailsList;
	}

	@Test
	public void testDeleteMessage() throws BusinessException {

		Mockito.when(conversationRepo.getConversation(Mockito.anyString(),  Mockito.any(),
				Mockito.anyString(), Mockito.anyString())).thenReturn(dummyConversationList());
		conversationServiceImpl.deleteMessage("MSG420", MessageType.INBOX, "HZ0001", "M1001");

	}

	@Test(expected=BusinessException.class)
	public void testDeleteMessage_deleteInbox() throws BusinessException {

		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.any(),
				Mockito.anyString(), Mockito.anyString())).thenReturn(dummyConversationList());
		conversationServiceImpl.deleteMessage("MSG400", MessageType.INBOX, "HZ0001", "M1001");

	}
	
	
	@Test(expected = BusinessException.class)
	public void testDeleteMessageWithConversationNUll() throws BusinessException {
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.any(),
				Mockito.anyString(), Mockito.anyString())).thenReturn(null);
		conversationServiceImpl.deleteMessage("MSG1234", MessageType.INBOX, "HZ0001", "M1001");
	}
	
	@Test(expected = BusinessException.class)
	public void testValidateCategory() throws BusinessException {
		Conversation conversation = new Conversation();
		conversation.setConversationCategory("CLAIMS");
		Mockito.when(metaDataRepo.validateMasterData(Mockito.any(MasterDataValidate.class)))
		.thenReturn(masterDataList());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");		
		conversationServiceImpl.validateCategory(conversation);
	}
	private MasterDataValidate masterDataList() {
		MasterDataValidate masterDataValidate = TestRestHelper.getInstance().getObjectFromJsonFile("test/MasterData.json",
				MasterDataValidate.class);
		return masterDataValidate;
	}

}
