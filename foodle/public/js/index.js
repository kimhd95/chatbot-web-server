
let fbLoginFlag;

// 구글 로그인
function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    if (googleUser.getAuthResponse().id_token) {
        const info = {
            url: '/api/v1/users/social_login',
            method: 'POST',
            body: {
                email: profile.getEmail(),
                token: googleUser.getAuthResponse().id_token
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    console.log(res);
                    sessionStorage.setItem('login', '3');
                    window.location.replace('http://localhost:8001/chat')
                } else {
                    console.log(res);
                }
            },
            error: function (e) {
                if (e.responseJSON.message === 'This email is Already signed up.') {
                    signOut();
                    localStorage.clear();
                    sessionStorage.clear();
                    alert('이미 가입된 이메일입니다.');
                } else {
                    signOut();
                    alert('접근 불가능합니다.');
                }
            }
        }
        sendTokenReq(info);
    }
}
// 구글 로그아웃
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


$(document).ready(() => {
    // 네이버 로그인 설정
    let naverLogin = new naver.LoginWithNaverId(
		{
			clientId: "DnnpK9bi2MdliAiFZZUQ",
            callbackUrl: "http://localhost:8001/",
            callbackHandle: true,
			isPopup: false, /* 팝업을 통한 연동처리 여부 */
			loginButton: {color: "green", type: 3, height: 50} /* 로그인 버튼의 타입을 지정 */
		}
    );	
	/* 설정정보를 초기화하고 연동을 준비 */
    naverLogin.init();
    $('#naverIdLogin_loginButton img')[0].src = '/images/naver2.png';

    let loginValue = sessionStorage.getItem('login');
    if (loginValue === '0') {
        const info = {
            url: '/api/v1/users/verify_token',
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
        }
        sendTokenReq(info);
    }

    // window.fbAsyncInit = function() {
    //     FB.init({
    //       appId      : '1966207340338340',
    //       cookie     : true,  // enable cookies to allow the server to access 
    //                           // the session
    //       xfbml      : true,  // parse social plugins on this page
    //       version    : 'v3.2' // use graph api version 2.8
    //     });
    
    //     FB.AppEvents.logPageView();   

    //     // Now that we've initialized the JavaScript SDK, we call 
    //     // FB.getLoginStatus().  This function gets the state of the
    //     // person visiting this page and can return one of three states to
    //     // the callback you provide.  They can be:
    //     //
    //     // 1. Logged into your app ('connected')
    //     // 2. Logged into Facebook, but not your app ('not_authorized')
    //     // 3. Not logged into Facebook and can't tell if they are logged into
    //     //    your app or not.
    //     //
    //     // These three cases are handled in the callback function.
    //     let callback = function (res) {
    //         console.log(res);
    //         // statusChangeCallback(res);

    //         if (res.status === 'connected') {
    //             console.log('logged in');
    //             fbLoginFlag = true;
    //         } else {
    //             console.log('logged out');
    //             fbLoginFlag = false;
    //         }
    //     }
    //     FB.getLoginStatus(callback);
    
    // };
    // // 페이스북 SDK 로드
    // (function(d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) return;
    //     js = d.createElement(s); js.id = id;
    //     js.src = "https://connect.facebook.net/en_US/sdk.js";
    //     fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));


    window.addEventListener('load', () => {
        naverLogin.getLoginStatus((status) => {
            if (status) {
              let email = naverLogin.user.getEmail();
              let name = naverLogin.user.getName();
              let nickname = naverLogin.user.getNickName();
              let birthday = naverLogin.user.getBirthday();
              let age = naverLogin.user.getAge();
              console.log(birthday);
              const info = {
                url: '/api/v1/users/social_login',
                method: 'POST',
                body: {
                    email: email,
                    token: naverLogin.accessToken.accessToken
                },
                success: function (res) {
                    if (res.success) {
                        sessionStorage.setItem('login', '1');
                        sessionStorage.setItem('email', email);
                        window.location.replace('http://localhost:8001/chat')                        
                    } else {
                        console.log(res);
                    }
                },
                error: function (e) {
                    console.log(e.responseJSON);
                    if (e.responseJSON.message === 'This email is Already signed up.') {
                        window.location.replace('http://localhost:8001')    
                        localStorage.clear();
                        sessionStorage.clear();
                        alert('이미 가입된 이메일입니다.');
                    } else {
                        alert('접근 불가능합니다.');
                    }
                }
              }
              sendTokenReq(info);
            }
        });
    })

    // 네이버 로그인 버튼 클릭
    $('#naverIdLogin').click(() => {
    })
    
    // 페이스북 로그인 버튼 클릭
    $('.facebook-login').click(() => {
        if(fbLoginFlag) {
            FB.logout((res) => {
                console.log('logout => ', res);
            })
        } else {
            FB.login((res) => {
                console.log('login => ', res);
            })
        }
    });

    // 구글 로그인 버튼 클릭
    $('.google-login').click(() => {
        $('.abcRioButton').trigger('click');
    });
})