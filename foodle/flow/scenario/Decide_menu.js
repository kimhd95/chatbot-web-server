

const moment = require('moment');
const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();

class Decide_menu {
  constructor(value, socket, user_data) {
    let key;
    key = value;
    if (key === 'decide_menu') {
      key = 'decide_menu';
    } else if (user_data.state === 'decide_menu') {
      key = 'exitnum';
    } else if (key.includes('exit/')) {
      key = 'mood';
    } else if (key.includes('final/')) {
      key = 'final';
    } else if (key.includes('mood2/')) {
      key = 'taste';
    } else if (key.includes('taste/')) {
      key = 'food_type';
    } else if (key.includes('food_type/')) {
      key = 'before_decide';
    }

    this.strategies = {
      'decide_menu': this.decide_menu,
      'exitnum': this.exitnum,
      'mood': this.mood,
      'mood2': this.mood2,
      'no_mood2': this.no_mood2,
      'no_exit': this.no_exit,
      'before_decide': this.before_decide,
      'decide_final': this.decide_final,
      'final': this.final,
      'final_info_direct': this.final_info_direct,
      'show_image': this.show_image,
      'taste': this.taste,
      'food_type': this.food_type,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '1', key);
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
        const verify_limit = await info_update.profile.verify_limit(socket.id, user_data.limit_cnt, user_data.decide_updated_at);
        const { result } = verify_limit;
        if (result === 'success') {
          const chlist = ['어디에서?', '어디에서 먹어?', '밥 먹을 장소를 말해줘', '밥 어디에서 먹어?',
            '어디에서 만나?', '어디에서 먹게?', '어디서 밥 먹는데?ㅎㅎ',
            '밥 어디에서 먹는데?(하하)'];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}<br>ex) 강남역,신촌역`);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', '한 끼당 메뉴를 3번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  exitnum(value, socket, user_data) {
    (async function () {
      try {
        let subway = value;
        if (value.slice(-1) !== '역') {
          subway = `${value}역`;
        }
        const subways = await info_update.food.get_all_subway(socket.id, '');
        const result = await info_update.food.verify_subway(socket.id, subway);
        if (result === 'success') {
          const user_info = await info_update.profile.load_user(socket.id);
          // const db_freq_subway = await user_info.freq_subway;
          const db_subway = await user_info.subway;
          if (subway === db_subway) {
            // console.log("subway == db.subway");
            // console.log("subway : " + subway);
            // console.log("db.subway : " + db_subway);
            // console.log("db.freq_subway : " + db_freq_subway);
            await info_update.profile.update_freq_subway(socket.id, subway);
          } else {
            // console.log("subway != db.subway");
            // console.log("subway : " + subway);
            // console.log("db.subway : " + db_subway);
            // console.log("db.freq_subway : " + db_freq_subway);
            await info_update.profile.update_freq_subway(socket.id, null);
          }
          await info_update.profile.update_subway(socket.id, subway);
          switch (subway) {
            case '강남역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/강남역.png', ['999', '상관없어'], ['4', '1,2,3,4번'], ['3', '5,6,7,8번'], ['2', '9,10번'], ['1', '11,12번'], ['exit/', '선택완료']);
              break;
            }
            case '서울대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/서울대입구역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6번'], ['1', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '성수역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/성수역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
              break;
            }
            case '신사역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/신사역.png', ['999', '상관없어'], ['4', '1,2,3번'], ['3', '4번'], ['2', '5번'], ['1', '6,7,8(가로수길)번'], ['exit/', '선택완료']);
              break;
            }
            case '신촌역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/신촌역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '서면역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/서면역.png', ['999', '상관없어'], ['3', '1,3,5,7번'], ['4', '2,4,6번'], ['1', '8,10,12번'], ['2', '9,11,13,15번'], ['exit/', '선택완료']);
              break;
            }
            case '센텀시티역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/센텀시티역.png', ['999', '상관없어'], ['4', '1,3,5번'], ['1', '2,4,6,8번'], ['3', '7,9,11,13번'], ['2', '10,12번'], ['exit/', '선택완료']);
              break;
            }
            case '건대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/건대입구역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['3', '5,6번'], ['4', '롯데백화점 스타시티 방면'], ['exit/', '선택완료']);
              break;
            }
            case '광화문역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/광화문역.png', ['999', '상관없어'], ['2', '1,7,8번'], ['1', '2,3,4,9번'], ['4', '5번'], ['3', '6번'], ['exit/', '선택완료']);
              break;
            }
            case '뚝섬역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/뚝섬역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '망원역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/망원역.png', ['999', '상관없어'], ['1', '1번'], ['2', '2번 (망리단길 방면)'], ['exit/', '선택완료']);
              break;
            }
            case '사당역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/사당역.png', ['999', '상관없어'], ['4', '1,2,3번'], ['3', '4,5,6번'], ['2', '7,8,9,10번'], ['1', '11,12,13,14번'], ['exit/', '선택완료']);
              break;
            }
            case '선릉역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/선릉역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6,7번'], ['1', '8.9.10번'], ['exit/', '선택완료']);
              break;
            }
            case '선정릉역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/선정릉역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
              break;
            }
            case '여의도역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/여의도역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번 (IFC몰 방면)'], ['4', '5번'], ['3', '6번'], ['exit/', '선택완료']);
              break;
            }
            case '역삼역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/역삼역.png', ['999', '상관없어'], ['4', '1번'], ['3', '2,3번'], ['2', '4,5,6번'], ['1', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '왕십리역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/왕십리역.png', ['999', '상관없어'], ['2', '1,2,3,4,5번 (성동구청 방면)'], ['1', '6,13번 (한양대 방면)'], ['3', '6-1,7,8,9,10,11,12번'], ['exit/', '선택완료']);
              break;
            }
            case '을지로입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/을지로입구역.png', ['999', '상관없어'], ['2', '1,1-1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '이태원역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/이태원역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
              break;
            }
            case '종각역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/종각역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,3-1번'], ['4', '4번'], ['3', '5,6번'], ['exit/', '선택완료']);
              break;
            }
            case '합정역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/합정역.png', ['999', '상관없어'], ['2', '1,2,9,10번'], ['1', '3,4,5,6번'], ['4', '7번'], ['3', '8번'], ['exit/', '선택완료']);
              break;
            }
            case '혜화역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/혜화역.png', ['999', '상관없어'], ['1', '1번'], ['4', '2번'], ['3', '3번'], ['2', '4번'], ['exit/', '선택완료']);
              break;
            }
            case '홍대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/홍대입구역.png', ['999', '상관없어'], ['1', '1,2,3번 (연남동 방면)'], ['2', '4,5,6번(연남동 방면)'], ['3', '7,8,9번'], ['exit/', '선택완료']);
              break;
            }
            default:
              index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[${subways}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_menu', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
              break;
          }
        } else {
          // await info_update.profile.update_state(socket.id, '1', 'decide_menu');
          index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[${subways}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_menu', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
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
        if (value.includes('exit')) {
          const user_quarter = value.split('/')[1];
          await info_update.profile.update_exit_quarter(socket.id, user_quarter);
        }
        const mood_list = ['오늘은 밥 누구랑 먹어?',
          '무슨 약속이야?',
          '어떤 약속이야?',
          '누구랑 먹는거야?',
          '나는 결정장애를 위해 존재하지. 밥 누구랑 먹어?',
          '요새 사람들중에 80%가 결정장애래. 너만 그런거 아니니까 걱정마 ㅋㅋㅋ 밥 누구랑 먹게?',
          '누구랑 먹는지에 따라 추천이 달라져! 누구랑 먹어?',
          '같이 밥 먹는 사람이 누구야?(꺄아)',
          '누구랑 밥 먹는거야?',
          '지금 누구랑 밥 먹어?ㅎㅎ'];
        const mood_leng = mood_list.length;
        const mood_rand = Math.floor(mood_leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', mood_list[mood_rand], ['mood2/캐주얼', '캐주얼한 식사'], ['mood2', '친구 or 애인과의 약속']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  mood2(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_with_mood(socket.id, '약속');
        index.sendSocketMessage(socket.id, 'chat message button checkbox', '원하는 식당 분위기가 있어?', ['상관없음', '상관없음'], ['향토적인', '향토적인'], ['고급진', '고급진'], ['프랜차이즈', '프랜차이즈'], ['인스타', '#인스타감성'], ['이국적', '이국적/퓨전'], ['뷔페', '뷔페/무한리필'], ['mood2/', '선택완료']);
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
        const user_mood2 = value.split('/')[1];
        if (value.includes('캐주얼')) {
          await info_update.profile.update_with_mood(socket.id, user_mood2);
        } else {
          await info_update.profile.update_mood2(socket.id, user_mood2);
        }
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
            {
              'question': '헤비한음식 vs 가벼운음식?', 'button1_id': 'taste/!-가벼운', 'button1_value': '헤비한', 'button2_id': 'taste/가벼운', 'button2_value': '가벼운',
            },
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
        index.sendSocketMessage(socket.id, 'chat message button', taste_data[taste_rand].question, [taste_data[taste_rand].button1_id, taste_data[taste_rand].button1_value], [taste_data[taste_rand].button2_id, taste_data[taste_rand].button2_value], ['taste/all', '상관없음']);
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
            {
              'question': '한식 vs 양식?', 'button1_id': 'food_type/한식', 'button1_value': '한식', 'button2_id': 'food_type/양식', 'button2_value': '양식',
            },
            {
              'question': '한식 vs 일식/중식?', 'button1_id': 'food_type/한식', 'button1_value': '한식', 'button2_id': 'food_type/일식,중식', 'button2_value': '일식/중식',
            },
            {
              'question': '한식 vs 이국적음식?', 'button1_id': 'food_type/한식', 'button1_value': '한식', 'button2_id': 'food_type/이국적', 'button2_value': '이국적음식',
            },
            // TODO
            // {"question":"오늘 기분은 어때?","button1_id":"food_type/좋아","button1_value":"좋아","button2_id":"food_type/구려","button2_value":"구려","button3_id":"food_type/그냥그래","button3_value":"그냥 그래"},
            // {"question":"같이 먹는사람 몇 명이야?","button1_id":"food_type/1~4명","button1_value":"1~4명","button2_id":"food_type/5~9명","button2_value":"5~9명","button3_id":"food_type/10명이상","button3_value":"10명이상"},
            // {"question":"지금 많이 배고파?","button1_id":"food_type/완전 배고파!","button1_value":"완전 배고파!","button2_id":"food_type/조금 허기져","button2_value":"조금 허기져","button3_id":"food_type/사실 별로 안고파","button3_value":"사실 별로 안고파"},
            // {"question":"오늘 많이 추워?","button1_id":"food_type/개추워","button1_value":"개추워","button2_id":"food_type/쌀쌀해","button2_value":"쌀쌀햬","button3_id":"food_type/안추워","button3_value":"안추워"},
            // {"question":"혹시 오싫모야?(오이 싫어해?)","button1_id":"food_type/오이 싫어","button1_value":"오이 싫어","button2_id":"food_type/오이 잘먹어","button2_value":"오이 잘먹어"},
            // {"question":"식사 시간이 어떻게 돼?","button1_id":"food_type/1시간 미만","button1_value":"1시간 미만","button2_id":"food_type/1시간 이상","button2_value":"1시간 이상"},
            // {"question":"밥먹고 디저트도 먹을거야?(커피 포함)","button1_id":"food_type/먹을거야!","button1_value":"먹을거야!","button2_id":"food_type/아니 됐어","button2_value":"아니 됐어","button3_id":"food_type/모르겠어","button3_value":"모르겠어"}
          ],
        };
        const type_data = food_type.qnas;
        const type_leng = type_data.length;
        const type_rand = Math.floor(type_leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', type_data[type_rand].question, [type_data[type_rand].button1_id, type_data[type_rand].button1_value], [type_data[type_rand].button2_id, type_data[type_rand].button2_value], ['food_type/all', '상관없음']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  before_decide(value, socket, user_data) {
    (async function () {
      try {
        const user_food_type = value.split('/')[1];
        await info_update.profile.update_food_type(socket.id, user_food_type);
        const foods = await info_update.food.get_restaurant(socket.id, user_data.subway, user_data.exit_quarter, user_data.with_mood, user_data.mood2, user_data.taste, user_food_type, 'x');
        if (foods.length === 2) {
          await info_update.profile.update_rest2(user_data.kakao_id, foods[0].id, foods[1].id);
          index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!', ['decide_final', '고고'], ['get_started', '안할래']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 식당이 아직 없어... 다시 골라줘!', ['get_started', '돌아가기']);
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

        if (image.res1 === 'no image') {
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
        } else {
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
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
          const rand_select = Math.floor(user_select_value.length * Math.random());
          await info_update.profile.update_rest_final(socket.id, user_select_value[rand_select]);

          const food_val = await info_update.food.get_restaurant_info(socket.id, parseInt(user_select_value[rand_select]));
          index.sendSocketMessage(socket.id, 'chat message button', `챗봇의 선택 : ${food_val[0].res_name}`);
          final_value = user_select_value[rand_select];
        }

        const food_value = await info_update.food.get_restaurant_info(socket.id, final_value);
        await info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, final_value, food_value[0].res_name, food_value[0].subway);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;

        if (moment().format('HH') >= 10 && moment().format('HH') <= 15 && food_value[0].lunch_option === 1) {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!<br>(런치메뉴 있음)`
            + `<hr class="link-line"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>`, ['show_image', '사진 보기'], ['후기 보기', '후기 보기'],
          ['decide_final', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!`
            + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>`, ['show_image', '사진 보기'], ['후기 보기', '후기 보기'],
          ['decide_final', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
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
        index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!`
          + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>`, ['show_image', '사진 보기'], ['후기 보기', '후기 보기'],
        ['decide_final', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
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

        if (image.res1 === 'no image') {
          index.sendSocketMessage(socket.id, 'chat message button', `아직 ${food_value[0].subway} ${food_value[0].res_name}에 대한 사진이 없어요..ㅠㅠㅠ`, ['final_info_direct', '돌아가기'], ['get_started', '처음으로 돌아가기']);
        } else {
          image = image.res1;
          index.sendSocketMessage(socket.id, 'chat message image', '사진만 봐도 가고싶지 않나요~~~?', ['final_info_direct', '돌아가기'], ['get_started', '처음으로 돌아가기'], image[0], image.length, image.splice(1));
          return;
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = Decide_menu;
