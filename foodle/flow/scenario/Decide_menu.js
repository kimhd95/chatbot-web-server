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
const wrong_subway_input_msg = (value) => {
 return `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`;
}
const random_pick = (arr) => {
 return arr[Math.floor(arr.length * Math.random())];
}
const check_subway = (subway) => {
 switch (subway) {
   case '건대역':
   case '건국대역':
   case '건국대입구역':
   case '건국대학교역':
   case '건국대학교입구역':
   case '건입역':
     return '건대입구역';
   case '고대역':
   case '고려대학교역':
     return '고려대역';
   case '고터역':
     return '고속터미널역';
   case '교육대역':
   case '교육대학교역':
     return '교대역';
   case '남터역':
     return '남부터미널역';
   case '서울대역':
   case '서울대학교역':
   case '서울대학교입구역':
   case '설입역':
     return '서울대입구역';
   case '성대역':
   case '성대입구역':
   case '성신여대역':
   case '성신여자대학교역':
   case '성신여자대학교입구역':
     return '성신여대입구역';
   case '센텀역':
     return '센텀시티역';
   case '을입역':
     return '을지로입구역';
   case '이화여대역':
   case '이화여자대학교역':
     return '이대역';
   case '홍대역':
   case '홍익대역':
   case '홍익대입구역':
   case '홍익대학교역':
   case '홍익대학교입구역':
   case '홍입역':
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
    let key;
    key = value;
    if (key === 'decide_menu') {
      key = 'decide_menu';
    // } else if (key === 'decide_subway') {
    //   key = 'decide_subway';
    // } else if (user_data.state === 'decide_menu') {
    //   key = 'price';
    } else if(key.includes('elsewhere')){
      key = 'decide_subway';
    } else if (user_data.state === 'decide_subway_withexit') {
        key = 'exitnum';
    } else if (user_data.state === 'decide_subway') {
        key = 'decision_method';
    } else if (key.includes('decide_subway/price_under10')) {
        key = 'taste';
    } else if (key.includes('decide_subway')) {
        key = 'before_decide';
    } else if (user_data.state === 'search_food') {
      key = 'search_result';
    } else if (key.includes('search_food')) {
      key = 'search_food';
    } else if (user_data.state === 'search_result') {
      key = 'before_decide';
    //} else if (key.includes('decide_menu/lunch')) {
      //key = 'decision_method_lunch';
    } else if (key.includes('search_near')) {
      key = 'price';
    } else if (key.includes('decide_menu/')) {
      key = 'decide_subway';
      //key = 'decision_method';
    } else if (key.includes('hobulho_hate_start')) {
      key = 'hobulho_hate';
    } else if (key.includes('hobulho_hate/')) {
      key = 'hobulho_hate_feedback';
    } else if (key.includes('price_under10')) {
      key = 'taste';
    } else if (key.includes('price/')) {
        key = 'before_decide';
    } else if (key.includes('location/current')){
      key = 'near_station';
    } else if (key.includes('location/withexit')){
        key = 'decide_subway';
    } else if (key.includes('location/0')){
      key = 'decide_subway';
    } else if (key.includes('location/1')){
      key = 'decide_subway_corgi';
    } else if (key.includes('near_station/choose')){
      key = 'exitnum';
    } else if (key.includes('near_station/search')){
      key = 'decide_subway';
    } else if (key.includes('decide_subway_corgi/')) {
      key = 'decision_method';
    } else if (key.includes('exit/')) {
      key = 'price';
    }  else if (key.includes('decide_final/')) {
      key = 'decide_final';
    } else if (key.includes('final/')) {
      key = 'final';
    } else if (key.includes('decision/taste')) {
      key = 'taste';
    } else if (key.includes('decision/random')) {
      key = 'random_decide';
    } else if (key.includes('decision/search')) {
      key = 'search_food';
    } else if (key.includes('mood2/')) {
      key = 'price';
    } else if (key.includes('taste/')) {
      key = 'before_decide';
    } else if (key.includes('food_type/')) {
      key = 'price';
    } else if (key.includes('show_image/')) {
      key = 'show_image';
    } else if (key.includes('final_info_direct/')) {
      key = 'final_info_direct';
    }


    this.strategies = {
      'decide_menu': this.decide_menu,
      'price': this.price,
      'no_price': this.no_price,
      'decide_subway': this.decide_subway,
      'decide_subway_withexit': this.decide_subway_withexit,
      'decide_subway_corgi': this.decide_subway_corgi,
      'exitnum': this.exitnum,
      'mood': this.mood,
      'mood2': this.mood2,
      'no_mood2': this.no_mood2,
      'no_exit': this.no_exit,
      'before_decide': this.before_decide,
      'decide_final': this.decide_final,
      'final': this.final,
      'decide_final_similar': this.decide_final_similar,
      'decide_final_others': this.decide_final_others,
      'final_info_direct': this.final_info_direct,
      'show_image': this.show_image,
      'taste': this.taste,
      'food_type': this.food_type,
      'drink': this.drink,
      'decision_method': this.decision_method,
      'decision_method_lunch': this.decision_method_lunch,
      'fake_qna': this.fake_qna,
      'search_food': this.search_food,
      'search_near': this.search_near,
      'search_result': this.search_result,
      'location': this.location,
      'near_station': this.near_station,
      'hobulho_hate': this.hobulho_hate,
      'hobulho_hate_feedback': this.hobulho_hate_feedback,
      'random_decide': this.random_decide,
      'geolocation_err': this.geolocation_err,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '1', key);
    console.log(`decide_menu 에서 key: ${key}, value: ${value}`)
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
        if (user_info.registered == -1) {
            await info_update.profile.update_stack(socket.id, `{"state": "${user_data.state}", "value": "${value}"}`);
            index.sendSocketMessage(socket.id, 'chat message button image', `${random_pick(chlist)}`, `${random_pick(imglist)}`,['decide_menu/lunch', '점심 고르기(평일)'],['decide_menu/dinner', '점심 고르기(주말)'],  ['decide_menu/dinner', '저녁 고르기'],['hobulho_hate_start', '못 먹는 음식 체크'], ['search_near', '내 주변 500m 내 식당 검색(GPS 켜줘!)']); //TODO: 식당/메뉴명으로 검색하기
        } else {
          if (result === 'success') {
            await info_update.profile.update_stack(socket.id, `{"state": "${user_data.state}", "value": "${value}"}`);
            index.sendSocketMessage(socket.id, 'chat message button image', `${random_pick(chlist)}`, `${random_pick(imglist)}`,['decide_menu/lunch', '점심 고르기(평일)'],['decide_menu/dinner', '점심 고르기(주말)'],  ['decide_menu/dinner', '저녁 고르기'],['hobulho_hate_start', '못 먹는 음식 체크'], ['search_near', '내 주변 500m 내 식당 검색(GPS 켜줘!)']); //TODO: 식당/메뉴명으로 검색하기
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', '아... 너무 많이 말했더니 🐶피곤.... 30분만 자고 다시 올게😪🌙', 'emoji/drunk2.png',['get_started', '처음으로 돌아가기']);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  geolocation_err(value, socket, user_data) {
    (async function() {
      try {
        index.sendSocketMessage(socket.id, 'chat message button', '위치를 확인할수 없어 ㅠㅠ', ['get_started', '처음으로 돌아가기'])
      } catch(e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  hobulho_hate(value, socket, user_data) { //todo: api 구현
    (async function () {
        try {
            const hobulho_hate_list = ['못 먹거나 싫어하는 음식을 모두 체크해줘!', '못 먹거나 싫어하는 음식을 체크해주면 최대한 반영해줄게!',
                '이 중에서 못 먹는 음식이 있으면 최대한 반영해줄게! 언제든 바꿀 수 있으니 편하게 체크해봐ㅎㅎ'];

            index.sendSocketMessage(socket.id, 'chat message button checkbox', random_pick(hobulho_hate_list),
                ['900', '없음'], ['회', '회'], ['해산물', '모든 해산물'], ['곱창', '곱창'],['닭발', '닭발'], ['양꼬치', '양꼬치'], ['쌀국수', '베트남쌀국수'], ['오이', '오이'], ['매운', '매운음식'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기'], ['hobulho_hate/', '선택완료']);
       //홍어,선지,콩국수,건포도,육회,굴,가지,닭발
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
    }());
  }

  hobulho_hate_feedback(value, socket, user_data) {
    (async function () {
        try {
            const user_input_value = value.split('/')[1];
            await info_update.profile.update_hate_food(socket.id, user_input_value);
            console.log('내가 싫어하는 음식: '+user_data.hate_food);
            const hobulho_hate_feedback_list = ['오케이 이제부터 참고 하겠어', '오키! 많이 거를수록 선택의 폭은 좁아지겠지만... 호불호는 다 있는거니까😄 이제 메뉴 골라볼까',
                'ㅋㅋㅋ이해해!! 나는 저거 다 먹을 수 있지만... 앞으로 참고하고 추천할게!'];
            index.sendSocketMessage(socket.id, 'chat message button', `${random_pick(hobulho_hate_feedback_list)}`,['decide_menu/lunch', '점심 고르기(평일)'],['decide_menu/dinner', '점심 고르기(주말)'],  ['decide_menu/dinner', '저녁 고르기'],['hobulho_hate_start', '못 먹는 음식 체크'], ['search_near', '내 주변 500m 내 식당 검색(GPS 켜줘!)']);
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
    }());
  }

  decision_method_lunch(value, socket, user_data) {
    (async function () {
        try {
            const qna_list = [
                { //지하철역 검색->현재위치 500m내
                    'question': '어떤 방식으로 메뉴를 정해보까나', 'button1_id': 'exitnum', 'button1_value': '지하철 출구별 검색', 'button2_id': 'price_under10', 'button2_value': '1만원 미만','button3_id': 'mood2', 'button3_value': '식당 분위기 필터링','button4_id': 'search_food', 'button4_value': '음식 종류 검색',
                },
                {
                    'question': '메뉴는 어떻게 골라줄까?', 'button1_id': 'exitnum', 'button1_value': '지하철 출구별 검색', 'button2_id': 'price_under10', 'button2_value': '1만원 미만','button3_id': 'mood2', 'button3_value': '식당 분위기 필터링','button4_id': 'search_food', 'button4_value': '음식 종류 검색',
                },
                // {
                //     'question': '오늘 메뉴의 키워드는 뭐야?','button1_id': 'location/withexit', 'button1_value': '지하철역 검색', 'button2_id': 'price_under10', 'button2_value': '1만원 미만','button3_id': 'mood2', 'button3_value': '식당 분위기 필터링','button4_id': 'decision/taste', 'button4_value': '음식 종류 필터링',
                // },
                // {
                //     'question': '혹시 조금이라도 땡긴다거나 하는 음식종류가 있어??', 'button1_id': 'decision/random', 'button1_value': '당연히 없지~헤헷', 'button2_id': 'mood2', 'button2_value': '뭔가 살짝 땡기기는 해',
            ];
            const qna_pick = random_pick(qna_list);
            const imglist = ['emoji/checking.png','emoji/checking2.png','emoji/thinking.png','emoji/thinking2.png'];
            index.sendSocketMessage(socket.id, 'chat message button image', qna_pick.question, `${random_pick(imglist)}`, [qna_pick.button1_id, qna_pick.button1_value], [qna_pick.button2_id, qna_pick.button2_value],  [qna_pick.button3_id, qna_pick.button3_value],  [qna_pick.button4_id, qna_pick.button4_value]);
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
    }());
  }

  decision_method(value, socket, user_data) {
    (async function () {
        try {
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
            const subways = await info_update.food.get_all_subway(socket.id, '');
            const result = await info_update.food.verify_subway(socket.id, subway);
            if (result === 'success') {
                await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
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
                await index.sendSocketMessage(socket.id, 'chat message button', `${value.slice(value.lastIndexOf('/')+1)}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`, ['method/elsewhere', '다시 입력하기']);
                return;
              } else {
                await index.sendSocketMessage(socket.id, 'chat message button', `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`, ['method/elsewhere', '다시 입력하기']);
                return;
              }
            }

            if (value.includes('middle')) {
              await info_update.profile.update_lat(socket.id, 'null');
              await info_update.profile.update_lng(socket.id, 'null');
              const qna_list = [
                  { //지하철역 검색->현재위치 500m내
                      'question': '어떤 방식으로 메뉴를 정해보까나',
                      'button1_id': 'exitnum', 'button1_value': '지하철 출구별 검색',
                      'button2_id': 'price_under10', 'button2_value': '1만원 미만',
                      'button3_id': 'mood2', 'button3_value': '식당 분위기 필터링',
                      'button4_id': 'search_food', 'button4_value': '음식 종류 검색',
                  },
                  {
                      'question': '오늘 메뉴는 어떻게 골라줄까?',
                      'button1_id': 'exitnum', 'button1_value': '지하철 출구별 검색',
                      'button2_id': 'price_under10', 'button2_value': '1만원 미만',
                      'button3_id': 'mood2', 'button3_value': '식당 분위기 필터링',
                      'button4_id': 'search_food', 'button4_value': '음식 종류 검색',
                  },
              ];
              const imglist = ['emoji/checking.png','emoji/checking2.png','emoji/thinking.png','emoji/thinking2.png'];
              const qna_pick = random_pick(qna_list);
              index.sendSocketMessage(socket.id, 'chat message button image', qna_pick.question, `${random_pick(imglist)}`,
                  [qna_pick.button1_id, qna_pick.button1_value], [qna_pick.button2_id, qna_pick.button2_value],
                  [qna_pick.button3_id, qna_pick.button3_value], [qna_pick.button4_id, qna_pick.button4_value]);
            } else {
              const imglist = ['emoji/checking.png','emoji/checking2.png','emoji/thinking.png','emoji/thinking2.png'];
              if (subway in available_subway) {
                const qna_list = [
                                    { //지하철역 검색->현재위치 500m내
                                        'question': '어떤 방식으로 메뉴를 정해보까나',
                                        'button1_id': 'exitnum', 'button1_value': '지하철 출구별 검색',
                                        'button2_id': 'price_under10', 'button2_value': '1만원 미만',
                                        'button3_id': 'mood2', 'button3_value': '식당 분위기 필터링',
                                        'button4_id': 'search_food', 'button4_value': '음식 종류 검색',
                                        'button5_id': 'previous/' + user_data.stack.replace(/"/gi, "@"), 'button5_value': '이전으로 돌아가기',
                                    },
                                    {
                                        'question': '오늘 메뉴는 어떻게 골라줄까?',
                                        'button1_id': 'exitnum', 'button1_value': '지하철 출구별 검색',
                                        'button2_id': 'price_under10', 'button2_value': '1만원 미만',
                                        'button3_id': 'mood2', 'button3_value': '식당 분위기 필터링',
                                        'button4_id': 'search_food', 'button4_value': '음식 종류 검색',
                                        'button5_id': 'previous/' + user_data.stack.replace(/"/gi, "@"), 'button5_value': '이전으로 돌아가기',
                                    },
                                ];
                const qna_pick = random_pick(qna_list);
                await index.sendSocketMessage(socket.id, 'chat message button image', qna_pick.question, `${random_pick(imglist)}`,
                [qna_pick.button1_id, qna_pick.button1_value], [qna_pick.button2_id, qna_pick.button2_value],
                [qna_pick.button3_id, qna_pick.button3_value], [qna_pick.button4_id, qna_pick.button4_value],
                [qna_pick.button5_id, qna_pick.button5_value]);
              } else {
                const qna_list = [
                                    { //지하철역 검색->현재위치 500m내
                                        'question': '어떤 방식으로 메뉴를 정해보까나',
                                        'button1_id': 'price_under10', 'button1_value': '1만원 미만',
                                        'button2_id': 'mood2', 'button2_value': '식당 분위기 필터링',
                                        'button3_id': 'search_food', 'button3_value': '음식 종류 검색',
                                        'button4_id': 'previous/' + user_data.stack.replace(/"/gi, "@"), 'button4_value': '이전으로 돌아가기',
                                    },
                                    {
                                        'question': '오늘 메뉴는 어떻게 골라줄까?',
                                        'button1_id': 'price_under10', 'button1_value': '1만원 미만',
                                        'button2_id': 'mood2', 'button2_value': '식당 분위기 필터링',
                                        'button3_id': 'search_food', 'button3_value': '음식 종류 검색',
                                        'button4_id': 'previous/' + user_data.stack.replace(/"/gi, "@"), 'button4_value': '이전으로 돌아가기',
                                    },
                                ];
                const qna_pick = random_pick(qna_list);
                await index.sendSocketMessage(socket.id, 'chat message button image', qna_pick.question, `${random_pick(imglist)}`,
                [qna_pick.button1_id, qna_pick.button1_value], [qna_pick.button2_id, qna_pick.button2_value],
                [qna_pick.button3_id, qna_pick.button3_value], [qna_pick.button4_id, qna_pick.button4_value]);
              }
            }
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
    }());
  }

  search_food(value, socket, user_data) { //TODO: 검색기능 구현(res_name, food_type, food_name)
    (async function () {
        try {
            await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
            await info_update.profile.update_food_type(socket.id, 'all');
            await info_update.profile.update_taste(socket.id, 'all');
            await info_update.profile.update_mood2(socket.id, '998');
            await info_update.profile.update_exit_quarter(socket.id, '999');
            const chlist = ['원하는 음식 종류를 골라줘!!', '뭐 먹고 싶은지 골라봐🍚'];
            index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist), ['고기', '고기'], ['한식', '한식'], ['매운 음식', '매운 음식'], ['초밥', '초밥'], ['피자', '피자'], ['치킨', '치킨'], ['-직접 입력', '직접 입력'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        }
    }());
  }

  search_result(value, socket, user_data) {
    (async function () {
        try {
          // await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
          if (value === '-직접 입력') {
            // await info_update.profile.update_state(socket.id, '1', 'search_food');
            const chlist = ['원하는 음식 종류를 말해줘!!<br>ex) 치킨', '뭐 먹고 싶은지 말해봐🍚<br>ex) 피자'];
            // await index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}`);
            setTimeout(() => {info_update.profile.update_state(socket.id, '1', 'search_food');}, 100);
            setTimeout(() => {index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist));}, 150);
          }
          else {
                let search_food = value;
                let subway = user_data.subway;
                let apicall;

                // 예외처리 하는부분
                if (search_food === '고기') {
                  apicall = await info_update.food.verify_search_food(socket.id, ['고기', '바비큐'], subway);
                } else if (search_food === '초밥') {
                  apicall = await info_update.food.verify_search_food(socket.id, ['초밥', '스시', '오마카세'], subway);
                } else if (search_food === '매운 음식') {
                  apicall = await info_update.food.verify_search_food(socket.id, '매운', subway);
                } else if (search_food === '분식') {
                  apicall = await info_update.food.verify_search_food(socket.id, ['김밥', '떡볶이'], subway);
                } else {
                  apicall = await info_update.food.verify_search_food(socket.id, search_food, subway);
                }

                if (apicall.result === 'success') {
                  await info_update.profile.update_food_name(socket.id, search_food);
                  const chlist = [search_food+' 찾았다! 이걸로 추천해줄게 잠깐만~',search_food+' 있다있어~ 잠깐만 기다료바'];
                  index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist),['view_recommend_food', '추천 보러가기'], ['get_started', '처음으로'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
                } else {
                  await info_update.profile.update_state(socket.id, '1', 'search_food');
                  await index.sendSocketMessage(socket.id, 'chat message button', `${search_food} 검색어로 찾을 수 있는 식당이 없네ㅠㅠ 다시 검색해볼래?`, ['-직접 입력', '다시 검색하기'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로']);
                }
          }
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        }
    }());
  }

  price(value, socket, user_data) {
    (async function () {
        try {
          await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
          if (value.includes('exit/')) {
            const user_quarter = value.split('/')[1];
            await info_update.profile.update_exit_quarter(socket.id, user_quarter);
            await info_update.profile.update_mood2(socket.id, '998');
            await info_update.profile.update_food_type(socket.id, 'all');
            await info_update.profile.update_taste(socket.id, 'all');
            await info_update.profile.update_food_name(socket.id, 'x');
          } else if(value.includes('mood2')) {
            const user_input_value = value.split('/')[1];
            await info_update.profile.update_exit_quarter(socket.id, '999');
            await info_update.profile.update_mood2(socket.id, user_input_value);
            await info_update.profile.update_food_type(socket.id, 'all');
            await info_update.profile.update_taste(socket.id, 'all');
            await info_update.profile.update_food_name(socket.id, 'x');
          } else if(value.includes('search_near')) {
            const first = value.indexOf('_');
            const second = value.indexOf('_', first + 1);
            // const lat= value.slice(value.indexOf('_')+1, value.lastIndexOf('/'));
            const lat= value.slice(second + 1, value.lastIndexOf('/'));
            const lng= value.slice(value.lastIndexOf('/')+1);
            await info_update.profile.update_lat(socket.id, lat);
            await info_update.profile.update_lng(socket.id, lng);
          }
            // if (value.includes('lunch')) {
            //     await info_update.profile.update_price_level_dinner(socket.id, 'x');
            // } else if (value.includes('dinner')) {
            //     await info_update.profile.update_price_level_lunch(socket.id,'x');
            // }
            const price_list = ['식사 예산은 1인당 어느 정도 생각해? (중복선택가능!)',
                                '오늘 너의 텅장💸이 허락하는 한도는??(1인 기준, 중복선택)',
                                '식사 가격은 1인당 얼마 정도였으면 좋겠어? (중복선택)',
                                '이번 식사. 얼마면 돼?!💰(1인 기준, 중복선택)',
                                '오늘 식사의 가격대는 어느 정도로 생각해~~?(1인 기준, 중복선택)',
                                '1인당 얼마까지 긁을 수 있어? 💳 (중복선택가능!)'];
            index.sendSocketMessage(socket.id, 'chat message button checkbox price', random_pick(price_list),
                ['0', '~1만원 미만'], ['1', '1만원 대'], ['2', '2만원 대'], ['3,4', '3만원 이상'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기'], ['price/', '선택완료']);
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
    }());
  }

  no_price(value, socket, user_data) {
      (async function () {
          try {
              index.sendSocketMessage(socket.id, 'chat message button', '원하는 가격대를 적어도 하나는 선택해줘!');
          } catch (e) {
              index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
              console.log(e);
          }
      }());
  }

  location(value, socket, user_data) {
      (async function () {
          try {
              const location_list = ['약속장소는 이미 정해져 있어?', '어디서 만나기로 했는지는 정했어? ', '약속 장소는 정했구~~?',
                  '어디서 만날지는 정해져 있는거야?', '약속 장소는 정해져 있는거야?'];
              index.sendSocketMessage(socket.id, 'chat message button', random_pick(location_list),
                  ['location/0', '응 정했어'], ['location/1', 'ㄴㄴ 코기가 정해줘!'], ['location/seoul', '서울 어디든 좋아']); // TODO:['location/2', '현재 위치']);
          } catch (e) {
              index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
              console.log(e);
          }
      }());
  }

  decide_subway_corgi(value, socket, user_data) {
    (async function () {
        try {
            const subway_db = ['강남역', '선릉역', '이대역', '서울대입구역'];
            const pick = random_pick(subway_db)
            index.sendSocketMessage(socket.id, 'chat message button', `그럼 ${pick}에서 만나는 걸로ㅋㅋㅋ`, [`decide_subway_corgi/${pick}`, '고고'], ['location/0', '그냥 내가 고를래']);
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
    }());
  }

  near_station(value, socket, user_data) {
      (async function () {
        const lat= value.slice(value.indexOf('_')+1, value.lastIndexOf('/'));
        const lng= value.slice(value.lastIndexOf('/')+1);
        console.log(`lat: ${lat}, lng: ${lng}`);
        try {
            await info_update.profile.update_lat(socket.id, lat);
            await info_update.profile.update_lng(socket.id, lng);
            const map = new Map();
            for (const i in data) {
              if (Object.prototype.hasOwnProperty.call(data, i)) {
                map.set(distance(parseFloat(lat), parseFloat(lng), data[i].lat, data[i].lng, data[i].name)[0], distance(parseFloat(lat), parseFloat(lng), data[i].lat, data[i].lng, data[i].name)[1]);
              }
            }
            const sortedMap = sortMap(map); // key-value형식으로 map이 정의되어있다 (ex. 0.1234 - 성수역) 오름차순으로 map을 정렬하는 module
            // console.log(`거리순으로 정렬된 map : ${sortedMap}`); // 거리순으로 출력
            console.log(sortedMap);

            index.sendSocketMessage(socket.id, 'chat message button', `현재 위치에서 가장 가까운 역이... ${sortedMap.values().next().value}맞아?`,
                [`near_station/choose/${sortedMap.values().next().value}`, '여기로 가자!'], ['near_station/search', '직접 고를래']); // TODO:['location/2', '현재 위치']);

        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
      }());
  }


  decide_subway_withexit(value, socket, user_data) {
    (async function () {
        try {
            if (!value.includes('elsewhere') && user_data.freq_subway !== null) {
                const revisit = user_data.freq_subway;
                const freq_list = [`이번에도 ${revisit}에서 메뉴를 정하면 될까?`, `이번에도 ${revisit} 고고?`, `이번에도 ${revisit}에서 밥 먹을거야?`,
                    `이번에도 ${revisit}에서 먹는거 맞지?`, `오늘도 ${revisit}?`, `오늘도 ${revisit}에서 골라볼까?`,
                    `이번에도 ${revisit}에서 정하는거 맞아맞아?`, `오늘도 ${revisit}에서 메뉴 정해볼까?`, `이번에도 ${revisit}에서 먹을 곳 찾는거야?`];
                index.sendSocketMessage(socket.id, 'chat message button', random_pick(freq_list), [`${revisit}`, '응 맞아!'], ['decide_subway/elsewhere', '다른 곳이야!']);
            } else { //todo: freq_subway 구현(완료)
                const chlist = ['어느 역 근처의 메뉴를 정해줄까?', '밥 어디에서 먹을거야?🍚', '밥 어디에서 먹어?', '어느 역 근처 메뉴를 정해줄까?',
                    '위치가 어디야? 원하는 곳에서 가까운 지하철역을 입력해줘🚋', '밥 어디에서 먹어? 챱챱', '이번에는 어느 역 근처의 메뉴를 정해볼까?',
                    '어디 근처로 골라볼까?', '어떤 지하철역 근처로 정해볼까?'];
                index.sendSocketMessage(socket.id, 'chat message button', `${random_pick(chlist)}<br>ex) 강남역,이대역`);
            }

        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        }
    }());
  }

  decide_subway(value, socket, user_data) {
      (async function () {
          try {
              if (value != 'method/elsewhere') {
                await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
              }
              if (value.includes('lunch')) {
                  await info_update.profile.update_price_level_dinner(socket.id, 'x');
              } else if (value.includes('dinner')) {
                  await info_update.profile.update_price_level_lunch(socket.id,'x');
              }
              if (user_data.hate_food == null) {
                  await info_update.profile.update_hate_food(socket.id, 'x');
              }
              if (value.includes('price_under10')) {
                  await info_update.profile.update_price_level_lunch(socket.id, '0');
                  await info_update.profile.update_exit_quarter(socket.id, '999');
                  await info_update.profile.update_mood2(socket.id, '998');
                  await info_update.profile.update_taste(socket.id, 'all');
              }
              console.log('user_data: '+user_data.freq_subway);
              if (!value.includes('elsewhere') && user_data.freq_subway !== null) {
                  const revisit = user_data.freq_subway;
                  const freq_list = [`이번에도 ${revisit}에서 메뉴를 정하면 될까?`, `이번에도 ${revisit} 고고?`, `이번에도 ${revisit}에서 밥 먹을거야?`,
                      `이번에도 ${revisit}에서 먹는거 맞지?`, `오늘도 ${revisit}?`, `오늘도 ${revisit}에서 골라볼까?`,
                      `이번에도 ${revisit}에서 정하는거 맞아맞아?`, `오늘도 ${revisit}에서 메뉴 정해볼까?`, `이번에도 ${revisit}에서 먹을 곳 찾는거야?`];
                  index.sendSocketMessage(socket.id, 'chat message button', random_pick(freq_list), [`${revisit}`, '응 맞아!'], ['decide_subway/elsewhere', '다른 곳이야!'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
              } else {
                  const chlist = ['어느 역 근처의 메뉴를 정해줄까?', '밥 어디에서 먹을거야?🍚', '밥 어디에서 먹어?', '어느 역 근처 메뉴를 정해줄까?',
                      '위치가 어디야? 원하는 곳에서 가까운 지하철역을 입력해줘🚋', '밥 어디에서 먹어? 챱챱', '이번에는 어느 역 근처의 메뉴를 정해볼까?',
                      '어디 근처로 골라볼까?', '어떤 지하철역 근처로 정해볼까?'];
                  index.sendSocketMessage(socket.id, 'chat message button', `${random_pick(chlist)}<br>ex) 강남역,이대역`);
              }

          } catch (e) {
              index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
          }
      }());
  }

  exitnum(value, socket, user_data) {
    (async function () {
      try {
         await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
         let subway = user_data.subway;
        // if(value.includes('near_station')){
        //   subway = value.slice(value.lastIndexOf('/')+1);
        // } else if(value ==='exitnum')
        //   {
        //       subway = user_data.subway
        //   } else{
        //   console.log(`exitnum의 value, subway = ${value}`);
        //   subway = value;
        //   if (value.slice(-1) !== '역') {
        //     subway = `${value}역`;
        //   }
        // }
        // const subways = await info_update.food.get_all_subway(socket.id, '');
        // const result = await info_update.food.verify_subway(socket.id, subway);
        // if (result === 'success') {
        //   const user_info = await info_update.profile.load_user(socket.id);
        //   const db_subway = await user_info.subway;
        //   if (subway === db_subway) {
        //     console.log(`subway === db.subway if 문 안 subway = ${subway}, db_subway = ${db_subway}`);
        //     await info_update.profile.update_freq_subway(socket.id, subway);
        //   } else {
        //     console.log("subway === db.subway else 문 안");
        //     await info_update.profile.update_freq_subway(socket.id, 'null');
        //   }
        //  await info_update.profile.update_subway(socket.id, subway);
          const exit_list = [`${subway} 몇 번 출구쪽이 좋아??`,
                             `${subway}에서 더 편한 출구가 있다면 골라줘!(중복선택)`,
                             `${subway} 몇 번 출구쪽이 편해?(중복선택)`,
                             `${subway} 몇 번 출구쪽이 좋아? 모르면 "상관없음" 버튼을 눌러주면 돼!`];

          if (subway in available_subway) {
            await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, subway, `images/${subway}.png`, ['999', '상관없어'], ['4', available_subway[subway][0]], ['3', available_subway[subway][1]], ['2', available_subway[subway][2]], ['1', available_subway[subway][3]], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기'], ['exit/', '선택완료']);
          }
          else {
            index.sendSocketMessage(socket.id, 'chat message button', `지금 밥집 고르기를 이용 가능한 곳은 서울[${Object.keys(available_subway).toString()}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_subway/elsewhere', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
          }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  no_exit(value, socket, user_data) {
    (async function () {
      try {
        index.sendSocketMessage(socket.id, 'chat message button', '출구를 적어도 하나는 선택해줘!');
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  mood(value, socket, user_data) {
    (async function () {
      try {
        const mood_list = ['메뉴 컨셉은 끼니해결? 아니면 약속 자리?',
          '일상적인 식사 메뉴를 골라줄까? 아니면 밥이나 술 약속 메뉴를 골라줄까?',
          '어떤 식사자리인데?',
          '캐주얼한 식사야? 아니면 약속 자리야?',
          '데일리 메뉴결정? 아니면 약속 메뉴결정??',
          '어떤 자리에 맞는 메뉴를 골라줄까?'];

        // 해당 subway에 drink_type이 있는경우
        const user_info = await info_update.profile.load_user(socket.id);
        const result = await info_update.food.verify_subway_drinktype(socket.id, user_info.subway);
        console.log(result);
        if (result === 'success') {
          index.sendSocketMessage(socket.id, 'chat message button', random_pick(mood_list), ['mood2/캐주얼', '일상적인 식사'], ['mood2', '밥 약속'], ['drink','술 약속']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', random_pick(mood_list), ['mood2/캐주얼', '일상적인 식사'], ['mood2', '밥 약속']);
        }

      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  drink(value, socket, user_data) {
    (async function () {
      try {
        //await info_update.profile.update_with_mood(socket.id, '약속');
        index.sendSocketMessage(socket.id, 'chat message button', '곧 시나리오 드릴게요', ['1', '1'], ['2', '2'], ['3', '3']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  mood2(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        const mood2_list = ['원하는 식당 분위기를 골라줘!(중복선택)', '특별히 원하는 식당 분위기가 있다면 골라줘!(중복선택)', '가고 싶은 식당의 키워드를 몇개 골라봐!! (못고르겠으면 상관없음ㄱㄱ)'];
        const imglist = ['emoji/checking.png','emoji/checking2.png'];

        await info_update.profile.update_food_type(socket.id, 'all');
        await info_update.profile.update_taste(socket.id, 'all');;
        await info_update.profile.update_exit_quarter(socket.id, '999');
        await info_update.profile.update_food_name(socket.id, 'x');
        //await info_update.profile.update_with_mood(socket.id, '약속');
        const result = await info_update.food.verify_mood2(socket.id, user_data.subway);
        console.log(result);

        var show_list = await [['998', '상관없음']];
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
        await show_list.push(['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
        await show_list.push(['mood2/', '선택완료']);
        console.log(show_list);
        if (result.length !== 0) {
           await index.sendSocketMessage(socket.id, 'chat message button checkbox image', random_pick(mood2_list), `${random_pick(imglist)}`, show_list);
           // index.sendSocketMessage(socket.id, 'chat message button checkbox image', mood2_list[mood2_rand],`${imglist[rand2]}`, ['998', '상관없음'], ['가벼운', '간단한'], ['인스타', '#인스타감성'], ['깔끔','깔끔한'], ['큰프', '프랜차이즈'], ['뷔페', '뷔페/무한리필'], ['mood2/', '선택완료']);
        } else {
          const item = new Decide_menu('mood2/998', socket, user_data);
          // await index.sendSocketMessage(socket.id, 'chat message next', 'stage', 'mood2/998');
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  no_mood2(value, socket, user_data) {
    (async function () {
      try {
        index.sendSocketMessage(socket.id, 'chat message button', '원하는 분위기를 적어도 하나는 선택해줘!');
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  taste(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        const user_price = await value.split('/')[1];;

        if (value.includes('price_under10')) {
          if (user_data.price_dinner === 'x') { //점심식사
            await info_update.profile.update_price_level_lunch(socket.id, '0');
            var price_lun = '0';
            var price_din = 'x';
          } else if (user_data.price_lunch === 'x') { //저녁식사
            await info_update.profile.update_price_level_dinner(socket.id, '0');
            var price_din = '0';
            var price_lun = 'x';
          }
          await info_update.profile.update_exit_quarter(socket.id, '999');
          await info_update.profile.update_mood2(socket.id, '998');
        }

        else {
          if (user_data.price_dinner === 'x') { //점심식사
            await info_update.profile.update_price_level_lunch(socket.id, user_price);
          } else if (user_data.price_lunch === 'x') { //저녁식사
            await info_update.profile.update_price_level_dinner(socket.id, user_price);
          }
          await info_update.profile.update_food_type(socket.id, 'all');
          await info_update.profile.update_exit_quarter(socket.id, '999');
          await info_update.profile.update_food_name(socket.id, 'x');
        }

        const taste = {
          'qnas': [
            {
              'question': '기름진 음식 vs 담백한 음식?', 'button1_id': 'taste/기름진', 'option1': '기름진', 'button1_value': '기름진', 'button2_id': 'taste/담백한', 'button2_value': '담백한', 'option2': '담백한',
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
              'question': '밥 vs 면?', 'button1_id': 'taste/밥', 'button1_value': '밥', 'option1': '밥', 'button2_id': 'taste/면', 'button2_value': '면', 'option2': '면',
            },
            // {
            //   'question': '오늘 고기 들어간 음식은 어떄?', 'button1_id': 'taste/고기', 'button1_value': '좋아', 'button2_id': 'taste/!-고기', 'button2_value': '싫어',
            // },
            {
              'question': '쌀 vs 밀가루?', 'button1_id': 'taste/밥', 'button1_value': '쌀', 'option1': '밥', 'button2_id': 'taste/밀가루', 'button2_value': '밀가루', 'option2': '밀가루',
            },
            // {
            //   'question': '오늘 해산물 들어간 음식은 어때?', 'button1_id': 'taste/해산물', 'button1_value': '좋아', 'button2_id': 'taste/!-해산물', 'button2_value': '싫어',
            // },
          ],
        };
        let taste_list = [];    // request 보낼 답변값 리스트
        let valid_list = [];    // response에서 유효한 질문들 담을 리스트
        for (let i = 0; i < taste.qnas.length; i++) {
          taste_list.push([taste.qnas[i].option1, taste.qnas[i].option2]);
        }

        const result = await info_update.food.verify_result_exist(socket.id, user_data.subway, price_lun, price_din, user_data.hate_food, taste.qnas);
        if (result.success) {
          let validResult = result.valid; // {index : 0, valid : true} 형식
          for (let i = 0; i < validResult.length; i++) {
            if (validResult[i].valid)
              valid_list.push(taste.qnas[validResult[i].index]);
          }
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 미안... 다시... 한번... 해야할것... 같은데....', 'emoji/hungry4.png', ['get_started', '돌아가기']);
        }
        // await info_update.profile.update_mood2(socket.id, '998');
        // await info_update.profile.update_exit_quarter(socket.id, '999');
        // const user_mood2 = value.split('/')[1];
        // if (value.includes('taste')) {
        //     const mood2 = value.split('/')[1];
        //    await info_update.profile.update_mood2(socket.id, '998');
        // } else {
        //   await info_update.profile.update_mood2(socket.id, user_mood2);
        // }
        const imglist = ['emoji/ask.png','emoji/ask2.png','emoji/ask3.png','emoji/ask4.png'];
        const valid_pick = random_pick(valid_list);
        const qnas_pick = random_pick(taste.qnas);
        if (valid_list.length > 0) {
          index.sendSocketMessage(socket.id, 'chat message button image', valid_pick.question,`${random_pick(imglist)}`,
                [valid_pick.button1_id, valid_pick.button1_value], [valid_pick.button2_id, valid_pick.button2_value],
                ['taste/all', '상관없음'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', qnas_pick.question,`${random_pick(imglist)}`,
                [qnas_pick.button1_id, qnas_pick.button1_value], [qnas_pick.button2_id, qnas_pick.button2_value],
                ['taste/all', '상관없음'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  food_type(value, socket, user_data) {
    (async function () {
      try {
        const user_taste = value.split('/')[1];
        await info_update.profile.update_taste(socket.id, user_taste);
        const food_type = {
          'qnas': [
            // {
            //   'question': '한식 vs 양식?', 'button1_id': 'food_type/한식', 'button1_value': '한식', 'button2_id': 'food_type/양식', 'button2_value': '양식',
            // },
            // {
            //   'question': '한식 vs 일식/중식?', 'button1_id': 'food_type/한식', 'button1_value': '한식', 'button2_id': 'food_type/일식,중식', 'button2_value': '일식/중식',
            // },
            // {
            //   'question': '한식 vs 이국적음식?', 'button1_id': 'food_type/한식', 'button1_value': '한식', 'button2_id': 'food_type/이국적', 'button2_value': '이국적음식',
            // },
            // TODO //
            {
              "question":"오늘 기분은 어때?","button1_id":"food_type/좋아","button1_value":"좋아","button2_id":"food_type/구려","button2_value":"구려","button3_id":"food_type/그냥그래","button3_value":"그냥 그래"
            },
            {
              "question":"같이 먹는사람 몇 명이야?","button1_id":"food_type/1~4명","button1_value":"1~4명","button2_id":"food_type/5~9명","button2_value":"5~9명","button3_id":"food_type/10명이상","button3_value":"10명이상"
            },
            {
              "question":"지금 많이 배고파?","button1_id":"food_type/완전 배고파!","button1_value":"완전 배고파!","button2_id":"food_type/조금 허기져","button2_value":"조금 허기져","button3_id":"food_type/사실 별로 안고파","button3_value":"사실 별로 안고파"
            },
            {
              "question":"오늘 많이 추워?","button1_id":"food_type/개추워","button1_value":"개추워","button2_id":"food_type/쌀쌀해","button2_value":"쌀쌀햬","button3_id":"food_type/안추워","button3_value":"안추워"
            },
            {
              "question":"식사 시간이 어떻게 돼?","button1_id":"food_type/1시간 미만","button1_value":"1시간 미만","button2_id":"food_type/1시간 이상","button2_value":"1시간 이상"
            },
            {
              "question":"밥먹고 디저트도 먹을거야?(커피 포함)","button1_id":"food_type/먹을거야!","button1_value":"먹을거야!","button2_id":"food_type/아니 됐어","button2_value":"아니 됐어","button3_id":"food_type/모르겠어","button3_value":"모르겠어"
            }
          ],
        };
        const type_data = food_type.qnas;
        const type_pick = random_pick(type_data);
        index.sendSocketMessage(socket.id, 'chat message button', type_pick.question,
            [String(type_data.indexOf(type_pick))+type_pick.button1_id, type_pick.button1_value],
            [String(type_data.indexOf(type_pick))+type_pick.button2_id, type_pick.button2_value], ['food_type/all', '상관없음']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }



  fake_qna(value, socket, user_data) {
      (async function () {
          try {
              // const user_input_value = value.split('/')[1];
              // if (value.includes('taste')) {
              //     await info_update.profile.update_taste(socket.id, user_input_value);
              // } else if (value.includes('mood2')) {
              //     await info_update.profile.update_mood2(socket.id, user_input_value);
              // }
              const qna_list = [
                  {
                      'question': '갔던 식당을 계속 재방문하는 편이야?', 'button1_id': 'decide_final', 'button1_value': '맛있으면 계속 감', 'button2_id': 'decide_final', 'button2_value': '생각나면 가끔 감', 'button3_id': 'decide_final', 'button3_value': '새로운곳만 찾아다님',
                  },
                  {
                      'question': '수요x식회 등 방송맛집들에 대한 너의 생각은?', 'button1_id': 'decide_final', 'button1_value': '꼭 가봐야지', 'button2_id': 'decide_final', 'button2_value': '궁금하긴 한데 찾아가기는 귀찮음','button3_id': 'decide_final', 'button3_value': '막상 먹어보면 실망하는듯',
                  },
                  {
                      'question': '맛집 웨이팅, 보통 얼마 정도까지 가능?', 'button1_id': 'decide_final', 'button1_value': '1시간 이상도 가능!!', 'button2_id': 'decide_final', 'button2_value': '30분 내외', 'button3_id': 'decide_final', 'button3_value': '안 기다릴래',
                  },
              ];
              const qna_pick = random_pick(qna_list);
              // if (qna_list_rand === 0 || qna_list_rand === 8) {
              index.sendSocketMessage(socket.id, 'chat message button', qna_pick.question,
              [qna_pick.button1_id, qna_pick.button1_value], [qna_pick.button2_id, qna_pick.button2_value],
              [qna_pick.button3_id, qna_pick.button3_value]);
              // } else {
              //     index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
              // }
          } catch (e) {
              index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
              console.log(e);
          }
      }());
  }

  random_decide(value, socket, user_data) {
    (async function () {
        try {
            await info_update.profile.update_mood2(socket.id, '998');
            await info_update.profile.update_taste(socket.id, 'all');

            // let user_food_type=value.split('/')[1];
            // if(user_food_type!=='all'){
            //     // 질문 id 맨 앞에 question index를 붙여서 전달했음, 앞에 3개 질문이 아닌 경우는 선택에 영향을 주면 안 되므로 all로 처리함.
            //     if(Number(value.charAt(0))>=3){
            //         user_food_type='all';
            //     }
            // }
            await info_update.profile.update_food_type(socket.id, 'all');
            const foods = await info_update.food.get_restaurant(socket.id,  user_data.subway, user_data.exit_quarter, user_data.price_lunch, user_data.price_dinner, '캐주얼', '999', 'all', user_data.hate_food,'all', 'x');
            const foods_info = foods.message;
            if (foods.success) {
              if (foods_info.length === 2) {
                  await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
                  if (foods.try === 1) {
                      index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!', ['decide_final', '고고'], ['get_started', '안할래']);
                  } else if (foods.try === 2) {
                      index.sendSocketMessage(socket.id, 'chat message button', `${user_data.subway} 전체에서 2곳을 골라줄테니까 한 번 골라봐!`, ['decide_final', '고고'], ['get_started', '안할래']);
                  }
              } else {
                  index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 미안... 다시... 한번... 해야할것... 같은데....', 'emoji/hungry2.png',['get_started', '돌아가기']);
              }
            } else {
              index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 미안... 다시... 한번... 해야할것... 같은데....', 'emoji/hungry4.png', ['get_started', '돌아가기']);
            }
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
    }());
  }

  before_decide(value, socket, user_data) {
    (async function () {
      try {
          await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
          // const user_food_type = 'all';
          //if (user_data.price_lunch==null || user_data.price_dinner==null) {
          let price_lunch = user_data.price_lunch;
          let price_dinner = user_data.price_dinner;
          let taste = user_data.taste;
          if (value.includes('price/')) {
              const user_price = await value.split('/')[1];;
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
              //await info_update.profile.update_with_mood(socket.id, '캐주얼');
          // else if (value.includes('search_result/')) {
          // }
          else if (value.includes('taste/')) {
              const user_input_value = value.split('/')[1];
              taste = user_input_value;
              await info_update.profile.update_taste(socket.id, user_input_value);
          }
        //let user_food_type=value.split('/')[1];

        // 어떤 질문이든지 관계없이 상관없음을 눌렀으면 그냥 pass,
        // 아니라면 질문에 따라 user_food_type 값을 바꿔줘야 함.
        // if(user_food_type!=='all'){
        //   // 질문 id 맨 앞에 question index를 붙여서 전달했음, 앞에 3개 질문이 아닌 경우는 선택에 영향을 주면 안 되므로 all로 처리함.
        //   if(Number(value.charAt(0))>=3){
        //     user_food_type='all';
        //   }
        // }
        //await info_update.profile.update_food_type(socket.id, user_food_type);

        if (user_data.lat != null && user_data.lng != null) {
          // search_near 인 경우
          const foods = await info_update.food.get_near_restaurant(socket.id, price_lunch, price_dinner, user_data.hate_food, user_data.lat, user_data.lng);
          const foods_info = foods.message;
          if (foods_info.length === 2) {
            await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
            index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!', [`decide_final/${foods_info[0].distance},${foods_info[1].distance}`, '고고'], ['get_started', '안할래'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 다시 골라줘!', 'emoji/hungry3.png',['get_started', '처음으로'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
          }
        } else if (value.includes('view_recommend_food')) {
          // search_food 인 경우
          function getFoods(callback) {
            return new Promise(function (resolve, reject) {
              let foods;
              if (user_data.food_name === '초밥') {
                foods = info_update.food.verify_search_food(socket.id, ['초밥', '스시', '오마카세'], user_data.subway);
              } else if (user_data.food_name === '매운 음식') {
                foods = info_update.food.verify_search_food(socket.id, '매운', user_data.subway);
              } else if (user_data.food_name === '분식') {
                foods = info_update.food.verify_search_food(socket.id, ['김밥', '떡볶이'], user_data.subway);
              } else {
                foods = info_update.food.verify_search_food(socket.id, user_data.food_name, user_data.subway);
              }
              resolve(foods);
            });
          }
          getFoods().then(async function (foods) {
            const foods_info = foods.message;
            if (foods_info.length === 2) {
              await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
              index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!', ['decide_final', '고고'], ['get_started', '안할래'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
            } else {
              index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 다시 골라줘!', 'emoji/hungry3.png',['get_started', '처음으로'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
            }
          });
          // const foods = await info_update.food.verify_search_food(socket.id, user_data.food_name, user_data.subway);
        } else {
          // search_near 아닌경우
          const foods = await info_update.food.get_restaurant(socket.id, user_data.subway, user_data.exit_quarter, price_lunch, price_dinner, user_data.with_mood, user_data.mood2, taste, user_data.hate_food, user_data.food_type, user_data.food_name);
          const foods_info = foods.message;
          if (foods_info.length === 2) {
            await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
            if (foods.try === 1) {
              index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!', ['decide_final', '고고'], ['get_started', '안할래'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
            } else if (foods.try === 2) {
              index.sendSocketMessage(socket.id, 'chat message button', `그 출구에는 딱 이거다 하는 곳은 없구... ${user_data.subway} 전체에서 2곳을 골라줄테니까 한 번 골라봐!`, ['decide_final', '고고'], ['get_started', '안할래'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
            }
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 다시 골라줘!', 'emoji/hungry3.png',['get_started', '처음으로'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_final_similar(value, socket, user_data) {
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

          const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].res_name}`, `${foods[1].res_name}`);

          const chlist = [`비슷한 식당 찾는중`, `까다로워 증말...`, `비슷한 식당 찾는중🐕🐕`, '아~~ 이번에는 맘에 들어씀 조케땅~~'];
          if (image.res1 === 'no image') {
            await index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist));
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
            await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1/similar', foods[0].res_name], ['final/2/similar', foods[1].res_name], ['final/3/similar', '코기가 골라주기'], [], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
          } else {
            await index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist));
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
            await index.sendSocketMessage(socket.id, 'chat message card', ['final/1/similar', foods[0].res_name], ['final/2/similar', foods[1].res_name], ['final/3/similar', '코기가 골라주기'], [],[foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          }//TODO: 전화번호 예약 연결(완료), 내비연결, 오픈-클로즈,휴무,라스트오더, 위시리스트
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '여긴 비슷한 식당이 없네 ㅠㅠ... 힝힝.', 'emoji/disappointed.png',['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
  decide_final_others(value, socket, user_data) {
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

          const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].res_name}`, `${foods[1].res_name}`);

          const chlist = [`다른 식당 찾는중`, `까다로워 증말...`, `다른 식당 찾는중🐕🐕`, '아~~ 이번에는 맘에 들어씀 조케땅~~'];

          await index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist));
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          if (user_data.lat != null && user_data.lng != null) {
            const distance1 = foods[0].distance;
            const distance2 = foods[1].distance;
            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image distance',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  ['decide_final_others', '다른 식당 보기'],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url],
                                                                                  distance1, distance2)
                                        : await index.sendSocketMessage(socket.id, 'chat message card distance',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  ['decide_final_others', '다른 식당 보기'],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]],
                                                                                  distance1, distance2);
          } else {
            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  ['decide_final_others', '다른 식당 보기'],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url])
                                        : await index.sendSocketMessage(socket.id, 'chat message card',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  ['decide_final_others', '다른 식당 보기'],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          }
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '여긴 다른 식당이 없네 ㅠㅠ... 힝힝.', 'emoji/disappointed.png',['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_final(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_limit_cnt(socket.id, user_data.limit_cnt + 1);
        const foods = await info_update.food.get_two_restaurant(socket.id, user_data.rest1, user_data.rest2);
        const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
        const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
        const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
        const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;

        // const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].subway.slice(0, -1)} ${foods[0].res_name}`, `${foods[1].subway.slice(0, -1)} ${foods[1].res_name}`);
        const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].res_name}`, `${foods[1].res_name}`);
        const chlist = [`기 다 료 방`,
                        `두구두구두구...`,
                        `열씨미찾는중🐕🐕`,
                        `기다려봐~~ 참아야복이온다~~~`,
                        `기달려방ㅎㅎ 지금 알아보는 중이야`,
                        '머리굴러가는소리 도륵도륵'];
        const imglist = ['emoji/calculate.png',
                         'emoji/calculate2.png',
                         'emoji/letmesee.png',
                         'emoji/letmesee2.png',
                         'emoji/letmesee3.png',
                         'emoji/letmesee4.png'];

        await index.sendSocketMessage(socket.id, 'chat message button image', random_pick(chlist),`${random_pick(imglist)}`);
        await index.sendSocketMessage(socket.id, 'chat message loader', 500);
        await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');

        const result = await info_update.food.get_other_restaurant(socket.id, user_data.id, user_data.rest1, user_data.rest2);
        console.log("result 는 " + result.success);
        if(value.includes('decide_final/')) {
          let distance1 = value.split('/')[1].split(',')[0];
          let distance2 = value.split('/')[1].split(',')[1];

          // 다른 식당 있는 경우에만 버튼이 보이도록 수정
          if(result.success) {
            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image distance',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  ['decide_final_others', '다른 식당 보기'],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url],
                                                                                  distance1, distance2)
                                        : await index.sendSocketMessage(socket.id, 'chat message card distance',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  ['decide_final_others', '다른 식당 보기'],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]],
                                                                                  distance1, distance2);
          } else {
            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image distance',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  [],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url],
                                                                                  distance1, distance2)
                                        : await index.sendSocketMessage(socket.id, 'chat message card distance',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  [],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]],
                                                                                  distance1, distance2);
          }
        } else {
          if(result.success) {
            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  ['decide_final_others', '다른 식당 보기'],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url])
                                        : await index.sendSocketMessage(socket.id, 'chat message card',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  ['decide_final_others', '다른 식당 보기'],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          } else {
            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  [],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url])
                                        : await index.sendSocketMessage(socket.id, 'chat message card',
                                                                                  ['final/1', foods[0].res_name],
                                                                                  ['final/2', foods[1].res_name],
                                                                                  ['final/3', '코기가 골라주기'],
                                                                                  [],
                                                                                  [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                  [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  final(value, socket, user_data) {
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

          if(value.split('/')[2] === 'similar') {
          if (user_data.price_dinner === 'x' && food_value[0].lunch_option === 1) {
          //if (moment().format('HH') >= 10 && moment().format('HH') <= 15 && food_value[0].lunch_option === 1) {
            index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!<br>(런치메뉴 있음)`
              + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                `${random_pick(chooseimglist)}`,  ['show_image/similar', '사진 보기'], ['get_started', '처음으로 돌아가기']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
              + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a target="_self" class="card-link" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                `${random_pick(chooseimglist)}`, ['show_image/similar', '사진 보기'], ['get_started', '처음으로 돌아가기']);
          }
        } else {

          // 비슷한 식당 있는지 사전 검사
          const result = await info_update.food.get_similar_restaurant(socket.id, final_value);
          if (user_data.price_dinner === 'x' && food_value[0].lunch_option === 1) {
          // if (moment().format('HH') >= 10 && moment().format('HH') <= 15 && food_value[0].lunch_option === 1) {
            if(result.success) {
              index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!<br>(런치메뉴 있음)`
                + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                  `${random_pick(chooseimglist)}`,['show_image', '사진 보기'], ['decide_final', '뒤로가기'], ['decide_final_similar', '비슷한 식당 보기'], ['get_started', '처음으로 돌아가기']);
            } else {
              index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!<br>(런치메뉴 있음)`
                + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                  `${random_pick(chooseimglist)}`,['show_image', '사진 보기'], ['decide_final', '뒤로가기'], ['get_started', '처음으로 돌아가기']);
            }
          } else {
            if(result.success) {
              index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
                + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a target="_self" class="card-link" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                  `${random_pick(chooseimglist)}`,['show_image', '사진 보기'], ['decide_final', '뒤로가기'], ['decide_final_similar', '비슷한 식당 보기'], ['get_started', '처음으로 돌아가기']);
            } else {
              index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
                + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a target="_self" class="card-link" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                  `${random_pick(chooseimglist)}`,['show_image', '사진 보기'], ['decide_final', '뒤로가기'], ['get_started', '처음으로 돌아가기']);
            }
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  final_info_direct(value, socket, user_data) {
    (async function () {
      try {
        const food_value = await info_update.food.get_restaurant_info(socket.id, user_data.rest_final);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
        if(value.split('/')[1] === 'similar') {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
            + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href="tel:${food_value[0].phone}""><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image/similar', '사진 보기'], ['get_started', '처음으로 돌아가기']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
            + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href="tel:${food_value[0].phone}""><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image', '사진 보기'],
          ['decide_final', '뒤로가기'], ['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  show_image(value, socket, user_data) {
    (async function () {
      try {
        const food_value = await info_update.food.get_restaurant_info(socket.id, user_data.rest_final);
        let image = await info_update.food.crawl_image(socket.id, `${food_value[0].subway.slice(0, -1)} ${food_value[0].res_name}`);

        if(value.split('/')[1] === 'similar') {
          if (image.res1 === 'no image') {
            index.sendSocketMessage(socket.id, 'chat message button', `아직 ${food_value[0].subway} ${food_value[0].res_name}에 대한 사진이 없어요..ㅠㅠㅠ`, ['final_info_direct/similar', '돌아가기'], ['get_started', '처음으로 돌아가기']);
          } else {
            image = image.res1;
            index.sendSocketMessage(socket.id, 'chat message image', '자 귀찮은 너를 위해 대신 구글링한 사진이야', ['final_info_direct/similar', '돌아가기'], ['get_started', '처음으로 돌아가기'], image[0], image.length, image.splice(1));
            return;
          }
        } else {
          if (image.res1 === 'no image') {
            index.sendSocketMessage(socket.id, 'chat message button', `아직 ${food_value[0].subway} ${food_value[0].res_name}에 대한 사진이 없어요..ㅠㅠㅠ`, ['final_info_direct', '돌아가기'], ['get_started', '처음으로 돌아가기']);
          } else {
            image = image.res1;
            index.sendSocketMessage(socket.id, 'chat message image', '자 귀찮은 너를 위해 대신 구글링한 사진이야', ['final_info_direct', '돌아가기'], ['get_started', '처음으로 돌아가기'], image[0], image.length, image.splice(1));
            return;
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = Decide_menu;
