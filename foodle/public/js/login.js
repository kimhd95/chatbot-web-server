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
    spinner = new Spinner(opts).spin(target);
    const info = {
        url: "/api/v1/users/send_new_password",
        method: "POST",
        body: {
            email: email
        },
        success: function (res) {
            if (res) {
                $.ajax({
                    url: '/sendNewPassword',
                    async: true,
                    type: 'POST',
                    data: {
                        email: res[0],
                        newPassword: res[1]
                    },
                    dataType: 'text',
                    success: function (res) {
                        if (JSON.parse(res).success) {
                            spinner.stop();
                            alert('이메일로 임시 비밀번호를 발송해드렸습니다.');
                            $('#findPw').modal('hide');
                        }
                    },
                    error: function () {
                        spinner.stop();
                        alert('임시 비밀번호 발송 실패.');
                    }
                });
            }
        },
        error: function (e) {
            console.log(e);
            alert('임시 비밀번호 발송 실패.');
        }
    }
    sendTokenReq(info);
}

function login () {
    spinner = new Spinner(opts).spin(target);
    const info = {
        url: "/api/v1/users/login",
        method: "POST",
        body: {
            email: email,
            password: password
        },
        success: function (res) {
            spinner.stop();
            console.log('loginReq success');
            sessionStorage.setItem('login', '0');
            sessionStorage.setItem('email', email);
            alert('성공적으로 로그인되었습니다.');
            window.location.replace(res.redirect);

        },
        error: function (e) {
            spinner.stop();
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

function sendInquiry () {
    let name = $('.inq-name').val();
    let email = $('.inq-email').val();
    let subject = $('.inq-subject').val();
    let message = $('.inq-message').val();

    if (name === '') {
        alert('이름을 입력해주세요.');
        return;
    }
    if (email === '') {
        alert('이메일을 입력해주세요.');
        return;
    }
    if (subject === '') {
        alert('제목을 입력해주세요.');
        return;
    }
    if (message === '') {
        alert('내용을 입력해주세요.');
        return;
    }
    spinner = new Spinner(opts).spin(target);
    $.ajax({
        url: '/sendInquiry',
        async: true,
        type: 'POST',
        data: {
            name: name,
            email: email,
            subject: subject,
            message: message
        },
        dataType: 'text',
        success: function () {
            spinner.stop();
            alert('작성하신 문의가 성공적으로 전송되었습니다.');
            $('#loginIssue').modal('hide');
        },
        error: function () {
            spinner.stop();
            alert('전송에 실패했습니다.');
        }
    })
}
$(document).ready(() => {
    if (sessionStorage.getItem('login') === '0' || sessionStorage.getItem('login') === null) {
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
                    // 로그인 value 추가
                    sessionStorage.setItem('login', '0');
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


    $('#login-btn').click(() => {
        loginValidationCheck();
    })

    $('#reissue-pw').click(() => {
        reIssueValidationCheck();
    })

    $('.send-inq').click(() => {
        sendInquiry();
    })
});
