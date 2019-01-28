let email;
let name;
let password; // 영문, 숫자, 특문 중 2개 선택 / 대소문자 안가림 / 8자리 이상.
let emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
let pwNum;
let pwEng;
let pwSpe;

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
// 이메일 로그인 validation check
function loginValidationCheck() {
    email = $('.email').val();
    password = $('.password').val();
    pwNum = password.search(/[0-9]/g);
    pwEng = password.search(/[a-z]/ig);
    pwSpe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if(email === '') {
        alert('이메일을 입력해주세요.');
        return;
    }
    if(!emailRegExp.test(email)) {
        alert('이메일 형식을 지켜주세요.');
        return;
    }
    if(password === '') {
        alert('비밀번호를 입력해주세요.');
        return;
    }
    if(password.length < 8) {
        alert('비밀번호는 8자리 이상이어야 합니다.');
        return;
    }
    if((pwNum < 0 && pwEng < 0) || (pwNum < 0 && pwSpe < 0) || (pwEng < 0 && pwSpe < 0)) {
        alert('비밀번호는 숫자, 영문, 특수문자 중 2가지 이상을 혼합해야 합니다.');
        return;
    }
    login();
}
// 이메일 로그인
function loginOnetime () {
    const info = {
        url: "/api/v1/users/login_onetime",
        method: "POST",
        body: {
            email: email,
        },
        success: function (res) {
            console.log('onetimelogin Req success');
            sessionStorage.setItem('login', -1);
            sessionStorage.setItem('email', email);
            // sessionStorage.setItem('login', '0');
            // sessionStorage.setItem('email', email);
            alert('환영합니다.');
            window.location.replace(res.redirect);
        },
        error: function (e) {
            // spinner.stop();
            console.log('ajax call error: login page - loginReq');
            if (e.status === 403 &&
                (e.responseText.includes("No doctor account found with given email address.") ||
                    e.responseText.includes("Password wrong"))) {
                alert("아이디/비밀번호를 확인해주세요.");
            } else if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
                console.log("check your URL, method(GET/POST)");
                alert("로그인에 실패했습니다.");
            } else if (e.status === 400 && e.responseText.includes("not given")) {
                console.log("check your parameters");
                alert("로그인에 실패했습니다.");
            } else if(e.status === 0){
                if(navigator.onLine){
                    console.log('status : 0');
                }else {
                    console.log('internet disconnected');
                    window.location.reload();
                }
            }  else {
                console.log(e.responseText);
                console.log(e);
                alert("로그인에 실패했습니다.");
            }
        }
    };
    sendTokenReq(info);
}


function login () {
    const info = {
        url: "/api/v1/users/login",
        method: "POST",
        body: {
            email: email,
            password: password
        },
        success: function (res) {
            console.log('loginReq success');
            sessionStorage.setItem('login', '0');
            sessionStorage.setItem('email', email);
            alert('성공적으로 로그인되었습니다.');
            window.location.replace(res.redirect);
        },
        error: function (e) {
            console.log('ajax call error: login page - loginReq');
            if (e.status === 403 &&
                (e.responseText.includes("No doctor account found with given email address.") ||
                    e.responseText.includes("Password wrong"))) {
                alert("아이디/비밀번호를 확인해주세요.");
            } else if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
                console.log("check your URL, method(GET/POST)");
                alert("로그인에 실패했습니다.");
            } else if (e.status === 400 && e.responseText.includes("not given")) {
                console.log("check your parameters");
                alert("로그인에 실패했습니다.");
            } else if(e.status === 0){
                if(navigator.onLine){
                    console.log('status : 0');
                }else {
                    console.log('internet disconnected');
                    window.location.reload();
                }
            }  else {
                console.log(e.responseText);
                console.log(e);
                alert("로그인에 실패했습니다.");
            }
        }
    };
    sendTokenReq(info);
}
// 임시비밀번호 발급
function reIssueValidationCheck() {
    email = $('#signedup-email').val();

    if(email === '') {
        alert('이메일을 입력해주세요.');
        return;
    }
    if(!emailRegExp.test(email)) {
        alert('이메일 형식을 지켜주세요.');
        return;
    }
    const info = {
        url: "/api/v1/users/send_new_password",
        method: "POST",
        body: {
            email: email
        },
        success: function (res) {
            if (res.success) {
                alert('이메일로 임시 비밀번호를 발급해드렸습니다!');
            }
        },
        error: function (e) {
            console.log(e);
            alert('임시 비밀번호 발송 실패.');
        }
    }
    sendTokenReq(info);
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
			loginButton: {color: "green", type: 3, height: 70} /* 로그인 버튼의 타입을 지정 */
		}
    );
	/* 설정정보를 초기화하고 연동을 준비 */
    naverLogin.init();
    $('#naverIdLogin_loginButton img')[0].src = '/images/naver.png';

    let loginValue = sessionStorage.getItem('login');
    // console.log("loginValue: "+loginValue)
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
                    sessionStorage.setItem('email', res.email);
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
        location.href='/lobby';
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

    // 로그인 버튼 클릭
    $('#login-btn').click(() => {
        loginValidationCheck();
    })

    // 임시 비번 발급 클릭
    $('#reissue-pw').click(() => {
        reIssueValidationCheck();
    })

    $('#unsigned').click(()=>{
      console.log('unsigned access detected');
      email=String(Date.now())+'@jellylab.io';
      name='비회원';
      password=String(Date.now());
      const info = {
          method: "POST",
          url: '/api/v1/users/register_onetime_user',
          body: {
            email: email,
            name: name,
            password: password,
          },
          success: function (res) {
              if (res.success){
                  console.log("signUpReq: success!");
                  loginOnetime();
                  // location.href = '/lobby';
                  // getChatLog(user_email);
                  // alert("비로그인 접속 완료!");
              }else {
                  console.log("signUpReq: fail!");
                  console.log(res);
              }
          },
          error: function(e) {
              // alert(JSON.stringify(e));
              console.log('ajax call error: signup page - singUpReq');
              if (e.status === 404 && e.responseText.includes("API call URL not found."))
                  console.log("check your URL, method(GET/POST)");
              else if ((e.status === 400 && e.responseText.includes("not provided"))
                  || (e.status === 500 && e.responseText.includes("Cannot read property"))) {
                  console.log("check your parameters");
              } else if(e.status === 0){
                  if(navigator.onLine){
                      console.log('status : 0');
                  }else {
                      console.log('internet disconnected');
                      window.location.reload();
                  }
              } else {
                  console.log('status: ' + e.status + ', message: ' + e.responseText);
              }
              alert("정보 업데이트가 실패했습니다.");
          }
      };
      sendReq(info);
      // sendTokenReq(info);
    })
})
