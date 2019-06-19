function getToday() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  let day;
  switch (new Date().getDay()) {
    case 0:
      day = '일요일';
      break;
    case 1:
      day = '월요일';
      break;
    case 2:
      day = '화요일';
      break;
    case 3:
      day = '수요일';
      break;
    case 4:
      day = '목요일';
      break;
    case 5:
      day = '금요일';
      break;
    case 6:
      day = '토요일';
      break;
  }
  return `${year}년  ${month}월  ${date}일  ${day}`;
}

function getTime() {
  let date;
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  if (hour < 12) {
    if (min < 10) date = `오전 ${hour}:0${min}`;
    else date = `오전 ${hour}:${min}`;
  } else if (hour === 12) {
    if (min < 10) date = `오후 ${hour}:0${min}`;
    else date = `오후 ${hour}:${min}`;
  } else if (min < 10) {
    date = `오후 ${hour % 12}:0${min}`;
  } else {
    date = `오후 ${hour % 12}:${min}`;
  }
  return date;
}

function bot_messaging(message) {
  let message_info = `<div class="bot-message">
      <div class="message-text">
          ${message}
      </div>
  </div>
  `;
  return (message_info);
}

function bot_messaging_image(image) {
  let message_info = `<div class="bot-message">
          <img class="img-fluid rest-img" src="${image}"></img>
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

function user_messaging(message) {
  let date = getTime();
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
  } else if (min < 10) {
    date = `오후 ${hour % 12}:0${min}`;
  } else {
    date = `오후 ${hour % 12}:${min}`;
  }
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

let loginValue = sessionStorage.getItem('login');
let clickNum=0;

$(function () {
  var socket = io();

  $('body').on('click', '.messaging-button', (e) => {
    console.log($(e.target).attr('id'), $(e.target).attr('name'));
    socket.emit('chat message tour', $(e.target).attr('id'), sessionStorage, $(e.target).attr('name'));
    $('.checkbox:checked').attr('checked', false);
    $('.messaging-button').hide();
    $('.messaging-button-colored').hide();
    $('.messaging-button-checkbox').hide();
  });


  $('body').on('click', '.messaging-button-checkbox', (e) => {
    if ($(e.target).attr('name') === '메뉴 고르기' || $(e.target).attr('name') === '술집 고르기') {
      $('#m').autocomplete('enable');
    } else {
      $('#m').autocomplete('disable');
    }
    if ($(e.target).attr('id') === '999' || $(e.target).attr('id') === '998' || $(e.target).attr('id') === '900' || $(e.target).attr('id') === '888' || $(e.target).attr('id') === '상관없음' || $(e.target).attr('id') === '없음') {
      clickNum=0;
      $('.messaging-button-checkbox:not(:hidden)').children('input[type=checkbox]').prop('checked', false);
      $('.messaging-button-checkbox:not(:hidden)').removeClass('messaging-button-checkbox-checked');
      $('.messaging-button-checkbox:not(:hidden)').children('input[type=checkbox]').removeClass('messaging-button-checkbox-checked');
      $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').prop('checked', true);
      $('.messaging-button').hide();
      $('.messaging-button-colored').hide();
      $('.messaging-button-checkbox').hide();
    }

    if($(e.target).children('input[type=checkbox]').prop('checked')){
      $(e.target).children('input[type=checkbox]').prop('checked', false);
      $(e.target).toggleClass('messaging-button-checkbox-checked');
      // $(e.target).children('input[type=checkbox]').toggleClass('messaging-button-checkbox-checked');
      console.log($(e.target).attr('id'));
      console.log("체크박스 선택 해제");
      if ($(e.target).attr('id') != '999' && $(e.target).attr('id') != '998')
        clickNum--;
    } else{
      if($(e.target).attr('id').includes('previous')) {
        clickNum = 0;
        console.log("이전으로 돌아가기 버튼 클릭");
      } else {
        console.log("체크박스 선택");
        $(e.target).children('input[type=checkbox]').prop('checked', true);
        // console.log($(e.target).children('input[type=checkbox]').attr('checked'));
        $(e.target).toggleClass('messaging-button-checkbox-checked');
        // $(e.target).children('input[type=checkbox]').toggleClass('messaging-button-checkbox-checked');
        clickNum++;
      }
    }
    console.log(clickNum);
    (clickNum > 0) ? $('.complete-button').prop('disabled', false)
                   : $('.complete-button').prop('disabled', true);
  });

  $('body').on("submit", "form", function(){
    console.log('submit')
    console.log($('#m').val());
    const stage = sessionStorage.getItem('stage');
    console.log(stage);
    if (stage === 'input_name') {
      sessionStorage.setItem('tour_name', $('#m').val());
      socket.emit('chat message tour', $('#m').val(), sessionStorage, $('#m').val());
    } else if (stage === 'input_savenumber') {
      var itIsNumber = /^\d{4}$/.test($('#m').val());
      console.log(itIsNumber);
      if (itIsNumber) {
        sessionStorage.setItem('save_number', $('#m').val());
        socket.emit('chat message tour', $('#m').val(), sessionStorage, $('#m').val());
      } else {
        sessionStorage.setItem('rewrite_password', 'rewrite');
        socket.emit('chat message tour', $('#m').val(), sessionStorage, $('#m').val());
      }
    } else if (stage === 'tour2') {
      sessionStorage.setItem('tour_name', $('#m').val());
      socket.emit('chat message tour', 'tour2_1', sessionStorage, $('#m').val());
    } else if (stage === 'tour2_1' || stage === 'tour2_2') {
      sessionStorage.setItem('save_number', $('#m').val());
      socket.emit('chat message tour', 'tour2_3', sessionStorage, $('#m').val());
    }
    $('#m').val('');
    return false;
  });

  socket.on('chat register', function(socket_id) {
  });

  socket.on('chat message', (answer) => {
    $('#messages').append(bot_messaging(answer));
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message_self', (msg) => {
    if (msg != null) {
      $('#messages').append(user_messaging(msg)).children(':last').hide()
        .fadeIn(150);
      if(msg.includes("처음으로") || msg.includes("돌아가기") || msg.includes("안할래")){
        $('#messages').append(`<hr>`);
      }
      // $('#messages').append($('<li>').text(answer));
      // window.scrollTo(0, document.body.scrollHeight);
    }
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
      console.log(args[i][1]);
      (args[i][1] === '뒤로가기') ? $('#messages').append(bot_messaging_button_colored(args[i][0], args[i][1]))
                                 : $('#messages').append(bot_messaging_button(args[i][0], args[i][1]));
    }
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else if (args[0] === '-skip') {
      socket.emit('skip');
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message button text', (socket_id, msg, ...args) => {
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    for (let i = 0; i < args.length; i += 1) {
      console.log(args[i][1]);
      $('#messages').append(bot_messaging_button(args[i][0], args[i][1]));
    }
    $('#m').prop('disabled', false);
    $('#input-button').attr('disabled', false);
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message button link', (socket_id, msg, ...args) => {
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    for (let i = 0; i < args.length; i += 1) {
      if (args[i][0] === 'button_link') {   // 링크 버튼일 경우
        if(window.navigator.userAgent.includes('Android')) {
          $('#messages').append(bot_messaging_button_googlestore_link(args[i][0], args[i][1]));
        } else {
          $('#messages').append(bot_messaging_button_corgi_link(args[i][0], args[i][1]));
        }
      } else {
        $('#messages').append(bot_messaging_button(args[i][0], args[i][1]));
      }
    }
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message no button', (socket_id, msg, ...args) => {
    console.log(`socket_id: ${socket_id}, msg: ${msg}, args: ${args}`);
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    $('#m').prop('disabled', true);
    $('#input-button').attr('disabled', true);
    $('#messages').scrollTop(1E10);
    socket.emit('chat message button rule', $('.bot-message').children(':last').attr('name'), 'S11');
  });

  socket.on('chat message button checkbox', (socket_id, msg, ...args) => {
    console.log(args[0], args[1], args[2], args[3], args[4]);
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
      console.log(`${args[i][0]}, ${args[i][1]}`);
      $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
    }
    $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
    $('.complete-button').prop('disabled', true);
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message button dynamic checkbox', (socket_id, msg, ...args) => {
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    $('#messages').append(bot_messaging_button_checkbox(args[0][0], args[0][1]));
    const args_length = args[1].length;
    for (let i = 0; i < args_length; i += 1) {
      $('#messages').append(bot_messaging_button_checkbox(args[1][i], args[1][i]));
    }
    $('#messages').append(bot_messaging_button_finish_checkbox(args[2][0], args[2][1]));
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').scrollTop(1E10);
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
        $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
      }
      $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
      $('.complete-button').prop('disabled', true);
      $('#messages').scrollTop(1E10);
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
    }, 100);
  });


  /* 이미지, 메세지, 버튼 같이 사용 */
  socket.on('chat message button image', (socket_id, msg, img, ...args) => {
      if (args.length === 0) {
        $('#m').prop('disabled', false);
        $('#input-button').attr('disabled', false);
      } else {
        $('#m').prop('disabled', true);
        $('#input-button').attr('disabled', true);
      }
      $('#messages').append(bot_messaging_image(img));
      $('#messages').append(bot_messaging(msg)).children(':last').hide()
        .fadeIn(150);
      const args_length = args.length;

      for (let i = 0; i < args_length; i += 1) {
        $('#messages').append(bot_messaging_button(args[i][0], args[i][1]));
      }
      $('#messages').scrollTop(1E10);
      if(loginValue!=='-1'){
        if(msg.includes("오늘의 선택")){
          updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
        }
      }
  });

  /* 이미지, 메세지, 중복체크버튼을 같이 사용 */
  socket.on('chat message button checkbox image', (socket_id, msg, img, ...args) => {  // msg:메세지, img: 이미지, args: 버튼들
      if (args.length === 0) {
        $('#m').prop('disabled', false);
        $('#input-button').attr('disabled', false);
      } else {
        $('#m').prop('disabled', true);
        $('#input-button').attr('disabled', true);
      }
      $('#messages').append(bot_messaging(msg)).children(':last').hide()
        .fadeIn(150);
      const args_length = args[0].length;
      $('#messages').append(bot_messaging_image(img));
      for (let i = 0; i < args_length - 1; i += 1) {
        $('#messages').append(bot_messaging_button_checkbox(args[0][i][0], args[0][i][1]));
      }
      $('#messages').append(bot_messaging_button_finish_checkbox(args[0][args_length - 1][0], args[0][args_length - 1][1]));
      $('.complete-button').prop('disabled', true);
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
  });

  socket.on('set session item', async (socket_id, item, value) => {
    await sessionStorage.setItem(item, value);
  });

  socket.on('get session items', async (socket_id, item) => {
    await socket.emit('get session items return', item, sessionStorage.getItem(item));
  });

  socket.on('set session item stack push', async (socket_id, value) => {
    const stack = await sessionStorage.getItem('stack');
    await sessionStorage.setItem('stack', stack+`,${value}`);
  });

  socket.on('set session item stack pop', async (socket_id) => {
    const stack = await sessionStorage.getItem('stack').split(',');
    await stack.pop();
    await sessionStorage.setItem('stack', stack);
  });


});



$(document).ready(() => {
  let loginValue = sessionStorage.getItem('login');

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
        // 운영 서버
        $.getJSON( "https://foodprod.jellylab.io:6001/api/v1/users/get_subway_list_history?email="+user_email, request, function( data, status, xhr ) {
          cache[ term ] = data;
          response( data );
        });
        // 개발 서버
        // $.getJSON( "https://devapifood.jellylab.io:6001/api/v1/users/get_subway_list_history?email="+user_email, request, function( data, status, xhr ) {
        //   cache[ term ] = data;
        //   response( data );
        // });
      } else {
        //운영 서버
        // $.getJSON( "https://foodprod.jellylab.io:6001/api/v1/users/get_subway_list_history?email="+user_email, request, function( data, status, xhr ) {
        //   cache[ term ] = data;
        //   response( data );
        // });
        // 개발 서버
        $.getJSON( "https://devapifood.jellylab.io:6001/api/v1/users/get_all_subway", request, function( data, status, xhr ) {
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

  $('#logout-btn').click(function() {
    logout(loginValue);
  });


  if (new Date().getHours() < 12) {
    nowTime = `오전 ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else if (new Date().getHours() === 12) {
    nowTime = `오후 ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else {
    nowTime = `오후 ${new Date().getHours()%12}:${new Date().getMinutes()}`;
  }
  $('.message-info .time')[0].innerHTML = nowTime;
});
