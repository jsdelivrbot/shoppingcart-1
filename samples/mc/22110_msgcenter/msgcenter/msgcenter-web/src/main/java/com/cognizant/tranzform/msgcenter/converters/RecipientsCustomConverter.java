package com.cognizant.tranzform.msgcenter.converters;

import java.util.ArrayList;
import java.util.List;

import org.dozer.CustomConverter;

import com.cognizant.tranzform.msgcenter.v2.domain.To;
import com.cognizant.tranzform.msgcenter.v2.vo.RecipientVO;

public class RecipientsCustomConverter implements CustomConverter{

	@Override
	public Object convert(Object existingDestinationFieldValue, 
			Object sourceFieldValue, Class<?> destinationClass,
			Class<?> sourceClass) {
		List<RecipientVO>  recipients = new ArrayList<>();
		
		if (sourceFieldValue instanceof To) {
			
			To to = (To) sourceFieldValue;
			
			final RecipientVO recipientVO = new RecipientVO();
			recipientVO.setRecipientId(to.getId());
			recipientVO.setRecipientName(to.getUserName());
			recipientVO.setRecipientUserType(to.getType());			
			recipients.add(recipientVO);
		}
		
		return recipients;
	}

}
