const moment = require('moment');
const Info = require('../../api/info_update');
const index = require('../../server/index');
const info_update = new Info();
const sortMap = require('sort-map');
const dictionary = {
  'station': [
    { 'name': '강남역', 'lat': '37.4968282', 'lng': '126.9980708' },
    // { 'name': '건대입구역', 'lat': '37.540389', 'lng': '127.069236' },
    // { 'name': '광화문역', 'lat': '37.5705263', 'lng': '126.9765729' },
    // { 'name': '뚝섬역', 'lat': '37.54724', 'lng': '127.0451267' },
    // { 'name': '망원역', 'lat': '37.5559772', 'lng': '126.9012821' },
    // { 'name': '사당역', 'lat': '37.476559', 'lng': '126.981633' },
    // { 'name': '삼성역', 'lat': '37.5088194', 'lng': '127.0631134' },
    { 'name': '선릉역', 'lat': '37.504479', 'lng': '127.0467577' },
    // { 'name': '선정릉역', 'lat': '37.5102747', 'lng': '127.0416334' },
    // { 'name': '신촌역', 'lat': '37.559768', 'lng': '126.942308' },
    // { 'name': '성수역', 'lat': '37.544569', 'lng': '127.055974' },
    // { 'name': '신사역', 'lat': '37.5252636', 'lng': '127.0025238' },
    // { 'name': '여의도역', 'lat': '37.5215695', 'lng': '126.9243115' },
    // { 'name': '역삼역', 'lat': '37.5008193', 'lng': '127.0369296' },
    // { 'name': '을지로입구역', 'lat': '37.566056', 'lng': '126.982662' },
    // { 'name': '이태원역', 'lat': '37.534533', 'lng': '126.994579' },
    { 'name': '이대역', 'lat': '37.534533', 'lng': '126.994579' },
    { 'name': '서울대입구역', 'lat': '37.48121', 'lng': '126.952712' },
    // { 'name': '홍대입구역', 'lat': '37.557527', 'lng': '126.9244669' },
    // { 'name': '합정역', 'lat': '37.5495753', 'lng': '126.9139908' },
    // { 'name': '왕십리역', 'lat': '37.5611284', 'lng': '127.035505' },
    // { 'name': '명동역', 'lat': '37.5609892', 'lng': '126.9861868' },
     // { 'name': '잠실역', 'lat': '37.5132612', 'lng': '127.1001336' },
    // { 'name': '고속터미널역', 'lat': '37.5049142', 'lng': '127.0027318' },
    // { 'name': '회기역', 'lat': '37.58975600000001', 'lng': '127.057977' },
    // { 'name': '안암역', 'lat': '37.5858384', 'lng': '127.0213534' },
    // { 'name': '혜화역', 'lat': '37.58208', 'lng': '127.001892' },
    // { 'name': '종각역', 'lat': '37.570169', 'lng': '126.983099' },
    // { 'name': '종로3가역', 'lat': '37.5715', 'lng': '126.9912475' },
    // { 'name': '을지로3가역', 'lat': '37.566286', 'lng': '126.9917735' },
    // { 'name': '안국역', 'lat': '37.576556', 'lng': '126.985472' },
  ],
};

const data = dictionary.station;
const available_subway = {
                          '강남역': ['1,2,3,4번', '5,6,7,8번', '9,10번', '11,12번'],
                          '선릉역': ['1,2번', '3,4번', '5,6,7번', '8,9,10번'],
                          '서울대입구역': ['1,2번', '3,4번', '5,6번', '7,8번'],
                          // '이대역': ['5번', '6번', '1,2번', '3,4번'],
                          // '건대입구역': ['롯데백화점 스타시티 방면', '5,6번', '1,2번', '3,4번'],
                          // '광화문역': ['5번', '6번', '1,7,8번', '2,3,4,9번'],
                          // '뚝섬역': ['5,6번', '7,8번', '1,2번', '3,4번'],
                          // '망원역': ['1번', '2번'],
                          // '사당역': ['1,2,3번', '4,5,6번', '7,8,9,10번', '11,12,13,14번'],
                          // '삼성역': ['1,2번', '3,4번', '5,6번', '7,8번'],
                          // '선정릉역': ['3번', '4번', '1번', '2번'],
                          // '성수역': ['3번', '4번', '1번', '2번'],
                          // '여의도역': ['5번', '6번', '1,2번', '3,4번'],
                          // '역삼역': ['1번', '2,3번', '4,5,6번', '7,8번'],
                          // '왕십리역': ['6,13번', '6-1,7,8,9,10,11,12번', '1,2,3,4,5번'],
                          // '을지로입구역': ['5,6번', '7,8번', '1, 1-1, 2번', '3,4번'],
                          // '이태원역': ['3번', '4번', '1번', '2번'],
                          '잠실역': ['1, 2, 2-1, 10, 11번', '3,4번', '5,6번', '7,8,9번'],
                          // '종각역': ['4번', '5,6번', '1,2번', '3, 3-1번'],
                          // '합정역': ['3,4,5,6번', '7번', '8번', '1,2,9,10번'],
                          // '혜화역': ['2번', '3번', '4번', '1번'],
                          // '홍대입구역': ['4,5,6번', '7,8,9번', '1,2,3번'],
                         };

const error_msg = '오류가 발생했습니다.';
const wrong_subway_input_msg = (value) => `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`;
const get_started_button = ['get_started', '처음으로 돌아가기'];
const previous_button = (stack) => [`previous/${stack.replace(/"/gi,"@")}`, '이전으로 돌아가기'];
const random_pick = (arr) => arr[Math.floor(arr.length * Math.random())];
const stack_updateby = (stack, state, value) => `${stack},{"state":"${state}","value":"${value}"}`;

const check_subway = (subway) => {
  switch (subway) {
    case '건대역': case '건국대역': case '건국대입구역': case '건국대학교역': case '건국대학교입구역': case '건입역':
      return '건대입구역';
    case '경병역':
      return '경찰병원역';
    case '고대역': case '고려대학교역':
      return '고려대역';
    case '고터역':
      return '고속터미널역';
    case '교육대역':
      return '교대역';
    case '남터역':
      return '남부터미널역';
    case '동묘':
      return '동묘앞역';
    case '동역문역':
      return '동대문역사문화공원역';
    case '미사역': case '미삼역': case '미아삼거리역':
      return '미아사거리역';
    case '서울대역': case '서울대학교역': case '서울대학교입구역': case '설입역':
      return '서울대입구역';
    case '성대역': case '성대입구역': case '성신여대역': case '성신여자대학교역': case '성신여자대학교입구역':
      return '성신여대입구역';
    case '센텀역':
      return '센텀시티역';
    case '숙대역': case '숙입역': case '숙명대역': case '숙명여대역': case '숙명대입구역': case '숙명여대입구역':
      return '숙대입구역';
    case '외대역':
      return '외대앞역';
    case '을입역':
      return '을지로입구역';
    case '이화여대역': case '이화여자대학교역':
      return '이대역';
    case '신천역':
      return '잠실새내역';
    case '홍대역': case '홍익대역': case '홍익대입구역': case '홍익대학교역': case '홍익대학교입구역': case '홍입역':
      return '홍대입구역';
    default:
      return subway;
  }
}

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

class Decide_menu {
  constructor(value, socket, user_data) {
    console.log('value: '+value);
    console.log('user_data의 state: '+user_data.state);
    let key = value;
    if (key.startsWith('S0_1/')) {
      key = 'S0_1';
    } else if (key.startsWith('S0_2/')) {
      key = 'S0_2';
    } else if (key.startsWith('S1/')) {
      key = 'S1';
    } else if (key.startsWith('S2/') || user_data.state == 'S1' || key.startsWith('middle/')) {
      key = 'S2';
    } else if (key.startsWith('S3_1/')) {
      key = 'S3_1';
    } else if (key.startsWith('S3_2/')) {
      key = 'S3_2';
    } else if (key.startsWith('S3_3/')) {
      key = 'S3_3';
    } else if (key.startsWith('S3_4/')) {
      key = 'S3_4';
    } else if (key.startsWith('S4_1/')) {
      key = 'S4_1';
    } else if (key.startsWith('S4_2/') || user_data.state == 'S3_4') {
      key = 'S4_2';
    } else if (key.startsWith('S10/') || user_data.state == 'S4_2') {
      key = 'S10';
    } else if (key.startsWith('S11/') || user_data.state == 'S10') {
      key = 'S11';
    } else if (key.startsWith('S11_1/')) {
      key = 'S11_1';
    } else if (key.startsWith('S11_2/')) {
      key = 'S11_2';
    } else if (key.startsWith('S12/')) {
      key = 'S12';
    } else if (key.startsWith('S12_1/')) {
      key = 'S12_1';
    } else if (key.startsWith('S12_2/')) {
      key = 'S12_2';
    } else if (user_data.state == 'S2') {
      key = 'S2';
    }

    this.strategies = {
      'decide_menu': this.decide_menu,
      'S0_1': this.S0_1_hobulho_hate,
      'S0_2': this.S0_2_hobulho_hate_feedback,
      'S1': this.S1__decide_subway,
      'S2': this.S2__decision_method,
      'S3_1': this.S3_1_exitnum,
      'S3_2': this.S3_2_taste,
      'S3_3': this.S3_3_mood2,
      'S3_4': this.S3_4_search_food,
      'S4_1': this.S4_1_price,
      'S4_2': this.S4_2_search_result,
      'S10': this.S10__before_decide,
      'S11': this.S11__decide_final,
      'S11_1': this.S11_1_decide_final_others,
      'S11_2': this.S11_2_decide_final_similar,
      'S12': this.S12__final,
      'S12_1': this.S12_1_show_image,
      'S12_2': this.S12_2_final_info_direct,
      'geolocation_err': this.geolocation_err,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '1', key);
    console.log(`decide_menu 에서 key: ${key}, value: ${value}`)
    this.strategies[key] == null ? index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button) : this.strategies[key](value, socket, user_data);
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

  decide_menu(value, socket, user_data) {
    (async function () {
      try {
        // db 갱신 관련 코드 나중에 또 이용
        // const restaurantList = await info_update.food.get_restaurant_subway(socket.id, '선릉역');
        // console.log(restaurantList);
        // let sendList = []
        // for (let i = 0; i<restaurantList.length; i++) {
        //   const body = await info_update.profile.geocoder(socket.id, `${restaurantList[i].address}`); // 카카오 지도 API 이용, 키워드를 통해 위도,경도를 받아온다.
        //   const re = JSON.parse(body);
        //   if (re.documents.length == 0) {
        //     console.log("re.documents == null");
        //   } else {
        //     sendList.push({'id' : restaurantList[i].id, 'lat' : re.documents[0].y, 'lng' : re.documents[0].x})
        //   }
        // }
        // setTimeout(() => {info_update.food.set_restaurant_latlng(socket.id, sendList)}, 5000);

        const chlist = ['안녕!! 배고플땐 언제나 코기를 찾아줘😏😆',
                        '안녕 배고프지? 얼렁 메뉴를 정해볼까...🍚',
                        '배고프지? 오늘도 스겜하자ㅋㅋㅋ⚡', '코기 와쪄😝🐶',
                        '식사시간엔 결국 나를 찾게 되어있지^~^',
                        '뿅🐕🐕 나왔다!',
                        '솔직히 나만큼 세상을 평화롭게 하는 강아지는 없을거야',
                        '이왕 먹는 밥 스트레스 안받고 깔끔하게 정하자구',
                        '안녕 코기 와쪄~!🐕',
                        'ㅎㅇㅎㅇㅎㅇ',
                        '배고프다 배고파!',
                        '맛있는~게~ 너무~ 많아~~~ ',
                        '메뉴 정하는 데 5분이 넘게 걸린다면 그건 비효율적인 삶이야',
                        '결정장애는 부끄러운게 아냐 충분히 치유 가능하니까!!! 내가 있다면😘',
                        '어서와!! 메뉴 정하러 가자👽',
                        '2시간이나 굶었더니 당 떨어진다...👻'];
        const imglist = ['emoji/hello.png',
                         'emoji/hello2.png',
                         'emoji/hello3.png',
                         'emoji/hello4.png',
                         'emoji/hello_soup.png',
                         'emoji/sushicorgi.png'];

        await info_update.profile.update_place_start(socket.id);
        const user_info = await info_update.profile.load_user(socket.id);
        const verify_limit = await info_update.profile.verify_limit(socket.id, user_data.limit_cnt, user_data.decide_updated_at);
        const { result } = verify_limit;
        if (result === 'success') {
          await info_update.profile.update_stack(socket.id, `{"state":"${user_data.state}","value":"${value}"}`);
          index.sendSocketMessage(socket.id, 'chat message button image', random_pick(chlist), random_pick(imglist),
                ['S1/lunch', '점심 고르기(평일)'], ['S1/dinner', '점심 고르기(주말)'], ['S1/dinner', '저녁 고르기'], ['S0_1', '못 먹는 음식 체크'],
                ['S4_1/search_near/', '내 주변 500m 내 식당 검색(GPS 켜줘!)']); //TODO: 식당/메뉴명으로 검색하기
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '아... 너무 많이 말했더니 🐶피곤.... 30분만 자고 다시 올게😪🌙', 'emoji/drunk2.png',get_started_button);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }


  S0_1_hobulho_hate(value, socket, user_data) {
    (async function () {
      try {
        console.log("### [S0_1] Value: ", value);
        const hobulho_hate_list = ['못 먹거나 싫어하는 음식을 모두 체크해줘!',
                                   '못 먹거나 싫어하는 음식을 체크해주면 최대한 반영해줄게!',
                                   '이 중에서 못 먹는 음식이 있으면 최대한 반영해줄게! 언제든 바꿀 수 있으니 편하게 체크해봐ㅎㅎ'];

        index.sendSocketMessage(socket.id, 'chat message button checkbox', random_pick(hobulho_hate_list),
            ['900', '없음'], ['회', '회'], ['해산물', '모든 해산물'], ['곱창', '곱창'],['닭발', '닭발'], ['양꼬치', '양꼬치'],
            ['쌀국수', '베트남쌀국수'], ['오이', '오이'], ['매운', '매운음식'], previous_button(user_data.stack), ['S0_2/', '선택완료']);
            //홍어,선지,콩국수,건포도,육회,굴,가지,닭발
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S0_2_hobulho_hate_feedback(value, socket, user_data) {
    (async function () {
      try {
        console.log("### [S0_2] Value: ", value);
        const val = value.split('/')[1];
        await info_update.profile.update_hate_food(socket.id, val);
        const hobulho_hate_feedback_list = ['오케이 이제부터 참고 하겠어',
                                            '오키! 많이 거를수록 선택의 폭은 좁아지겠지만... 호불호는 다 있는거니까😄 이제 메뉴 골라볼까',
                                            'ㅋㅋㅋ이해해!! 나는 저거 다 먹을 수 있지만... 앞으로 참고하고 추천할게!'];
        index.sendSocketMessage(socket.id, 'chat message button', random_pick(hobulho_hate_feedback_list),
              ['S1/lunch', '점심 고르기(평일)'],['S1/dinner', '점심 고르기(주말)'], ['S1/dinner', '저녁 고르기'],
              ['S0_1', '못 먹는 음식 체크'], ['S4_1/search_near/', '내 주변 500m 내 식당 검색(GPS 켜줘!)']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S1__decide_subway(value, socket, user_data) {
    (async function () {
      try {
        console.log("### [S1] Value: ", value);
        const val = value.split('/')[1];
        if (val != 'method') {
          await info_update.profile.update_stack(socket.id, stack_updateby(user_data.stack, user_data.state, value));
        }

        if (val === 'lunch') {
          await info_update.profile.update_price_level_dinner(socket.id, 'x');
        } else if (val === 'dinner') {
          await info_update.profile.update_price_level_lunch(socket.id,'x');
        }

        if (user_data.hate_food == null) {
          await info_update.profile.update_hate_food(socket.id, 'x');
        }

        if (val !== 'elsewhere' && user_data.freq_subway !== null) {
          const revisit = user_data.freq_subway;
          const freq_list = [`이번에도 ${revisit}에서 메뉴를 정하면 될까?`, `이번에도 ${revisit} 고고?`, `이번에도 ${revisit}에서 밥 먹을거야?`,
                             `이번에도 ${revisit}에서 먹는거 맞지?`, `오늘도 ${revisit}?`, `오늘도 ${revisit}에서 골라볼까?`,
                             `이번에도 ${revisit}에서 정하는거 맞아맞아?`, `오늘도 ${revisit}에서 메뉴 정해볼까?`, `이번에도 ${revisit}에서 먹을 곳 찾는거야?`];
          index.sendSocketMessage(socket.id, 'chat message button', random_pick(freq_list), [revisit, '응 맞아!'], ['S1/elsewhere', '다른 곳이야!'], previous_button(user_data.stack));
        } else {
          const chlist = ['어느 역 근처의 메뉴를 정해줄까?', '밥 어디에서 먹을거야?🍚', '밥 어디에서 먹어?', '어느 역 근처 메뉴를 정해줄까?',
              '위치가 어디야? 원하는 곳에서 가까운 지하철역을 입력해줘🚋', '밥 어디에서 먹어? 챱챱', '이번에는 어느 역 근처의 메뉴를 정해볼까?',
              '어디 근처로 골라볼까?', '어떤 지하철역 근처로 정해볼까?'];
          index.sendSocketMessage(socket.id, 'chat message button', `${random_pick(chlist)}<br>ex) 강남역,이대역`);
        }
      } catch (e) {
          index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
      }
    }());
  }

  S2__decision_method(value, socket, user_data) {
    (async function () {
        try {
          const val = value.split('/')[1];
            if (user_data.price_lunch == 'x') {
              await info_update.profile.update_price_level_dinner(socket.id, 'null');
            } else if (user_data.price_dinner == 'x') {
              await info_update.profile.update_price_level_lunch(socket.id, 'null');
            }

            let subway;
            if (value.includes('near_station') || value.includes('middle')) {
              subway = value.slice(value.lastIndexOf('/')+1);
            }
            else {
              subway = value.replace(/ /gi, '');    // 입력값에서 공백제거
              subway = (subway.slice(-1) !== '역') ? check_subway(`${subway}역`) : check_subway(subway);
            }

            const result = await info_update.food.verify_subway(socket.id, subway);
            if (result === 'success') {
                await info_update.profile.update_stack(socket.id, stack_updateby(user_data.stack, user_data.state, value));
                const user_info = await info_update.profile.load_user(socket.id);
                const db_subway = await user_info.subway;
                (subway === db_subway) ? await info_update.profile.update_freq_subway(socket.id, subway)
                                       : await info_update.profile.update_freq_subway(socket.id, 'null');
                await info_update.profile.update_subway(socket.id, subway);
                if (user_data.price_lunch === null && user_data.price_dinner === null) {
                  await info_update.profile.update_price_level_lunch(socket.id, '0,1,2,3,4');
                  await info_update.profile.update_price_level_dinner(socket.id, '0,1,2,3,4');
                }
            }
            else {
              if (value.includes('middle')) {
                await index.sendSocketMessage(socket.id, 'chat message button', `${value.slice(value.lastIndexOf('/')+1)}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`, ['S1/method/elsewhere', '다시 입력하기']);
                return;
              } else {
                // await index.sendSocketMessage(socket.id, 'chat message button', `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`, ['S1/elsewhere', '다시 입력하기']);
                await index.sendSocketMessage(socket.id, 'chat message button', `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`);
                return;
              }
            }

            const imglist = ['emoji/checking.png','emoji/checking2.png','emoji/thinking.png','emoji/thinking2.png'];
            const qna_list = { //지하철역 검색->현재위치 500m내
                                'question': ['어떤 방식으로 메뉴를 정해보까나', '오늘 메뉴는 어떻게 골라줄까?'],
                                'button1_id': 'S3_1/', 'button1_value': '지하철 출구별 검색',
                                'button2_id': 'S3_2/', 'button2_value': '1만원 미만',
                                'button3_id': 'S3_3/', 'button3_value': '식당 분위기 필터링',
                                'button4_id': 'S3_4/', 'button4_value': '음식 종류 검색',
                             };
            const params = [];
            if (subway in available_subway) { params.push([qna_list.button1_id, qna_list.button1_value]); }
            params.push([qna_list.button2_id, qna_list.button2_value], [qna_list.button3_id, qna_list.button3_value], [qna_list.button4_id, qna_list.button4_value]);

            if (value.includes('middle')) {
              await info_update.profile.update_lat(socket.id, 'null');
              await info_update.profile.update_lng(socket.id, 'null');
            } else {
              params.push(previous_button(user_data.stack));
            }
            await index.sendSocketMessage(socket.id, 'chat message button image', random_pick(qna_list.question), random_pick(imglist), ...params);
        } catch (e) {
          index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
          console.log(e);
        }
    }());
  }

  S3_1_exitnum(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, stack_updateby(user_data.stack, user_data.state, value));
        let subway = user_data.subway;
        const exit_list = [`${subway} 몇 번 출구쪽이 좋아??`,
                           `${subway}에서 더 편한 출구가 있다면 골라줘!(중복선택)`,
                           `${subway} 몇 번 출구쪽이 편해?(중복선택)`,
                           `${subway} 몇 번 출구쪽이 좋아? 모르면 "상관없음" 버튼을 눌러주면 돼!`];

        if (subway in available_subway) {
          await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, subway, `images/${subway}.png`, ['999', '상관없어'], ['4', available_subway[subway][0]], ['3', available_subway[subway][1]], ['2', available_subway[subway][2]], ['1', available_subway[subway][3]], previous_button(user_data.stack), ['S4_1/exit/', '선택완료']);
        }
        else {
          index.sendSocketMessage(socket.id, 'chat message button', `지금 밥집 고르기를 이용 가능한 곳은 서울[${Object.keys(available_subway).toString()}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['S1/elsewhere', '다시 장소 입력하기'], get_started_button);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S3_2_taste(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, stack_updateby(user_data.stack, user_data.state, value));
        const user_price = await value.split('/')[1];;

        let price_lun, price_din;
        if (user_data.price_dinner === 'x') { //점심식사
          await info_update.profile.update_price_level_lunch(socket.id, '0');
          price_lun = '0';
          price_din = 'x';
        } else if (user_data.price_lunch === 'x') { //저녁식사
          await info_update.profile.update_price_level_dinner(socket.id, '0');
          price_din = '0';
          price_lun = 'x';
        }
        await info_update.profile.update_exit_quarter(socket.id, '999');
        await info_update.profile.update_mood2(socket.id, '998');

        const taste = {
          'qnas': [
            {
              'question': '기름진 음식 vs 담백한 음식?', 'button1_id': 'S10/taste/기름진', 'option1': '기름진', 'button1_value': '기름진', 'button2_id': 'S10/taste/담백한', 'button2_value': '담백한', 'option2': '담백한',
            },
            // {
            //   'question': '치즈듬뿍 vs 치즈x?', 'button1_id': 'taste/치즈', 'button1_value': '치즈듬뿍', 'button2_id': 'taste/!-치즈', 'button2_value': '치즈x',
            // },
            // {
            //   'question': '자극적인 맛 vs 깔끔한 맛?', 'button1_id': 'taste/자극적인', 'button1_value': '자극적인', 'button2_id': 'taste/!-자극적인', 'button2_value': '깔끔한',
            // },
            // {
            //   'question': '헤비한음식 vs 가벼운음식?', 'button1_id': 'taste/!-가벼운', 'button1_value': '헤비한', 'button2_id': 'taste/가벼운', 'button2_value': '가벼운',
            // },
            // {
            //   'question': '오늘 매운거 어때?', 'button1_id': 'taste/매운', 'button1_value': '좋아', 'button2_id': 'taste/!-매운', 'button2_value': '싫어',
            // },
            // {
            //   'question': '오늘 따뜻한 국물이 땡겨?', 'button1_id': 'taste/따뜻한', 'button1_value': 'ㅇㅇ', 'button2_id': 'taste/!-따뜻한', 'button2_value': 'ㄴㄴ',
            // },
            {
              'question': '밥 vs 면?', 'button1_id': 'S10/taste/밥', 'button1_value': '밥', 'option1': '밥', 'button2_id': 'S10/taste/면', 'button2_value': '면', 'option2': '면',
            },
            // {
            //   'question': '오늘 고기 들어간 음식은 어떄?', 'button1_id': 'taste/고기', 'button1_value': '좋아', 'button2_id': 'taste/!-고기', 'button2_value': '싫어',
            // },
            {
              'question': '쌀 vs 밀가루?', 'button1_id': 'S10/taste/밥', 'button1_value': '쌀', 'option1': '밥', 'button2_id': 'S10/taste/밀가루', 'button2_value': '밀가루', 'option2': '밀가루',
            },
            // {
            //   'question': '오늘 해산물 들어간 음식은 어때?', 'button1_id': 'taste/해산물', 'button1_value': '좋아', 'button2_id': 'taste/!-해산물', 'button2_value': '싫어',
            // },
          ],
        };
        const taste_list = taste.qnas.map(item => [item.option1, item.option2]); // request 보낼 답변값 리스트
        const valid_list = [];    // response에서 유효한 질문들 담을 리스트

        const result = await info_update.food.verify_result_exist(socket.id, user_data.subway, price_lun, price_din, user_data.hate_food, taste.qnas);
        if (result.success) {
          let validResult = result.valid; // {index : 0, valid : true} 형식
          for (let i = 0; i < validResult.length; i++) {
            if (validResult[i].valid)
              valid_list.push(taste.qnas[validResult[i].index]);
          }
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 미안... 다시... 한번... 해야할것... 같은데....', 'emoji/hungry4.png', get_started_button);
        }
        const imglist = ['emoji/ask.png','emoji/ask2.png','emoji/ask3.png','emoji/ask4.png'];
        const valid_pick = random_pick(valid_list);
        const qnas_pick = random_pick(taste.qnas);
        const picked = (valid_list.length > 0) ? valid_pick : qnas_pick;
        index.sendSocketMessage(socket.id, 'chat message button image', picked.question, random_pick(imglist),
                                [picked.button1_id, picked.button1_value], [picked.button2_id, picked.button2_value],
                                ['S10/taste/all', '상관없음'], previous_button(user_data.stack));
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S3_3_mood2(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, stack_updateby(user_data.stack, user_data.state, value));
        const mood2_list = ['원하는 식당 분위기를 골라줘!(중복선택)',
                            '특별히 원하는 식당 분위기가 있다면 골라줘!(중복선택)',
                            '가고 싶은 식당의 키워드를 몇개 골라봐!! (못고르겠으면 상관없음ㄱㄱ)'];
        const imglist = ['emoji/checking.png','emoji/checking2.png'];

        await info_update.profile.update_food_type(socket.id, 'all');
        await info_update.profile.update_taste(socket.id, 'all');;
        await info_update.profile.update_exit_quarter(socket.id, '999');
        await info_update.profile.update_food_name(socket.id, 'x');
        const result = await info_update.food.verify_mood2(socket.id, user_data.subway);

        const show_list = await [['998', '상관없음']];
        if (result.includes('가벼운')) {
          await show_list.push(['가벼운', '간단한']);
        }
        if (result.includes('인스타')) {
          await show_list.push(['인스타', '#인스타감성']);
        }
        if (result.includes('깔끔')) {
          await show_list.push(['깔끔','깔끔한']);
        }
        if (result.includes('큰프')) {
          await show_list.push(['큰프', '프랜차이즈']);
        }
        if (result.includes('뷔페')) {
          await show_list.push(['뷔페', '뷔페/무한리필']);
        }
        await show_list.push(previous_button(user_data.stack));
        await show_list.push(['S4_1/mood2/', '선택완료']);
        if (result.length !== 0) {
           await index.sendSocketMessage(socket.id, 'chat message button checkbox image', random_pick(mood2_list), random_pick(imglist), show_list);
        } else {
          const item = new Decide_menu('S4_1/mood2/998', socket, user_data);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S3_4_search_food(value, socket, user_data) { //TODO: 검색기능 구현(res_name, food_type, food_name)
    (async function () {
        try {
          await info_update.profile.update_stack(socket.id, stack_updateby(user_data.stack, user_data.state, value));
          await info_update.profile.update_food_type(socket.id, 'all');
          await info_update.profile.update_taste(socket.id, 'all');
          await info_update.profile.update_mood2(socket.id, '998');
          await info_update.profile.update_exit_quarter(socket.id, '999');
          const chlist = ['원하는 음식 종류를 골라줘!!', '뭐 먹고 싶은지 골라봐🍚'];
          index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist), ['고기', '고기'], ['한식', '한식'], ['매운 음식', '매운 음식'], ['초밥', '초밥'], ['피자', '피자'], ['치킨', '치킨'], ['-직접 입력', '직접 입력'], previous_button(user_data.stack));
        } catch (e) {
          index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        }
    }());
  }

  S4_1_price(value, socket, user_data) {
    (async function () {
        try {
          console.log('### [S4_1] Value: ', value);
          await info_update.profile.update_stack(socket.id, stack_updateby(user_data.stack, user_data.state, value));
          if (value.includes('exit/')) {
            const user_quarter = value.split('exit/')[1];
            await info_update.profile.update_exit_quarter(socket.id, user_quarter);
            await info_update.profile.update_mood2(socket.id, '998');
            await info_update.profile.update_food_type(socket.id, 'all');
            await info_update.profile.update_taste(socket.id, 'all');
            await info_update.profile.update_food_name(socket.id, 'x');
          } else if(value.includes('mood2/')) {
            const user_input_value = value.split('mood2/')[1];
            await info_update.profile.update_exit_quarter(socket.id, '999');
            await info_update.profile.update_mood2(socket.id, user_input_value);
            await info_update.profile.update_food_type(socket.id, 'all');
            await info_update.profile.update_taste(socket.id, 'all');
            await info_update.profile.update_food_name(socket.id, 'x');
          } else if(value.includes('search_near/')) {
            const lat = value.split('search_near/')[1].split(',')[0];
            const lng = value.split('search_near/')[1].split(',')[1];
            console.log("lat, lng >> ", lat, lng);
            await info_update.profile.update_lat(socket.id, lat);
            await info_update.profile.update_lng(socket.id, lng);
          }

          const price_list = ['식사 예산은 1인당 어느 정도 생각해? (중복선택가능!)',
                              '오늘 너의 텅장💸이 허락하는 한도는??(1인 기준, 중복선택)',
                              '식사 가격은 1인당 얼마 정도였으면 좋겠어? (중복선택)',
                              '이번 식사. 얼마면 돼?!💰(1인 기준, 중복선택)',
                              '오늘 식사의 가격대는 어느 정도로 생각해~~?(1인 기준, 중복선택)',
                              '1인당 얼마까지 긁을 수 있어? 💳 (중복선택가능!)'];

          await index.sendSocketMessage(socket.id, 'chat message button checkbox price', random_pick(price_list),
                ['0', '~1만원 미만'], ['1', '1만원 대'], ['2', '2만원 대'], ['3,4', '3만원 이상'], previous_button(user_data.stack), ['S10/price/', '선택완료']);
        } catch (e) {
          await index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
          console.log(e);
        }
    }());
  }

  S4_2_search_result(value, socket, user_data) {
    (async function () {
      try {
        console.log('### [S4_2] Value: ', value);

        if (value.includes('-직접 입력')) {
          const chlist = ['원하는 음식 종류를 말해줘!!<br>ex) 치킨', '뭐 먹고 싶은지 말해봐🍚<br>ex) 피자'];
          setTimeout(() => {info_update.profile.update_state(socket.id, '1', 'S3_4');}, 100);
          setTimeout(() => {index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist));}, 150);
        }
        else {
          let search_food = value;
          let subway = user_data.subway;
          let apicall;

          // 예외처리 하는부분
          if (search_food === '고기') {
            apicall = await info_update.food.verify_search_food(socket.id, '바비큐', subway);
          } else if (search_food === '초밥') {
            apicall = await info_update.food.verify_search_food(socket.id, ['초밥', '스시', '오마카세'], subway);
          } else if (search_food === '매운 음식') {
            apicall = await info_update.food.verify_search_food(socket.id, '매운', subway);
          } else if (search_food === '분식') {
            apicall = await info_update.food.verify_search_food(socket.id, ['김밥', '떡볶이'], subway);
          } else if (['돈까스','돈가스','돈까츠','돈가츠','돈카츠','돈까쓰'].indexOf(user_data.food_name) !== -1) {
            apicall = await info_update.food.verify_search_food(socket.id, ['돈까스','돈가스','돈까츠','돈가츠','돈카츠','돈까쓰'], subway);
          } else {
            apicall = await info_update.food.verify_search_food(socket.id, search_food, subway);
          }

          if (apicall.result === 'success') {
            await info_update.profile.update_food_name(socket.id, search_food);
            const chlist = [search_food+' 찾았다! 이걸로 추천해줄게 잠깐만~',search_food+' 있다있어~ 잠깐만 기다료바'];
            index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist),['S10/search', '추천 보러가기'], get_started_button, previous_button(user_data.stack));
          } else {
            await info_update.profile.update_state(socket.id, '1', 'search_food');
            await index.sendSocketMessage(socket.id, 'chat message button', `${search_food} 검색어로 찾을 수 있는 식당이 없네ㅠㅠ 다시 검색해볼래?`, ['S4_2/-직접 입력', '다시 검색하기'], previous_button(user_data.stack));
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
      }
    }());
  }

  S10__before_decide(value, socket, user_data) {
    (async function () {
      try {
        console.log('### [S10] Value: ', value);
        await info_update.profile.update_stack(socket.id, stack_updateby(user_data.stack, user_data.state, value));
        let price_lunch = user_data.price_lunch;
        let price_dinner = user_data.price_dinner;
        let taste = user_data.taste;
        if (value.includes('price/')) {
          const user_price = await value.split('price/')[1];;
          if (user_data.price_dinner === 'x') { //점심식사
            price_lunch = user_price;
            price_dinner = 'x';
            await info_update.profile.update_price_level_lunch(socket.id, user_price);
          } else if (user_data.price_lunch === 'x') { //저녁식사
            price_lunch = 'x';
            price_dinner = user_price;
            await info_update.profile.update_price_level_dinner(socket.id, user_price);
          } else {
            price_lunch = user_price;
            price_dinner = user_price;
            await info_update.profile.update_price_level_lunch(socket.id, user_price);
            await info_update.profile.update_price_level_dinner(socket.id, user_price);
          }
        }
        else if (value.includes('taste/')) {
          const user_input_value = value.split('taste/')[1];
          taste = user_input_value;
          await info_update.profile.update_taste(socket.id, user_input_value);
        }

        if (user_data.lat != null && user_data.lng != null) {
          // search_near 인 경우
          const foods = await info_update.food.get_near_restaurant(socket.id, price_lunch, price_dinner, user_data.hate_food, user_data.lat, user_data.lng);
          const foods_info = foods.message;
          if (foods_info.length === 2) {
            await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
            index.sendSocketMessage(socket.id, 'chat message no button distance', '2곳을 골라줄테니까 한 번 골라봐!', foods_info[0].distance, foods_info[1].distance);//, [`S11/${foods_info[0].distance},${foods_info[1].distance}`, '고고'], ['get_started', '안할래'], previous_button(user_data.stack));
            return;
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 다시 골라줘!', 'emoji/hungry3.png',get_started_button, previous_button(user_data.stack));
          }
        }
        else if (value.includes('search')) {
          // search_food 인 경우
          function getFoods(callback) {
            return new Promise((resolve) => {
              let foods;
              if (user_data.food_name === '초밥') {
                foods = info_update.food.verify_search_food(socket.id, ['초밥', '스시', '오마카세'], user_data.subway);
              } else if (user_data.food_name === '매운 음식') {
                foods = info_update.food.verify_search_food(socket.id, '매운', user_data.subway);
              } else if (user_data.food_name === '분식') {
                foods = info_update.food.verify_search_food(socket.id, ['김밥', '떡볶이'], user_data.subway);
              } else if (['돈까스','돈가스','돈까츠','돈가츠','돈카츠','돈까쓰'].indexOf(user_data.food_name) !== -1) {
                foods = info_update.food.verify_search_food(socket.id, ['돈까스','돈가스','돈까츠','돈가츠','돈카츠','돈까쓰'], user_data.subway);
              } else {
                foods = info_update.food.verify_search_food(socket.id, user_data.food_name, user_data.subway);
              }
              resolve(foods);
            });
          }
          getFoods().then(async (foods) => {
            const foods_info = foods.message;
            if (foods_info.length === 2) {
              await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
              index.sendSocketMessage(socket.id, 'chat message no button', '2곳을 골라줄테니까 한 번 골라봐!');//, ['S11', '고고'], ['get_started', '안할래'], previous_button(user_data.stack));
              return;
            } else if (foods_info.length === 1) {
              await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, 'null');
              index.sendSocketMessage(socket.id, 'chat message no button', '조건에 맞는 식당이 1곳 뿐이네! 이거라도 보여줄게 기다료바!!');
            } else {
              index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 다시 골라줘!', 'emoji/hungry3.png',get_started_button, previous_button(user_data.stack));
            }
          });
        }
        else {
          // search_near 아닌경우
          const foods = await info_update.food.get_restaurant(socket.id, user_data.subway, user_data.exit_quarter, price_lunch, price_dinner, user_data.with_mood, user_data.mood2, taste, user_data.hate_food, user_data.food_type, user_data.food_name);
          const foods_info = foods.message;
          if (foods_info.length === 2) {
            await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
            if (foods.try === 1) {
              index.sendSocketMessage(socket.id, 'chat message no button', '2곳을 골라줄테니까 한 번 골라봐!');//, ['S11', '고고'], ['get_started', '안할래'], previous_button(user_data.stack));
              return;
            } else if (foods.try === 2) {
              index.sendSocketMessage(socket.id, 'chat message no button', `그 출구에는 딱 이거다 하는 곳은 없구... ${user_data.subway} 전체에서 2곳을 골라줄테니까 한 번 골라봐!`);//, ['S11', '고고'], ['get_started', '안할래'], previous_button(user_data.stack));
              return;
            }
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 다시 골라줘!', 'emoji/hungry3.png', get_started_button, previous_button(user_data.stack));
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S11__decide_final(value, socket, user_data) {
    (async function () {
      try {
        console.log('### [S11] Value: ', value);
        await info_update.profile.update_limit_cnt(socket.id, user_data.limit_cnt + 1);
        const foods = await info_update.food.get_two_restaurant(socket.id, user_data.rest1, user_data.rest2);

        if(foods.length == 2) {
          const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
          const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
          const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
          const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;
          const image = await info_update.food.crawl_two_image(socket.id, foods[0].res_name, foods[1].res_name);
          const chlist = [`기 다 료 방`,
                          `두구두구두구...`,
                          `열씨미찾는중🐕🐕`,
                          `기다려봐~~ 참아야복이온다~~~`,
                          `기달려방ㅎㅎ 지금 알아보는 중이야`,
                          '머리굴러가는소리 도륵도륵'];
          const imglist = ['emoji/calculate.png', 'emoji/calculate2.png', 'emoji/letmesee.png', 'emoji/letmesee2.png', 'emoji/letmesee3.png', 'emoji/letmesee4.png'];

          await index.sendSocketMessage(socket.id, 'chat message button image', random_pick(chlist),random_pick(imglist));
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          const result = await info_update.food.get_other_restaurant(socket.id, user_data.id, user_data.rest1, user_data.rest2);

          const params = [];
          let event_type = (image.res1 === 'no image') ? 'chat message card no image' : 'chat message card';
          params.push(['S12/1', foods[0].res_name], ['S12/2', foods[1].res_name], ['S12/3', '코기가 골라주기']);
          (result.success) ? params.push(['S11_1', '다른 식당 보기']) : params.push([]);    // 다른 식당 있는 경우에만 버튼이 보임
          params.push([foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                      [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          if (value.includes('S11/')) {     // GPS 시나리오 일 경우 distance 이벤트
            event_type += ' distance';
            const [distance1, distance2] = value.split('/')[1].split(',');
            params.push(distance1, distance2);
          }
          await index.sendSocketMessage(socket.id, event_type, ...params);
        } else if(foods.length == 1) {
          const params = [];
          const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
          const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
          const image = await info_update.food.crawl_two_image(socket.id, foods[0].res_name, `네이버`);

          let event_type = (image.res1 === 'no image') ? 'chat message card no image' : 'chat message card';
          params.push(['S12/1', foods[0].res_name], get_started_button);
          if (image.res1 === 'no image') {
            event_type = 'chat message card no image single';
            params.push([foods[0].res_name, foods[0].drink_type, foods[0].food_name, first_url, first_map_url]);
          } else {
            event_type = 'chat message card single';
            params.push([foods[0].res_name, foods[0].drink_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]]);
          }
          if (user_data.lat != null && user_data.lng != null) {     // GPS 시나리오 일 경우 distance 이벤트
            event_type += ' distance';
            const distance = foods[0].distance;
            params.push(distance);
          }
          await index.sendSocketMessage(socket.id, event_type, ...params);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S11_1_decide_final_others(value, socket, user_data) {
    (async function () {
      try {
        const result = await info_update.food.get_other_restaurant(socket.id, user_data.id, user_data.rest1, user_data.rest2);
        const foods = await result.message;
        if (result.success) {
          info_update.profile.update_rest2(user_data.kakao_id, foods[0].id, foods[1].id);
          const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
          const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
          const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
          const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;

          const image = await info_update.food.crawl_two_image(socket.id, foods[0].res_name, foods[1].res_name);

          const chlist = [`다른 식당 찾는중`, `까다로워 증말...`, `다른 식당 찾는중🐕🐕`, '아~~ 이번에는 맘에 들어씀 조케땅~~'];

          await index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist));
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          console.log(result.num);

          const params = [];
          let event_type = (image.res1 === 'no image') ? 'chat message card no image' : 'chat message card';
          params.push(['S12/1', foods[0].res_name], ['S12/2', foods[1].res_name], ['S12/3', '코기가 골라주기']);
          (result.num >= 4) ? params.push(['S11_1', '다른 식당 보기']) : params.push([]);    // 다른 식당 있는 경우에만 버튼이 보임
          params.push([foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                      [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          if (user_data.lat != null && user_data.lng != null) {     // GPS 시나리오 일 경우 distance 이벤트
            event_type += ' distance';
            const distance1 = foods[0].distance;
            const distance2 = foods[1].distance;
            params.push(distance1, distance2);
          }
          await index.sendSocketMessage(socket.id, event_type, ...params);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '여긴 다른 식당이 없네 ㅠㅠ... 힝힝.', 'emoji/disappointed.png',get_started_button);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S11_2_decide_final_similar(value, socket, user_data) {
    (async function () {
      try {
        const result = await info_update.food.get_similar_restaurant(socket.id, user_data.rest_final);
        const foods = await result.message;
        if (result.success) {
          info_update.profile.update_rest2(user_data.kakao_id, foods[0].id, foods[1].id);
          const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
          const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
          const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
          const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;

          const image = await info_update.food.crawl_two_image(socket.id, foods[0].res_name, foods[1].res_name);

          const chlist = [`비슷한 식당 찾는중`, `까다로워 증말...`, `비슷한 식당 찾는중🐕🐕`, '아~~ 이번에는 맘에 들어씀 조케땅~~'];
          await index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist));
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          (image.res1 === 'no image')
            ? await index.sendSocketMessage(socket.id, 'chat message card no image', ['S12/1/similar', foods[0].res_name], ['S12/2/similar', foods[1].res_name], ['S12/3/similar', '코기가 골라주기'], [], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url])
            : await index.sendSocketMessage(socket.id, 'chat message card', ['S12/1/similar', foods[0].res_name], ['S12/2/similar', foods[1].res_name], ['S12/3/similar', '코기가 골라주기'], [],[foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
        }//TODO: 전화번호 예약 연결(완료), 내비연결, 오픈-클로즈,휴무,라스트오더, 위시리스트
        else {
          index.sendSocketMessage(socket.id, 'chat message button image', '여긴 비슷한 식당이 없네 ㅠㅠ... 힝힝.', 'emoji/disappointed.png',get_started_button);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S12__final(value, socket, user_data) {
    (async function () {
      try {
        const user_select = parseInt(value.split('/')[1]);
        let final_value;
        if (user_select === 1) {
          await info_update.profile.update_rest_final(socket.id, user_data.rest1);
          final_value = user_data.rest1;
        } else if (user_select === 2) {
          await info_update.profile.update_rest_final(socket.id, user_data.rest2);
          final_value = user_data.rest2;
        } else if (user_select === 3) {
          const user_select_value = [user_data.rest1, user_data.rest2];
          const pick = random_pick(user_select_value);
          await info_update.profile.update_rest_final(socket.id, pick);

          const food_val = await info_update.food.get_restaurant_info(socket.id, parseInt(pick));
          index.sendSocketMessage(socket.id, 'chat message button', `코기의 선택 : ${food_val[0].res_name}`);
          final_value = pick;
        }

        const food_value = await info_update.food.get_restaurant_info(socket.id, final_value);
        await info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, final_value, food_value[0].res_name, food_value[0].subway);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
        const chooseimglist = ['emoji/choose.png','emoji/choose2.png','emoji/choose3.png','emoji/goodchoice.png'];

        let msg = `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!<br>`;
        if (user_data.price_dinner === 'x' && food_value[0].lunch_option === 1) { msg += '(런치메뉴 있음)'; }
        msg += `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`;

        const params = [];
        params.push(random_pick(chooseimglist));
        if (value.split('/')[2] === 'similar') {
          params.push(['S12_1/similar', '사진 보기'])
        } else {
          params.push(['S12_1', '사진 보기'], ['S11', '뒤로가기']);
          // 비슷한 식당 있는지 사전 검사
          const result = await info_update.food.get_similar_restaurant(socket.id, final_value);
          if (result.success) { params.push(['S11_2', '비슷한 식당 보기']); }
        }
        params.push(get_started_button);
        await index.sendSocketMessage(socket.id, 'chat message button image', msg, ...params);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S12_1_show_image(value, socket, user_data) {
    (async function () {
      try {
        const food_value = await info_update.food.get_restaurant_info(socket.id, user_data.rest_final);
        let image = await info_update.food.crawl_image(socket.id, `${food_value[0].subway.slice(0, -1)} ${food_value[0].res_name}`);

        const back_button = (value.split('/')[1] === 'similar') ? ['S12_2/similar','이전으로'] : ['S12_2','이전으로'];
        if (image.res1 === 'no image') {
          index.sendSocketMessage(socket.id, 'chat message button', `아직 ${food_value[0].subway} ${food_value[0].res_name}에 대한 사진이 없어요..ㅠㅠㅠ`,
                back_button, get_started_button);
        } else {
          image = image.res1;
          index.sendSocketMessage(socket.id, 'chat message image', '자 귀찮은 너를 위해 대신 구글링한 사진이야',
                back_button, get_started_button, image[0], image.length, image.splice(1));
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  S12_2_final_info_direct(value, socket, user_data) {
    (async function () {
      try {
        const food_value = await info_update.food.get_restaurant_info(socket.id, user_data.rest_final);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
        if(value.split('/')[1] === 'similar') {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
            + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href="tel:${food_value[0].phone}""><i class="fa fa-phone"></i> 전화 걸기</a>`, ['S12_1/similar', '사진 보기'], get_started_button);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
            + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href="tel:${food_value[0].phone}""><i class="fa fa-phone"></i> 전화 걸기</a>`, ['S12_1', '사진 보기'],
          ['S11', '뒤로가기'], get_started_button);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  geolocation_err(value, socket, user_data) {
    (async function() {
      try {
        index.sendSocketMessage(socket.id, 'chat message button', '위치를 확인할수 없어 ㅠㅠ', get_started_button)
      } catch(e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

}

module.exports = Decide_menu;
