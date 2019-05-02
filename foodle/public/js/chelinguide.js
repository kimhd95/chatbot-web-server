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

function scoreFunction() {
  let score;
  score = $('#modal-score-select')[0].value;
  document.getElementById("score-image").src = `/images/${score}점.png`
}

$(document).ready(() => {
  var socket = io();
  var swiper = new Swiper('.swiper-container');
  const user_id = sessionStorage.getItem('name');
  let name;
  if (!user_id || user_id === '비회원') {
    name = '';
  } else {
    name = sessionStorage.getItem('name').substr(1);
  }
  document.getElementById('contents-bar').textContent = `${name}슐랭 가이드`;

  // 기록 불러옴
  const info = {
    url: "/api/v1/users/get_chelinguide_list",
    method: 'POST',
    body: {
      user_id,
      region: '서울',
      subway: '강남역',
      sortby: 'rating',
    },
    success: function (res) {
      console.log(res.num, res.message);
    },
    error: function (e) {
      console.log(e);
    }
  };

  sendReq(info);
  // getChelinguideList API 호출 후 content-list 채우기


  $("#back-to-lobby").click(function(){
    location.href='/lobby';
  });

  $('.food-content').click(function(e) {
    const tar = $(e.target);
    let msg;
    switch(tar.attr('class')) {
      case 'food-title':
      case 'food-info':
        msg = tar.parent().attr('id');
        break;
      case 'food-thumbnail':
      case 'food-summary':
        msg = tar.parent().parent().attr('id');
        break;
      case 'food-score':
      case 'food-sentence':
        msg = tar.parent().parent().parent().attr('id');
        break;
      case 'food-eval':
      case 'food-text':
        msg = tar.parent().parent().parent().parent().attr('id');
        break;
      default:
        msg = '';
        break;
    }
    if (tar.attr('src')) {
      msg = tar.parent().parent().parent().parent().attr('id');
    }
    console.log(msg);
  });

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

  $('#upload-btn').click(function() {
    console.log('등록하기 버튼 클릭');


    const subway = $('#modal-subway-right')[0].value;
    const res_name = $('#res-name')[0].value;
    const rating = $('#modal-score-select')[0].value;
    const comment = $('#comment')[0].value;
    const region = '서울';
    console.log(user_id, subway, res_name, rating, comment, region);

    // api call필요
    const info = {
      url: "/api/v1/users/add_chelinguide_item",
      method: 'POST',
      body: {
        user_id,
        res_name,
        region,
        subway,
        rating,
        comment,
      },
      success: function (res) {
        console.log("success");
      },
      error: function (e) {
        alert("해당 식당 없음.");
      }
    };

    sendReq(info);
  });
});
