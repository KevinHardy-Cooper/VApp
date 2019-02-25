window.fbAsyncInit = function() {

    FB.init({
        appId      : '2250243621885151',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v3.2' // The Graph API version to use for the call
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Initiate login function with Facebook
function loginWithFacebook() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            console.log(response);
            // Logged into your app and Facebook.
        } else {
            // The person is not logged into this app or we are unable to tell.
        }
    });
}