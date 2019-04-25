let sort, subway;
function selectSortBy(i) {
    var order = $('.order input').val();
    sort = $('#order-list button')[i].innerHTML;
    $('.order')[0].value = sort;
    // 정렬해주는 api 필요
}

function sortBySubway(i) {
    var order = $('.place-detail input').val();
    subway = $('#place-list button')[i].innerHTML;
    $('.place-detail')[0].value = subway;
    // 정렬해주는 api 필요
}

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

  $('#place-list-button').click(function() {
    console.log('지역선택 버튼 클릭');

  });
  $('#order-list-button').click(function() {
    console.log('정렬기준선택 버튼 클릭');
  });

  $('#share-function-button, #share-function-icon').click(function() {
    console.log('공유하기 버튼 클릭');

  });

  $('#add-function-button, #add-function-icon').click(function() {
    console.log('추가하기 버튼 클릭');

  });
});
