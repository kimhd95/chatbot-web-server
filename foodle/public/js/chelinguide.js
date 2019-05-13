const DEFAULT_REGION = '서울';
const DEFAULT_SUBWAY = '강남역';
const DEFAULT_SORTBY = '별점순';
const NO_IMAGE_SRC = '/images/main-09.png';
const CHECKBOX_IMAGE_SRC = '/images/cb.png';
const CHECKBOX_CHECKED_IMAGE_SRC = '/images/cb-checked.png';
const moodList = ['데이트', '직장인', '친구', '고급진', '허름한', '깔끔한', '인테리어가 독특한', '조용한', '시끄러운', '친절한', '불친절한'];
const priceList = ['1만원 미만', '1만원 대', '2~3만원 대', '4만원 이상'];

function swipePrev(selector) {
  const imgParent = selector.parent().next();
  const uiText = selector.parent().parent().next('.modal-res-img-swiper-ui').text();
  if (imgParent.children('.res-img[style*=inline]:first').prev().attr('style')) {
    imgParent.children('.res-img[style*=inline]:first').prev().attr('style', 'display: inline;');
    imgParent.children('.res-img[style*=inline]:last').attr('style', 'display: none;');
  } else {
    imgParent.children('.res-img:last').attr('style', 'display: inline;');
    imgParent.children('.res-img[style*=inline]:first').attr('style', 'display: none;');
  }
  const idx = imgParent.children('.res-img[style*=inline]:first').index() + 1;
  selector.parent().parent().next('.modal-res-img-swiper-ui').text(idx + uiText.slice(1));
}
function swipeNext(selector) {
  const imgParent = selector.parent().prev();
  const uiText = selector.parent().parent().next('.modal-res-img-swiper-ui').text();
  if (imgParent.children('.res-img[style*=inline]:first').next().attr('style')) {
    imgParent.children('.res-img[style*=inline]:first').next().attr('style', 'display: inline;');
    imgParent.children('.res-img[style*=inline]:first').attr('style', 'display: none;');
  } else {
    imgParent.children('.res-img:first').attr('style', 'display: inline;');
    imgParent.children('.res-img[style*=inline]:last').attr('style', 'display: none;');
  }
  const idx = imgParent.children('.res-img[style*=inline]:last').index() + 1;
  selector.parent().parent().next('.modal-res-img-swiper-ui').text(idx + uiText.slice(1));
}
function modifyButtonClick(selector) {
  console.log("수정하기 클릭");
  const modal_header = selector.parent().parent().prev().prev(".modal-header");
  const modal_body = selector.parent().parent().prev(".modal-body");
  const id = selector.parent().parent().parent().parent().parent().attr('id');
  const res_name = modal_header.children(".modal-title").text();
  const comment = modal_body.children(".modal-res-detail-info-wide").children(".modal-comment-right").text();
  let rating = modal_body.children(".modal-res-score-layout").children().attr('src');
  rating = rating.slice(rating.lastIndexOf('/')+1, rating.lastIndexOf('점'));
  const mood = modal_body.children(".modal-res-detail-info:first").children(".modal-comment-right").text();
  const price = modal_body.children(".modal-res-detail-info:first").next().children(".modal-comment-right").text();

  // 상호, 한줄평 set
  $("input.res-name-input").attr('value', res_name);
  $("textarea.comment-input").text(comment);

  // 별점 set
  const idx = parseFloat(rating)*2;
  const starRev = $(".modal-rating-starRev").children(".starRev");
    // 평점 초기화
  starRev.children().removeClass("on");
  starRev.children().each(function(index) {
    if (index < idx) {
      $(this).addClass("on");
    }
  });

  // 분위기 set
  const modal_mood = $("#modal-modify").children().children().children(".modal-body").children(".modal-mood");
  console.log(mood);
    // modal의 mood 초기화
  $("#modal-modify > div > div > .modal-body > .modal-mood button.messaging-button-checkbox.checked").removeClass("checked");
  if (mood && mood!=='-') {
    moodList.forEach(m => {
      if (mood.includes(m)) {
        // modal_mood.children().eq(moodIndex[m]).children(`button[value=${m}]`).addClass("checked");
        $(`#modal-modify .modal-mood button[value="${m}"]`).addClass("checked");
      }
    });
  }

  // 가격 set
  $(".price-row > .checkbox-img").removeClass("checked");
  $(".price-row > .checkbox-img").attr('src', CHECKBOX_IMAGE_SRC);
  if (price && price !== '-') {
    priceList.forEach(m => {
      if (price.includes(m)) {
        $(`.price-row > .checkbox-img[value="${m}"]`).addClass("checked");
        $(`.price-row > .checkbox-img[value="${m}"]`).attr('src', CHECKBOX_CHECKED_IMAGE_SRC);
      }
    });
  }

  $(`#${id}`).modal('hide');
  setTimeout(() => { $('#modal-modify').modal('show'); }, 200);
}
function showMapButtonClick(selector) {
  console.log("지도보기 클릭");
  const subway = $("input.place-detail").attr('placeholder');
  const res_name = selector.parent().parent().prev().children("#content-detail-res-name").text();
  window.open(`https://map.naver.com/index.nhn?query=${subway} ${res_name}&tab=1`);
}
function shareButtonClick(selector) {
  console.log("공유하기 클릭");
}

function appendContent(i, id, res_name, rating, comment, res_mood, res_food_name, res_food_type, res_price, ...res_images) {
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
            <div class="modal-res-img-swiper-ui">${res_images.filter(n => n).length > 0?1:0}/${res_images.filter(n => n).length}</div>
            <div class="modal-res-score-layout">
              <img src="/images/${rating}점.png" class="score-icon">
            </div>
            <div class="modal-res-foodtype-layout">${res_food_type?res_food_type.replace(/,/gi, ', '):'-'} / ${res_food_name?res_food_name.replace(/,/gi, ', '):'-'}</div>
            <div class="modal-res-detail-info-wide">
              <img src="/images/inf-comment.png" class="function-icon">
              <div class="modal-comment-left">&nbsp;한줄평</div>
              <div class="modal-comment-right">${comment?comment:'-'}</div>
            </div>
            <div class="modal-res-detail-info">
              <img src="/images/inf-mood.png" class="function-icon">
              <div class="modal-comment-left">&nbsp;분위기</div>
              <div class="modal-comment-right">${res_mood?res_mood.replace(/,/gi, ', '):'-'}</div>
            </div>
            <div class="modal-res-detail-info">
              <img src="/images/inf-price.png" class="function-icon">
              <div class="modal-comment-left">&nbsp;1인가격</div>
              <div class="modal-comment-right">${res_price?res_price.replace(/,/gi, ', '):'-'}</div>
            </div>
            <div class="modal-res-detail-info">
              <img src="/images/inf-map.png" class="function-icon">
              <button class="modal-comment-left" id="show-map" onclick="showMapButtonClick($(this));">지도보기</button>
            </div>
            <div class="modal-res-detail-info">
              <img src="/images/inf-sns.png" class="function-icon">
              <button class="modal-comment-left" id="sns-share" onclick="shareButtonClick($(this));">SNS 공유하기</button>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-detail-footer-btn"><button class="modify-button" onclick="modifyButtonClick($(this));">수정하기</button></div>
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

  // $('#place-list-button').click(function() {
  //   console.log('지역선택 버튼 클릭');
  // });
  //
  // $('#order-list-button').click(function() {
  //   console.log('정렬기준선택 버튼 클릭');
  // });

  $('#share-function-button, #share-function-icon').click(function() {
    console.log('공유하기 버튼 클릭');
  });

  $('#add-function-button, #add-function-icon').click(function() {
    console.log('추가하기 버튼 클릭');
    $('#plus-list').modal('show')
  });

  $("#back-to-modal").click(function(){
    $('#detail-plus-list').modal('hide')
    setTimeout(function(){$('#plus-list').modal('show')}, 200);
  });

  $('.modal-comment-detail').click(function() {
    console.log('자세히 추가하기 버튼 클릭');
    $('#plus-list').modal('hide')
    setTimeout(function(){$('#detail-plus-list').modal('show')}, 200);
  });

  $('#upload-btn').click(function() {
    console.log('등록하기 버튼 클릭');
    const subway = $('#modal-subway-right')[0].value;
    const res_name = $('#res-name')[0].value;
    const comment = $('#comment')[0].value;
    const region = DEFAULT_REGION;
    const rating = $(".starRev").children(".starR1.on, .starR2.on").length * 0.5;

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
        alert(e.message);
      }
    };
    sendReq(addContentReq);
  });

  $('.starRev span').click(function() {
    $(this).parent().children('span').removeClass('on');
    $(this).addClass('on').prevAll('span').addClass('on');
    return false;
  });

  $(".messaging-button-checkbox").click(function() {
    $(this).attr('class') === 'messaging-button-checkbox checked' ? $(this).removeClass('checked') : $(this).addClass('checked');
  });

  $(".checkbox-img").click(function() {
    if($(this).attr('class') === 'checkbox-img checked') {
      $(this).removeClass('checked');
      $(this).attr('src', '/images/cb.png');
    } else {
      $(this).addClass('checked');
      $(this).attr('src', '/images/cb-checked.png');
    }
  });

  $(".checkbox-img-checked").click(function() {
    $(this).attr('src', '/images/cb.png');
    $(this).attr('class', 'checkbox-img');
  });


  $('#upload-detail-btn').click(function() {
    console.log('자세히 등록하기 버튼 클릭');
    const subway = $('#modal-subway-right')[0].value;
    const res_name = $('#res-name')[0].value;
    const comment = $('#comment')[0].value;
    const rating = $("#detail-plus-list .starRev").children(".starR1.on, .starR2.on").length * 0.5;
    const mood = $.map($("#detail-plus-list button.messaging-button-checkbox.checked"), function(item) {
      return $(item).attr('value');
    }).toString();
    const price = $.map($("#detail-plus-list img.checkbox-img.checked"), function(item) {
      return $(item).attr('value');
    }).toString();

    if (!subway) { alert("지하철역을 입력해주세요."); return;}
    else if (!res_name) { alert("상호를 입력해주세요."); return;}
    else if (!rating) { alert("평점을 입력해주세요."); return;}

    let file = document.querySelector('#file');
    var fileList = file.files;

    let img_urls = [];
    Object.keys(fileList).map(function(key) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        var result = reader.result;
        img_urls.push(result);
      }, false);
      reader.readAsDataURL(fileList[key]);
    })

    //fileReader가 base64 url들을 얻은 후 시행
    setTimeout(function(){
      console.log(img_urls)
      console.log(`subway:${subway}, res_name:${res_name}, rating:${rating}, comment:${comment}, file:${file}`);
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
          mood,
          price,
          img_urls,
        },
        success: function (res) {
          const _user_id = sessionStorage.getItem('name');
          const _region = $('.place')[0].placeholder;
          const _subway = $('.place-detail')[0].placeholder;
          const _sortby = $('.order')[0].placeholder;
          sendGetListReq(_user_id, _region, _subway, _sortby);
        },
        error: function (e) {
          alert(e.message);
        }
      };
      sendReq(addContentReq);
    }, 500);
  });


  $('.modal-footer #modify-complete-btn').click(function() {
    console.log('수정완료 버튼 클릭');
    const subway = $('#modal-subway-right')[0].value;
    const res_name = $("#modal-modify .res-name-input").attr('value');
    const comment = $("#modal-modify textarea.comment-input").text();
    const rating = $("#modal-modify .starRev").children(".starR1.on, .starR2.on").length * 0.5;
    const mood = $.map($("#modal-modify button.messaging-button-checkbox.checked"), function(item) {
      return $(item).attr('value');
    }).toString();
    const price = $.map($("img.checkbox-img.checked"), function(item) {
      return $(item).attr('value');
    }).toString();

    if (!subway) { alert("지하철역을 입력해주세요."); return;}
    if (!res_name) { alert("상호를 입력해주세요."); return;}
    else if (!rating) { alert("평점을 입력해주세요."); return;}

    let file = document.querySelector('#file');
    var fileList = file.files;

    let img_urls = [];
    Object.keys(fileList).map(function(key) {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        var result = reader.result;
        img_urls.push(result);
      }, false);
      reader.readAsDataURL(fileList[key]);
    })

    //fileReader가 base64 url들을 얻은 후 시행
    setTimeout(function(){
      console.log(img_urls)
      console.log(`subway:${subway}, res_name:${res_name}, rating:${rating}, comment:${comment}, file:${file}`);
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
          mood,
          price,
          img_urls,
        },
        success: function (res) {
          const _user_id = sessionStorage.getItem('name');
          const _region = $('.place')[0].placeholder;
          const _subway = $('.place-detail')[0].placeholder;
          const _sortby = $('.order')[0].placeholder;
          sendGetListReq(_user_id, _region, _subway, _sortby);
        },
        error: function (e) {
          alert(e.message);
        }
      };
      sendReq(addContentReq);
    }, 500);

  });

});
