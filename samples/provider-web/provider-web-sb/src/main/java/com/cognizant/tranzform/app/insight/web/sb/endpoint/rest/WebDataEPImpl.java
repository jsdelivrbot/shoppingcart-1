package com.cognizant.tranzform.app.insight.web.sb.endpoint.rest;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.tranzform.app.insight.web.sb.domain.WebDataConfigurations;
import com.cognizant.tranzform.platform.mslib.commons.utils.DocumentConversionUtil;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
@RestController
public class WebDataEPImpl implements WebDataEP {

	@Autowired
	private WebDataConfigurations webDataConfigurations;
	
	@Override
	@RequestMapping(path = "/config/env.js", produces = "application/javascript")
	public String getEnvironment () {
		Map<String, Object> envObject = this.webDataConfigurations.getWebData();
		String script = null;
		try {
			script = "var envs = " + DocumentConversionUtil.convertObjectToJsonString(envObject);
		} catch (IOException e) {
			// TODO Logger needs to be added
			e.printStackTrace();
		}
		return script;
	}
}
