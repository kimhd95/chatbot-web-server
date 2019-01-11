function bot_messaging(message) {
  let date;
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  if (hour < 12) {
    if (min < 10) date = `오전 ${hour}:0${min}`;
    else date = `오전 ${hour}:${min}`;
  } else if (hour === 12) {
    if (min < 10) date = `오후 ${hour}:0${min}`;
    else date = `오후 ${hour}:${min}`;
  } else if (min < 10) date = `오후 ${hour % 12}:0${min}`;
  else date = `오후 ${hour % 12}:${min}`;
  let message_info = `<div class="bot-message">
      <div class="message-info">
          <img class="image" src="/images/poodle.png" alt="푸들" style="width: 30px; height: 30px; border-radius: 50%;">
          <span class="name">푸들</span>
          <span class="time">${date}</span>
      </div>
      <div class="message-text">
          ${message}
      </div>

  </div>
  `;
  if ($('.bot-message > .message-info > .time').last().text() === date) {
    if ($('#messages > div:last-child').attr('class') === 'bot-message') {
      message_info = `<div class="bot-message">
          <div class="message-text">
              ${message}
          </div>

      </div>
      `;
    }
  }
  return (message_info);
}

function bot_messaging_image(image) {
  let date;
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  if (hour < 12) {
    if (min < 10) date = `오전 ${hour}:0${min}`;
    else date = `오전 ${hour}:${min}`;
  } else if (hour === 12) {
    if (min < 10) date = `오후 ${hour}:0${min}`;
    else date = `오후 ${hour}:${min}`;
  } else if (min < 10) date = `오후 ${hour % 12}:0${min}`;
  else date = `오후 ${hour % 12}:${min}`;
  let message_info = `<div class="bot-message">
      <div class="message-info">
          <img class="image" src="/images/poodle.png" alt="푸들" style="width: 30px; height: 30px; border-radius: 50%;">
          <span class="name">푸들</span>
          <span class="time">${date}</span>
      </div>
          <img class="img-fluid rest-img" src="${image}"></img>
      </div>
  `;
  if ($('.bot-message > .message-info > .time').last().text() === date) {
    if ($('#messages > div:last-child').attr('class') === 'bot-message') {
      message_info = `<div class="bot-message">
          <img class="img-fluid rest-img" src="${image}"></img>
      </div>
      `;
    }
  }
  return (message_info);
}

function bot_messaging_image_carousel(image) {
  const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  let date;
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  if (hour < 12) {
    if (min < 10) date = `오전 ${hour}:0${min}`;
    else date = `오전 ${hour}:${min}`;
  } else if (hour === 12) {
    if (min < 10) date = `오후 ${hour}:0${min}`;
    else date = `오후 ${hour}:${min}`;
  } else if (min < 10) date = `오후 ${hour % 12}:0${min}`;
  else date = `오후 ${hour % 12}:${min}`;
  const message_info = `<div class="bot-message">
      <div class="message-info">
          <img class="image" src="/images/poodle.png" alt="푸들" style="width: 30px; height: 30px; border-radius: 50%;">
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
  return (message_info);
}

function carousel_inner(image) {
  const message_info = `
  <div class="carousel-item">
                <img class="d-block w-100 rest-img" src="${image}" alt="slide">
  </div>
  `;
  return (message_info);
}

function bot_messaging_button(button_id, message) {
  const message_info = `
          <button type="button" class="messaging-button" id="${button_id}" name="${message}">${message}</button>
  `;
  return (message_info);
}

function bot_messaging_button_finish_checkbox(button_id, message) {
  const message_info = `
          <br><button type="button" class="messaging-button" style="border: 1px solid #E20000; color: white; background-color: #E20000; border-radius: 5px; padding-left: 25px; padding-right: 25px;" id="${button_id}" name="${message}">${message}</button>
  `;
  return (message_info);
}

function bot_messaging_button_checkbox(button_id, message) {
  const quarter = button_id.slice(-1);
  const identifier = Math.floor((Math.random() * 90) + 10) + quarter;
  console.log(identifier);
  const message_info = `
        <button type="button" class="messaging-button-checkbox" id="${button_id}" name="${message}"><input type="checkbox" id="${button_id}" class="checkbox"></input>${message}</button>
  `;
  return (message_info);
}

// TODO : 임시로 만들어 놓은 현재 접속자 -> 추후 삭제 해야함
function user_list_update(id) {
  const message_info = `
  <p class="user_id">${id}</p>
  `;
  return (message_info);
}


function user_messaging(message) {
  let date;
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  if (hour < 12) {
    if (min < 10) date = `오전 ${hour}:0${min}`;
    else date = `오전 ${hour}:${min}`;
  } else if (hour === 12) {
    if (min < 10) date = `오후 ${hour}:0${min}`;
    else date = `오후 ${hour}:${min}`;
  } else if (min < 10) date = `오후 ${hour % 12}:0${min}`;
  else date = `오후 ${hour % 12}:${min}`;
  const message_info = `<div class="user-message">
      <div class="message-info">
          <span class="time">${date}</span>
      </div>
      <div class="message-text">
        ${message}
      </div>
  </div>
`;
  return (message_info);
}

function bot_messaging_card(res_name, res_type, food_name, naver_url, map_url, image, image2, image3) {
  const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  const message_info = `<div class="bot-message">
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
  return (message_info);
}

function bot_messaging_card_inner(res_name, res_type, food_name, naver_url, map_url, image, image2, image3) {
  const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  const message_info = `
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
  return (message_info);
}

function bot_messaging_card_no_image(res_name, res_type, food_name, naver_url, map_url) {
  const message_info = `<div class="bot-message">
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
  return (message_info);
}

function bot_messaging_card_inner_no_image(res_name, res_type, food_name, naver_url, map_url) {
  // const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  const message_info = `
              <div class="choice_card">
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
      `;
  return (message_info);
}

function bot_messaging_map(subway, url){
  let roughMap;
  console.log(subway);
  roughMap = `<div>
    <a href='http://map.daum.net/link/search/${subway}' target='_blank' ><image class="image" src='${url}' style="width: 300px; height: 200px;"></image></a>
    <p>이미지 클릭시 지도 자세히 보기</p>
   </div> `;
  return roughMap;
}

function bot_messaging_loader(loader_id) {
  let date;
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  if (hour < 12) {
    if (min < 10) date = `오전 ${hour}:0${min}`;
    else date = `오전 ${hour}:${min}`;
  } else if (hour === 12) {
    if (min < 10) date = `오후 ${hour}:0${min}`;
    else date = `오후 ${hour}:${min}`;
  } else if (min < 10) date = `오후 ${hour % 12}:0${min}`;
  else date = `오후 ${hour % 12}:${min}`;
  let message_info = `<div class="bot-message">
      <div id="${loader_id}" class="message-text">
        <img class="loader" src="/images/loader.gif" alt="loader"></img>
      </div>
  </div>
  `;
  if ($('.bot-message > .message-info > .time').last().text() === date) {
    if ($('#messages > div:last-child').attr('class') === 'bot-message') {
      message_info = `<div class="bot-message">
          <div id="${loader_id}" class="message-text">
            <img class="loader" src="/images/loader.gif" alt="loader"></img>
          </div>
      </div>
      `;
    }
  }
  return (message_info);
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

function updateChatLog(socket_id) {
    const chat_log = $("#messages")[0].innerHTML;
    const info = {
        method: "POST",
        url: '/api/v1/users/update_user',
        body: {
            kakao_id: socket_id,
            chat_log: chat_log,
        },
        success: function (res) {
            if (res.success){
                console.log("update chatlog: success!");
            }else {
                console.log("updatechatlog: fail!");
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
            alert(e.responseText);
        }
    };
    sendReq(info);
}

function getChatLog(email) {
    const info = {
        method: "POST",
        url: '/api/v1/users/get_chat_log',
        body: {
            email: email,
        },
        success: function (res) {
            if (res.success){
                console.log("get chatlog: success!");
                const init_html = `<hr><br>
                  <div class="bot-message">
                    <div class="message-info">
                        <img class="image" src="/images/poodle.png" alt="푸들" style="width: 30px; height: 30px; border-radius: 50%;">
                        <span class="name">푸들</span>
                        <span class="time"></span>
                    </div>
                    <div class="message-text">
                        안녕! 나는 결정장애를 치료해주는 음식결정 챗봇 푸들이야!
                    </div>
                    <br>
                    <div class="message-button">
                        <button type="button" class="messaging-button" id="decide_menu" name="메뉴 고르기">메뉴 고르기</button>
                        <button type="button" class="messaging-button" id="decide_place" name="중간지점 찾기(서울)">중간지점 찾기(서울)</button>
                        <button type="button" class="messaging-button" id="decide_history" name="기록 보기">기록 보기</button>
                        <button type="button" class="messaging-button" id="user_feedback" name="개발팀에게 피드백하기">개발팀에게 피드백하기</button>
                        <button type="button" class="messaging-button" id="chitchat" name="푸들이랑 대화하기">푸들이랑 대화하기</button>
                    </div>
                </div>`;
                let user_html = res.message;
                if (user_html !== null) {
                  if (res.disconn_type === 'permanent') {
                    $('#messages').html(user_html+init_html);
                    $(".bot-message").css({ opacity: 1 });
                    $(".user-message").css({ opacity: 1 });
                    $('.messaging-button').hide();
                    $('.messaging-button').slice(-5).show();
                  } else {
                    $('#messages').html(user_html);
                    $(".bot-message").css({ opacity: 1 });
                    $(".user-message").css({ opacity: 1 });
                    // $('.messaging-button').hide();
                    if ($('#messages').children().last().attr('class') !== 'messaging-button' && $('#messages').children().last().attr('class') !== 'message-button') {
                      $('#m').prop('disabled', false);
                      $('#input-button').attr('disabled', false);
                    }
                  }
                  $('#messages').scrollTop(1E10);
                }
            }else {
                console.log("getchatlog: fail!");
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
            alert("채팅로그 불러오기가 실패했습니다.");
        }
    };
    sendReq(info);
}

$(function () {

  var socket = io();

  // $('.get-started-button').click(function(){
  //   socket.emit('chat message button rule', '시작하기',$(this).attr('id'));
  //   $(".get-started-button").hide();
  //   // $("input").prop('disabled', false);
  // });

  $('body').on('click', '.messaging-button', (e) => {
    if ($(e.target).attr('id') === 'decide_menu') {
      $('#m').autocomplete('enable');
    } else {
      $('#m').autocomplete('disable');
    }
    const checked_array = [];
    if ($(e.target).attr('id') === ('mood2/') || $(e.target).attr('id') === ('exit/')) {
      $('.checkbox:checked').each(function () {
        checked_array.push(this.id);
      });
      if (checked_array.length === 0) {
        if ($(e.target).attr('id') === ('mood2/')) {
          socket.emit('chat message button rule', $(e.target).attr('name'), 'no_mood2');
        } else {
          socket.emit('chat message button rule', $(e.target).attr('name'), 'no_exit');
        }
      } else {
        socket.emit('chat message button rule', $(e.target).attr('name'), ($(e.target).attr('id') + checked_array));
        $('.messaging-button').hide();
        $('.messaging-button-checkbox').hide();
      }
    } else {
      socket.emit('chat message button rule', $(e.target).attr('name'), $(e.target).attr('id'));
      $('.checkbox:checked').attr('checked', false);
      $('.messaging-button').hide();
      $('.messaging-button-checkbox').hide();
    }
  });

  $('body').on('click', '.messaging-button-checkbox', (e) => {
    if ($(e.target).attr('name') === '메뉴 고르기') {
      $('#m').autocomplete('enable');
    } else {
      $('#m').autocomplete('disable');
    }
    $(e.target).children('input[type=checkbox]').click();
    $(e.target).toggleClass('messaging-button-checkbox-checked');
    $(e.target).children('input[type=checkbox]').toggleClass('messaging-button-checkbox-checked');
  });

  $('body').on("submit", "form", function(){
    if($('#m').val() === "버튼보여줘"){
      socket.emit('chat message button', $('#m').val());
      $("input").prop('disabled', true);

    }else{
    socket.emit('chat message', $('#m').val());
    }
    $('#m').val('');
    return false;
  });


  // $('form').submit(function(){
  //   alert('됨');
  //   if($('#m').val() === "버튼보여줘"){
  //     socket.emit('chat message button', $('#m').val());
  //     $("input").prop('disabled', true);
  //
  //   }else{
  //   socket.emit('chat message', $('#m').val());
  //   }
  //   $('#m').val('');
  //   return false;
  // });

  socket.on('chat register', function(socket_id){
    let user_email = sessionStorage.getItem('email');
    const info = {
        method: "POST",
        url: '/api/v1/users/update_socket',
        body: {
            email: user_email,
            socket_id: socket_id,
        },
        success: function (res) {
            if (res.success){
                console.log("signUpReq: success!");
                getChatLog(user_email);
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
  });

  socket.on('chat message', (answer) => {
    $('#messages').append(bot_messaging(answer));
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message_self', (msg) => {
    $('#messages').append(user_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    // $('#messages').append($('<li>').text(answer));
    // window.scrollTo(0, document.body.scrollHeight);
  });

  // TODO : 임시로 만들어 놓은 현재 접속자 -> 추후 삭제 해야함
  socket.on('user_list', (clients) => {
    $('.user_id').remove();
    clients.forEach((elements) => {
      $('#user_list').append(user_list_update(elements));
    });
  });

  socket.on('chat message button', (socket_id, msg, ...args) => {
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    for (let i = 0; i < args.length; i += 1) {
      // basic_message.append(bot_messaging_button(args[i][0],args[i][1]));
      $('#messages').append(bot_messaging_button(args[i][0], args[i][1]));
    }
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').scrollTop(1E10);
    updateChatLog(socket_id);
    // $(".myText").val($("#messages")[0].outerHTML);
  });

  socket.on('chat message button checkbox', (socket_id, msg, ...args) => {
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    const args_length = args.length;
    for (let i = 0; i < args_length - 1; i += 1) {
      // basic_message.append(bot_messaging_button(args[i][0],args[i][1]));
      $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
    }
    $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').scrollTop(1E10);
    updateChatLog(socket_id);
    // $(".myText").val($("#messages")[0].outerHTML);
  });

  socket.on('chat message map', (msg, ...args) => {
      $('#messages').append(bot_messaging_map(msg, ...args)).children(':last');
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
      $('#messages').scrollTop(1e4);
    });

  socket.on('chat message button checkbox map', (socket_id, msg, ...args) => {
      $('#messages').append(bot_messaging(msg)).children(':last').hide()
        .fadeIn(150);
      const args_length = args.length;
      $('#messages').append(bot_messaging_map(args[0], args[1]));
      for (let i = 2; i < args_length - 1; i += 1) {
        // basic_message.append(bot_messaging_button(args[i][0],args[i][1]));
        $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
      }
      $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
      if (args.length === 0) {
        $('#m').prop('disabled', false);
        $('#input-button').attr('disabled', false);
      } else {
        $('#m').prop('disabled', true);
        $('#input-button').attr('disabled', true);
      }
      $('#messages').scrollTop(1E10);
      updateChatLog(socket_id);
  });

  socket.on('chat message image', (socket_id, msg, button1, button2, ...args) => {
    $('#messages').append(bot_messaging_image_carousel(args[0]));
    for (let i = 0; i < args[1] - 1; i += 1) {
      $('.carousel-inner').last().append(carousel_inner(args[2][i]));
    }
    $('#messages').append(bot_messaging(msg)).scrollTop(1E10);
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1]));
    $('#m').prop('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100); // execute your function after 2 seconds.
    updateChatLog(socket_id);
  });

  socket.on('chat message card', (socket_id, button1, button2, button3, beer1, beer2) => {
    $('#messages').append(bot_messaging_card(beer1[0], beer1[1], beer1[2], beer1[3], beer1[4], beer1[5], beer1[6], beer1[7]));
    $('.choice_carousel').last().append(bot_messaging_card_inner(beer2[0], beer2[1], beer2[2], beer2[3], beer2[4], beer2[5], beer2[6], beer2[7]));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1])).append(bot_messaging_button(button3[0], button3[1]));
    $('#m').prop('disabled', true);
    $('#input-button').attr('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100); // execute your function after 2 seconds.
    updateChatLog(socket_id);
  });

  socket.on('chat message card no image', (socket_id, button1, button2, button3, beer1, beer2) => {
    $('#messages').append(bot_messaging_card(beer1[0], beer1[1], beer1[2], beer1[3], beer1[4]));
    $('.choice_carousel').last().append(bot_messaging_card_inner(beer2[0], beer2[1], beer2[2], beer2[3], beer2[4]));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1])).append(bot_messaging_button(button3[0], button3[1]));
    // if(button1[0] === 'semi_final2/1' || button1[0] === 'final/1'){
    //   $(".choice_card").eq(-2).prepend("<img class='choice_card_winner' src='/images/white.png'></img>");
    // }
    $('#m').prop('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100); // execute your function after 2 seconds.
    updateChatLog(socket_id);
  });

  socket.on('chat message loader', (time) => {
      const loader_id = `loader${String(Math.floor(Math.random() * 10000) + 1)}`;
      $('#messages').append(bot_messaging_loader(loader_id)).children(':last').hide()
        .fadeIn(150);
      $(`#${loader_id}`).delay(time + 300).fadeOut(150);
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
      $('#messages').scrollTop(1E10);
      // $(".myText").val($("#messages")[0].outerHTML);
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
    minLength: 0,
    source: function( request, response ) {
      let term = request.term;
      let cache = {};
      if ( term in cache ) {
        response( cache[ term ] );
        return;
      }

      let user_email = sessionStorage.getItem('email');
      if (term === '') {
        $.getJSON( "http://devbotfood.jellylab.io:6001/api/v1/users/get_subway_list_history?email="+user_email, request, function( data, status, xhr ) {
          cache[ term ] = data;
          response( data );
        });
      } else {
        $.getJSON( "http://devbotfood.jellylab.io:6001/api/v1/users/get_all_subway", request, function( data, status, xhr ) {
          cache[ term ] = data;
          response( data );
        });
      }
    },
    select: function(event, ui) {
            if(ui.item.subway) {
              $('#m').val(ui.item.subway);
              $('#input-button').click();
            } else {
              $('#m').val(ui.item.value);
              $('#input-button').click();
            }
            return false;
    },
    focus: function(event, ui) {
            if(ui.item.subway) {
              $('#m').val(ui.item.subway);
            } else {
              $('#m').val(ui.item.value);
            }
            return false;
    },
    appendTo: ".card-footer",
    autoFocus: false,
    position: { my : "right bottom", at: "right top" },
  }).data('ui-autocomplete')._renderItem = function(ul, item) {
    if(item.subway) {
      return $('<li></li>')
          .data('ui-autocomplete-item', item)
          .append('<div style="display:flex; justify-content:space-between;"><span>' + item.subway + '</span>' + '<span>' + item.date + '</span></div>')
          .appendTo(ul);
    } else {
      return $('<li></li>')
          .data('ui-autocomplete-item', item)
          .append(`<div>${item.value}</div>`)
          .appendTo(ul);
    }
  };

  $('#m').focus(function(){
     		$(this).autocomplete("search", $(this).val());
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
