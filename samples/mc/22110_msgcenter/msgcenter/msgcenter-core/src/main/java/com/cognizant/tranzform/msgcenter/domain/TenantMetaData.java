package com.cognizant.tranzform.msgcenter.domain;

import java.util.List;

/**
 * The Class TenantMetaData.
 */
public class TenantMetaData {

	/** The tenant id. */
	private String tenantId;

	/** The attr id. */
	private String attributeId;

	/** The attr value. */
	private List<String> attributeValue;

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
	 * Gets the attribute id.
	 *
	 * @return the attribute id
	 */
	public String getAttributeId() {
		return attributeId;
	}

	/**
	 * Sets the attribute id.
	 *
	 * @param attributeId
	 *            the new attribute id
	 */
	public void setAttributeId(String attributeId) {
		this.attributeId = attributeId;
	}

	/**
	 * Gets the attribute value.
	 *
	 * @return the attribute value
	 */
	public List<String> getAttributeValue() {
		return attributeValue;
	}

	/**
	 * Sets the attribute value.
	 *
	 * @param attributeValue
	 *            the new attribute value
	 */
	public void setAttributeValue(List<String> attributeValue) {
		this.attributeValue = attributeValue;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "TenantMetaData [tenantId=" + tenantId + ", attributeId=" + attributeId + ", attributeValue="
				+ attributeValue + "]";
	}

}
