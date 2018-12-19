function bot_messaging(message){
  let date;
      let hour = new Date().getHours();
      let min = new Date().getMinutes();
      if (hour < 12) {
          if (min < 10) date = `오전 ${hour}:0${min}`;
          else date = `오전 ${hour}:${min}`;
      } else if (hour === 12) {
          if (min < 10) date = `오후 ${hour}:0${min}`;
          else date = `오후 ${hour}:${min}`;
      } else {
          if (min < 10) date = `오후 ${hour%12}:0${min}`;
          else date = `오후 ${hour%12}:${min}`;
      }
  var message_info = `<div class="bot-message">
      <div class="message-info">
          <img class="image" src="/images/poodle.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">
          <span class="name">푸들</span>
          <span class="time">${date}</span>
      </div>
      <div class="message-text">
          ${message}
      </div>

  </div>
  `;
  if($('.bot-message > .message-info > .time').last().text() === date){
    if($('#messages > div:last-child').attr('class') === 'bot-message'){
      message_info = `<div class="bot-message">
          <div class="message-text">
              ${message}
          </div>

      </div>
      `;
    }
  }
  return(message_info);
}

function bot_messaging_image(image){
  let date;
      let hour = new Date().getHours();
      let min = new Date().getMinutes();
      if (hour < 12) {
          if (min < 10) date = `오전 ${hour}:0${min}`;
          else date = `오전 ${hour}:${min}`;
      } else if (hour === 12) {
          if (min < 10) date = `오후 ${hour}:0${min}`;
          else date = `오후 ${hour}:${min}`;
      } else {
          if (min < 10) date = `오후 ${hour%12}:0${min}`;
          else date = `오후 ${hour%12}:${min}`;
      }
  var message_info = `<div class="bot-message">
      <div class="message-info">
          <img class="image" src="/images/poodle.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">
          <span class="name">푸들</span>
          <span class="time">${date}</span>
      </div>
          <img class="img-fluid rest-img" src="${image}"></img>
      </div>
  `;
  if($('.bot-message > .message-info > .time').last().text() === date){
    if($('#messages > div:last-child').attr('class') === 'bot-message'){
      message_info = `<div class="bot-message">
          <img class="img-fluid rest-img" src="${image}"></img>
      </div>
      `;
    }
  }
  return(message_info);
}

function bot_messaging_image_carousel(image){
  let carousel_id = 'carousel'+String(Math.floor(Math.random() * 10000) + 1);
  let date;
      let hour = new Date().getHours();
      let min = new Date().getMinutes();
      if (hour < 12) {
          if (min < 10) date = `오전 ${hour}:0${min}`;
          else date = `오전 ${hour}:${min}`;
      } else if (hour === 12) {
          if (min < 10) date = `오후 ${hour}:0${min}`;
          else date = `오후 ${hour}:${min}`;
      } else {
          if (min < 10) date = `오후 ${hour%12}:0${min}`;
          else date = `오후 ${hour%12}:${min}`;
      }
  var message_info = `<div class="bot-message">
        <div class="message-info">
            <img class="image" src="/images/poodle.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">
            <span class="name">푸들</span>
            <span class="time">${date}</span>
        </div>
          <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
            <div class="carousel-inner">
              <div class="carousel-item active">
              <img class="d-block w-100 rest-img" src="${image}" alt="First slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
              <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
    `;
  return(message_info);
}

function carousel_inner(image){
  var message_info = `
  <div class="carousel-item">
                <img class="d-block w-100 rest-img" src="${image}" alt="slide">
  </div>
  `;
  return(message_info);
}

function bot_messaging_button(button_id, message){
  var message_info = `
          <button type="button" class="messaging-button" id="${button_id}" name="${message}">${message}</button>
  `;
  return(message_info);
}

//TODO : 임시로 만들어 놓은 현재 접속자 -> 추후 삭제 해야함
function user_list_update(id){
  var message_info = `
  <p class="user_id">${id}</p>
  `;
  return(message_info);
}

function user_messaging(message){
    let date;
      let hour = new Date().getHours();
      let min = new Date().getMinutes();
      if (hour < 12) {
          if (min < 10) date = `오전 ${hour}:0${min}`;
          else date = `오전 ${hour}:${min}`;
      } else if (hour === 12) {
          if (min < 10) date = `오후 ${hour}:0${min}`;
          else date = `오후 ${hour}:${min}`;
      } else {
          if (min < 10) date = `오후 ${hour%12}:0${min}`;
          else date = `오후 ${hour%12}:${min}`;
      }
    var message_info = `<div class="user-message">
        <div class="message-info">
            <span class="time">${date}</span>
        </div>
        <div class="message-text">
          ${message}
        </div>
    </div>
  `;
  return(message_info);
}

function bot_messaging_card(res_name, res_type, food_name, naver_url, map_url, image, image2, image3){
      let carousel_id = 'carousel'+String(Math.floor(Math.random() * 10000) + 1);
      var message_info = `<div class="bot-message">
            <button type="button" class="btn btn-light arrow-left"><</button>
            <button type="button" class="btn btn-light arrow-right">></button>
            <div class="choice_carousel">
              <div class="choice_card">
                <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="rest-img" src="${image}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image2}" alt="slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image3}" alt="slide">
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                    <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              <div class="choice_card_content">
                <h5 class="card-title">${res_name}</h5>
                <p class="card-text">${res_type} / ${food_name}</p>
                <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
              </div>
            </div>
          </div>
      `;
  return(message_info);
}

function bot_messaging_card_inner(res_name, res_type, food_name, naver_url, map_url, image, image2, image3){
  let carousel_id = 'carousel'+String(Math.floor(Math.random() * 10000) + 1);
      var message_info = `
              <div class="choice_card">
                <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="rest-img" src="${image}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image2}" alt="slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image3}" alt="slide">
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                    <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
      `;
  return(message_info);
}

function bot_messaging_card_no_image(res_name, res_type, food_name, naver_url, map_url){
      var message_info = `<div class="bot-message">
            <button type="button" class="btn btn-light arrow-left"><</button>
            <button type="button" class="btn btn-light arrow-right">></button>
              <div class="choice_card">
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
          </div>
      `;
  return(message_info);
}

function bot_messaging_card_inner_no_image(res_name, res_type, food_name, naver_url, map_url){
  let carousel_id = 'carousel'+String(Math.floor(Math.random() * 10000) + 1);
      var message_info = `
              <div class="choice_card">
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
      `;
  return(message_info);
}
// google sdk load
function onLoad () {
  gapi.load('auth2', () => {
      gapi.auth2.init();
  });
}
// google logout
function googleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
  });
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

$(function () {

  var socket = io();

  // $('.get-started-button').click(function(){
  //   socket.emit('chat message button rule', '시작하기',$(this).attr('id'));
  //   $(".get-started-button").hide();
  //   // $("input").prop('disabled', false);
  // });


  $('.card-body').on('click', '.messaging-button', function(e) {
     if($(e.target).attr('name') === '메뉴 고르기'){
       $('#m').autocomplete( "enable" );
     }else{
       $('#m').autocomplete( "disable" );
     }
     socket.emit('chat message button rule', $(e.target).attr('name'),$(e.target).attr('id'));
     $(".messaging-button").hide();
  });

  $('.card-body').on('click', '.messaging-button-check', function(e) {
     if($(e.target).attr('name') === '메뉴 고르기'){
       $('#m').autocomplete( "enable" );
     }else{
       $('#m').autocomplete( "disable" );
     }
     // socket.emit('chat message button rule', $(e.target).attr('name'),$(e.target).attr('id'));
     $(e.target).children('input[type=checkbox]').click();
     // $(".messaging-button").hide();
  });

  $('form').submit(function(){
    if($('#m').val() === "버튼보여줘"){
      socket.emit('chat message button', $('#m').val());
      $("input").prop('disabled', true);

    }else{
    socket.emit('chat message', $('#m').val());
    }
    $('#m').val('');
    return false;
  });

  socket.on('chat register', function(socket_id){
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
              const info = {
                  method: "POST",
                  url: '/api/v1/users/update_socket',
                  body: {
                      email: res.email,
                      socket_id: socket_id,
                  },
                  success: function (res) {
                      if (res.success){
                          console.log("signUpReq: success!");
                          alert("소켓정보 업데이트 완료.");
                      }else {
                          console.log("signUpReq: fail!");
                          console.log(res);
                      }
                  },
                  error: function(e) {
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

  socket.on('chat message', function(answer){
          $('#messages').append(bot_messaging(answer));
          $("#messages").scrollTop(1e4);
        });

  socket.on('chat message_self', function(msg){
          $('#messages').append(user_messaging(msg));
          // $('#messages').append($('<li>').text(answer));
          // window.scrollTo(0, document.body.scrollHeight);
        });

  //TODO : 임시로 만들어 놓은 현재 접속자 -> 추후 삭제 해야함
  socket.on('user_list', function(clients){
          $('.user_id').remove();
          clients.forEach(function(elements){
            $('#user_list').append(user_list_update(elements));
          });
        });

  socket.on('chat message button', function(msg, ...args){
          let basic_message = $('#messages').append(bot_messaging(msg));
          for(var i = 0; i<args.length; i++){
            // basic_message.append(bot_messaging_button(args[i][0],args[i][1]));
            $('#messages').append(bot_messaging_button(args[i][0],args[i][1]));
          }
          if(args.length === 0){
            $("input").prop('disabled', false);
            $("#input-button").attr("disabled", false);
          }else{
            $("input").prop('disabled', true);
            $("#input-button").attr("disabled", true);
          }
            $("#messages").scrollTop(1e4);
            // $(".myText").val($("#messages")[0].outerHTML);
        });

  socket.on('chat message image', function(msg, button1, button2, ...args){
          $('#messages').append(bot_messaging_image_carousel(args[0]));
          for(var i = 0; i<args[1]-1; i++){
            $('.carousel-inner').last().append(carousel_inner(args[2][i]));
          }

          $('#messages').append(bot_messaging(msg)).scrollTop(1e4);
          $('#messages').append(bot_messaging_button(button1[0],button1[1])).append(bot_messaging_button(button2[0],button2[1]));

          $("input").prop('disabled', true);
          setTimeout(function(){
            $('#messages').scrollTop(1e4);
          }, 100); //execute your function after 2 seconds.
        });

  socket.on('chat message card', function(button1, button2, button3, beer1, beer2){
          $('#messages').append(bot_messaging_card(beer1[0],beer1[1],beer1[2],beer1[3],beer1[4],beer1[5],beer1[6],beer1[7]));
          $('.choice_carousel').last().append(bot_messaging_card_inner(beer2[0],beer2[1],beer2[2],beer2[3],beer2[4],beer2[5],beer2[6],beer2[7]));
          $('#messages').append(bot_messaging_button(button1[0],button1[1])).append(bot_messaging_button(button2[0],button2[1])).append(bot_messaging_button(button3[0],button3[1]));
          if(button1[0] === 'semi_final2/1' || button1[0] === 'final/1'){
            $(".choice_card").eq(-2).prepend("<img class='choice_card_winner' src='/images/white.png'></img>");
          }
          $("input").prop('disabled', true);
          $("#input-button").attr("disabled", true);
          setTimeout(function(){
            $('#messages').scrollTop(1e4);
          }, 100); //execute your function after 2 seconds.
        });

  socket.on('chat message card no image', function(button1, button2, button3, beer1, beer2){
          $('#messages').append(bot_messaging_card(beer1[0],beer1[1],beer1[2],beer1[3],beer1[4]));
          $('.choice_carousel').last().append(bot_messaging_card_inner(beer2[0],beer2[1],beer2[2],beer2[3],beer2[4]));
          $('#messages').append(bot_messaging_button(button1[0],button1[1])).append(bot_messaging_button(button2[0],button2[1])).append(bot_messaging_button(button3[0],button3[1]));
          if(button1[0] === 'semi_final2/1' || button1[0] === 'final/1'){
            $(".choice_card").eq(-2).prepend("<img class='choice_card_winner' src='/images/white.png'></img>");
          }
          $("input").prop('disabled', true);
          setTimeout(function(){
            $('#messages').scrollTop(1e4);
          }, 100); //execute your function after 2 seconds.
        });
});



$(document).ready(() => {
  let loginValue = sessionStorage.getItem('login');
  if (loginValue === '0') {
    $('.social-signed-in')[0].style.display = 'none';
    $('.email-signed-in')[0].style.display = 'block';
    $('.update-password')[0].style.display = 'block';
  } else {
    // $('m').val(sessionStorage.getItem('email'));
    $('.social-signed-in')[0].style.display = 'block';
    $('.email-signed-in')[0].style.display = 'none';
    $('.update-password')[0].style.display = 'none';
  }
  if (loginValue === '0') {
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
  }




  let cache = {};
  let nowTime;
  $('.card-body').on('click', '.arrow-right', function(){
    $(this).siblings('.choice_carousel').animate({
    scrollLeft: "+=150px"
    }, 300);
  });

  $('.card-body').on('click', '.arrow-left', function(){
    $(this).siblings('.choice_carousel').animate({
    scrollLeft: "-=150px"
    }, 300);
  });

  $('#m').autocomplete({
    source: function( request, response ) {
      let term = request.term;
      if ( term in cache ) {
        response( cache[ term ] );
        return;
      }

      $.getJSON( "http://devbotfood.jellylab.io:6001/api/v1/users/get_all_subway", request, function( data, status, xhr ) {
        cache[ term ] = data;
        response( data );
      });
    },
    // source: 'http://devbotfood.jellylab.io:6001/api/v1/users/get_all_subway',
    appendTo: ".card-footer",
    autoFocus: false,
    position: { my : "right bottom", at: "right top" },
  });

  $('#logout-btn').click(() => {
    logout(loginValue);
  });

  $('#withdraw-btn').click(() => {
    if (confirm('정말 탈퇴하시겠습니까? 탈퇴하시면 모든 데이터가 소멸됩니다.')) {
      const info = {
        url: '/api/v1/users/member_withdraw',
        method: 'POST',
        body: {
          email: sessionStorage.getItem('email')
        },
        success: function(res) {
          if (res.success) {
            if (sessionStorage.getItem('login') === '3') {
              googleSignOut();
            }
            sessionStorage.clear();
            localStorage.clear();
            alert('탈퇴했습니다.');
            window.location.replace(res.redirect);
          }
        },
        error: function (e) {
          console.log(e.responseJSON);
        }
      }

      sendReq(info);
    }
  })

  $('.decide-withdrawl').click(() => {
    if (confirm('정말 탈퇴하시겠습니까? 탈퇴하시면 모든 데이터가 소멸됩니다.')) {
      const info = {
        url: '/api/v1/users/member_withdraw',
        method: 'POST',
        body: {
          email: sessionStorage.getItem('email'),
          password: $('.password').val()
        },
        success: function(res) {
          if (res.success) {
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
      sendReq(info);
    }
  })

  $('.decide-update-password').click(() => {
    if ($('.cur-password').val() === '') {
      alert('현재 비밀번호를 입력하세요.');
      return;
    }
    if ($('.new-password').val() === '') {
      alert('새 비밀번호를 입력하세요.');
      return;
    }
    if ($('.verify-new-password').val() === '') {
      alert('새 비밀번호(확인)을 입력하세요.');
      return;
    }
    if ($('.new-password').val() !== $('.verify-new-password').val()) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    const info = {
      url: '/api/v1/users/update_password',
      method: 'POST',
      body: {
        email: sessionStorage.getItem('email'),
        curPassword: $('.cur-password').val(),
        newPassword: $('.new-password').val(),
      },
      success: function (res) {
        if (res.success) {
          alert('비밀번호가 변경되었습니다. 변경된 비밀번호로 로그인 바랍니다.');
          $('.decide-update-password').attr('data-dismiss', 'modal');
          $('#config-modal').on('hidden.bs.modal', () => {
            $('.decide-update-password').removeAttr('data-dismiss');
          })
          logout(loginValue);
        }
      },
      error: function (e) {
        if (e.responseJSON.message.indexOf('current') !== -1) {
          alert('현재 비밀번호가 잘못되었습니다.');
          return;
        }
        else if (e.responseJSON.message.indexOf('longer') !== -1) {
          alert('비밀번호는 8자리 이상이어야 합니다.');
          return;
        }
        else if (e.responseJSON.message.indexOf('digit') !== -1) {
          alert('비밀번호는 숫자, 영문, 특수문자 중 2가지 이상을 혼합해야 합니다.');
          return;
        }
        else {
          alert('비밀번호가 제대로 전달되지 못했습니다. 네트워크를 확인해주세요.');
          return;
        }
      }
    }
    sendTokenReq(info);

  })
  if (new Date().getHours() < 12) {
    nowTime = `오전 ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else if (new Date().getHours() === 12) {
    nowTime = `오후 ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else {
    nowTime = `오후 ${new Date().getHours()%12}:${new Date().getMinutes()}`;
  }
  $('.message-info .time')[0].innerHTML = nowTime;
})
