package com.cognizant.tranzform.msgcenter.v2.repository;

import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.msgcenter.domain.MasterDataValidate;

/**
 * The Interface IMetaDataRepo.
 */
@FunctionalInterface
public interface IMetaDataRepoV2 {

	/**
	 * Validate master data.
	 *
	 * @param masterDataValidate
	 *            the master data validate
	 * @param headers
	 *            the headers
	 * @return the master data validate
	 * @throws RestException
	 *             the rest exception
	 */
	public MasterDataValidate validateMasterData(MasterDataValidate masterDataValidate)
			throws RestException;

}
