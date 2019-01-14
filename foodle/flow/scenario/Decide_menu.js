

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
    } else if (key === 'decide_subway') {
      key = 'decide_subway';
    } else if (user_data.state === 'decide_menu') {
      key = 'exitnum';
    } else if (user_data.state === 'decide_subway') {
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
      'decide_subway': this.decide_subway,
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
      'drink': this.drink,
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
        const user_info = await info_update.profile.load_user(socket.id);
        const verify_limit = await info_update.profile.verify_limit(socket.id, user_data.limit_cnt, user_data.decide_updated_at);
        const { result } = verify_limit;
        if (result === 'success') {
          if (user_info.freq_subway !== null) {
            const revisit = user_info.freq_subway;
            const freq_list = [`안녕 코기 와쪄~!🐕 이번에도 ${revisit}에서 메뉴를 정하면 될까?`, `잘 지냈나. 이번에도 ${revisit} 맞나?`, `ㅎㅇㅎㅇ 이번에도 ${revisit} 고고?`, `배고프다 배고파! 이번에도 ${revisit}에서 밥 먹을거야?`,
               `2시간이나 굶었더니 당 떨어진다...👻 이번에도 ${revisit}에서 먹는거 맞지?`, `어서와!! 메뉴 정하러 가자👽 오늘도 ${revisit}?`, `우리나라는 정말 미식의 나라인듯! 맛있는게 너무 많아. 오늘도 ${revisit}에서 골라볼까?`,
             `배고파!!! ${revisit}에서 정하는거 맞아맞아?`, `메뉴 정하는 데 5분이 넘게 걸린다면 그건 비효율적인 삶이야... 오늘도 ${revisit}에서 메뉴 정해볼까?`, `결정장애는 부끄러운 게 아니고 충분히 치유 가능해!!! 내가 있다면😘 이번에도 ${revisit}에서 먹을 곳 찾는거야?`]
            const freq_leng = freq_list.length;
            const freq_rand = Math.floor(freq_leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button', freq_list[freq_rand], [`${revisit}`, '응 맞아!'], ['decide_subway', '다른 곳이야!']);
          } else {
            const chlist = ['안녕!! 배고플땐 언제나 코기를 찾아줘😏😆 오늘은 어디 근처의 메뉴를 정해줄까?', '안녕 배고프지? 얼렁 메뉴를 정해볼까... 밥 어디에서 먹을거야?🍚', '배고프지? 오늘도 스겜하자ㅋㅋㅋ⚡ 밥 어디에서 먹어?', '코기 와쪄😝🐶 어느 역 근처 메뉴를 정해줄까?',
              '식사시간엔 결국 나를 찾게 되어있지...ㅎㅎ 밥 어디에서 먹어?', '뿅🐕🐕 나왔다!! 이번에는 어느 역 근처의 메뉴를 정해볼까?', '솔직히 나만큼 세상을 평화롭게 하는 강아지는 없을거야. 오늘 메뉴는 어디에서 정할까?',
              '이왕 먹는 밥 스트레스 안받고 깔끔하게 정해보자! 오늘 메뉴는 어디 근처에서 정해볼까?'];
            const leng = chlist.length;
            const rand = Math.floor(leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}<br>ex) 강남역,신촌역`);
          }
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', '한 끼당 메뉴를 3번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_subway(value, socket, user_data) {
    (async function () {
      try {
        const chlist = ['안녕!! 배고플땐 언제나 코기를 찾아줘😏😆 오늘은 어디 근처의 메뉴를 정해줄까?', '안녕 배고프지? 얼렁 메뉴를 정해볼까... 밥 어디에서 먹을거야?🍚', '배고프지? 오늘도 스겜하자ㅋㅋㅋ⚡ 밥 어디에서 먹어?', '코기 와쪄😝🐶 어느 역 근처 메뉴를 정해줄까?',
          '식사시간엔 결국 나를 찾게 되어있지...ㅎㅎ 밥 어디에서 먹어?', '뿅🐕🐕 나왔다!! 이번에는 어느 역 근처의 메뉴를 정해볼까?', '솔직히 나만큼 세상을 평화롭게 하는 강아지는 없을거야. 오늘 메뉴는 어디에서 정할까?',
          '이왕 먹는 밥 스트레스 안받고 깔끔하게 정해보자! 오늘 메뉴는 어디 근처에서 정해볼까?'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}<br>ex) 강남역,신촌역`);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
      }
    }());
  }

  exitnum(value, socket, user_data) {
    (async function () {
      try {
        console.log(`exitnum의 value, subway = ${value}`);
        let subway = value;
        if (value.slice(-1) !== '역') {
          subway = `${value}역`;
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
          const exit_list = [`${subway} 몇 번 출구쪽이 좋아??`, `${subway}에서 더 편한 출구가 있다면 골라줘!`, `${subway} 몇 번 출구쪽이 편해?`, `${subway} 몇 번 출구쪽이 좋아? 모르면 "상관없음" 버튼을 눌러주면 돼!`]
          const exit_leng = exit_list.length;
          const exit_rand = Math.floor(exit_leng * Math.random());
          switch (subway) {
            case '강남역': {
<<<<<<< HEAD
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
=======
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/강남역.png', ['4', '1,2,3,4번'], ['3', '5,6,7,8번'], ['2', '9,10번'], ['1', '11,12번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '서울대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/서울대입구역.png', ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6번'], ['1', '7,8번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '성수역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/성수역.png', ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '신사역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/신사역.png', ['4', '1,2,3번'], ['3', '4번'], ['2', '5번'], ['1', '6,7,8(가로수길)번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '신촌역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/신촌역.png', ['2', '1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '서면역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/서면역.png', ['3', '1,3,5,7번'], ['4', '2,4,6번'], ['1', '8,10,12번'], ['2', '9,11,13,15번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '센텀시티역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/센텀시티역.png', ['4', '1,3,5번'], ['1', '2,4,6,8번'], ['3', '7,9,11,13번'], ['2', '10,12번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '건대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/건대입구역.png', ['2', '1,2번'], ['1', '3,4번'], ['3', '5,6번'], ['4', '롯데백화점 스타시티 방면'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '광화문역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/광화문역.png', ['2', '1,7,8번'], ['1', '2,3,4,9번'], ['4', '5번'], ['3', '6번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '뚝섬역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/뚝섬역.png', ['2', '1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '망원역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/망원역.png', ['1', '1번'], ['2', '2번 (망리단길 방면)'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '사당역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/사당역.png', ['4', '1,2,3번'], ['3', '4,5,6번'], ['2', '7,8,9,10번'], ['1', '11,12,13,14번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '선릉역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/선릉역.png', ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6,7번'], ['1', '8.9.10번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '선정릉역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/선정릉역.png', ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '여의도역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/여의도역.png', ['2', '1,2번'], ['1', '3,4번 (IFC몰 방면)'], ['4', '5번'], ['3', '6번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '역삼역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/역삼역.png', ['4', '1번'], ['3', '2,3번'], ['2', '4,5,6번'], ['1', '7,8번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '왕십리역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/왕십리역.png', ['2', '1,2,3,4,5번 (성동구청 방면)'], ['1', '6,13번 (한양대 방면)'], ['3', '6-1,7,8,9,10,11,12번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '을지로입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/을지로입구역.png', ['2', '1,1-1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '이태원역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/이태원역.png', ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '종각역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/종각역.png', ['2', '1,2번'], ['1', '3,3-1번'], ['4', '4번'], ['3', '5,6번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '합정역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/합정역.png', ['2', '1,2,9,10번'], ['1', '3,4,5,6번'], ['4', '7번'], ['3', '8번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '혜화역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/혜화역.png', ['1', '1번'], ['4', '2번'], ['3', '3번'], ['2', '4번'], ['999', '상관없어'], ['exit/', '선택완료']);
              break;
            }
            case '홍대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', exit_list[exit_rand], `${subway}`, 'images/홍대입구역.png', ['1', '1,2,3번 (연남동 방면)'], ['2', '4,5,6번(연남동 방면)'], ['3', '7,8,9번'], ['999', '상관없어'], ['exit/', '선택완료']);
>>>>>>> hyojin
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
        await info_update.profile.update_with_mood(socket.id, '약속');
<<<<<<< HEAD
        index.sendSocketMessage(socket.id, 'chat message button checkbox', '원하는 식당 분위기가 있어?', ['상관없음', '상관없음'], ['향토적인', '향토적인'], ['고급진', '고급진'], ['프랜차이즈', '프랜차이즈'], ['인스타', '#인스타감성'], ['이국적', '이국적/퓨전'], ['뷔페', '뷔페/무한리필'], ['mood2/', '선택완료']);
=======
        const mood2_list = ['혹시 원하는 식당 분위기가 있어?', '어떤 분위기의 식당을 골라줄까?', '특별히 원하는 식당 분위기가 있어?', '어떤 분위기의 약속 장소를 잡아줄까?', '혹시 원하는 식당 분위기가 있으면 골라줘!']
        const mood2_leng = mood2_list.length;
        const mood2_rand = Math.floor(mood2_leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button checkbox', mood2_list[mood2_rand], ['향토적인', '향토적인'], ['고급진', '고급진'], ['프랜차이즈', '프랜차이즈'], ['인스타', '#인스타감성'], ['이국적', '이국적/퓨전'], ['뷔페', '뷔페/무한리필'], ['mood2/', '선택완료']);
>>>>>>> hyojin
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
              "question":"혹시 오싫모야?(오이 싫어해?)","button1_id":"food_type/오이 싫어","button1_value":"오이 싫어","button2_id":"food_type/오이 잘먹어","button2_value":"오이 잘먹어"
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
        const foods_info = foods.message;
        if (foods_info.length === 2) {
          await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
          if (foods.try === 1) {
            index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!', ['decide_final', '고고'], ['get_started', '안할래']);
          } else if (foods.try === 2) {
            index.sendSocketMessage(socket.id, 'chat message button', `조건에 만족하는 곳이 없어! ${user_data.subway} 전체에서 2곳을 골라줄테니까 한 번 골라봐!`, ['decide_final', '고고'], ['get_started', '안할래']);
          }
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
          await index.sendSocketMessage(socket.id, 'chat message button', '기달려방ㅎㅎ 지금 알아보는 중이야');
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
        } else {
          await index.sendSocketMessage(socket.id, 'chat message button', '기달려방ㅎㅎ 지금 알아보는 중이야');
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
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
