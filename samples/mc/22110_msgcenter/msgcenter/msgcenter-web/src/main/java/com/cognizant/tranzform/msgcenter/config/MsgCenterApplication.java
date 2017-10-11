/* MsgCenterApplication.java	$Revision:   1.0  $ $Date: 09/15/2017 
 * <COPYRIGHT_NOTICE>
 * </COPYRIGHT_NOTICE>
 */
package com.cognizant.tranzform.msgcenter.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import com.cognizant.tranzform.core.feign.config.FeignClientConfig;

/**
 *  
 * @author Cognizant
 */

@SpringBootApplication
@ComponentScan(basePackages = { "com.cognizant.tranzform.platform.configure", "com.cognizant.tranzform.msgcenter"})
@EnableFeignClients(basePackages = { "com.cognizant.tranzform.client" }, defaultConfiguration = {
		FeignClientConfig.class })
@EnableMongoRepositories(basePackages = { "com.cognizant.tranzform.msgcenter" }, mongoTemplateRef = "mongoTemplate")
@EnableEurekaClient
public class MsgCenterApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsgCenterApplication.class, args);
	}
	
	@Bean
	public ReloadableResourceBundleMessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:MsgCenterMessages");
		messageSource.setCacheSeconds(-1);
		return messageSource;
	}
}
