let allCheck, accessCheck, dataCheck, optLength = $('.email select option').length;
let signUpStep = 1;
let platform;
let firstTab = $('#basic-info');
let secondTab = $('#additional-info');
let email, password, nickname, gender, ageGroup, nicknameCheck = false;
let emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
let pwNum, pwEng, pwSpe;

function agreeTerms(i) {
    allCheck = $('.terms input')[0].checked;
    accessCheck = $('.terms input')[1].checked;
    dataCheck = $('.terms input')[2].checked;
    if (i === 0) {
        if(allCheck) {
            $('.terms input')[0].checked = false;
            $('.terms input')[1].checked = false;
            $('.terms input')[2].checked = false;
        } else {
            $('.terms input')[0].checked = true;
            $('.terms input')[1].checked = true;
            $('.terms input')[2].checked = true;
        }
    } else if(i === 1){
        location.href= "/access-terms";
    } else if(i === 2){
        location.href= "/data-terms";
    }
    autoAgree();
}

function autoAgree() {
    if($('.terms input')[1].checked && $('.terms input')[2].checked) $('.terms input')[0].checked = true;
    else $('.terms input')[0].checked = false;
}

function Content() {
    for(let i = 1; i < optLength-1; i++) {
        if($('.email select option')[i].selected){
            $('.email input')[1].value = $('.email select option')[i].innerHTML; 
        }
    } 
}

function changeStep() {
    if (signUpStep === 1) {
        firstTab.removeClass('tab').addClass('tab active');
        secondTab.removeClass('tab active').addClass('tab');
        $('.complete-btn')[0].style.display = 'none';
        $('.next-btn')[0].style.display = 'block';
        $('.additional-info-form')[0].style.display = 'none';
        $('.basic-info-form')[0].style.display = 'block';
    } else {
        secondTab.removeClass('tab').addClass('tab active');
        firstTab.removeClass('tab active').addClass('tab');
        $('.next-btn')[0].style.display = 'none';
        $('.complete-btn')[0].style.display = 'block';
        $('.additional-info-form')[0].style.display = 'block';
        $('.basic-info-form')[0].style.display = 'none';
    }
}

function selectEmailPlatform(i) {
    let email = $('.email input').val();
    platform = $('#platformList button')[i].innerHTML;
    console.log($('#platformList'));
    if (i === 6) {
        $('.email input')[0].value = '';
    } else {
        if (email === '') {
            $('.email input')[0].value = platform;
        } else if (email !== '' && email.indexOf('@') !== -1) {
            $('.email input')[0].value = `${email.split('@')[0]}${platform}`;
        } else if (email !== '' && email.indexOf('@') === -1) {
            $('.email input')[0].value = `${email}${platform}`;
        }
    }
}

function basicInfoValidationCheck() {
    email = $('#email').val();
    password = $('#password').val();
    allCheck = $('.terms input')[0].checked;
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
    if(!allCheck) {
        alert('약관에 동의해주세요.');
        return;
    }
    signUpStep = 2;
    changeStep();
}

function selectAge(i) {
    $('.age-select-btn')[0].innerHTML = i;
}
function additionalInfoValidationCheck() {
    nickname = $('#nickname').val();
    gender = $('.gender input')[0].checked ? '남성' : ($('.gender input')[1].checked ? '여성' : '');
    ageGroup = $('.age-select-btn')[0].innerHTML;
    
    if(nickname === '') {
        alert('닉네임을 입력해주세요.');
        return;
    }
    // if(!nicknameCheck) {
    //     alert('닉네임 중복체크를 해주세요.');
    //     return;
    // }
    if(gender === '') {
        alert('성별을 선택해주세요.');
        return;
    }
    if(ageGroup === '출생년도를 선택하세요') {
        alert('연령대를 선택해주세요.');
        return;
    }
    signUpReq(email, password, nickname, gender, ageGroup);
}

function signUpReq(email, password, nickname, gender, ageGroup) {
    spinner = new Spinner(opts).spin(target);
    const info = {
        method: "POST",
        url: '/api/v1/users/register_user',
        body: {
            email: email,
            password: password,
            nickname: nickname,
            gender: gender,
            ageGroup: ageGroup
        },
        success: function (res) {
            if (res.success){
                spinner.stop();
                console.log("signUpReq: success!");
                alert("회원가입이 성공적으로 완료되었습니다.");
                location.href = '/login';
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
            alert("회원가입에 실패했습니다.");
        }
    };
    sendReq(info);
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
                if (e.responseText.includes("No token provided.")) {
                    console.log("No token, no problem.");
                }
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

    $('.access-terms-chk').click(() => {
        if($('.terms input')[1].checked) {
            $('.terms input')[1].checked = false;
        } else {
            $('.terms input')[1].checked = true;
        }
        autoAgree();
    })
    $('.data-terms-chk').click(() => {
        if($('.terms input')[2].checked) {
            $('.terms input')[2].checked = false;
        } else {
            $('.terms input')[2].checked = true;
        }
        autoAgree();
    })
    // 출생년도 초기화
    for(let i = 2005; i >= 1950; i--) {
        $('#age-group-list .modal-body').append(`<div class="birth-year" onclick="selectAge(${i})" data-dismiss="modal">${i}</div>`)
    }
    // 기본정보 탭 터치
    firstTab.click(() => {
        signUpStep = 1;
        changeStep();
    });
    // 부가정보 탭 터치
    secondTab.click(() => {
        basicInfoValidationCheck();
    });
    // 다음 버튼 터치
    $('.next-btn').click(() => {
        basicInfoValidationCheck();
    });
    // 뒤로 버튼 터치
    $('.back-btn').click(() => {
        if(signUpStep === 1) {
            location.href = '/';
        } else {
            signUpStep = 1;
            changeStep();
        }
    })

    // 가입 완료 터치
    $('.complete-btn').click(() => {
        additionalInfoValidationCheck();
    })
    // 패스워드 칠 때 마다 실행
    $('#password').keyup(() => {
        pwNum = $('#password').val().search(/[0-9]/g);
        pwEng = $('#password').val().search(/[a-z]/ig);
        pwSpe = $('#password').val().search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if($('#password').val() === '') {
            $('.password-help')[0].innerHTML = '';
        }
        else if($('#password').val().length < 8 && $('#password').val() !== '') {
            $('.password-help')[0].innerHTML = '비밀번호는 8자리 이상이어야 합니다.';
            $('.password-help')[0].style.color = 'red';
        } else if((pwNum < 0 && pwEng < 0) || (pwNum < 0 && pwSpe < 0) || (pwEng < 0 && pwSpe < 0)) {
            $('.password-help')[0].innerHTML = '비밀번호는 숫자, 영문, 특문 중 2가지 이상을 혼합해야 합니다.';
            $('.password-help')[0].style.color = 'red';
        } else {
            $('.password-help')[0].innerHTML = '적절한 비밀번호입니다.';
            $('.password-help')[0].style.color = 'green';
        }
    });
});
