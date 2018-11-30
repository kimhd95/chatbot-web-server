// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM(`<!DOCTYPE html>`);
// const $ = require('jquery')(window);
let myChatData = [];

$('#room-active-button').click(() => {
    if (document.documentElement.clientWidth < 768) {
      $('#chat-room')[0].style.display = 'flex';
    }else{
      $('#chat-room')[0].style.display = 'block';
    }
    $('#room-active-button')[0].style.display = 'none';
    $('div#chat-room').removeClass('fadeOutDown animated').addClass('fadeInUp animated');
    // let new_html = `<!-- <div class="bot-message">                    <div class="message-info">                        <img class="image" src="./whale.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">                        <span class="name">푸들</span>                        <span class="time">오후 2:43</span>                    </div>                    <div class="message-text">                        bot message                    </div>                </div> -->                <div class="bot-message">                    <div class="message-info">                        <img class="image" src="./whale.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">                        <span class="name">푸들</span>                        <span class="time">오후 2:43</span>                    </div>                    <div class="message-text">                        안녕! 나는 결정장애를 치료해주는 음식결정 챗봇 푸들이야!                    </div>                    <br>                    <div class="message-button">                        <button type="button" class="get-started-button" id="get_started" name="button" style="display: none;">시작하기</button>                    </div>                </div>                <!-- <div class="user-message">                    <div class="message-info">                        <span class="time">오후 3:12</span>                    </div>                    <div class="message-text">                        user message                    </div>                </div> -->            <div class="user-message">      <div class="message-info">          <span class="time">오후 4:10</span>      </div>      <div class="message-text">        시작하기      </div>  </div><div class="bot-message">      <div class="message-info">          <img class="image" src="./whale.png" alt="고래이미지" style="width: 30px; height: 30px; border-radius: 50%;">          <span class="name">푸들</span>          <span class="time">오후 4:10</span>      </div>      <div class="message-text">          아 배고프다      </div>  </div>            <button type="button" class="messaging-button" id="decide_menu" name="메뉴 고르기">메뉴 고르기</button>            <button type="button" class="messaging-button" id="decide_place" name="중간지점 찾기(서울)">중간지점 찾기(서울)</button>            <button type="button" class="messaging-button" id="decide_history" name="기록보기">기록보기</button>            <button type="button" class="messaging-button" id="get_started" name="개발팀에게 피드백하기">개발팀에게 피드백하기</button>`;
    // $('.card-body').html(new_html);
});

$('.room-down').click(() => {
    $('#room-active-button')[0].style.display = 'block';
    $('div#chat-room').removeClass('fadeInUp animated').addClass('fadeOutDown animated');
});

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


// $('.send').click(() => {
//     sendMessage();
// })
//
// $('.myText').keydown((key) => {
//     if (key.keyCode === 13) {
//         sendMessage();
//     }
// })

function bouncePeriodic () {
    setInterval(() => {
        if ($('div#room-active-button')[0].className === 'bounce animated') {
            $('div#room-active-button').removeClass('bounce animated');
        } else {
            $('div#room-active-button').addClass('bounce animated');
        }
    }, 2500);
}

$(document).ready(() => {
    bouncePeriodic();
    let cache = {};
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

});
