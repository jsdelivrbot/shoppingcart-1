package com.cognizant.tranzform.msgcenter.repo;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import com.cognizant.tranzform.config.IConfig;
import com.cognizant.tranzform.config.IConfigProvider;
import com.cognizant.tranzform.context.provider.IHttpHeaderProvider;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.core.util.RestClientUtil;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.domain.MasterDataValidate;
import com.cognizant.tranzform.msgcenter.repository.IMetaDataRepo;
import com.cognizant.tranzform.msgcenter.repository.MetaDataRepoImpl;

@RunWith(PowerMockRunner.class)
@PrepareForTest(RestClientUtil.class)
@PowerMockIgnore({ "javax.management.*", "javax.net.ssl.*" })
public class TestMetaDataRepository {
/*
	private MasterDataValidate masterDataValidate;

	private IMetaDataRepo metaDataRepo;
	
	private Map<String, String> headers;
	
	private IConfigProvider configProvider;
	private IConfig config;
	private HttpHeaders httpHeaders;

	private IHttpHeaderProvider contextProvider;

	@SuppressWarnings("deprecation")
	public <S, T> void mockExchangeMethod(Class<T> requestType, Class<S> responseType, S mockResponse,
			HttpStatus mockStatus) throws RestException {
		PowerMockito.mockStatic(RestClientUtil.class);
		PowerMockito
				.when(RestClientUtil.exchange(Mockito.anyString(), Mockito.any(HttpMethod.class),
						Mockito.any(HttpHeaders.class), Mockito.any(requestType), Mockito.eq(responseType)))
				.thenReturn(new ResponseEntity<S>(mockResponse, mockStatus));
	}
	
	

	@Before
	public void init() {
		masterDataValidate = new MasterDataValidate();
		masterDataValidate.setCategory(ApplicationConstants.CONVERSATION_CATEGORIES);
		masterDataValidate.setCode("ENROLLMENT");
		masterDataValidate.setLanguage("en");
		masterDataValidate.setValid(true);
		
		headers = new HashMap<String, String>();
		//headers.put(TranzformConstants.HEADER_AUTHORIZATION, TranzformConstants.HEADER_BEARER + " 12345");
		//headers.put(TranzformConstants.HEADER_PREFERRED_LANGUAGE, "en-US");
		metaDataRepo=new MetaDataRepoImpl();
		configProvider = Mockito.mock(IConfigProvider.class);
		config = Mockito.mock(IConfig.class);
		contextProvider=Mockito.mock(IHttpHeaderProvider.class);
		httpHeaders=Mockito.mock(HttpHeaders.class);
	//	PowerMockito.mockStatic(RestClientUtil.class);
		ReflectionTestUtils.setField(metaDataRepo, "configProvider", configProvider);
		ReflectionTestUtils.setField(metaDataRepo, "contextProvider", contextProvider);
	}

	@Test
	public void testGetTenantMetaData() throws RestException {

		MasterDataValidate[] masterDataValidates = new MasterDataValidate[1];
		masterDataValidates[0] = masterDataValidate;
		String requestURI = "http://localhost:8100/mesgcenter-web/tzf/";
		Mockito.when(configProvider.getConfig()).thenReturn(config);
		Mockito.when(config.getString(Mockito.anyString())).thenReturn(requestURI);
		Mockito.when(contextProvider.getAuthHeaders()).thenReturn(httpHeaders);
		mockExchangeMethod(MasterDataValidate[].class, MasterDataValidate[].class,masterDataValidates , HttpStatus.OK);
		MasterDataValidate response = metaDataRepo.validateMasterData(masterDataValidate);
		assertNotNull(response);
	}
*/
}
