// var socket = io();
// // let loginV=sessionStorage.getItem('login');
//

$(document).ready(() => {
  var socket = io();
  var swiper = new Swiper('.swiper-container');
  let name;
  if (sessionStorage.getItem('name') == '비회원' || sessionStorage.getItem('name') == null) {
    name = '';
  } else {
    name = sessionStorage.getItem('name').substr(1);
  }
  document.getElementById('contents-bar').textContent = `${name}슐랭 가이드`;

  $("#back-to-lobby").click(function(){
    location.href='/lobby';
  })

  socket.on('file number', (msg, index) => {
    if(index === '1') {
      for(i=1; i<msg+1; i++){
        var image_url = `/contents/contents  vegan _페이지_${i}.jpg`;
        swiper.appendSlide(`<div id="slide_${i}" class="swiper-slide" style="background-image: url('/contents/contents  vegan _페이지_${i}.jpg');"></div>`)
      }
    } else if(index === '2') {
      for(i=1; i<msg+1; i++){
        var image_url = `/contents/pork cutlet_페이지_${i}.jpg`;
        swiper.appendSlide(`<div id="slide_${i}" class="swiper-slide" style="background-image: url('/contents/pork cutlet_페이지_${i}.jpg');"></div>`)
      }
    }
  });

  $('#order-list').hide();
  $('#place-list-button').click(function() {
    console.log('지역선택 버튼 클릭');

  });
  $('#order-list-button').click(function() {
    console.log('정렬기준선택 버튼 클릭');
    // $('#order-list').modal('show');
  });

  $('#share-function-button, #share-function-icon').click(function() {
    console.log('공유하기 버튼 클릭');

  });

  $('#add-function-button, #add-function-icon').click(function() {
    console.log('추가하기 버튼 클릭');

  });
});
