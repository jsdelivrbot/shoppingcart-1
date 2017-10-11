package com.cognizant.tranzform.msgcenter.v2.repository;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.core.MediaType;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cognizant.tranzform.config.IConfig;
import com.cognizant.tranzform.config.IConfigProvider;
import com.cognizant.tranzform.context.provider.IHttpHeaderProvider;
import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.core.exception.ValidationException;
import com.cognizant.tranzform.core.logging.Log;
import com.cognizant.tranzform.core.logging.LogWrapper;
import com.cognizant.tranzform.core.util.RestClientUtil;
import com.cognizant.tranzform.msgcenter.constants.ApplicationConstants;
import com.cognizant.tranzform.msgcenter.domain.MasterDataValidate;

/**
 * The Class TextContentRepoImpl.
 */
@Named
public class MetaDataRepoV2Impl implements IMetaDataRepoV2 {

	/** The Constant LOG. */
	private static final Log LOG = LogWrapper.getLogger(MetaDataRepoV2Impl.class);

	/** The config provider. */
	@Inject
	private IConfigProvider configProvider;

	@Inject
	private IHttpHeaderProvider contextProvider;

	/**
	 * Gets the rest response.
	 * 
	 * @param <S>
	 *            the generic type
	 * @param requestData
	 *            the request data
	 * @param requestURLId
	 *            the request URL id
	 * @param responseType
	 *            the response type
	 * @return the rest response
	 * @throws RestException
	 *             the rest exception
	 * @throws ValidationException
	 *             the validation exception
	 */
	private <S> S getRestResponse(List<MasterDataValidate> requestData, String requestURLId, Class<S> responseType)
			throws RestException {
		LOG.trace("Enter getRestResponse method.");
		LOG.debug("Request URL Id :: " + requestURLId + " ,Request Data :: " + requestData);
		S content = null;
		ResponseEntity<S> response;
		IConfig config = configProvider.getConfig();
		if (config != null) {
			String requestURL = config.getString(requestURLId);
			LOG.debug("Service Name :: " + requestURLId + " , Request URL :: " + requestURL);
			if (requestURL != null) {
				HttpHeaders httpHeaders = contextProvider.getAuthHeaders();
				httpHeaders.add(ApplicationConstants.CONTENT_TYPE, MediaType.APPLICATION_JSON);

				response = RestClientUtil.exchange(requestURL, HttpMethod.POST, httpHeaders, requestData, responseType);
				LOG.debug("Response Entity :: " + response);
				if (response != null && HttpStatus.OK == response.getStatusCode()) {
					content = response.getBody();
					LOG.debug("Content :: " + content);
				}
			}
		}
		LOG.trace("Exit getRestResponse method.");
		return content;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cognizant.tranzform.msgcenter.repository.IMetaDataRepo#
	 * validateMasterData(com.cognizant.tranzform.msgcenter.domain.
	 * MasterDataValidate, java.util.Map)
	 */
	@Override
	public MasterDataValidate validateMasterData(MasterDataValidate masterDataValidate) throws RestException {
		LOG.trace("Enter validateMasterData method.");
		LOG.debug("MasterDataValidate :: " + masterDataValidate);		
		MasterDataValidate masterDataValidateResp = null;
		if (masterDataValidate != null) {
			List<MasterDataValidate> masterDataValidateList = new ArrayList<>();
			masterDataValidateList.add(masterDataValidate);

			MasterDataValidate[] response = getRestResponse(masterDataValidateList, "tenant.metadata.uri", MasterDataValidate[].class);
			if (response != null && response.length > 0) {
				masterDataValidateResp = response[0];
			}
		}
		LOG.trace("Exit validateMasterData method.");
		return masterDataValidateResp;
	}

}
