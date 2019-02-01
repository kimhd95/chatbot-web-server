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
  } else if (loginValue === '1') {
    console.log('naver logout');
    alert('로그아웃 되었습니다.');
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/';
  } else if (loginValue === '2') {
    console.log('facebook logout');
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/';
  } else if (loginValue === '3') {
    console.log('google logout');
    googleSignOut();
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/';
  }

}

$(document).ready(() => {

  let loginValue = sessionStorage.getItem('login');
  let emailValue = sessionStorage.getItem('email');

  console.log(loginValue);
  console.log(emailValue);

  // if(loginValue===null){
  //   logout(loginValue);
  // }

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

  $('#content-1, #story-bar').click(function(){
    // $('.story').toggleClass('close');
    // if(!$('#story-container').hasClass('close')){
    //   console.log('open');
    //   var i;
    //   for(i=1;i<23;i++){
    //     $('#story-view').append(`<div class="picture" style="background-image: url('/contents/food_content_${i}.jpg');"></div>`);
    //   }
    //
    // } else{
    //   console.log('close');
    // }
    location.href='/contents';
  });

  // const name='chat_log';
  // const test={
  //   chat_log: 'hey',
  // }
  // console.log(test[name]);






  $('#choose-rest').click(function(){
    sessionStorage.setItem('stage', 'decide_menu');
    sessionStorage.setItem('name', '메뉴 고르기');
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

  $('#withdraw-btn').click(function(){
    console.log('withdraw clicked');
  })

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
              if(sessionStorage.getItem('login')==='0'){
                $('#profile-name').addClass('.a');
                $('#profile-name').append(res.name + " 님");
                $('#profile-email').addClass('.a');
                $('#profile-email').append(res.email);

                // $('#question-name').append(res.name);
                $('#question-email').val(res.email);
              }


              // $('#question-content').attr("placeholder", "Type here to search");
              // $('#question-email').append(res.email);
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
                  location.href = '/login';
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

});
