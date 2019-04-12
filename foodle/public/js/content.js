// var socket = io();
// // let loginV=sessionStorage.getItem('login');
//
// var swiper = new Swiper('.swiper-container');
//
// $("#back-to-lobby").click(function(){
//   location.href='/lobby';
// })
//
// // 수정 필요
// // $(".food-content").click(function(){
// //     $('.swiper-container').toggleClass('close');
// //     var i;
// //     for(i=1;i<50;i++){
// //         if('/contents/pork cutlet_페이지_${i}.jpg'.onerror){
// //             break;
// //         }
// //         swiper.appendSlide(`<div id="slide_${i}" class="swiper-slide" style="background-image: url('/contents/pork cutlet_페이지_${i}.jpg');"></div>`)
// //     }
// // })
//
// function getContentLeng(img_flag) {
//   var num = 0;
//
// }
//
// socket.on('file number', (msg) => {
//   console.log(msg);
// });
//
// $('#content-1').click(function(){
//   $('.swiper-container').toggleClass('close');
//   var i;
//   var img_flag = '/contents/contents  vegan _페이지_';
//   // const content_leng = getContentLeng(img_flag);
//   // console.log(content_leng);
//   socket.emit('file number');
//
//   for(i=1;i<29;i++){
//     var image_url = `/contents/contents  vegan _페이지_${i}.jpg`;
//     // if(`/contents/contents  vegan _페이지_${i}.jpg`.onerror){
//     //   console.log("에러 떳음");
//     //     break;
//     // } else {
//     //   console.log("노 에러");
//     // }
//     swiper.appendSlide(`<div id="slide_${i}" class="swiper-slide" style="background-image: url('/contents/contents  vegan _페이지_${i}.jpg');"></div>`)
//   }
// })
//
// $('#content-2').click(function(){
//   $('.swiper-container').toggleClass('close');
//   var i;
//   for(i=1;i<50;i++){
//     if(`/contents/pork cutlet_페이지_${i}.jpg`.onerror){
//       console.log("에러 떳음");
//         break;
//     } else {
//       console.log("노 에러");
//     }
//     swiper.appendSlide(`<div id="slide_${i}" class="swiper-slide" style="background-image: url('/contents/pork cutlet_페이지_${i}.jpg');"></div>`)
//   }
// })
//
// $("#back-button").click(function(){
//   $('.swiper-container').toggleClass('close');
//   $('.upperbar, .lowerbar').css("display", "none");
//   swiper.removeAllSlides();
// })
//
// $(".swiper-wrapper").click(function(){
//   if($('.upperbar').css('display')==='none'){
//     $('.upperbar, .lowerbar').css("display", 'flex');
//   } else{
//     $('.upperbar, .lowerbar').css("display", "none");
//   }
// })


$(document).ready(() => {
  var socket = io();
  var swiper = new Swiper('.swiper-container');

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

  $('#content-1').click(function(){
    $('.swiper-container').toggleClass('close');
    var i;
    var img_flag = 'contents  vegan _페이지_';
    socket.emit('give file number', img_flag, '1');
  })

  $('#content-2').click(function(){
    $('.swiper-container').toggleClass('close');
    var i;
    var img_flag = 'pork cutlet_페이지_';
    socket.emit('give file number', img_flag, '2');
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
