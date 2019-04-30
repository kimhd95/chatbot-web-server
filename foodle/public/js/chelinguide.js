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

  $('#upload-btn').click(function() {
    console.log('등록하기 버튼 클릭');

    let subway, res_name, score, comment;
    subway = $('#modal-subway-right')[0].value;
    res_name = $('#res-name')[0].value;
    score = $('#modal-score-select')[0].value;
    comment = $('#comment')[0].value;

    // api call필요
    // const info ={
    //   url: "/api/v1/users/update_user",
    //   method: 'POST',
    //   body: {
    //     kakao_id: socket.id,
    //     scenario: scenario,
    //   },
    //   success: function(res) {
    //     console.log("success");
    //     // socket.emit('chat message button rule', name, stage);
    //     // $('.checkbox:checked').attr('checked', false);
    //     // $('.messaging-button').hide();
    //     // $('.messaging-button-checkbox').hide();
    //   },
    //   error: function (e) {
    //     console.log("fail");
    //     console.log(e);
    //   }
    // }
    // sendReq(info);
  });
});
