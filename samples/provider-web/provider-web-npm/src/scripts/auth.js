var Oidc = window.Oidc,
    UserManager = Oidc.UserManager;

if((Oidc && Oidc.Log && Oidc.Log.logger)){
    Oidc.Log.logger = console;
}
new UserManager().signinRedirectCallback().then(function (user) {
    if (user == null) {
        document.getElementById("waiting").style.display = "none";
        document.getElementById("error").innerText = "No sign-in request pending.";
    }
    else {
        // this will be the application root path
        //window.location = "http://localhost:4200/#/";
        //window.location = "https://tenant1pat.dev.trizetto.com/tzf/provider/uiprovider/";
        window.location = window['envs']['UI_BASE_PATH'];
    }
})
    .catch(function (er) {
        document.getElementById("waiting").style.display = "none";
        document.getElementById("error").innerText = er.message;
    });
