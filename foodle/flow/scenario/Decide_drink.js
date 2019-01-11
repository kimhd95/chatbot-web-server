

const moment = require('moment');
const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();

class Decide_drink {
  constructor(value, socket, user_data) {
    let key;
    key = value;
    if (key === 'decide_drink') {
      key = 'decide_drink';
    } else if (user_data.state === 'decide_drink') {
      key = 'exitnum';
    } else if (key.includes('exit/')) {
      key = 'drink_type';
    }

    this.strategies = {
      'decide_drink': this.decide_drink,
      'exitnum': this.exitnum,
      'drink_type': this.drink_type,
      'no_drink_type': this.no_drink_type,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '6', key);
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

  decide_drink(value, socket, user_data) {
    (async function () {
      try {
        const verify_limit = await info_update.profile.verify_limit(socket.id, user_data.limit_cnt, user_data.decide_updated_at);
        const { result } = verify_limit;
        if (result === 'success') {
          const chlist = ['어디에서?', '어디에서 마셔?', '술 마실 장소를 말해줘', '술 어디에서 마셔?',
            '어디에서 만나?', '어디에서 마시게?', '어디서 술 마시는데?ㅎㅎ',
            '술 어디에서 마시는데?(하하)'];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}<br>ex) 강남역,신촌역`);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', '30분에 술집을 5번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
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

  drink_type(value, socket, user_data) {
    (async function () {
      try {
        let user_quarter = value.split('/')[1];
        if (value.includes('exit')) {
          await info_update.profile.update_exit_quarter(socket.id, user_quarter);
        }
        if (user_quarter === '999') {
          user_quarter = '1,2,3,4';
        }
        let drink_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
        index.sendSocketMessage(socket.id, 'chat message button dynamic checkbox', '술 종류를 선택해줘!', ['상관없음', '상관없음'], drink_type, ['drink_type/', '선택완료']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  no_drink_type(value, socket, user_data) {
    (async function () {
      try {
        index.sendSocketMessage(socket.id, 'chat message button', '술 종류를 적어도 하나는 선택해줘!');
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }


}

module.exports = Decide_drink;
