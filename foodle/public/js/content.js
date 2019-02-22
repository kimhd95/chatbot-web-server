$(document).ready(() => {

  var socket = io();
  var swiper = new Swiper('.swiper-container');

  $("#back-to-lobby").click(function(){
    location.href='/lobby';
  })

  $('#content-1').click(function(){
    $('.swiper-container').toggleClass('close');
    var i;
    var img_flag = 'contents  vegan _페이지_';
    socket.emit('give file number', img_flag);
    socket.on('file number', (msg) => {
      console.log(msg);
      for(i=1; i<msg+1; i++){
        var image_url = `/contents/contents  vegan _페이지_${i}.jpg`;
        swiper.appendSlide(`<div id="slide_${i}" class="swiper-slide" style="background-image: url('/contents/contents  vegan _페이지_${i}.jpg');"></div>`)
      }
    });
  })

  $('#content-2').click(function(){
    $('.swiper-container').toggleClass('close');
    var i;
    var img_flag = 'pork cutlet_페이지_';
    socket.emit('give file number', img_flag);
    socket.on('file number', (msg) => {
      console.log(msg);
      for(i=1; i<msg+1; i++){
        var image_url = `/contents/pork cutlet_페이지_${i}.jpg`;
        swiper.appendSlide(`<div id="slide_${i}" class="swiper-slide" style="background-image: url('/contents/pork cutlet_페이지_${i}.jpg');"></div>`)
      }
    });
  });

  $("#back-button").click(function(){
    $('.swiper-container').toggleClass('close');
    $('.upperbar, .lowerbar').css("display", "none");
    swiper.removeAllSlides();
  })

  $(".swiper-wrapper").click(function(){
    if($('.upperbar').css('display')==='none'){
      $('.upperbar, .lowerbar').css("display", 'flex');
    } else{
      $('.upperbar, .lowerbar').css("display", "none");
    }
  })

});
