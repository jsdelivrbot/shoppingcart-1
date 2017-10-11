export const environment = {
 production: true,
  //API_ENDPOINT: 'https://dep1-shrd-mcs-001.healthtranzform.com:19443',
  //baseUrl: 'https://dep1-shrd-wbs-001.healthtranzform.com/engageprovider/',

  API_ENDPOINT: 'http://localhost:3000',
  API_ENDPOINT_AUTHV2: 'http://localhost:3000',
  baseUrl: 'http://localhost:4200/',
  
  mockAuthHeaders: {
    'tenant-id': 'HZ0001',
    'username': 'M1001@HZ0001.com',
    'for-username': 'M1001',
    'authorities': 'PROVIDER',
    'Content-Type':'application/json'
  }
 
};
