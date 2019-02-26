

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
    } else if (user_data.state === 'decide_subway') {
      key = 'exitnum';
    } else if (user_data.state === 'search') {
      key = 'before_decide';
    } else if (key.includes('decide_menu/')) {
      key = 'price';
    } else if (key.includes('hobulho_hate_start')) {
      key = 'hobulho_hate';
    } else if (key.includes('hobulho_hate/')) {
      key = 'hobulho_hate_feedback';
    } else if (key.includes('price/')) {
      key = 'location';
    } else if (key.includes('location/current')){
      key = 'near_station';
    } else if (key.includes('location/0')){
      key = 'decide_subway';
    } else if (key.includes('location/1')){
      key = 'decide_subway_corgi';
    } else if (key.includes('near_station/choose')){
      key = 'exitnum';
    } else if (key.includes('near_station/search')){
      key = 'decide_subway';
    } else if (key.includes('decide_subway_corgi/')) {
      key = 'decision_score';
    } else if (key.includes('exit/')) {
      key = 'decision_score';
    } else if (key.includes('final/')) {
      key = 'final';
    } else if (key.includes('decision/taste')) {
      key = 'taste';
    } else if (key.includes('decision/random')) {
      key = 'random_decide';
    } else if (key.includes('decision/search')) {
      key = 'search';
    } else if (key.includes('mood2/')) {
      key = 'before_decide';
    } else if (key.includes('taste/')) {
      key = 'food_type';
    } else if (key.includes('food_type/')) {
      key = 'before_decide';
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
      'final_info_direct': this.final_info_direct,
      'show_image': this.show_image,
      'taste': this.taste,
      'food_type': this.food_type,
      'drink': this.drink,
      'decision_score': this.decision_score,
      'fake_qna': this.fake_qna,
      'search': this.search,
      'location': this.location,
      'near_station': this.near_station,
      'hobulho_hate': this.hobulho_hate,
      'hobulho_hate_feedback': this.hobulho_hate_feedback,
      'random_decide': this.random_decide,
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
        await info_update.profile.update_place_start(socket.id);
        const user_info = await info_update.profile.load_user(socket.id);
        const verify_limit = await info_update.profile.verify_limit(socket.id, user_data.limit_cnt, user_data.decide_updated_at);
        const { result } = verify_limit;
        if (user_info.registered == -1) {
            const chlist = ['안녕!! 배고플땐 언제나 코기를 찾아줘😏😆', '안녕 배고프지? 얼렁 메뉴를 정해볼까...🍚', '배고프지? 오늘도 스겜하자ㅋㅋㅋ⚡', '코기 와쪄😝🐶',
                '식사시간엔 결국 나를 찾게 되어있지^~^', '뿅🐕🐕 나왔다!', '솔직히 나만큼 세상을 평화롭게 하는 강아지는 없을거야',
                '이왕 먹는 밥 스트레스 안받고 깔끔하게 정하자구','안녕 코기 와쪄~!🐕','ㅎㅇㅎㅇㅎㅇ','배고프다 배고파!','맛있는~게~ 너무~ 많아~~~ ',
                '메뉴 정하는 데 5분이 넘게 걸린다면 그건 비효율적인 삶이야','결정장애는 부끄러운게 아냐 충분히 치유 가능하니까!!! 내가 있다면😘',
                '어서와!! 메뉴 정하러 가자👽', '2시간이나 굶었더니 당 떨어진다...👻'];
            const leng = chlist.length;
            const rand = Math.floor(leng * Math.random());
            const imglist = ['emoji/hello.png','emoji/hello2.png','emoji/hello3.png','emoji/hello4.png', 'emoji/hello_soup.png', 'emoji/sushicorgi.PNG'];
            const leng2 = imglist.length;
            const rand2 = Math.floor(leng2 * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button image', `${chlist[rand]}`, `${imglist[rand2]}`,['decide_menu/lunch', '점심 고르기(평일)'],['decide_menu/dinner', '점심 고르기(주말)'],  ['decide_menu/dinner', '저녁 고르기'],['hobulho_hate_start', '못 먹는 음식 체크']); //TODO: 식당/메뉴명으로 검색하기
            //index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}`, ['decide_menu/lunch', '점심 고르기(평일)'],['decide_menu/dinner', '점심 고르기(주말)'],  ['decide_menu/dinner', '저녁 고르기'],['hobulho_hate_start', '못 먹는 음식 체크']); //TODO: 식당/메뉴명으로 검색하기
            //index.sendSocketMessage(socket.id, 'chat message button', '오늘은 어느 곳의 메뉴를 정해볼까? 원하는 곳에서 가까운 지하철역을 입력해줘🚋');
        } else {
          if (result === 'success') {
            const chlist = ['안녕!! 배고플땐 언제나 코기를 찾아줘😏😆', '안녕 배고프지? 얼렁 메뉴를 정해볼까...🍚', '배고프지? 오늘도 스겜하자ㅋㅋㅋ⚡', '코기 와쪄😝🐶',
              '식사시간엔 결국 나를 찾게 되어있지^~^', '뿅🐕🐕 나왔다!', '솔직히 나만큼 세상을 평화롭게 하는 강아지는 없을거야',
              '이왕 먹는 밥 스트레스 안받고 깔끔하게 정하자구','안녕 코기 와쪄~!🐕','ㅎㅇㅎㅇㅎㅇ','배고프다 배고파!','맛있는~게~ 너무~ 많아~~~ ',
              '메뉴 정하는 데 5분이 넘게 걸린다면 그건 비효율적인 삶이야','결정장애는 부끄러운게 아냐 충분히 치유 가능하니까!!! 내가 있다면😘',
              '어서와!! 메뉴 정하러 가자👽', '2시간이나 굶었더니 당 떨어진다...👻'];
            const leng = chlist.length;
            const rand = Math.floor(leng * Math.random());
            const imglist = ['emoji/hello.png','emoji/hello2.png','emoji/hello3.png','emoji/hello4.png', 'emoji/hello_soup.png', 'emoji/sushicorgi.PNG'];
            const leng2 = imglist.length;
            const rand2 = Math.floor(leng2 * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button image', `${chlist[rand]}`, `${imglist[rand2]}`,['decide_menu/lunch', '점심 고르기(평일)'],['decide_menu/dinner', '점심 고르기(주말)'],  ['decide_menu/dinner', '저녁 고르기'],['hobulho_hate_start', '못 먹는 음식 체크']); //TODO: 식당/메뉴명으로 검색하기
            //index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}`, ['decide_menu/lunch', '점심 고르기(평일)'],['decide_menu/dinner', '점심 고르기(주말)'], ['decide_menu/dinner', '저녁 고르기'],['hobulho_hate_start', '못 먹는 음식 체크']); //TODO: 식당/메뉴명으로 검색하기
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', '아... 너무 많이 말했더니 🐶피곤.... 30분만 자고 다시 올게😪🌙', 'emoji/drunk2',['get_started', '처음으로 돌아가기']);
          }
        }
      } catch (e) {
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
            const hobulho_hate_leng = hobulho_hate_list.length;
            const hobulho_hate_rand = Math.floor(hobulho_hate_leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button checkbox', hobulho_hate_list[hobulho_hate_rand],
                ['900', '없음'], ['회', '회'], ['해산물', '모든 해산물'], ['곱창', '곱창'],['닭발', '닭발'], ['양꼬치', '양꼬치'], ['쌀국수', '베트남쌀국수'], ['오이', '오이'], ['매운', '매운음식'], ['hobulho_hate/', '선택완료']);
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
            const hobulho_hate_feedback_leng = hobulho_hate_feedback_list.length;
            const hobulho_hate_feedback_rand = Math.floor(hobulho_hate_feedback_leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button', `${hobulho_hate_feedback_list[hobulho_hate_feedback_rand]}`,['decide_menu/lunch', '점심 고르기(평일)'],['decide_menu/dinner', '점심 고르기(주말)'],  ['decide_menu/dinner', '저녁 고르기'],['hobulho_hate_start', '못 먹는 음식 체크']);
        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
    }());
  }

  search(value, socket, user_data) { //TODO: 검색기능 구현(res_name, food_type, food_name)
    (async function () {
        try {
            const chlist = ['원하는 음식 종류를 말해줘!!', '뭐 먹고 싶은지 말해봐🍚'];
            const leng = chlist.length;
            const rand = Math.floor(leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}`);
            //}

        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        }
    }());
  }

    price(value, socket, user_data) {
      (async function () {
          try {
              if (value.includes('lunch')) {
                  await info_update.profile.update_price_level_dinner(socket.id, 'x');
              } else if (value.includes('dinner')) {
                  await info_update.profile.update_price_level_lunch(socket.id,'x');
              }
              const price_list = ['식사 예산은 1인당 어느 정도 생각해? (중복선택가능!)', '오늘 너의 텅장💸이 허락하는 한도는??(1인 기준, 중복선택)', '식사 가격은 1인당 얼마 정도였으면 좋겠어? (중복선택)',
                  '이번 식사. 얼마면 돼?!💰(1인 기준, 중복선택)', '오늘 식사의 가격대는 어느 정도로 생각해~~?(1인 기준, 중복선택)','1인당 얼마까지 긁을 수 있어? 💳 (중복선택가능!)'];
              const price_leng = price_list.length;
              const price_rand = Math.floor(price_leng * Math.random());
              index.sendSocketMessage(socket.id, 'chat message button checkbox price', price_list[price_rand],
                  ['0', '~1만원 미만'], ['1', '1만원 대'], ['2', '2만원 대'], ['3', '3만원 대'], ['4', '4만원 이상'], ['price/', '선택완료']);
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
              const user_price = await value.split('/')[1];;
              console.log('user_price:'+user_price);
              if (user_data.price_dinner === 'x') { //점심식사
                console.log("user_data_price_dinner === x");
                await info_update.profile.update_price_level_lunch(socket.id, user_price);
              } else if (user_data.price_lunch === 'x') { //저녁식사
                console.log("user_data_price_lunch === x");
                await info_update.profile.update_price_level_dinner(socket.id, user_price);
              }

              const location_list = ['약속장소는 이미 정해져 있어?', '어디서 만나기로 했는지는 정했어? ', '약속 장소는 정했구~~?',
                  '어디서 만날지는 정해져 있는거야?', '약속 장소는 정해져 있는거야?'];
              const location_leng = location_list.length;
              const location_rand = Math.floor(location_leng * Math.random());
              index.sendSocketMessage(socket.id, 'chat message button', location_list[location_rand],
                  ['location/0', '응 정했어'], ['location/1', 'ㄴㄴ 코기가 정해줘!'], ['location/current', '지금 제일 가까운 곳']); // TODO:['location/2', '현재 위치']);
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
            const subway_db_leng = subway_db.length;
            const subway_db_rand = Math.floor(subway_db_leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button', `그럼 ${subway_db[subway_db_rand]}에서 만나는 걸로ㅋㅋㅋ`, [`decide_subway_corgi/${subway_db[subway_db_rand]}`, '고고'], ['location/0', '그냥 내가 고를래']);
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
            // console.log(map);
            const sortedMap = sortMap(map); // key-value형식으로 map이 정의되어있다 (ex. 0.1234 - 성수역) 오름차순으로 map을 정렬하는 module
            // console.log(`거리순으로 정렬된 map : ${sortedMap}`); // 거리순으로 출력
            console.log(sortedMap);

            index.sendSocketMessage(socket.id, 'chat message button', `현재 위치에서 가장 가까운 역은 ${sortedMap.values().next().value}이야`,
                [`near_station/choose/${sortedMap.values().next().value}`, '여기로 가자!'], ['near_station/search', '직접 고를래']); // TODO:['location/2', '현재 위치']);

        } catch (e) {
            index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
            console.log(e);
        }
      }());
  }

  decide_subway(value, socket, user_data) {
      (async function () {
          try {
              if(value.includes('near_station')){

              }
              // console.log(`value: ${value}`);
              console.log('user_data: '+user_data.freq_subway);
              if (!value.includes('elsewhere') && user_data.freq_subway !== null) {
                  const revisit = user_data.freq_subway;
                  const freq_list = [`이번에도 ${revisit}에서 메뉴를 정하면 될까?`, `이번에도 ${revisit} 고고?`, `이번에도 ${revisit}에서 밥 먹을거야?`,
                      `이번에도 ${revisit}에서 먹는거 맞지?`, `오늘도 ${revisit}?`, `오늘도 ${revisit}에서 골라볼까?`,
                      `이번에도 ${revisit}에서 정하는거 맞아맞아?`, `오늘도 ${revisit}에서 메뉴 정해볼까?`, `이번에도 ${revisit}에서 먹을 곳 찾는거야?`];
                  const freq_leng = freq_list.length;
                  const freq_rand = Math.floor(freq_leng * Math.random());
                  index.sendSocketMessage(socket.id, 'chat message button', freq_list[freq_rand], [`${revisit}`, '응 맞아!'], ['decide_subway/elsewhere', '다른 곳이야!']);
              } else { //todo: freq_subway 구현(완료)
                  const chlist = ['어느 역 근처의 메뉴를 정해줄까?', '밥 어디에서 먹을거야?🍚', '밥 어디에서 먹어?', '어느 역 근처 메뉴를 정해줄까?',
                      '위치가 어디야? 원하는 곳에서 가까운 지하철역을 입력해줘🚋', '밥 어디에서 먹어? 챱챱', '이번에는 어느 역 근처의 메뉴를 정해볼까?',
                      '오늘 메뉴는 어디에서 정할까?', '오늘 메뉴는 어느 역에서 정해볼까?'];
                  const leng = chlist.length;
                  const rand = Math.floor(leng * Math.random());
                  index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}<br>ex) 강남역,이대역`);
              }

          } catch (e) {
              index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
          }
      }());
  }

  exitnum(value, socket, user_data) {
    (async function () {
      try {
        let subway;
        if(value.includes('near_station')){
          subway = value.slice(value.lastIndexOf('/')+1);
        } else{
          console.log(`exitnum의 value, subway = ${value}`);
          subway = value;
          if (value.slice(-1) !== '역') {
            subway = `${value}역`;
          }
        }
        const subways = await info_update.food.get_all_subway(socket.id, '');
        const result = await info_update.food.verify_subway(socket.id, subway);
        if (result === 'success') {
          const user_info = await info_update.profile.load_user(socket.id);
          const db_subway = await user_info.subway;
          if (subway === db_subway) {
            console.log(`subway === db.subway if 문 안 subway = ${subway}, db_subway = ${db_subway}`);
            await info_update.profile.update_freq_subway(socket.id, subway);
          } else {
            console.log("subway === db.subway else 문 안");
            await info_update.profile.update_freq_subway(socket.id, 'null');
          }
          await info_update.profile.update_subway(socket.id, subway);
          const exit_list = [`${subway} 몇 번 출구쪽이 좋아??`, `${subway}에서 더 편한 출구가 있다면 골라줘!(중복선택)`, `${subway} 몇 번 출구쪽이 편해?(중복선택)`, `${subway} 몇 번 출구쪽이 좋아? 모르면 "상관없음" 버튼을 눌러주면 돼!`]
          const exit_leng = exit_list.length;
          const exit_rand = Math.floor(exit_leng * Math.random());
          switch (subway) {
            case '강남역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/강남역.png', ['999', '상관없어'], ['4', '1,2,3,4번'], ['3', '5,6,7,8번'], ['2', '9,10번'], ['1', '11,12번'], ['exit/', '선택완료']);
              break;
            }
            // case '선릉역': {
            //     await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/선릉역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6,7번'], ['1', '8,9,10번'], ['exit/', '선택완료']);
            //     break;
            // }
            case '서울대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/서울대입구역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6번'], ['1', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '이대역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/이대역.png', ['999', '상관없어'], ['4', '5번'], ['3', '6번'], ['2', '1, 2번'], ['1', '3,4번'], ['exit/', '선택완료']);
              break;
            }
            default:
              index.sendSocketMessage(socket.id, 'chat message button', `지금 밥집 고르기를 이용 가능한 곳은 서울[강남역, 서울대입구역, 이대역]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_subway', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
              break;
          }
        } else {
          // await info_update.profile.update_state(socket.id, '1', 'decide_menu');
          index.sendSocketMessage(socket.id, 'chat message button', `지금 밥집 고르기를 이용 가능한 곳은 서울[강남역, 서울대입구역, 이대역]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_subway', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
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


  decision_score(value, socket, user_data) {
      (async function () {
          try {
              if (value.includes('decide_subway_corgi')) {
                  const subway = value.split('/')[1];
                  await info_update.profile.update_subway(socket.id, subway);
                  await info_update.profile.update_exit_quarter(socket.id, '999');
              } else if (value.includes('exit')) {
                  const user_quarter = value.split('/')[1];
                  // console.log(user_quarter);
                  await info_update.profile.update_exit_quarter(socket.id, user_quarter);
              }
              const qna_list = [
                  {
                      'question': '딱 정해줄까? 아님 길게 물어봐줄까?', 'button1_id': 'decision/random', 'button1_value': '그냥 너가 정해', 'button2_id': 'decision/taste', 'button2_value': '자세히 물어봐줘',
                  },
                  {
                      'question': '내가 그냥 정해줄까? 아니면 자세히 물어봐줄까?', 'button1_id': 'decision/random', 'button1_value': '가라는 곳으로 가겠습니다', 'button2_id': 'decision/taste', 'button2_value': '길게 물어봐',
                  },
                  {
                      'question': '오늘의 메뉴결정장애 지수는 몇 점이야??', 'button1_id': 'decision/random', 'button1_value': '100점: 난 아무생각이 없다', 'button2_id': 'mood2', 'button2_value': '50점: 뭔가 떠오를듯 말듯...',
                  },
                  {
                      'question': '오늘의 메뉴결정장애 점수는 몇 점?', 'button1_id': 'decision/random', 'button1_value': '100점: 아무거나><', 'button2_id': 'decision/taste', 'button2_value': '50점: 딱 찝지는 못해도 호불호는 존재',
                  },
                  // {
                  //     'question': '오늘의 결정장애 지수를 점수로 표현한다면?', 'button1_id': 'decision/random', 'button1_value': '100점: 아무거나 먹을랭~', 'button2_id': 'mood2', 'button2_value': '50점: 분명히 땡기는게 있는데 말로 표현불가',
                  // {
                  //     'question': '오늘의 결정장애 지수는?', 'button1_id': 'decision/random', 'button1_value': '100점: 나한테 아무런 결정을 바라지 말아줘', 'button2_id': 'mood2', 'button2_value': '50점: 옵션 주면 고를수 있을듯?!',
                  // },
                  {
                      'question': '어떤 방식으로 메뉴를 정해보까나', 'button1_id': 'decision/random', 'button1_value': '코기의 랜덤픽', 'button2_id': 'mood2', 'button2_value': '맛/음식종류/분위기 필터링',
                  },
                  // {
                  //     'question': '혹시 조금이라도 땡긴다거나 하는 음식종류가 있어??', 'button1_id': 'decision/random', 'button1_value': '당연히 없지~헤헷', 'button2_id': 'mood2', 'button2_value': '뭔가 살짝 땡기기는 해',
              ];
              const qna_list_leng = qna_list.length;
              const qna_list_rand = Math.floor(qna_list_leng * Math.random());
                index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
          } catch (e) {
              index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
              console.log(e);
          }
      }());
  }


  mood(value, socket, user_data) {
    (async function () {
      try {
        if (value.includes('exit')) {
          const user_quarter = value.split('/')[1];
          // console.log(user_quarter);
          await info_update.profile.update_exit_quarter(socket.id, user_quarter);
        }
        const mood_list = ['메뉴 컨셉은 끼니해결? 아니면 약속 자리?',
          '일상적인 식사 메뉴를 골라줄까? 아니면 밥이나 술 약속 메뉴를 골라줄까?',
          '어떤 식사자리인데?',
          '캐주얼한 식사야? 아니면 약속 자리야?',
          '데일리 메뉴결정? 아니면 약속 메뉴결정??',
          '어떤 자리에 맞는 메뉴를 골라줄까?'];
        const mood_leng = mood_list.length;
        const mood_rand = Math.floor(mood_leng * Math.random());

        // 해당 subway에 drink_type이 있는경우
        const user_info = await info_update.profile.load_user(socket.id);
        const result = await info_update.food.verify_subway_drinktype(socket.id, user_info.subway);
        console.log(result);
        if (result === 'success') {
          index.sendSocketMessage(socket.id, 'chat message button', mood_list[mood_rand], ['mood2/캐주얼', '일상적인 식사'], ['mood2', '밥 약속'], ['drink','술 약속']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', mood_list[mood_rand], ['mood2/캐주얼', '일상적인 식사'], ['mood2', '밥 약속']);
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

        //await info_update.profile.update_with_mood(socket.id, '약속');
        const mood2_list = ['원하는 식당 분위기를 골라줘!(중복선택)', '특별히 원하는 식당 분위기가 있다면 골라줘!(중복선택)', '가고 싶은 식당의 키워드를 몇개 골라봐!! (못고르겠으면 상관없음ㄱㄱ)'];
        const mood2_leng = mood2_list.length;
        const mood2_rand = Math.floor(mood2_leng * Math.random());
        const imglist = ['emoji/checking.png','emoji/checking2.png','emoji/ask3.png','emoji/ask4.png', 'emoji/listening.png'];
        const leng2 = imglist.length;
        const rand2 = Math.floor(leng2 * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button checkbox image', mood2_list[mood2_rand],`${imglist[rand2]}`, ['998', '상관없음'], ['가벼운', '간단한'], ['인스타', '#인스타감성'], ['깔끔','깔끔한'], ['큰프', '프랜차이즈'], ['뷔페', '뷔페/무한리필'], ['mood2/', '선택완료']);
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

        // const user_mood2 = value.split('/')[1];
        // if (value.includes('taste')) {
        //     const mood2 = value.split('/')[1];
        //    await info_update.profile.update_mood2(socket.id, '998');
        // } else {
        //   await info_update.profile.update_mood2(socket.id, user_mood2);
        // }
        const taste = {
          'qnas': [
            {
              'question': '기름진 vs 담백한?', 'button1_id': 'taste/기름진', 'button1_value': '기름진', 'button2_id': 'taste/담백한', 'button2_value': '담백한',
            },
            {
              'question': '치즈듬뿍 vs 치즈x?', 'button1_id': 'taste/치즈', 'button1_value': '치즈듬뿍', 'button2_id': 'taste/!-치즈', 'button2_value': '치즈x',
            },
            {
              'question': '자극적인 vs 깔끔한?', 'button1_id': 'taste/자극적인', 'button1_value': '자극적인', 'button2_id': 'taste/!-자극적인', 'button2_value': '깔끔한',
            },
            // {
            //   'question': '헤비한음식 vs 가벼운음식?', 'button1_id': 'taste/!-가벼운', 'button1_value': '헤비한', 'button2_id': 'taste/가벼운', 'button2_value': '가벼운',
            // },
            {
              'question': '오늘 매운거 어때?', 'button1_id': 'taste/매운', 'button1_value': '좋아', 'button2_id': 'taste/!-매운', 'button2_value': '싫어',
            },
            {
              'question': '오늘 따뜻한 국물이 땡겨?', 'button1_id': 'taste/따뜻한', 'button1_value': 'ㅇㅇ', 'button2_id': 'taste/!-따뜻한', 'button2_value': 'ㄴㄴ',
            },
            {
              'question': '밥 vs 면?', 'button1_id': 'taste/밥', 'button1_value': '밥', 'button2_id': 'taste/면', 'button2_value': '면',
            },
            {
              'question': '오늘 고기 들어간 음식은 어떄?', 'button1_id': 'taste/고기', 'button1_value': '좋아', 'button2_id': 'taste/!-고기', 'button2_value': '싫어',
            },
            {
              'question': '쌀 vs 밀가루?', 'button1_id': 'taste/밥', 'button1_value': '쌀', 'button2_id': 'taste/밀가루', 'button2_value': '밀가루',
            },
            {
              'question': '오늘 해산물 들어간 음식은 어때?', 'button1_id': 'taste/해산물', 'button1_value': '좋아', 'button2_id': 'taste/!-해산물', 'button2_value': '싫어',
            },
          ],
        };
        const taste_data = taste.qnas;
        const taste_leng = taste_data.length;
        const taste_rand = Math.floor(taste_leng * Math.random());
        const imglist = ['emoji/ask.png','emoji/ask2.png','emoji/ask3.png','emoji/ask4.png'];
        const leng2 = imglist.length;
        const rand2 = Math.floor(leng2 * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button image',taste_data[taste_rand].question,`${imglist[rand2]}`, [taste_data[taste_rand].button1_id, taste_data[taste_rand].button1_value], [taste_data[taste_rand].button2_id, taste_data[taste_rand].button2_value], ['taste/all', '상관없음']);
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
        const type_leng = type_data.length;
        const type_rand = Math.floor(type_leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', type_data[type_rand].question, [String(type_rand)+type_data[type_rand].button1_id, type_data[type_rand].button1_value], [String(type_rand)+type_data[type_rand].button2_id, type_data[type_rand].button2_value], ['food_type/all', '상관없음']);
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
              const qna_list_leng = qna_list.length;
              const qna_list_rand = Math.floor(qna_list_leng * Math.random());
              // if (qna_list_rand === 0 || qna_list_rand === 8) {
                index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
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
            await info_update.profile.update_with_mood(socket.id, '캐주얼');
            await info_update.profile.update_taste(socket.id, 'all');

            // let user_food_type=value.split('/')[1];
            // if(user_food_type!=='all'){
            //     // 질문 id 맨 앞에 question index를 붙여서 전달했음, 앞에 3개 질문이 아닌 경우는 선택에 영향을 주면 안 되므로 all로 처리함.
            //     if(Number(value.charAt(0))>=3){
            //         user_food_type='all';
            //     }
            // }
            await info_update.profile.update_food_type(socket.id, 'all');
            const foods = await info_update.food.get_restaurant(socket.id,  user_data.subway, user_data.exit_quarter, user_data.price_lunch, user_data.price_dinner, '캐주얼', '999', 'all', 'x','all', 'x');
            const foods_info = foods.message;
            if (foods.success){
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

          // const user_food_type = 'all';
          if (value.includes('type')) {
              const user_input_value = value.split('/')[1];
              await info_update.profile.update_food_type(socket.id, user_input_value);
              await info_update.profile.update_mood2(socket.id, '998');
              //await info_update.profile.update_with_mood(socket.id, '캐주얼');
          } else if (value.includes('mood2')) {
              await info_update.profile.update_mood2(socket.id, value);
             // await info_update.profile.update_with_mood(socket.id, '캐주얼');
              await info_update.profile.update_taste(socket.id, 'all');
              await info_update.profile.update_food_type(socket.id, 'all');
          }
          // console.log('내가 찍은 역명: '+user_data.subway);
        // console.log('내가 찍은 출구: '+user_data.exit_quarter);
        // console.log('내가 찍은 분위기: '+user_data.with_mood);
         console.log('내가 찍은 분위기2: '+user_data.mood2);
         console.log('내가 싫어하는 음식: '+user_data.hate_food);
        // console.log('내가 찍은 맛: '+user_data.taste);
        // console.log('받은 값:'+value);
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
        const foods = await info_update.food.get_restaurant(socket.id,  user_data.subway, user_data.exit_quarter, user_data.price_lunch, user_data.price_dinner, user_data.with_mood, user_data.mood2, user_data.taste, user_data.hate_food, user_data.food_type, 'x');
        const foods_info = foods.message;
        if (foods_info.length === 2) {
          await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
          if (foods.try === 1) {
            index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!', ['decide_final', '고고'], ['get_started', '안할래']);
          } else if (foods.try === 2) {
            index.sendSocketMessage(socket.id, 'chat message button', `그 출구에는 딱 이거다 하는 곳은 없구... ${user_data.subway} 전체에서 2곳을 골라줄테니까 한 번 골라봐!`, ['decide_final', '고고'], ['get_started', '안할래']);
          }
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 식당이 아직 없어... 다시 골라줘!', 'emoji/hungry3.PNG',['get_started', '돌아가기']);
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
        console.log(`decide_final_similar에서 rest : ${user_data.rest_final}`);
        const result = await info_update.food.get_similar_restaurant(socket.id, user_data.rest_final);
        console.log(result);
        const foods = await result.message;
        if(result.success) {
          info_update.profile.update_rest2(user_data.kakao_id, foods[0].id, foods[1].id);
          const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
          const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
          const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
          const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;

          const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].subway.slice(0, -1)} ${foods[0].res_name}`, `${foods[1].subway.slice(0, -1)} ${foods[1].res_name}`);

          const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~`,`기달려방ㅎㅎ`, '아~~ 이번에는 맘에 들어씀 조케땅~~'];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          if (image.res1 === 'no image') {
            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
            await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1/similar', foods[0].res_name], ['final/2/similar', foods[1].res_name], ['final/3/similar', '코기가 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
          } else {
            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
            await index.sendSocketMessage(socket.id, 'chat message card', ['final/1/similar', foods[0].res_name], ['final/2/similar', foods[1].res_name], ['final/3/similar', '코기가 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          }//TODO: 전화번호 예약 연결(완료), 내비연결, 오픈-클로즈,휴무,라스트오더, 위시리스트
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '여긴 비슷한 식당이 없네 ㅠㅠ... 힝힝.', 'disappointed.PNG',['get_started', '처음으로 돌아가기']);
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

        const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].subway.slice(0, -1)} ${foods[0].res_name}`, `${foods[1].subway.slice(0, -1)} ${foods[1].res_name}`);
          const imglist = ['emoji/calculate.png','emoji/calculate2.png','emoji/letmesee.PNG', 'emoji/letmesee2.png', 'emoji/letmesee3.png', 'emoji/letmesee4.PNG'];
          const leng2 = imglist.length;
          const rand2 = Math.floor(leng2 * Math.random());
          const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 참아야복이온다~~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`,'머리굴러가는소리 도륵도륵'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        if (image.res1 === 'no image') {
          await index.sendSocketMessage(socket.id, 'chat message button image', chlist[rand],`${imglist[rand2]}`);
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '코기가 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
        } else {
          await index.sendSocketMessage(socket.id, 'chat message button image', chlist[rand],`${imglist[rand2]}`);
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '코기가 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
        }//TODO: 전화번호 예약 연결(완료), 내비연결, 오픈-클로즈,휴무,라스트오더, 위시리스트
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
          const rand_select = Math.floor(user_select_value.length * Math.random());
          await info_update.profile.update_rest_final(socket.id, user_select_value[rand_select]);

          const food_val = await info_update.food.get_restaurant_info(socket.id, parseInt(user_select_value[rand_select]));
          index.sendSocketMessage(socket.id, 'chat message button image', `코기의 선택 : ${food_val[0].res_name}`, 'choose.png');
          final_value = user_select_value[rand_select];
        }

        const food_value = await info_update.food.get_restaurant_info(socket.id, final_value);
        await info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, final_value, food_value[0].res_name, food_value[0].subway);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
        const chooseimglist = ['emoji/choose.PNG','emoji/choose2.PNG','emoji/choose3.png','emoji/goodchoice.PNG'];
        const leng2 = chooseimglist.length;
        const rand2 = Math.floor(leng2 * Math.random());

          if(value.split('/')[2] === 'similar') {
          if (user_data.price_dinner === 'x' && food_value[0].lunch_option === 1) {
          //if (moment().format('HH') >= 10 && moment().format('HH') <= 15 && food_value[0].lunch_option === 1) {
            index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!<br>(런치메뉴 있음)`
              + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_blank" href="tel://${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                `${chooseimglist[rand2]}`,  ['show_image/similar', '사진 보기'], ['get_started', '처음으로 돌아가기']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
              + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a target="_blank" class="card-link" href="tel://${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                `${chooseimglist[rand2]}`, ['show_image/similar', '사진 보기'], ['get_started', '처음으로 돌아가기']);
          }
        } else {
          if (user_data.price_dinner === 'x' && food_value[0].lunch_option === 1) {
          // if (moment().format('HH') >= 10 && moment().format('HH') <= 15 && food_value[0].lunch_option === 1) {
            index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!<br>(런치메뉴 있음)`
              + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_blank" href="tel://${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                `${chooseimglist[rand2]}`,['show_image', '사진 보기'], ['decide_final', '뒤로가기'], ['decide_final_similar', '비슷한 식당 보기'], ['get_started', '처음으로 돌아가기']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
              + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a target="_blank" class="card-link" href="tel://${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`,
                `${chooseimglist[rand2]}`,['show_image', '사진 보기'], ['decide_final', '뒤로가기'], ['decide_final_similar', '비슷한 식당 보기'], ['get_started', '처음으로 돌아가기']);
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
            + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_blank" href="tel://${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image/similar', '사진 보기'], ['get_started', '처음으로 돌아가기']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].food_type}집이야!`
            + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_blank" href="tel://${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image', '사진 보기'],
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
