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
                name: profile.getName(),
                token: googleUser.getAuthResponse().id_token
            },
            success: function (res) {
                if (res.success) {
                    sessionStorage.setItem('email', profile.getEmail());
                    sessionStorage.setItem('login', '3');
                    window.location.replace(res.redirect)
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
            // callbackUrl: "http://localhost:8001/",
            callbackUrl: location.href,
            callbackHandle: true,
			isPopup: false, /* 팝업을 통한 연동처리 여부 */
			loginButton: {color: "green", type: 3, height: 50} /* 로그인 버튼의 타입을 지정 */
		}
    );	
	/* 설정정보를 초기화하고 연동을 준비 */
    naverLogin.init();
    $('#naverIdLogin_loginButton img')[0].src = '/images/naver2.png';

    let loginValue = sessionStorage.getItem('login');
    if (loginValue === '0' || loginValue === null) {
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
    } else {
        alert('이미 로그인되어 있습니다.');
        location.href='/chat';
    }

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
                    name: name,
                    token: naverLogin.accessToken.accessToken
                },
                success: function (res) {
                    if (res.success) {
                        sessionStorage.setItem('login', '1');
                        sessionStorage.setItem('email', email);
                        window.location.replace(res.redirect)                        
                    } else {
                        console.log(res);
                    }
                },
                error: function (e) {
                    console.log(e.responseJSON);
                    if (e.responseJSON.message === 'This email is Already signed up.') {
                        window.location.replace(res.redirect)    
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

    // 구글 로그인 버튼 클릭
    $('.google-login').click(() => {
        $('.abcRioButton').trigger('click');
    });
})