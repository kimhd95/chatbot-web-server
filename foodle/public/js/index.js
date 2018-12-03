function naverLogin () {
    var naverLogin = new naver.LoginWithNaverId(
		{
			clientId: "DnnpK9bi2MdliAiFZZUQ",
			callbackUrl: "http://localhost:8001/chat",
			isPopup: false, /* 팝업을 통한 연동처리 여부 */
			loginButton: {color: "green", type: 3, height: 50} /* 로그인 버튼의 타입을 지정 */
		}
	);
	
	/* 설정정보를 초기화하고 연동을 준비 */
	naverLogin.init();
}


function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function getLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function facebookLogin () {
    FB.login(function(response) {
        console.log(response);
        if (response.status === 'connected') {

        } else {

        }
    }, {scope: 'public_profile,email'});
}

// google login
function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

// google logout
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
$(document).ready(() => {
    $.ajax('http://devapifood.jellylab.io:6001/api/v1/users/verify_token', {
        method: 'POST',
        data: null,
        crossDomain: true,
        redirect: 'follow',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            if (res.success) {
                console.log(res);
                console.log('verifyToken success');
                alert('이미 로그인되어 있습니다.');
                window.location.replace(res.redirect);
            } else {
                console.log('verifyToken fail');
                console.log(res);
            }
        },
        error: function (e) {
            console.log('ajax call error: login page - verifyToken');
            if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
                console.log("check your URL, method(GET/POST)");
            }else if(e.status === 403){
                if (e.responseText.includes("No token provided."))
                    console.log("No token, no problem.");
                else if (e.responseText.includes("jwt malformed"))
                    console.log("Malformed token");
                else if (e.responseText.includes("invalid signature"))
                    console.log("Modified token");
                else console.log(e);
            } else if(e.status === 0){
                if(navigator.onLine){
                    console.log('status : 0');
                }else {
                    console.log('internet disconnected');
                    window.location.reload();
                }
            } else{
                console.log('status: ' + e.status + ', message: ' + e.responseText);
                console.log(e);
            }
        }
    })
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '1966207340338340',
          cookie     : true,
          xfbml      : true,
          version    : 'v3.2'
        });

        FB.AppEvents.logPageView();   
          
      };
    
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v3.2&appId=1966207340338340&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    naverLogin();

    $('.facebook-login').click(() => {
        facebookLogin();
    });

    $('.google-login').click(() => {
        $('.abcRioButton').trigger('click');
    });
    $('#naverIdLogin_loginButton img')[0].src = '/images/naver2.png';
})