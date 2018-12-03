let email;
let password; // 영문, 숫자, 특문 중 2개 선택 / 대소문자 안가림 / 8자리 이상.
let emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
let pwNum;
let pwEng;
let pwSpe;

function loginValidationCheck() {
    email = $('#email').val();
    password = $('#pw').val();
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
    
    $('#login-btn').click(() => {
        loginValidationCheck();
    })

    $('#reissue-pw').click(() => {
        reIssueValidationCheck();
    })
});