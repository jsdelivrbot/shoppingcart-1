package com.cognizant.tranzform.app.insight.web.sb.domain;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
@ConfigurationProperties(prefix = "tranzform")
public class WebDataConfigurations {
	private Map<String, Object> webData = new HashMap<String, Object>();

	public Map<String, Object> getWebData() {
		return webData;
	}

	public void setWebData(Map<String, Object> webData) {
		this.webData = webData;
	}

	@Override
	public String toString() {
		return "WebData [webData=" + webData + "]";
	}
}
