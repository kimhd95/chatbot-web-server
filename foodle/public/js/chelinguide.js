const DEFAULT_REGION = '서울';
const DEFAULT_SUBWAY = '강남역';
const DEFAULT_SORTBY = '별점순';
const NO_IMAGE_SRC = '/images/main-09.png';

function swipePrev(selector) {
  if (selector.parent().next().children('.res-img[style*=inline]:first').prev().attr('style')) {
    selector.parent().next().children('.res-img[style*=inline]:first').prev().attr('style', 'display: inline;');
    selector.parent().next().children('.res-img[style*=inline]:last').attr('style', 'display: none;');
  } else {
    selector.parent().next().children('.res-img:last').attr('style', 'display: inline;');
    selector.parent().next().children('.res-img[style*=inline]:first').attr('style', 'display: none;');
  }
}
function swipeNext(selector) {
  if (selector.parent().prev().children('.res-img[style*=inline]:first').next().attr('style')) {
    selector.parent().prev().children('.res-img[style*=inline]:first').next().attr('style', 'display: inline;');
    selector.parent().prev().children('.res-img[style*=inline]:first').attr('style', 'display: none;');
  } else {
    selector.parent().prev().children('.res-img:first').attr('style', 'display: inline;');
    selector.parent().prev().children('.res-img[style*=inline]:last').attr('style', 'display: none;');
  }
}

function appendContent(i, id, res_name, rating, comment, res_mood, res_food_name, res_food_type, res_price, ...res_images) {
  if (res_price && res_price.includes(',')) {
    res_price = res_price.replace(/ /gi, '');
    res_price = res_price[0] + '~' + res_price[res_price.length-1];
  }
  $('#contents-list').append(`<div id="content-${id}" class="food-content" data-toggle="modal" data-target="#content-detail-${id}">
    <div class="food-title">${i+1}. ${res_name}</div>
    <div class="food-info">
      <div class="food-thumbnail" style="background-image: url('${(res_images[0]) ? res_images[0] : NO_IMAGE_SRC}');"></div>
      <div class="food-summary">
        <div class="food-score">
          <img src="/images/${rating}점.png" id="content-${id}-score">
        </div>
        <div class="food-sentence">
          <div class="food-eval">한줄평</div>
          <div class="food-text">${comment}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="content-detail-${id}" tabindex="-1" role="dialog" aria-labelledby="contentDetail" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="content-detail-res-name">${res_name}</h5>
          </div>
          <div class="modal-body">
            <div class="modal-res-image-layout">
              <div class="modal-res-image-layout-left">
                <img src="images/inf-swipe-left.png" class="swiper-btn" onclick="swipePrev($(this));">
              </div>
              <div class="modal-res-image-layout-center">
                <img src="${(res_images[0]) ? res_images[0] : NO_IMAGE_SRC}" class="res-img" style="display: inline;">
                ${res_images[1] ? `<img src="${res_images[1]}" class="res-img" style="display: none;">` : `<img src="${(res_images[0]) ? res_images[0] : NO_IMAGE_SRC}" class="res-img" style="display: none;">`}
                ${res_images[2] ? `<img src="${res_images[2]}" class="res-img" style="display: none;">` : ``}
                ${res_images[3] ? `<img src="${res_images[3]}" class="res-img" style="display: none;">` : ``}
                ${res_images[4] ? `<img src="${res_images[4]}" class="res-img" style="display: none;">` : ``}
              </div>
              <div class="modal-res-image-layout-right">
                <img src="images/inf-swipe-right.png" class='swiper-btn' onclick="swipeNext($(this));">
              </div>
            </div>
            <div class="modal-res-score-layout">
              <img src="/images/${rating}점.png" class="score-icon">
            </div>
            <div class="modal-res-foodtype-layout">${res_food_type} / ${res_food_name}</div>
            <div class="modal-res-detail-info-wide">
              <img src="/images/inf-comment.png" class="function-icon">
              <div class="modal-comment-left">한줄평</div>
              <div class="modal-comment-right">${comment}</div>
            </div>
            <div class="modal-res-detail-info">
              <img src="/images/inf-mood.png" class="function-icon">
              <div class="modal-comment-left">분위기</div>
              <div class="modal-comment-right">${res_mood}</div>
            </div>
            <div class="modal-res-detail-info">
              <img src="/images/inf-price.png" class="function-icon">
              <div class="modal-comment-left">1인가격</div>
              <div class="modal-comment-right">${res_price}만원</div>
            </div>
            <div class="modal-res-detail-info">
              <img src="/images/inf-map.png" class="function-icon">
              <div class="modal-comment-left" id="show-map">지도보기</div>
            </div>
            <div class="modal-res-detail-info">
              <img src="/images/inf-sns.png" class="function-icon">
              <div class="modal-comment-left" id="sns-share">SNS 공유하기</div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-detail-footer-btn"><span class="gray-btn">수정하기</span></div>
          </div>
      </div>
    </div>
  </div>`);
}

function sendGetListReq(user_id, region, subway, sortby) {
  const getListReq = {
    url: "/api/v1/users/get_chelinguide_list",
    method: 'POST',
    body: {
      user_id,
      region,
      subway,
      sortby,
    },
    success: function (res) {
      $('#contents-list').children().remove();
      for (let i = 0; i < res.num; i++) {
        ({id, res_name, rating, comment, res_id, res_mood, res_region, res_subway, res_food_name, res_food_type, res_price, res_image1, res_image2, res_image3, res_image4, res_image5, created_at, updated_at} = res.message[i]);
        appendContent(i, id, res_name, rating, comment, res_mood, res_food_name, res_food_type, res_price, res_image1, res_image2, res_image3, res_image4, res_image5)
      }
    },
    error: function (e) {
      console.log(e);
    }
  };
  sendReq(getListReq);
}

function selectSortBy(i) {
    const user_id = sessionStorage.getItem('name');
    const region = '서울';
    const subway = $('.place-detail')[0].placeholder;
    const sortby = $('#order-list button')[i].innerHTML.replace(/ /gi, '');
    $('.order')[0].placeholder = sortby;
    sendGetListReq(user_id, region, subway, sortby);
}

function sortBySubway(i) {
    const user_id = sessionStorage.getItem('name');
    const region = '서울';
    const subway = $('#place-list button')[i].innerHTML.replace(/ /gi, '');
    const sortby = $('.order')[0].placeholder;
    $('.place-detail')[0].placeholder = subway;
    sendGetListReq(user_id, region, subway, sortby);
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
  let name = (!user_id || user_id === '비회원') ? '' : sessionStorage.getItem('name').substr(1);
  document.getElementById('contents-bar').textContent = `${name}슐랭 가이드`;

  sendGetListReq(user_id, DEFAULT_REGION, DEFAULT_SUBWAY, DEFAULT_SORTBY);


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

  $('#sns-share').click(function() {
    console.log('SNS 공유하기 클릭');
  });

  $('#show-map').click(function() {
    // 동작x
    console.log('지도보기 클릭');
  });

  $('#upload-btn').click(function() {
    console.log('등록하기 버튼 클릭');
    let subway = $('#modal-subway-right')[0].value;
    let res_name = $('#res-name')[0].value;
    let rating = $('#modal-score-select')[0].value;
    let comment = $('#comment')[0].value;
    let region = DEFAULT_REGION;
    const addContentReq = {
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
        const _user_id = sessionStorage.getItem('name');
        const _region = $('.place')[0].placeholder;
        const _subway = $('.place-detail')[0].placeholder;
        const _sortby = $('.order')[0].placeholder;
        sendGetListReq(_user_id, _region, _subway, _sortby);
      },
      error: function (e) {
        alert("해당 식당 없음.");
      }
    };
    sendReq(addContentReq);
  });

});
