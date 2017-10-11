package com.cognizant.tranzform.msgcenter.v2.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

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
import com.cognizant.tranzform.msgcenter.domain.MasterDataValidate;
import com.cognizant.tranzform.msgcenter.domain.Message;
import com.cognizant.tranzform.msgcenter.domain.TenantMetaData;
import com.cognizant.tranzform.msgcenter.enums.ConversationStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageCategory;
import com.cognizant.tranzform.msgcenter.enums.MessageStatus;
import com.cognizant.tranzform.msgcenter.enums.MessageType;
import com.cognizant.tranzform.msgcenter.enums.ReadType;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationDetailsV2;
import com.cognizant.tranzform.msgcenter.v2.domain.ConversationV2;
import com.cognizant.tranzform.msgcenter.v2.domain.MessageV2;
import com.cognizant.tranzform.msgcenter.v2.repository.IConversationRepoV2;
import com.cognizant.tranzform.msgcenter.v2.repository.IMetaDataRepoV2;
import com.cognizant.tranzform.test.util.TestRestHelper;
import com.cognizant.tranzform.tzfutil.user.LoggedInUser;

public class ConversationServiceV2ImplTest {/*
	private ConversationServiceV2Impl conversationServiceImpl;
	private EventPublisher eventPublisher;
	private ConversationV2 conversation;
	private LoggedInUser loggedInUser;

	private ConversationV2 newConversation;
	private TenantMetaData tenantMetaData;
	private MasterDataValidate masterDataValidate;
	
	@Mock
	private IConversationRepoV2 conversationRepo;

	@Mock
	private IConversationRepoV2 conversationRepoRemote;

	@Mock
	private IMetaDataRepoV2 metaDataRepo;

	@Mock
	private MessageSource messageSource;

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

		conversation = new ConversationV2();
		conversation.setConversationId("100");
		conversation.setConversationStatus(ConversationStatus.ACTIVE);

		newConversation = new ConversationV2();
		newConversation.setTenantId("HZ0001");
		newConversation.setConversationStatus(ConversationStatus.ACTIVE);
		//newConversation.set
		//setConversationCategory("Billing");
		//newConversation.setSubject("Where do i see my bills?");
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

		List<MessageV2> messages = new ArrayList<MessageV2>();
		//messages.addAll(message);

		newConversation.setMessages(messages);
		//setMessages(messages);

		tenantMetaData = new TenantMetaData();
		tenantMetaData.setTenantId("HZ0001");
		tenantMetaData.setAttributeId(ApplicationConstants.CONVERSATION_CATEGORIES);

		List<String> conversationCategories = new ArrayList<String>();
		conversationCategories.add("Billing");
		tenantMetaData.setAttributeValue(conversationCategories);
		//List<GrantedAuthority> grantedAuthority = new ArrayList<GrantedAuthority>();
		//grantedAuthority.add(new GrantedAuthorityImpl("CSR"));
		conversationServiceImpl = new ConversationServiceV2Impl();
		conversationRepo = Mockito.mock(IConversationRepoV2.class);
		conversationRepoRemote = Mockito.mock(IConversationRepoV2.class);
		messageSource = Mockito.mock(MessageSource.class);
		metaDataRepo = Mockito.mock(IMetaDataRepoV2.class);
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
		
	}
	@Test
	public void testSaveConversation() throws BaseException {
		//newConversation.setId("348677974");
		Mockito.when(conversationRepo.saveConversation(Mockito.any(ConversationV2.class))).thenReturn(dummyConversation());
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.saveConversation(dummyConversation());
	}
	
	@SuppressWarnings("unchecked")
	@Test(expected = SystemException.class)
	public void testSaveConversation_ThrowException_eventPublisher() throws BaseException {
		Mockito.when(conversationRepo.saveConversation(Mockito.any(ConversationV2.class))).thenReturn(dummyConversation());
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
	
		conversationServiceImpl.saveConversation(dummyConversation());
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
				Mockito.anyString())).thenReturn(dummyConversation());
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(ConversationV2.class))).thenReturn(dummyConversation());
		Mockito.when(conversationRepo.saveNewMessage(Mockito.any(ConversationV2.class))).thenReturn(dummyConversation());
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		conversationServiceImpl.saveMessage(dummyConversation());
	}
	
	
	
	@Test(expected=BusinessException.class)
	public void testSaveMessage_InvalidData() throws BaseException {
		newConversation.setId("348");
		newConversation.setConversationId("CONV102");
		ConversationV2 mockdata = dummyConversation();
		mockdata.setConversationStatus(ConversationStatus.DELETE);
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(mockdata);
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(ConversationV2.class))).thenReturn(mockdata);
		Mockito.when(conversationRepo.saveNewMessage(Mockito.any(ConversationV2.class))).thenReturn(mockdata);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		conversationServiceImpl.saveMessage(mockdata);
	}
	
	@Test(expected=BusinessException.class)
	public void testSaveMessage_InvalidSubject() throws BaseException {
		ConversationV2 mockdata = dummyConversation();
		mockdata.getMessages().get(0).setSubject(null);
		mockdata.getMessages().get(1).setSubject(null);
		mockdata.setConversationStatus(ConversationStatus.ACTIVE);
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(mockdata);
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(ConversationV2.class))).thenReturn(mockdata);
		Mockito.when(conversationRepo.saveNewMessage(Mockito.any(ConversationV2.class))).thenReturn(mockdata);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		conversationServiceImpl.saveMessage(mockdata);
	}
	
	@Test(expected=BusinessException.class)
	public void testSaveMessage_InvalidCategory() throws BaseException {
		ConversationV2 mockdata = dummyConversation();
		mockdata.getMessages().get(0).setConversationCategory(null);
		mockdata.getMessages().get(1).setConversationCategory(null);
		mockdata.setConversationStatus(ConversationStatus.ACTIVE);
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(mockdata);
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(ConversationV2.class))).thenReturn(mockdata);
		Mockito.when(conversationRepo.saveNewMessage(Mockito.any(ConversationV2.class))).thenReturn(mockdata);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		conversationServiceImpl.saveMessage(mockdata);
	}
	
	@Test(expected=BusinessException.class)
	public void testSaveMessage_QueriedInfoNUll() throws BaseException {
		newConversation.setId("348");
		newConversation.setConversationId("CONV102");
		ConversationV2 mockdata = dummyConversation();
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(null);
		Mockito.when(conversationRepo.saveExistingMessage(Mockito.any(ConversationV2.class))).thenReturn(mockdata);
		Mockito.when(conversationRepo.saveNewMessage(Mockito.any(ConversationV2.class))).thenReturn(mockdata);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		conversationServiceImpl.saveMessage(mockdata);
	}
	
	@Test
	public void testUpdateRead() throws BaseException {
		Mockito.when(conversationRepo.changeReadIndicator(Mockito.any(MessageV2.class), Mockito.any(), Mockito.any())).thenReturn(dummyConversation());
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.updateReadIndicator(mockMessageDetails(), "M1001@tranzform.com", ReadType.UNREAD);
	}
	
	@Test(expected=BusinessException.class)
	public void testUpdateRead_invalidConversationId() throws BaseException {
		Mockito.when(conversationRepo.changeReadIndicator(Mockito.any(MessageV2.class), Mockito.any(), Mockito.any())).thenReturn(null);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.updateReadIndicator(mockMessageDetails(), "M1001@tranzform.com", ReadType.UNREAD);
	}

	@Test
	public void testdeleteMessage() throws BaseException {
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(dummyConversation());
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.deleteMessage("MSG2073", MessageType.INBOX, "HZ0001","PR001");
	}
	
	@Test(expected= BusinessException.class)
	public void testdeleteMessage_QuerriedDataNull() throws BaseException {
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(null);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.deleteMessage("MSG2073", MessageType.INBOX, "HZ0001","PR001");
	}
	
	@Test(expected= BusinessException.class)
	public void testdeleteMessage_InvalidData() throws BaseException {
		ConversationV2 mockdata = dummyConversation();
		mockdata.setConversationStatus(ConversationStatus.DELETE);
		Mockito.when(conversationRepo.getConversation(Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(mockdata);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.deleteMessage("MSG2073", MessageType.INBOX, "HZ0001","PR001");
	}
	
	@Test
	public void testGetConversation() throws BaseException {
		Mockito.when(conversationRepo.getConversationMessages(Mockito.any(), Mockito.any(), Mockito.any(),Mockito.any(),Mockito.any(),Mockito.any(),Mockito.any(),Mockito.any())).thenReturn(dummyConversationList());
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.getConversationMessages("HZ0001", "M1001@tranzform.com", MessageType.INBOX,null,null,null,null,null);
	}
	
	@Test(expected = BusinessException.class)
	public void testTrailingMessages_NOTrailMessage() throws BusinessException {
		Mockito.when(conversationRepo.getTrailMessages(Mockito.any(), Mockito.any(), Mockito.any())).thenReturn(dummyConversation());
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.getTrailMessages("MSG2072", "HZ0001", "PR0001");
	}
	
	@Test
	public void testTrailingMessages() throws BusinessException {
		Mockito.when(conversationRepo.getTrailMessages(Mockito.any(), Mockito.any(), Mockito.any())).thenReturn(dummyConversation());
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.getTrailMessages("MSG2073", "HZ0001", "PR0001");
	}
	
	@Test
	public void testValidateCategories() throws BusinessException {
		Mockito.when(metaDataRepo.validateMasterData(Mockito.any())).thenReturn(masterDataValidate);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.validateCategory(dummyConversation());
	}
	
	@Test(expected = BusinessException.class)
	public void testValidateCategories_INvalidData() throws BusinessException {
		masterDataValidate.setValid(false);
		masterDataValidate.setMessage("Invalid data");
		Mockito.when(metaDataRepo.validateMasterData(Mockito.any())).thenReturn(masterDataValidate);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.validateCategory(dummyConversation());
	}
	@Test(expected = BusinessException.class)
	public void testValidateCategories_NotConfigured() throws BusinessException {
		Mockito.when(metaDataRepo.validateMasterData(Mockito.any())).thenReturn(null);
		Mockito.when(config.getBoolean("mockServiceEnable")).thenReturn(true);
		Mockito.doNothing().when(eventPublisher).publishEvent(Mockito.any());
		Mockito.when(loggedInUser.getPreferredLanguage()).thenReturn("en_US");
		conversationServiceImpl.validateCategory(dummyConversation());
	}
	
	*//**
	 * Method to return mock Conversation
	 * 
	 *//*
	private ConversationV2 dummyConversation() {
		ConversationV2 conversation = TestRestHelper.getInstance().getObjectFromJsonFile("test/ConversationV2.json",
				ConversationV2.class);
		return conversation;
	}

	*//**
	 * Method to return mock Conversation LIst
	 * 
	 *//*
	private List<ConversationDetailsV2> dummyConversationList() {
		ConversationDetailsV2 conversation = TestRestHelper.getInstance().getObjectFromJsonFile("test/ConversationDetailsV2List.json",
				ConversationDetailsV2.class);
		List<ConversationDetailsV2> conversationList = new ArrayList<ConversationDetailsV2>();
		conversationList.add(conversation);
		return conversationList;
	}
	
	*//**
	 * Method to return mock Document Details
	 * 
	 *//*
	public MessageV2 mockMessageDetails() {
		MessageV2 MessageDetails = TestRestHelper.getInstance()
				.getObjectFromJsonFile(
						"test/MessageV2.json",
						MessageV2.class);
		return MessageDetails;
	}
	

*/}
