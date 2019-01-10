let platform;
let name, email, password, passwordCheck, gender, ageGroup, phone;
const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/; 
let pwNum, pwEng, pwSpe;

function autoAgree() {
    if ($('#access-terms')[0].checked && $('#privacy-policy')[0].checked) {
        $('#all-agree')[0].checked = true;
    } else {
        $('#all-agree')[0].checked = false;
    }
}

function selectEmailPlatform(i) {
    let email = $('.email input').val();
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
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    name = `${firstName}${lastName}`;
    email = `${$('#email').val()}@${$('#platform').val()}`;
    password = $('#password').val();
    passwordCheck = $('#password-check').val();
    pwNum = password.search(/[0-9]/g);
    pwEng = password.search(/[a-z]/ig);
    pwSpe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    // if (firstName === '' || firstName === null) {
    //     alert('성을 입력해주세요.');
    //     return;
    // }
    // if (lastName === '' || lastName === null) {
    //     alert('이름을 입력해주세요.');
    //     return;
    // }
    // if (email === '') {
    //     alert('이메일을 입력해주세요.');
    //     return;
    // }
    // if (gender === '' || gender == null) {
    //     alert('성별을 선택해주세요.');
    //     return;
    // }
    // if (!emailRegExp.test(email)) {
    //     alert('이메일 형식을 지켜주세요.');
    //     return;
    // }
    // if (password === '') {
    //     alert('비밀번호를 입력해주세요.');
    //     return;
    // }
    // if (password.length < 8) {
    //     alert('비밀번호는 8자리 이상이어야 합니다.');
    //     return;
    // }
    // if ((pwNum < 0 && pwEng < 0) || (pwNum < 0 && pwSpe < 0) || (pwEng < 0 && pwSpe < 0)) {
    //     alert('비밀번호는 숫자, 영문, 특수문자 중 2가지 이상을 혼합해야 합니다.');
    //     return;
    // }
    // if (password !== passwordCheck) {
    //     alert('비밀번호가 일치하지 않습니다.');
    //     return;
    // }
    $('.next-button')[0].style.display = 'none';
    $('.signup-button')[0].style.display = 'block';
    $('.input-container')[0].style.display = 'none';
    $('.second-input-container')[0].style.display = 'block';
}

function selectAge(i) {
    ageGroup = i;
    $('.year')[0].value = ageGroup;
}
function secondInfoValidationCheck() {
    phone = $('.phone-number').val();
    const allAgreeCheck = $('#all-agree')[0].checked;

    if (ageGroup === '' || ageGroup === null || ageGroup === undefined) {
        alert('출생년도를 선택해주세요.');
        return;
    }
    if (phone === '' || phone === null) {
        alert('핸드폰 번호를 입력해주세요.');
        return;
    }
    if (!phoneRegExp.test(phone)) {
        alert('핸드폰 번호을 지켜주세요. (ex: 010-0000-0000)');
        return;
    }
    if (!allAgreeCheck) {
        alert('약관에 동의해주세요.');
        return;
    }
    signUpReq(name, gender, email, password, ageGroup, phone);
}

function signUpReq(name, gender, email, password, ageGroup, phone) {
    spinner = new Spinner(opts).spin(target);
    const info = {
        method: "POST",
        url: '/api/v1/users/register_user',
        body: {
            email: email,
            password: password,
            gender: gender,
            ageGroup: ageGroup,
            social: false
        },
        success: function (res) {
            if (res.success){
                spinner.stop();
                console.log("signUpReq: success!");
                alert("회원가입이 성공적으로 완료되었습니다.");
                sessionStorage.setItem('login', 0);
                sessionStorage.setItem('email', email);
                location.href = '/chat';
            }else {
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
    } else {
        alert('이미 로그인되어 있습니다.');
        location.href="/chat";
    }
    // 출생년도 초기화
    for(let i = 2005; i >= 1950; i--) {
        $('#year-list .modal-body').append(`<div class="birth-year" onclick="selectAge(${i})" data-dismiss="modal">${i}</div>`)
    }
    // 다음 버튼 터치
    $('.next-button').click(() => {
        firstInfoValidationCheck();
    });
    // 뒤로 버튼 터치
    $('.back-btn').click(() => {
        if ($('.input-container')[0].style.display === 'none') {
            $('.input-container')[0].style.display = 'block';
            $('.second-input-container')[0].style.display = 'none';
            $('.next-button')[0].style.display = 'block';
            $('.signup-button')[0].style.display = 'none';
        } else {
            location.href = '/';
        }
    })
    // 가입 완료 터치
    $('.signup-button').click(() => {
        secondInfoValidationCheck();
    })
    // 패스워드 칠 때 마다 실행
    $('#password').keyup(() => {
        // pwNum = $('#password').val().search(/[0-9]/g);
        // pwEng = $('#password').val().search(/[a-z]/ig);
        // pwSpe = $('#password').val().search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        // console.log(pwNum, pwEng, pwSpe);
        
        // if ($('#password').val() !== '' && $('#password').val().length >= 8 && !((pwNum < 0 && pwEng < 0) || (pwEng < 0 && pwSpe < 0) || (pwSpe < 0 && pwNum < 0))) {
        //     $('.password-complete')[0].childNodes[1].style.display = 'block';
        // } else {
        //     $('.password-complete')[0].childNodes[1].style.display = 'none';
        // }
        // if ($('#password-check').val() !== '') {
        //     if ($('#password').val() === $('#password-check').val()) {
        //         $('.password-complete')[1].childNodes[1].style.display = 'block';
        //     } else {
        //         $('.password-complete')[1].childNodes[1].style.display = 'none';
        //     }
        // }
        passwordValidationCheck();
    });

    $('#password-check').keyup(() => {
        // if ($('#password-check').val() !== '') {
        //     if ($('#password').val() === $('#password-check').val()) {
        //         $('.password-complete')[1].childNodes[1].style.display = 'block';
        //     } else {
        //         $('.password-complete')[1].childNodes[1].style.display = 'none';
        //     }
        // }
        passwordEqualCheck();
    })

    $('#male').click(() => {
        if ($('#male')[0].checked) {
            $('#female')[0].checked = false;
            gender = 'M';
        } else {
            gender = '';
        }
    })
    $('#female').click(() => {
        if ($('#female')[0].checked) {
            $('#male')[0].checked = false;
            gender = 'F';
        } else {
            gender = '';
        }
    })

    $('#all-agree').click(() => {
        if ($('#access-terms')[0].checked && $('#privacy-policy')[0].checked) {
            $('#access-terms')[0].checked = false;
            $('#privacy-policy')[0].checked = false;
        } else {
            $('#access-terms')[0].checked = true;
            $('#privacy-policy')[0].checked = true;
        }
    })
    $('#access-terms').click(() => {
        autoAgree();
    })
    $('#privacy-policy').click(() => {
        autoAgree();
    })
});
