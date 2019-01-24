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
          <br><button type="button" class="messaging-button complete-button" id="${button_id}" name="${message}">${message}</button>
  `;
  return (message_info);
}

function bot_messaging_button_checkbox(button_id, message) {
  let message_info = `
        <button type="button" class="messaging-button-checkbox" id="${button_id}" name="${message}"><input type="checkbox" id="${button_id}" class="checkbox" name="${message}"></input>${message}</button>
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
  roughMap = `<div>
    <a href= 'http://map.daum.net/link/search/${subway}' target='_blank' ><image class="image" src='${url}' style="width: 300px; height: 200px;"></image></a>
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
// function onLoad () {
// function googleSignOut() {

// function logout(loginValue) {
// function updateChatLog(socket_id) {
// function getChatLog(email) {

$(function () {

  var socket = io();

  // $('.get-started-button').click(function(){
  //   socket.emit('chat message button rule', '시작하기',$(this).attr('id'));
  //   $(".get-started-button").hide();
  //   // $("input").prop('disabled', false);
  // });

  // $('body').on('click', '.checkbox', (e) => {
  //   const clicked_id = `#${$(e.target).attr('id')}`;
  //   $(clicked_id).toggleClass('messaging-button-checkbox-checked');
  // });

  $('body').on('click', '.messaging-button', (e) => {
    if ($(e.target).attr('id') === 'decide_menu' || $(e.target).attr('id') === 'decide_drink') {
      $('#m').autocomplete('enable');
    } else {
      $('#m').autocomplete('disable');
    }
    if ($(e.target).attr('id') === ('mood2/') || $(e.target).attr('id') === ('exit/') || $(e.target).attr('id') === ('drink_type/')) {
      const checked_array = [];
      const checked_name_array = [];
      $('.checkbox:checked').each(function () {
        checked_array.push(this.id);
        checked_name_array.push(this.name);
      });
      if (checked_array.length === 0) {
        switch ($(e.target).attr('id')) {
          case 'mood2/':
            socket.emit('chat message button rule', $(e.target).attr('name'), 'no_mood2');
            break;
          case 'exit/':
            socket.emit('chat message button rule', $(e.target).attr('name'), 'no_exit');
            break;
          case 'drink_type/':
            socket.emit('chat message button rule', $(e.target).attr('name'), 'no_drink_type');
            break;
        }
      } else {
        socket.emit('chat message button rule', checked_name_array, ($(e.target).attr('id') + checked_array));
        $('.messaging-button').hide();
        $('.messaging-button-checkbox').hide();
        $('.messaging-button-checkbox').children('input[type=checkbox]').prop('checked', false);
      }
    } else {
      socket.emit('chat message button rule', $(e.target).attr('name'), $(e.target).attr('id'));
      $('.checkbox:checked').attr('checked', false);
      $('.messaging-button').hide();
      $('.messaging-button-checkbox').hide();
    }
  });

  $('body').on('click', '.messaging-button-checkbox', (e) => {
    if ($(e.target).attr('name') === '메뉴 고르기' || $(e.target).attr('name') === '술집 고르기') {
      $('#m').autocomplete('enable');
    } else {
      $('#m').autocomplete('disable');
    }
    if ($(e.target).attr('id') === '999' || $(e.target).attr('id') === '상관없음') {
      $('.messaging-button-checkbox:not(:hidden)').children('input[type=checkbox]').prop('checked', false);
      $('.messaging-button-checkbox:not(:hidden)').removeClass('messaging-button-checkbox-checked');
      $('.messaging-button-checkbox:not(:hidden)').children('input[type=checkbox]').removeClass('messaging-button-checkbox-checked');
      $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').prop('checked', true);
    } else {
      $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').prop('checked', false);
      $('.messaging-button-checkbox:not(:hidden)').first().removeClass('messaging-button-checkbox-checked');
      $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').removeClass('messaging-button-checkbox-checked');
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
    console.log("present date: "+Date.now());
    let user_email = String(Date.now()).substring(8)+String(socket_id).substring(0,5)+'@'+'jellylab.io';
    let user_pwd = "jellylab"+String(0);
    console.log("socket_id: "+socket_id);
    console.log("user_email: "+user_email);
    console.log("user_pwd: "+user_pwd);
    const info = {
        method: "POST",
        url: '/api/v1/users/previous_register_user',
        body: {
            kakao_id: socket_id,
            email: user_email,
            password: user_pwd,
        },
        success: function (res) {
            if (res.success){
                console.log("signUpReq: success!");
                // getChatLog(user_email);
                alert("비로그인 접속 완료!");
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
    // updateChatLog(socket_id);
    // $(".myText").val($("#messages")[0].outerHTML);
  });

  socket.on('chat message button checkbox', (socket_id, msg, ...args) => {
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    const args_length = args.length;
    for (let i = 0; i < args_length - 1; i += 1) {
      // basic_message.append(bot_messaging_button(args[i][0],args[i][1]));
      $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
    }
    $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
    $('.messaging-button-checkbox:not(:hidden)').first().click();
    $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').prop('checked', true);
    $('#messages').scrollTop(1E10);
    // updateChatLog(socket_id);
    // $(".myText").val($("#messages")[0].outerHTML);
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
    // updateChatLog(socket_id);
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
    // updateChatLog(socket_id);
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
    // updateChatLog(socket_id);
  });

  socket.on('chat message map', (msg, ...args) => {
      $('#messages').append(bot_messaging_map(msg, ...args)).children(':last');
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
      $('#messages').scrollTop(1e4);
    });

  socket.on('chat message button checkbox map', (socket_id, msg, ...args) => {
      if (args.length === 0) {
        $('#m').prop('disabled', false);
        $('#input-button').attr('disabled', false);
      } else {
        $('#m').prop('disabled', true);
        $('#input-button').attr('disabled', true);
      }
      $('#messages').append(bot_messaging(msg)).children(':last').hide()
        .fadeIn(150);
      const args_length = args.length;
      $('#messages').append(bot_messaging_map(args[0], args[1]));
      for (let i = 2; i < args_length - 1; i += 1) {
        // basic_message.append(bot_messaging_button(args[i][0],args[i][1]));
        $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
      }
      $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
      $('.messaging-button-checkbox:not(:hidden)').first().click();
      $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').prop('checked', true);
      $('#messages').scrollTop(1E10);
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
  // console.log("loginValue: "+ loginValue);
  if(loginValue === null){
    $('.social-signed-in')[0].style.display = 'none';
    $('.email-signed-in')[0].style.display = 'none';
    $('.update-password')[0].style.display = 'none';
  }
  else {
    // $('m').val(sessionStorage.getItem('email'));
    $('.social-signed-in')[0].style.display = 'block';
    $('.email-signed-in')[0].style.display = 'none';
    $('.update-password')[0].style.display = 'none';
  }
  loginValue = sessionStorage.getItem('login');
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
          // console.log('ajax call error: login page - verifyToken');
          // if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
          //     console.log("check your URL, method(GET/POST)");
          // }else if(e.status === 403){
          //     if (e.responseText.includes("No token provided.")) {
          //         console.log("No token, no problem.");
          //         alert('로그인해주세요.');
          //         location.href = '/login';
          //     }
          //     else if (e.responseText.includes("jwt malformed"))
          //         console.log("Malformed token");
          //     else if (e.responseText.includes("invalid signature"))
          //         console.log("Modified token");
          //     else console.log(e);
          // } else if(e.status === 0){
          //     if(navigator.onLine){
          //         console.log('status : 0');
          //     }else {
          //         console.log('internet disconnected');
          //         window.location.reload();
          //     }
          // } else{
          //     console.log('status: ' + e.status + ', message: ' + e.responseText);
          //     console.log(e);
          // }
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


  if (new Date().getHours() < 12) {
    nowTime = `오전 ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else if (new Date().getHours() === 12) {
    nowTime = `오후 ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else {
    nowTime = `오후 ${new Date().getHours()%12}:${new Date().getMinutes()}`;
  }
  $('.message-info .time')[0].innerHTML = nowTime;
})