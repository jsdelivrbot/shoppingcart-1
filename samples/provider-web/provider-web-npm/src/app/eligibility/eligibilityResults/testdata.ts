export const limitExpectedOutput = {
            "title": "Limitations",
            "id": "Limitations",
            "rowItems": [{
              "serviceType": "Medical",
              "insuranceType": "string",
              "description": "Physical Therapy Visits",
              "diagnosisCode": "DC12",
              "priorAuthRequired": true,
              "amount": 60,
              "coverageLevel": "Individual"
            }, {
              "serviceType": "Medical",
              "insuranceType": "string",
              "description": "Physical Therapy Visits",
              "diagnosisCode": "DC12",
              "priorAuthRequired": true,
              "amountRemaining": 0,
              "coverageLevel": "Individual"
            }, {
              "messages": [{
                "message": "This is the message of medical service codes",
                "importanceFlag": true
              }]
            }]
      } ;

export const deductibleExpectedData= {
        'title': 'Deductible',
        'id': 'Deductible',
        'rowItems': [{
              'coverageLevel': 'Family',
              'serviceType': 'Health Benefit Plan Coverage',
              'insuranceType': 'Preferred Provider Organization (PPO)',
              'description': 'Preferred Provider Organization (PPO)',
              'priorAuthRequired': true,
              'amount': 4000,
              'amountMet': 2400,
              'amountRemaining': 1600,
              'diagnosisCode': 'Diagnosis 1',
              'networkIndicator': 'IN'
            },
            {

              'coverageLevel': 'Family',
              'serviceType': 'Health Benefit Plan Coverage',
              'insuranceType': 'Preferred Provider Organization (PPO)',
              'description': 'Preferred Provider Organization (PPO)',
              'priorAuthRequired': true,
              'amountMet': 2400,
              'amountRemaining': 1600,
              'diagnosisCode': 'Diagnosis 1',
              'networkIndicator': 'IN'
            },
            {'messages': [{'message': 'Replacement Deductible:', 'importanceFlag': true},
            {'message': 'Replacement Deductible. The replacement deductible is the deductible specific to the service type requested. This replaces the global deductible for this service type.', 'importanceFlag': true}]}
            , {
              'coverageLevel': 'Individual',
              'serviceType': 'Health Benefit Plan Coverage',
              'insuranceType': 'Preferred Provider Organization (PPO)',
              'description': 'Preferred Provider Organization (PPO)',
              'priorAuthRequired': false,
              'amount': 1000,
              'amountMet': 600,
              'amountRemaining': 400,
              'diagnosisCode': 'Diagnosis 2',
              'networkIndicator': 'ON'
            },
            {
              'networkIndicator': 'ON',
              'coverageLevel': 'Individual',
              'serviceType': 'Health Benefit Plan Coverage',
              'insuranceType': 'Preferred Provider Organization (PPO)',
              'description': 'Preferred Provider Organization (PPO)',
              'priorAuthRequired': false,
              'amountMet': 600,
              'amountRemaining': 400,
              'diagnosisCode': 'Diagnosis 2'
            },
            {'messages': [{'message': 'Replacement Deductible:', 'importanceFlag': true},
              {'message': 'Replacement Deductible. The replacement deductible is the deductible specific to the service type requested. This replaces the global deductible for this service type.', 'importanceFlag': true}]}]

      };

export const testData = {
      'profile': {
        'MemberPersonalDetails': [
          {
            'groupId': 'MemberPersonalDetails',
            'attributeDetails': {
              'alternateName': 'Aruna'
            }
          }
        ],
        'Subscriber': [],
        'SubscriberGroup': [],
        'PayerInfo': []
      },
      'enrollment': [],
      'accumSummary': [
    {
      'accumulatorType': 'Deductible',
      'tierAccums': [
        {
          'tierId': 'IN',
          'accumAmounts': [
            {
              'coverageLevel': 'Family',
              'serviceType': 'Health Benefit Plan Coverage',
              'insuranceType': 'Preferred Provider Organization (PPO)',
              'description': 'Preferred Provider Organization (PPO)',
              'priorAuthRequired': true,
              'amount': 4000,
              'amountMet': 2400,
              'amountRemaining': 1600,
              'diagnosisCode': 'Diagnosis 1',
              'messages': [{'message': 'Replacement Deductible:', 'importanceFlag': true},
              {'message': 'Replacement Deductible. The replacement deductible is the deductible specific to the service type requested. This replaces the global deductible for this service type.', 'importanceFlag': true}]
            }
          ]
        },
        {
          'tierId': 'ON',
          'accumAmounts': [
             {
              'coverageLevel': 'Individual',
              'serviceType': 'Health Benefit Plan Coverage',
              'insuranceType': 'Preferred Provider Organization (PPO)',
              'description': 'Preferred Provider Organization (PPO)',
              'priorAuthRequired': false,
              'amount': 1000,
              'amountMet': 600,
              'amountRemaining': 400,
              'diagnosisCode': 'Diagnosis 2',
              'messages': [{'message': 'Replacement Deductible:', 'importanceFlag': true},
              {'message': 'Replacement Deductible. The replacement deductible is the deductible specific to the service type requested. This replaces the global deductible for this service type.', 'importanceFlag': true}]
            }
          ]
        }
      ]
    }],
      'limitSummary':[{
            'limitType': 'Units',
            'limitTimePeriod': 'Plan Year',
            'limitDescription': 'Physical Therapy Visits',
            'serviceType': 'Medical',
            'insuranceType': 'string',
            'priorAuthRequired': true,
            'diagnosisCode': 'DC12',
            'messages': [{
              'message': 'This is the message of medical service codes',
              'importanceFlag': true
            }],
            'coverageLimits': [{
              'coverageLevel': 'Individual',
              'limitMax': 60,
              'limitMet': 60,
              'limitRemaining': 0
            }]
		}],
      'additionalInsurance': [
            {
              'groupId': 'AdditionalInsurance',
              'attributeDetails': {
                'productCategory': 'Medical',
                'insuranceHierarchy': 'Secondary',
                'otherInsuredPayerName': 'Aetna'
              }
            },
            {
              'groupId': 'AdditionalInsurance',
              'attributeDetails': {
                'productCategory': 'Medical',
                'insuranceHierarchy': 'Secondary',
                'otherInsuredPayerName': 'Humana'
              }
            },
            {
              'groupId': 'AdditionalInsurance',
              'attributeDetails': {
                'productCategory': 'Medical',
                'insuranceHierarchy': 'Primary',
                'otherInsuredPayerName': 'UHC'
              }
            }
          ]
    }




