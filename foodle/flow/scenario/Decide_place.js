

const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();


const sortMap = require('sort-map');

// 기준이 되는 지하철 역에 대한 위도, 경도
const dictionary = {
  'station': [
    { 'name': '홍대입구역', 'lat': '37.557527', 'lng': '126.9244669' },
    { 'name': '합정역', 'lat': '37.5495753', 'lng': '126.9139908' },
    { 'name': '신촌역', 'lat': '37.559768', 'lng': '126.942308' },
    { 'name': '망원역', 'lat': '37.5559772', 'lng': '126.9012821' },
    { 'name': '서울대입구역', 'lat': '37.48121', 'lng': '126.952712' },
    { 'name': '왕십리역', 'lat': '37.5611284', 'lng': '127.035505' },
    { 'name': '성수역', 'lat': '37.544569', 'lng': '127.055974' },
    { 'name': '건대입구역', 'lat': '37.540389', 'lng': '127.069236' },
    { 'name': '이태원역', 'lat': '37.534533', 'lng': '126.994579' },
    { 'name': '명동역', 'lat': '37.5609892', 'lng': '126.9861868' },
    { 'name': '잠실역', 'lat': '37.5132612', 'lng': '127.1001336' },
    { 'name': '강남역', 'lat': '37.49794199999999', 'lng': '127.027621' },
    { 'name': '선릉역', 'lat': '37.504479', 'lng': '127.0467577' },
    { 'name': '사당역', 'lat': '37.476559', 'lng': '126.981633' },
    { 'name': '신사역', 'lat': '37.524124', 'lng': '127.022883' },
    { 'name': '역삼역', 'lat': '37.5008193', 'lng': '127.0369296' },
    { 'name': '고속터미널역', 'lat': '37.5049142', 'lng': '127.0049151' },
    { 'name': '회기역', 'lat': '37.58975600000001', 'lng': '127.057977' },
    { 'name': '안암역', 'lat': '37.5858384', 'lng': '127.0213534' },
    { 'name': '혜화역', 'lat': '37.58208', 'lng': '127.001892' },
    { 'name': '여의도역', 'lat': '37.5215695', 'lng': '126.9243115' },
    { 'name': '종각역', 'lat': '37.570169', 'lng': '126.983099' },
    { 'name': '종로3가역', 'lat': '37.5715', 'lng': '126.9912475' },
    { 'name': '을지로입구역', 'lat': '37.566056', 'lng': '126.982662' },
    { 'name': '을지로3가역', 'lat': '37.566286', 'lng': '126.9917735' },
    { 'name': '안국역', 'lat': '37.576556', 'lng': '126.985472' },
    { 'name': '광화문역', 'lat': '37.5705263', 'lng': '126.9765729' },
  ],
};
const data = dictionary.station;

function distance(lat1, lon1, lat2, lon2, value) { // Haversine 공식 : 구(지구) 에서 두 점(좌표) 사이 최단거리를 구하는 공식
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2
          + c(lat1 * p) * c(lat2 * p)
          * (1 - c((lon2 - lon1) * p)) / 2;
  const result = 12742 * Math.asin(Math.sqrt(a));
  // map.set(result, value);
  return [result, value];// 2 * R; R = 6371 km
}

class Decide_place {
  constructor(value, socket, user_data) {
    let key;
    key = value;

    if (user_data.state === 'init') {
      key = 'reinit';
    } else if (value === 'finish_input') {
      key = 'init';
    }

    this.strategies = {
      'reinit': this.reinit,
      'init': this.finish_input,
      'continue_input': this.continue_input,
      'show_place': this.show_place,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    // this.update_state(socket.id,'2',key);
    this.strategies[key] == null ? index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']) : this.strategies[key](value, socket, user_data);
  }

  update_state(id, scenario, state) {
    (async function (id, scenario, state) {
      try {
        await info_update.profile.update_state(id, scenario, state);
      } catch (e) {
        console.log(e);
      }
    }(id, scenario, state));
  }

  reinit(value, socket, user_data) {
    (async function () {
      try {
        const body = await info_update.profile.geocoder(user_data.kakao_id, value); // 카카오 지도 API 이용, 키워드를 통해 위도,경도를 받아온다.
        const re = JSON.parse(body);
        if(!re.documents) return;
        if (re.documents[0] === undefined) {
          index.sendSocketMessage(socket.id, 'chat message button', `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?\n(근처 지하철역을 말해주면 찾기가 쉬워)`);
        } else {
          await info_update.profile.update_place_info(socket.id, (user_data.lat + parseFloat(re.documents[0].y)), (user_data.lng + parseFloat(re.documents[0].x)), (user_data.cnt + 1));
          if (parseInt(user_data.cnt) >= 1) {
            await info_update.profile.update_state(socket.id, '2', 'reinit');
            index.sendSocketMessage(socket.id, 'chat message button', `${parseInt(user_data.cnt)}명이 다야?`, ['finish_input', '응 다야'], ['continue_input', '다른 친구도 있어']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', `친구${parseInt(user_data.cnt) + 1}의 출발위치를 입력해줘ㅎㅎ`);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  finish_input(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_mid_info(user_data.kakao_id, (user_data.lat / user_data.cnt), (user_data.lng / user_data.cnt));
        index.sendSocketMessage(socket.id, 'chat message button', `${user_data.cnt}곳의 중간, 핫-플레이스 보여줄게맨(BAAAM)`, ['show_place', '볼래!'], ['get_started', '취소취소']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  continue_input(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_state(socket.id, '2', 'init');
        index.sendSocketMessage(socket.id, 'chat message button', `친구${parseInt(user_data.cnt)}의 출발위치를 입력해줘ㅎㅎ`);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  show_place(value, socket, user_data) {
    (async function () {
      try {
        const map = new Map();
        for (const i in data) {
          if (Object.prototype.hasOwnProperty.call(data, i)) {
            map.set(distance(parseFloat(user_data.mid_lat), parseFloat(user_data.mid_lng), data[i].lat, data[i].lng, data[i].name)[0], distance(parseFloat(user_data.mid_lat), parseFloat(user_data.mid_lng), data[i].lat, data[i].lng, data[i].name)[1]);
          }
        }
        const sortedMap = sortMap(map); // key-value형식으로 map이 정의되어있다 (ex. 0.1234 - 성수역) 오름차순으로 map을 정렬하는 module
        console.log(`거리순으로 정렬된 map : ${sortedMap}`); // 거리순으로 출력
        await info_update.profile.update_stack(socket.id, `{"state": "decide_subway", "value": "flag"}`);
        await info_update.profile.update_state(socket.id, '1', 'decide_subway');

        index.sendSocketMessage(socket.id, 'chat message button', `중간 지점에 있는 주요 역은\n${Array.from(sortedMap.values())[0]}\n${Array.from(sortedMap.values())[1]}\n${Array.from(sortedMap.values())[2]}\n이야!`,
          [`middle/${Array.from(sortedMap.values())[0]}`, `${Array.from(sortedMap.values())[0]} 맛집 보러가기!`], [`middle/${Array.from(sortedMap.values())[1]}`, `${Array.from(sortedMap.values())[1]} 맛집 보러가기!`],
          [`middle/${Array.from(sortedMap.values())[2]}`, `${Array.from(sortedMap.values())[2]} 맛집 보러가기!`], ['get_started', '처음으로']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = Decide_place;
