

const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();


class Decide_history {
  constructor(value, socket, user_data) {
    let key;
    key = value;

    if (key === 'previous_history/1') {
      key = 'previous_history1';
    } else if (key.includes('previous_history/')) {
      key = 'previous_history_info';
    } else if (key.includes('history/')) {
      key = 'history_subway_info';
    }

    this.strategies = {
      'history_by_count': this.history_by_count,
      'history_by_subway': this.history_by_subway,
      'history_subway_info': this.history_subway_info,
      'previous_history1': this.previous_history1,
      'previous_history_info': this.previous_history_info,
      'final_info_direct': this.final_info_direct,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '4', key);
    this.strategies[key] == null ? console.log('this strategy does not exist') : this.strategies[key](value, socket, user_data);
  }

  update_state(id, scenario, state) {
    (async function () {
      try {
        await info_update.profile.update_state(id, scenario, state);
      } catch (e) {
        console.log(e);
      }
    }());
  }

  history_by_count(value, socket, user_data) {
    (async function () {
      try {
        const history_value = await info_update.food.get_count_history(user_data.kakao_id);
        if (history_value.length === 0) {
          index.sendSocketMessage(socket.id, 'chat message button', '아직 선택한 맛집이 아직 없어...! 다른 메뉴를 선택해줘!', ['history_by_subway', '지역별 기록 보기'], ['previous_history1', '최근 기록 보기'], ['get_started', '돌아가기']);
          return;
        } if (history_value.length < 5) {
          let countHistory = '';
          for (let i = 0; i < history_value.length; i += 1) {
            countHistory += (`${history_value[i].subway} ${history_value[i].res_name} ${history_value[i].cnt}회<br>`);
          }
          index.sendSocketMessage(socket.id, 'chat message button', `선택 횟수 순으로 보여줄게!<br><br>${countHistory}<br>이야! 다른 기록도 보여줄까?`, ['final_info_direct', '마지막 선택 맛집 정보 보기'], ['history_by_subway', '지역별 기록 보기'], ['previous_history1', '최근 기록 보기'], ['get_started', '돌아가기']);
          return;
        }
        let countHistory = '';
        for (let i = 0; i < 5; i += 1) {
          countHistory += (`${history_value[i].subway} ${history_value[i].res_name} ${history_value[i].cnt}회<br>`);
        }
        index.sendSocketMessage(socket.id, 'chat message button', `선택 횟수 순으로 보여줄게!<br><br>${countHistory}<br>이야! 다른 기록도 보여줄까?`, ['final_info_direct', '마지막 선택 맛집 정보 보기'], ['history_by_subway', '지역별 기록 보기'], ['previous_history1', '최근 기록 보기'], ['get_started', '돌아가기']);
        return;
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  // 마지막 선택 맛집 보기에 대한 시나리오, decide_menu 시나리오를 그대로 이용하였다.
  // 이후 시나리오 진행을 위해, scenario 번호를 1로 업데이트 시켜준다.
  final_info_direct(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_state(socket.id, '1', 'final_info_direct');
        const food_value = await info_update.food.get_restaurant_info(socket.id, user_data.rest_final);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
        index.sendSocketMessage(socket.id, 'chat message button', `${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!`
          + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>`, ['show_image', '사진 보기'], ['후기 보기', '후기 보기'],
        ['get_started', '처음으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  history_by_subway(value, socket, user_data) {
    (async function () {
      try {
        index.sendSocketMessage(socket.id, 'chat message button', '지역별로 기록을 보여줄게! 어디가 궁금해?', ['history/강남역', '강남역'], ['history/서울대입구역', '서울대입구역'], ['history/성수역', '성수역'], ['history/신사역', '신사역'], ['history/신촌역', '신촌역'], ['get_started', '돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  history_subway_info(value, socket, user_data) {
    (async function () {
      try {
        const history_subway = value.split('/')[1];
        const subway_history_value = await info_update.food.get_subway_history(user_data.kakao_id, history_subway);
        if (subway_history_value.length === 0) {
          index.sendSocketMessage(socket.id, 'chat message button', `${history_subway} 에서 선택한 맛집이 아직 없어...! 다른 메뉴를 선택해줘!`, ['history_by_subway', '다른 지역 기록 보기'], ['history_by_count', '선택 횟수별 기록 보기'], ['previous_history1', '최근 기록 보기'], ['get_started', '돌아가기']);
          return;
        }
        let subwayHistory = '';
        for (let i = 0; i < subway_history_value.length; i += 1) {
          let { date } = subway_history_value[i];
          date = `${date.slice(4, 6)}월${date.slice(6, 8)}일`;
          subwayHistory += (`${subway_history_value[i].res_name} ${date}<br>`);
        }
        index.sendSocketMessage(socket.id, 'chat message button', `${history_subway} 에서 선택한 맛집은<br><br>${subwayHistory}<br>이야! 다른 기록도 보여줄까?`, ['history_by_subway', '다른 지역 기록 보기'], ['history_by_count', '선택 횟수별 기록 보기'], ['previous_history1', '최근 기록 보기'], ['get_started', '돌아가기']);
        return;
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  // 최근 기록 보기의 첫 페이지
  previous_history1(value, socket, user_data) {
    (async function () {
      try {
        let history_count = 10;
        const history_value = await info_update.food.get_all_history(user_data.kakao_id);
        if (history_value.length === 0) {
          index.sendSocketMessage(socket.id, 'chat message button', '선택한 맛집이 아직 없어...! 다른 메뉴를 선택해줘!', ['get_started', '돌아가기']);
          return;
        }
        if (history_value.length < 10) { // 기록이 10개 이하면, 해당 갯수만큼 기록을 추가시킨다.
          history_count = history_value.length;
        }
        let todayHistory = '';
        for (let i = 0; i < history_count; i += 1) { // 최근 1~10개
          let { date } = history_value[i];
          date = `${date.slice(4, 6)}월${date.slice(6, 8)}일`;
          todayHistory += (`${history_value[i].subway} ${history_value[i].res_name} ${date}<br>`);
        }
        if (history_value.length < 11) { // 기록이 10개 이하이면, 다음 페이지로 갈 기록이 없으므로 돌아가기 버튼만 생성한다.
          index.sendSocketMessage(socket.id, 'chat message button', `최근에 선택했던 ${history_count}개의 맛집을 보여줄게!<br><br>${todayHistory}<br>`, ['get_started', '돌아가기']);
        } else { // 기록이 10개가 넘으면, 다음 페이지로 가서 추가 기록을 볼 수 있게 한다.
          index.sendSocketMessage(socket.id, 'chat message button', `최근에 선택했던 ${history_count}개의 맛집을 보여줄게!<br><br>${todayHistory}<br>다른 기록도 보여줄까?`, ['previous_history/2', '이전 기록 보기'], ['get_started', '돌아가기']);
        }
        return;
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  // 추가 기록 페이지에 대한 시나리오, value의 / 이후 숫자가 페이지 번호를 나타낸다.
  previous_history_info(value, socket, user_data) {
    (async function () {
      try {
        const previous_history_count = parseInt(value.split('/')[1]); // 기록의 페이지 번호를 나타낸다.
        let history_count = 10;
        const history_value = await info_update.food.get_all_history(user_data.kakao_id);
        if (history_value.length < (previous_history_count * 10)) {
          history_count = history_value.length - ((previous_history_count - 1) * 10);
        }
        let todayHistory = '';
        for (let i = ((previous_history_count - 1) * 10); i < history_value.length; i += 1) { // 최근 10~20개
          let { date } = history_value[i];
          date = `${date.slice(4, 6)}월${date.slice(6, 8)}일`;
          todayHistory += (`${history_value[i].subway} ${history_value[i].res_name} ${date}<br>`);
        }
        const previous = `previous_history/${String(previous_history_count - 1)}`;
        const next = `previous_history/${String(previous_history_count + 1)}`;

        if (history_value.length < ((previous_history_count * 10) + 1)) { // 앞서 첫 기록 페이지와 마찬가지로, 다음 페이지 생성 여부를 판단.
          index.sendSocketMessage(socket.id, 'chat message button', `이전에 선택했던 ${history_count}개의 맛집을 보여줄게!<br><br>${todayHistory}<br>`, [previous, '다음 기록 보기'], ['get_started', '돌아가기']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', `이전에 선택했던 ${history_count}개의 맛집을 보여줄게!<br><br>${todayHistory}<br>다른 기록도 보여줄까?`, [next, '이전 기록 보기'], [previous, '다음 기록 보기'], ['get_started', '돌아가기']);
        }
        return;
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = Decide_history;
