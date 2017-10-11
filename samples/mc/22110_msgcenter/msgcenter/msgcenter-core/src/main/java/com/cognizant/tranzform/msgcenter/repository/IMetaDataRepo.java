package com.cognizant.tranzform.msgcenter.repository;

import com.cognizant.tranzform.core.exception.RestException;
import com.cognizant.tranzform.msgcenter.domain.MasterDataValidate;

/**
 * The Interface IMetaDataRepo.
 */
@FunctionalInterface
public interface IMetaDataRepo {

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
