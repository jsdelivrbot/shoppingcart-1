// this file is used when development or testing locally using ng serve
// when running the insight-web-sb jar file, the env.js will be generated on the runtime using the configuration yml
// file downloaded from the config server

var envs = {
    "production": true,
    "UI_BASE_PATH": "http://localhost:4200/",
    //"UI_BASE_PATH": "https://tenant1dev.dev.trizetto.com/tzf/provider/uiprovider/",
    "API_ENDPOINT": "http://localhost:3000",
    "API_ENDPOINT_AUTHV2": "http://localhost:3000",
    "baseUrl": "http://localhost:4200/",
    "mockAuthHeaders": {
        "tenant-id": "HZ0001",
        "username": "M1001@HZ0001.com",
        "for-username": "M1001",
        "authorities": "PROVIDER",
        "Content-Type": "application/json"
    },
    "basic_settings": {
        "LOGOUT_PATH": "",
        "DateFormat": "MM/dd/yyyy",
        "DateTimeFormat": "MM/dd/yyyy | H:m:s a",
        "currency": "USD",
        "currencyPrecision": "1.2-2",
        "tenantid": "HZ0001",
        "userid": "M1001",
        "ERRORTIMEOUT": 3000,
        "PDF": "pdf",
        "EXCEL": "xcl"
    },
    "ms_settings": {
        "MSG_CENTER": "/msgcenter-web",
        "MDM_WEB": "/mdm-web",
        "MSPROVIDER": "/msprovider",
        "MSCLAIMS": "/msclaims",
        "MSELIGIBILITY": "/mseligibility",
        "MSAUTHREFERRAL": "/msauthreferral",
        "PROFILEWEB": "/rtr/profile-web1"
    },
    "oidc_settings": {
        "authority": "https://tenant1dev.dev.trizetto.com",
        "client_id": "@!1003.DF1B.6478.1D4B!0001!3910.4D60!0008!EDE6.3CC5.4E86.9AD6",
        "redirect_uri": "http://devtenant1.dev.trizetto.com:4200/auth.html",
        "post_logout_redirect_uri": "http://devtenant1.dev.trizetto.com:4200/#/",
        "response_type": "id_token token",
        "scope": "openid tranzform",
        "silent_redirect_uri": "http://devtenant1.dev.trizetto.com:4200/silent-renew.html",
        "automaticSilentRenew": true,
        "accessTokenExpiringNotificationTime": 4, // default is 60
        // silentRequestTimeout:10000,
        "filterProtocolClaims": true,
        "loadUserInfo": true
    },
    "user_settings": {
        "inactive_timeout": 900,
        "maximum_timeout": 3600
    }
};
