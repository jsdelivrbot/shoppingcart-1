/**
 * 
 */
package com.cognizant.tranzform.msgcenter.config;

import javax.ws.rs.ApplicationPath;

import org.springframework.context.annotation.Configuration;

import com.cognizant.tranzform.core.jersey.config.BaseJerseyConfig;
import com.cognizant.tranzform.msgcenter.rest.ConversationResource;
import com.cognizant.tranzform.msgcenter.v2.rest.ConversationResourceV2;

/**
 * @author Cognizant
 *
 */
@ApplicationPath("msgcenter-web")
@Configuration
public class MsgCenterJerseyConfig extends BaseJerseyConfig{
	
	public MsgCenterJerseyConfig(){
		register(ConversationResource.class);
		register(ConversationResourceV2.class);
	}

}
