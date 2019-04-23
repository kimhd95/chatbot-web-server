function onetimeLogout(param) {
    const info = {
      url: "/api/v1/users/logout",
      method: "POST",
      data: {
        'token': sessionStorage.getItem('social_token')
      },
      success: function (res) {
          if (res.success) {
              console.log('logout Request: success!');
              localStorage.clear();
              sessionStorage.clear();
              // alert('로그아웃 되었습니다.');
              if(param==='login'){
                window.location.replace(window.location.origin);
              } else if(param==='signup'){
                window.location.replace('/signup');
              } else{
                window.location.replace('/');
              }

          } else {
              console.log('logout Request: fail!');
              console.log(res);
              recheckTokenExist("로그아웃");
          }
      },
      error: function (e) {
          console.log('ajax call error: dashboard - LgOutReq');
          if(!navigator.onLine){
              console.log("internet disconnected");
              window.location.reload();
          } else{
              if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
                  console.log("check your URL, method(GET/POST)");
                  alert("로그아웃에 실패했습니다.");
              } else if(e.status===403 && e.responseText.includes("No token")){
                  console.log('No token given');
                  window.location.replace(window.location.origin);
              } else {
                  console.log("status: " + e.status+ ", message: " + e.responseText);
                  recheckTokenExist("로그아웃");
              }
          }
      }
    };
    sendTokenReq(info);
}

function logout(loginValue) {
  if (loginValue === '0' || loginValue === null) {
    const info = {
      url: "/api/v1/users/logout",
      method: "POST",
      data: {
        'token': sessionStorage.getItem('social_token')
      },
      success: function (res) {
          if (res.success) {
              console.log('logout Request: success!');
              localStorage.clear();
              sessionStorage.clear();
              alert('로그아웃 되었습니다.');
              window.location.replace(window.location.origin);
          } else {
              console.log('logout Request: fail!');
              console.log(res);
              recheckTokenExist("로그아웃");
          }
      },
      error: function (e) {
          console.log('ajax call error: dashboard - LgOutReq');
          if(!navigator.onLine){
              console.log("internet disconnected");
              window.location.reload();
          } else{
              if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
                  console.log("check your URL, method(GET/POST)");
                  alert("로그아웃에 실패했습니다.");
              } else if(e.status===403 && e.responseText.includes("No token")){
                  console.log('No token given');
                  window.location.replace(window.location.origin);
              } else {
                  console.log("status: " + e.status+ ", message: " + e.responseText);
                  recheckTokenExist("로그아웃");
              }
          }
      }
    };
    sendTokenReq(info);
  }
  // else if (loginValue === '1') {
  //   console.log('naver logout');
  //   alert('로그아웃 되었습니다.');
  //   sessionStorage.clear();
  //   localStorage.clear();
  //   location.href = '/';
  // } else if (loginValue === '2') {
  //   console.log('facebook logout');
  //   sessionStorage.clear();
  //   localStorage.clear();
  //   location.href = '/';
  // } else if (loginValue === '3') {
  //   console.log('google logout');
  //   googleSignOut();
  //   sessionStorage.clear();
  //   localStorage.clear();
  //   location.href = '/';
  // }

}

window.onpageshow = function(event) {
  if (event.persisted) {
    let emailValue = sessionStorage.getItem('email');
    let userinfo2 = {
        method: "POST",
        url: '/api/v1/users/update_state_email',
        body: {
            email: emailValue,
        },
        success: function (res) {
            if (res.success){
                console.log("updateStateReq: success!");
            }else {
                console.log("signUpReq: fail!");
                console.log(res);
            }
        },
        error: function(e) {
            console.log('ajax call error: signup page - updateStateReq');
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
    sendReq(userinfo2);
  }
}

$(document).ready(function(){
// $(document).ready(() => {

  let loginValue = sessionStorage.getItem('login');
  let emailValue = sessionStorage.getItem('email');

  if(loginValue===null && emailValue!==null && emailValue.split('@')[1]!=='jellylab.io'){
    sessionStorage.setItem('login', '0');
  }

  if(loginValue===null && emailValue!==null && emailValue.split('@')[1]==='jellylab.io'){
    onetimeLogout();
  }

  const info = {
      url: '/api/v1/users/verify_token',
      method: 'POST',
      data: null,
      async: true,
      crossDomain: true,
      redirect: 'follow',

      xhrFields: {
          withCredentials: true
      },
      success: function (res) {
          if (res.success) {
              console.log(res);
              console.log('verifyToken success');
              $('#question-name').val(res.name);
              if(sessionStorage.getItem('login')==='0' || sessionStorage.getItem('login')===null){
                sessionStorage.setItem('login', '0');
                sessionStorage.setItem('email', res.email);
                sessionStorage.setItem('name', res.name);
                $('#profile-name').addClass('.a');
                $('#profile-name').append(res.name + " 님");
                $('#profile-email').addClass('.a');
                $('#profile-email').append(res.email);
                $('#question-email').val(res.email);
              }
              // $('#question-content').attr("placeholder", "Type here to search");
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
                  alert('로그인해주세요.');
                  location.href = '/';
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
    }
    sendTokenReq(info);

  if(loginValue==='-1'){
    $('#profile').remove();
    $('#alarm-setting').remove();
    $('#wing-logout').remove();
    $('#wing-withdraw').remove();
    $('#wing-ask').css('margin-top','5vh');
    $('.alarm-space').css('height', '8vh');
    $('#wing-login').show();
    $('#wing-signup').show();
  }

  $('#wing-login').click(function(){
    onetimeLogout('login');
  })

  $('#wing-signup').click(function(){
    onetimeLogout('signup');
  })

  $('#choose-rest').click(function(){
    sessionStorage.setItem('stage', 'decide_menu');
    sessionStorage.setItem('name', '식당 고르기');
    console.log('restaurant choose');
    location.href='/chat';
  })

  $('#choose-drink').click(function(){
    sessionStorage.setItem('stage','decide_drink');
    sessionStorage.setItem('name', '술집 고르기');
    console.log('drink choose');
    location.href='/chat';
  })

  $('#choose-middle').click(function(){
    sessionStorage.setItem('stage','decide_place');
    sessionStorage.setItem('name', '중간지점 찾기(서울)');
    console.log('middle choose');
    location.href='/chat';
  })

  $('#choose-cafe').click(function(){
    sessionStorage.setItem('stage','decide_cafe');
    sessionStorage.setItem('name', '카페 고르기');
    console.log('cafe choose');
    location.href='/chat';
  })

  $('.nav').slideAndSwipe();

  $('#logout-btn').click(function(){
    console.log('logout clicked');
    logout(loginValue);
  })

  $('#withdraw-btn').click(function() {
    var password = prompt("비밀번호를 입력하세요", "");

    if(password === null) {
      console.log("취소");
    } else {
      if (confirm('정말 탈퇴하시겠습니까? 탈퇴하시면 모든 데이터가 소멸됩니다.')) {
        const info = {
          url: '/api/v1/users/member_withdraw',
          method: 'POST',
          body: {
            email: sessionStorage.getItem('email'),
            password: password
          },
          success: function(res) {
            if (res.success) {
              // if (sessionStorage.getItem('login') === '3') {
              //   googleSignOut();
              // }
              sessionStorage.clear();
              localStorage.clear();
              alert('탈퇴했습니다.');
              window.location.replace(res.redirect);
            }
          },
          error: function (e) {
            console.log(e.responseJSON);
            if(e.responseJSON.message.indexOf('not match') !== -1) {
              alert('비밀번호가 틀렸습니다.');
            }
          }
        }
        sendTokenReq(info);
      }
    }
  });

  const userinfo = {
      method: "POST",
      url: '/api/v1/users/update_state_email',
      body: {
          email: emailValue,
      },
      success: function (res) {
          if (res.success){
              console.log("updateStateReq: success!");
          }else {
              console.log("signUpReq: fail!");
              console.log(res);
          }
      },
      error: function(e) {
          console.log('ajax call error: signup page - updateStateReq');
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
  sendReq(userinfo);


  const list = ['강남역', '서울대입구역', '선릉역'];
  for (let i = 0; i < list.length; i++) {
    $('#station-list').append('<div class="stationname">' + list[i] + '</div>');
  }
});

$('.service-btn, #back-to-lobby-service').click(function(){
    $('.avail-slide').toggleClass('close');
  });

$('.onetoone-btn, #back-to-lobby-question').click(function(){
    $('.onetoone').toggleClass('close');
  });

$('#contents-btn').click(function(){
  location.href='/contents';
});

$("#toggle").change(function(){
  if($('#toggle').is(':checked')){
    console.log("checked");
  } else{
    console.log("unchecked");
  }
})

$('.question-send').click(function(){
  let email = $('#question-email').val(),
    name = $('#question-name').val(),
    subject = $('#question-subject').val(),
    text = $('#question-content').val();

  if (subject === null) {
    alert('문의 유형을 선택해주세요.');
    return;
  }
  if (text === '') {
    alert('내용을 입력해주세요.');
    return;
  }

  $('.question-send').attr('disabled', true);

  $.ajax({
    url: '/sendEmail',
    async: true,
    type: 'POST',
    data: {
      name: name,
      email: email,
      subject: subject,
      message: text
    },
    dataType: 'text',
    success: function () {
      alert('작성하신 문의가 성공적으로 전송되었습니다.');
      $('.question-send').attr('disabled', false);
      $('.onetoone').toggleClass('close');
      // $('#question-subject')[0].value = 'undefined';
      // $('#question-content')[0].value = '';
      // $('.dropdown').find('input').attr('value', $(this).attr('id'));
      // $('.dropdown').find('input').attr('value', $(this).attr('id'));
      // $('.custom-select').text('주제를 선택해주세요');
      // $('#question-subject').attr('value','-1');
      $('.init').prop('disabled', false);
      $('.init').prop('selected', false);
      $('.init').prop('selected', true);
      $('.init').prop('disabled', true);
      $('#question-content').val('');
    },
    error: function () {
      alert('전송에 실패했습니다.');
      $('.question-send').attr('disabled', false);
    }
  });
});


//
// if($('#toggle').is(':checked')){
//   console.log('checked');
// } else{
//   console.log('unchecked');
// }

var swiperImg = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  initialSlide: 0,
  // resistanceRatio: 0,
  slideToClickedSlide: false,
});
