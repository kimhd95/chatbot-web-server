function logout() {
    const info = {
        url: "/api/v1/users/logout",
        method: "POST",
        success: function (res) {
            if (res.success) {
                console.log('logout Request: success!');
                alert('안전하게 로그아웃 되었습니다.');
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
            <img class="image" src="./whale.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">
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
            <img class="image" src="./whale.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">
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
            <img class="image" src="./whale.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">
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

$(function () {

    var socket = io();
  
    $('.get-started-button').click(function(){
      socket.emit('chat message button rule', '시작하기',$(this).attr('id'));
      $(".get-started-button").hide();
      $("input").prop('disabled', false);
    });
  
  
    $('.card-body').on('click', '.messaging-button', function(e) {
      // $('#m').val('눌림');
       socket.emit('chat message button rule', $(e.target).attr('name'),$(e.target).attr('id'));
       $(".messaging-button").hide();
       $("input").prop('disabled', false);
  
       // $("#messages").animate({ scrollTop: $('.bot-message').height() }, "fast");
      // $('#m').val('');
      // $("input").prop('disabled', true);
      // return false;
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
            // $('#user_list').append(user_list_update(id));
            // $('#messages').append($('<li>').text(answer));
            // window.scrollTo(0, document.body.scrollHeight);
          });
  
    socket.on('chat message button', function(msg, ...args){
            let basic_message = $('#messages').append(bot_messaging(msg));
            for(var i = 0; i<args.length; i++){
              // basic_message.append(bot_messaging_button(args[i][0],args[i][1]));
              $('#messages').append(bot_messaging_button(args[i][0],args[i][1]));
            }
            if(args.length === 0){
              $("input").prop('disabled', false);
            }else{
              $("input").prop('disabled', true);
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
  
            // var container = document.querySelector('.rest-img');
            // var swiper = new Hammer(container);
            //
            // swiper.on('swipeleft', function (e) {
            //   next();
            // });
            // swiper.on('swiperight', function (e) {
            //   prev();
            // });
            //
            //
            // function next () {
            //   $('#m').val('다음');
            //   $('.carousel-control-next').click();
            // }
            //
            // function prev () {
            //   $('#m').val('이전');
            //   $('.carousel').prev();
            // }
          });
  
});
$(document).ready(() => {
    $('#logout-btn').click(() => {
        logout();
    })
});