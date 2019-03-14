var platform;
var name, email, password, passwordCheck, gender, birthYear, phone;
const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const phoneRegExp = /^\d{10,11}$/;
var pwNum, pwEng, pwSpe;

function autoAgree() {
    if ($('#access-terms')[0].checked && $('#privacy-policy')[0].checked) {
        $('#all-agree')[0].checked = true;
    } else {
        $('#all-agree')[0].checked = false;
    }
}

function selectEmailPlatform(i) {
    var email = $('.email input').val();
    platform = $('#platform-list button')[i].innerHTML;

    if (platform === '직접 입력') {
        $('.platform')[0].disabled = false;
    } else {
        $('.platform')[0].disabled = true;
        $('.platform')[0].value = platform;
    }
}

function passwordValidationCheck () {
    pwNum = $('#password').val().search(/[0-9]/g);
    pwEng = $('#password').val().search(/[a-z]/ig);
    pwSpe = $('#password').val().search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if ($('#password').val() !== '' && $('#password').val().length >= 8 && !((pwNum < 0 && pwEng < 0) || (pwEng < 0 && pwSpe < 0) || (pwSpe < 0 && pwNum < 0))) {
        $('.password-complete')[0].childNodes[1].style.display = 'block';
    } else {
        $('.password-complete')[0].childNodes[1].style.display = 'none';
    }
    if ($('#password-check').val() !== '') {
        if ($('#password').val() === $('#password-check').val()) {
            $('.password-complete')[1].childNodes[1].style.display = 'block';
        } else {
            $('.password-complete')[1].childNodes[1].style.display = 'none';
        }
    }
}

function passwordEqualCheck () {
    if ($('#password-check').val() !== '') {
        if ($('#password').val() === $('#password-check').val()) {
            $('.password-complete')[1].childNodes[1].style.display = 'block';
        } else {
            $('.password-complete')[1].childNodes[1].style.display = 'none';
        }
    }
}

function firstInfoValidationCheck() {
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    name = `${firstName}${lastName}`;
    email = `${$('#email').val()}@${$('#platform').val()}`;
    password = $('#password').val();
    passwordCheck = $('#password-check').val();
    pwNum = password.search(/[0-9]/g);
    pwEng = password.search(/[a-z]/ig);
    pwSpe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (firstName === '' || firstName === null) {
        alert('성을 입력해주세요.');
        return;
    }
    if (lastName === '' || lastName === null) {
        alert('이름을 입력해주세요.');
        return;
    }
    if (email === '') {
        alert('이메일을 입력해주세요.');
        return;
    }
    if (gender === '' || gender == null) {
        alert('성별을 선택해주세요.');
        return;
    }
    if (!emailRegExp.test(email)) {
        alert('이메일 형식을 지켜주세요.');
        return;
    }
    if (password === '') {
        alert('비밀번호를 입력해주세요.');
        return;
    }
    if (password.length < 8) {
        alert('비밀번호는 8자리 이상이어야 합니다.');
        return;
    }
    if ((pwNum < 0 && pwEng < 0) || (pwNum < 0 && pwSpe < 0) || (pwEng < 0 && pwSpe < 0)) {
        alert('비밀번호는 숫자, 영문, 특수문자 중 2가지 이상을 혼합해야 합니다.');
        return;
    }
    if (password !== passwordCheck) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }
    $('.next-button')[0].style.display = 'none';
    $('.signup-button')[0].style.display = 'block';
    $('.input-container')[0].style.display = 'none';
    $('.second-input-container')[0].style.display = 'block';
}

function selectAge(i) {
    birthYear = i;
    $('.year')[0].value = birthYear;
}
function secondInfoValidationCheck() {
    phone = $('.phone-number').val();
    const allAgreeCheck = $('#all-agree')[0].checked;

    if (birthYear === '' || birthYear === null || birthYear === undefined) {
        alert('출생년도를 선택해주세요.');
        return;
    }
    if (phone === '' || phone === null) {
        alert('핸드폰 번호를 입력해주세요.');
        return;
    }
    if (!phoneRegExp.test(phone)) {
        alert('핸드폰 번호 양식을 지켜주세요.');
        return;
    }
    if (!allAgreeCheck) {
        alert('약관에 동의해주세요.');
        return;
    }
    signUpReq(name, gender, email, password, birthYear, phone);
}

//추가
function login (email, password) {
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

function signUpReq(name, gender, email, password, birthYear, phone) {
    spinner = new Spinner(opts).spin(target);
    const info = {
        method: "POST",
        url: '/api/v1/users/register_user',
        body: {
            name: name,
            email: email,
            password: password,
            gender: gender,
            birthYear: birthYear,
            phone: phone,
        },
        success: function (res) {
            if (res.success){
                spinner.stop();
                console.log("signUpReq: success!");
                alert("회원가입이 성공적으로 완료되었습니다.");
                login(email, password);
            } else {
                spinner.stop();
                console.log("signUpReq: fail!");
                console.log(res);
            }
        },
        error: function(e) {
            spinner.stop();
            console.log('ajax call error: signup page - singUpReq');
            if (e.status === 404 && e.responseText.includes("API call URL not found."))
                console.log("check your URL, method(GET/POST)");
            else if ((e.status === 400 && e.responseText.includes("not provided"))
                || (e.status === 500 && e.responseText.includes("Cannot read property"))) {
                console.log("check your parameters");
            } else if (e.status === 0){
                if (navigator.onLine){
                    console.log('status : 0');
                }else {
                    console.log('internet disconnected');
                    window.location.reload();
                }
            } else {
                console.log('status: ' + e.status + ', message: ' + e.responseText);
            }
            alert("회원가입에 실패했습니다.");
        }
    };
    sendReq(info);
}

$(document).ready(function(){
// $(document).ready(() => {
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
                    //alert('이미 로그인되어 있습니다.');
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
                }else if (e.status === 403){
                    if (e.responseText.includes("No token provided.")) {
                        console.log("No token, no problem.");
                    }
                    else if (e.responseText.includes("jwt malformed"))
                        console.log("Malformed token");
                    else if (e.responseText.includes("invalid signature"))
                        console.log("Modified token");
                    else console.log(e);
                } else if (e.status === 0){
                    if (navigator.onLine){
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
    else {
        //alert('이미 로그인되어 있습니다.');
        location.href="/lobby";
    }
    // 출생년도 초기화
    for(var i = 2005; i >= 1950; i--) {
        $('#year-list .modal-body').append(`<div class="birth-year" onclick="selectAge(${i})" data-dismiss="modal">${i}</div>`)
    }
    // 다음 버튼 터치
    $('.next-button').click(function() {
        firstInfoValidationCheck();
    });
    // 뒤로 버튼 터치
    $('.back-btn').click(function() {
        // if ($('.input-container')[0].style.display === 'none') {
        //     $('.input-container')[0].style.display = 'block';
        //     $('.second-input-container')[0].style.display = 'none';
        //     $('.next-button')[0].style.display = 'block';
        //     $('.signup-button')[0].style.display = 'none';
        // } else {
            location.href = '/';
        // }
    })
    // 가입 완료 터치
    $('.signup-button').click(function() {
        secondInfoValidationCheck();
    })
    // 패스워드 칠 때 마다 실행
    $('#password').keyup(function() {
        passwordValidationCheck();
    });

    $('#password-check').keyup(function() {
        passwordEqualCheck();
    })

    $('#male').click(function() {
        if ($('#male')[0].checked) {
            $('#female')[0].checked = false;
            gender = 'M';
        } else {
            gender = '';
        }
    })
    $('#female').click(function() {
        if ($('#female')[0].checked) {
            $('#male')[0].checked = false;
            gender = 'F';
        } else {
            gender = '';
        }
    })

    $('#all-agree').click(function() {
        if ($('#access-terms')[0].checked && $('#privacy-policy')[0].checked) {
            $('#access-terms')[0].checked = false;
            $('#privacy-policy')[0].checked = false;
        } else {
            $('#access-terms')[0].checked = true;
            $('#privacy-policy')[0].checked = true;
        }
    })
    $('#access-terms').click(function() {
        autoAgree();
    })
    $('#privacy-policy').click(function() {
        autoAgree();
    })
});
