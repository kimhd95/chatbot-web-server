

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
    } else if (key.includes('drink_type/')) {
      key = 'drink_round';
    } else if (key.includes('drink_round_3/')) {
      key = 'drink_round_3';
    } else if (key.includes('mood2/') || key.includes('taste/')) {
      key = 'fake_qna';
    } else if (key.includes('final/')) {
      key = 'final';
    }

    this.strategies = {
      'decide_drink': this.decide_drink,
      'exitnum': this.exitnum,
      'drink_type': this.drink_type,
      'no_drink_type': this.no_drink_type,
      'drink_round': this.drink_round,
      'drink_round_3': this.drink_round_3,
      'drink_food': this.drink_food,
      'fake_qna': this.fake_qna,
      'decide_final': this.decide_final,
      'final': this.final,
      'final_info_direct': this.final_info_direct,
      'show_image': this.show_image,
      'decide_final_again': this.decide_final_again,
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
          await info_update.profile.update_state(socket.id, '6', 'decide_drink');
          await info_update.profile.update_drink_start(socket.id);
          index.sendSocketMessage(socket.id, 'chat message button', `오늘은 어디 술집으로 가볼까? 약속장소에서 가까운 지하철역을 입력해줘🚋`);
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
          const chlist = [`${subway} 몇 번 출구쪽이 좋아??`,`${subway}에서 더 편한 출구가 있다면 골라줘!`,`${subway} 몇 번 출구쪽이 편해?`,`${subway} 몇 번 출구쪽이 좋아? 모르면 "상관없음"을 선택하면돼!`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          await info_update.profile.update_subway(socket.id, subway);
          switch (subway) {
            case '강남역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/강남역.png', ['999', '상관없어'], ['4', '1,2,3,4번'], ['3', '5,6,7,8번'], ['2', '9,10번'], ['1', '11,12번'], ['exit/', '선택완료']);
              break;
            }
            case '서울대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/서울대입구역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6번'], ['1', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '성수역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/성수역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
              break;
            }
            case '신사역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/신사역.png', ['999', '상관없어'], ['4', '1,2,3번'], ['3', '4번'], ['2', '5번'], ['1', '6,7,8(가로수길)번'], ['exit/', '선택완료']);
              break;
            }
            case '신촌역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/신촌역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '서면역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/서면역.png', ['999', '상관없어'], ['3', '1,3,5,7번'], ['4', '2,4,6번'], ['1', '8,10,12번'], ['2', '9,11,13,15번'], ['exit/', '선택완료']);
              break;
            }
            case '센텀시티역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/센텀시티역.png', ['999', '상관없어'], ['4', '1,3,5번'], ['1', '2,4,6,8번'], ['3', '7,9,11,13번'], ['2', '10,12번'], ['exit/', '선택완료']);
              break;
            }
            case '건대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/건대입구역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['3', '5,6번'], ['4', '롯데백화점 스타시티 방면'], ['exit/', '선택완료']);
              break;
            }
            case '광화문역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/광화문역.png', ['999', '상관없어'], ['2', '1,7,8번'], ['1', '2,3,4,9번'], ['4', '5번'], ['3', '6번'], ['exit/', '선택완료']);
              break;
            }
            case '뚝섬역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/뚝섬역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '망원역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/망원역.png', ['999', '상관없어'], ['1', '1번'], ['2', '2번 (망리단길 방면)'], ['exit/', '선택완료']);
              break;
            }
            case '사당역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/사당역.png', ['999', '상관없어'], ['4', '1,2,3번'], ['3', '4,5,6번'], ['2', '7,8,9,10번'], ['1', '11,12,13,14번'], ['exit/', '선택완료']);
              break;
            }
            case '선릉역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/선릉역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6,7번'], ['1', '8.9.10번'], ['exit/', '선택완료']);
              break;
            }
            case '선정릉역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/선정릉역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
              break;
            }
            case '여의도역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/여의도역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번 (IFC몰 방면)'], ['4', '5번'], ['3', '6번'], ['exit/', '선택완료']);
              break;
            }
            case '역삼역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/역삼역.png', ['999', '상관없어'], ['4', '1번'], ['3', '2,3번'], ['2', '4,5,6번'], ['1', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '왕십리역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/왕십리역.png', ['999', '상관없어'], ['2', '1,2,3,4,5번 (성동구청 방면)'], ['1', '6,13번 (한양대 방면)'], ['3', '6-1,7,8,9,10,11,12번'], ['exit/', '선택완료']);
              break;
            }
            case '을지로입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/을지로입구역.png', ['999', '상관없어'], ['2', '1,1-1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '이태원역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/이태원역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
              break;
            }
            case '종각역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/종각역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,3-1번'], ['4', '4번'], ['3', '5,6번'], ['exit/', '선택완료']);
              break;
            }
            case '합정역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/합정역.png', ['999', '상관없어'], ['2', '1,2,9,10번'], ['1', '3,4,5,6번'], ['4', '7번'], ['3', '8번'], ['exit/', '선택완료']);
              break;
            }
            case '혜화역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/혜화역.png', ['999', '상관없어'], ['1', '1번'], ['4', '2번'], ['3', '3번'], ['2', '4번'], ['exit/', '선택완료']);
              break;
            }
            case '홍대입구역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/홍대입구역.png', ['999', '상관없어'], ['1', '1,2,3번 (연남동 방면)'], ['2', '4,5,6번(연남동 방면)'], ['3', '7,8,9번'], ['exit/', '선택완료']);
              break;
            }
            default:
              index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[${subways}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_drink', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
              break;
          }
        } else {
          // await info_update.profile.update_state(socket.id, '1', 'decide_menu');
          index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[${subways}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_drink', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
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
        const chlist = [`땡기는 주종은 뭐야!! 말만해!!!`,`술 종류를 모두~~ 선택해줘🍻`,`오늘은 어떤 술이 땡겨?🍾`,`자 오늘의 주종을 선택해 봅시다!`,`어떤 술이 좋아?? 질문이 너무 어렵나..?💀`,`마시고 싶은 술 종류를 모두~~ 골라봐~~~👻`];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        let drink_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
        index.sendSocketMessage(socket.id, 'chat message button dynamic checkbox', chlist[rand], ['상관없음', '상관없음'], drink_type, ['drink_type/', '선택완료']);
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

  drink_round(value, socket, user_data) {
    (async function () {
      try {
        const user_drink_type = value.split('/')[1];
        await info_update.profile.update_drink_type(socket.id, user_drink_type);
        const qna_list = [
          {
            'question': '오늘 주량 (소주로 치면) 소최몇 예상?(소주 최대 몇병)🍾', 'button1_id': 'decide_final', 'button1_value': '1병 미만', 'button2_id': 'decide_final', 'button2_value': '2병', 'button3_id': 'decide_final', 'button3_value': '3병 이상',
          },
          {
            'question': '같이 먹는사람 혹시 술버릇 심해?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '아니/몰라/혼술이야',
          },
          {
            'question': '오늘 술이 달 것 같아? 쓸 것 같아?', 'button1_id': 'decide_final', 'button1_value': '달거같아♡', 'button2_id': 'decide_final', 'button2_value': '쓸거같아...',
          },
          {
            'question': '같이 먹는사람과의 친밀도는?', 'button1_id': 'decide_final', 'button1_value': '친하지', 'button2_id': 'decide_final', 'button2_value': '사실 별로 안친해/혼술',
          },
          {
            'question': '오늘의 스트레스 지수는?', 'button1_id': 'decide_final', 'button1_value': '기부니가 좋다!!', 'button2_id': 'decide_final', 'button2_value': '스트레스 만땅 ㅠㅠ',
          },
          {
            'question': '오늘의 피곤 지수는?', 'button1_id': 'decide_final', 'button1_value': '컨디션 최고!', 'button2_id': 'decide_final', 'button2_value': '피곤해 피곤해..',
          },
          {
            'question': '어제 잠 몇시간 잤어?', 'button1_id': 'decide_final', 'button1_value': '7시간 이상', 'button2_id': 'decide_final', 'button2_value': '7시간 미만',
          },
          {
            'question': '통금시간 있어?🕛🕒', 'button1_id': 'decide_final', 'button1_value': '통금 있어 ㅠㅠ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
          },
          {
            'question': '같이 먹는사람 몇 명이야?(너포함)', 'button1_id': 'decide_final', 'button1_value': '2명/혼술', 'button2_id': 'decide_final', 'button2_value': '3~5명','button3_id': 'decide_final', 'button3_value': '6명 이상',
          },
          {
            'question': '오늘 컨디션 어때?', 'button1_id': 'decide_final', 'button1_value': '컨디션 최고!', 'button2_id': 'decide_final', 'button2_value': '피곤해 피곤해..',
          },
          {
            'question': '술버릇이 있는 편이야?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
          },
          {
            'question': '술을 권하는 자리야?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
          },
        ];
        const qna_list_leng = qna_list.length;
        const qna_list_rand = Math.floor(qna_list_leng * Math.random());
        if (user_drink_type === '사케') {
          const chlist = [`요새 이자카야같은 사케 파는집이 늘고 있는것 같아!`,`사케 혼모노는 사케만 마신다는데...`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          if (qna_list_rand === 0 || qna_list_rand === 8) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
          }
        } else if (user_drink_type === '전통주') {
          const chlist = [`ㅇㅇ우리 것이 좋은 것이여👍 `,`막걸리~ 동동주~ 복분자주~ 🍵🍵`,`막걸리 진짜 맛있는데 숙취가... (그런데 막걸리가 제일 숙취가 깔끔하다는 인간도 봤음)`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          if (qna_list_rand === 0 || qna_list_rand === 8) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
          }
        } else if (user_drink_type === '와인') {
          const chlist = [`"와인은 신이 인간에게 준 최고의 선물이다"라고 플라톤 선생이 말씀하셨대🍷`,`이름은 몰라도 비쌀수록 맛있다는 와인!! 사실은 2~3만원대인데 엄청 높은 평점의 와인도 꽤 많다고 해🍷`,`와인은 노화방지에 좋다고 하니까 죄책감 없이 쭈욱 마셔 ㅎㅎ(악마의속삭임)`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          if (qna_list_rand === 0 || qna_list_rand === 8) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
          }
        } else if (user_drink_type === '양주') {
          const chlist = [`혹시 실례가 안 된다면 샷 하나만...🍸`,`양주는 숙취가 많이 없대니까 쭈욱 마셔(악마의속삭임)`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          if (qna_list_rand === 0 || qna_list_rand === 8) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
          }
        } else if (user_drink_type.includes('소주') || user_drink_type.includes('맥주')) {
          const qna_list = [
            {
              'question': '지금 공복이야?', 'button1_id': 'drink_food', 'button1_value': '응 배고파', 'button2_id': 'drink_round_3/2', 'button2_value': '아니 밥먹고 왔지',
            },
            {
              'question': '지금 몇차야??', 'button1_id': 'drink_food', 'button1_value': '1차', 'button2_id': 'drink_round_3/2', 'button2_value': '2차', 'button3_id': 'drink_round_3/3', 'button3_value': '3차',
            },
            {
              'question': '혹시 배고파?', 'button1_id': 'drink_food', 'button1_value': '응 배고파', 'button2_id': 'drink_round_3/2', 'button2_value': '아니 배불러',
            },
            {
              'question': '빈속에서 술약속 시작이야??🍚', 'button1_id': 'drink_food', 'button1_value': '응 빈속이야', 'button2_id': 'drink_round_3/2', 'button2_value': '아니 밥은 먹었어!',
            },
          ];
          const qna_list_leng = qna_list.length;
          const qna_list_rand = Math.floor(qna_list_leng * Math.random());
          if (qna_list_rand === 1) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
          }
        } else {
          const qna_list = [
            {
              'question': '먹는거 SNS에 올리는거 좋아해?', 'button1_id': 'mood2/인스타', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/all', 'button2_value': 'ㄴㄴ',
            },
            {
              'question': 'SNS에 공유할만한 분위기로 추천해줘?', 'button1_id': 'mood2/인스타', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/all', 'button2_value': '굳이 그럴필요 없어ㅎㅎ',
            },
            {
              'question': '혹시 고급진 술집을 찾고 있니?', 'button1_id': 'mood2/고급진', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/-고급진', 'button2_value': '아니',
            },
            {
              'question': '시끌벅적한 분위기도 괜찮아? ', 'button1_id': 'mood2/향토적인', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/-향토적인', 'button2_value': '아니',
            },
          ];
          const qna_list_leng = qna_list.length;
          const qna_list_rand = Math.floor(qna_list_leng * Math.random());
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  drink_food(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_drink_round(socket.id, '2 -3');
        const qna_list = [
          {
            'question': '안주로 기름진 음식 어때?', 'button1_id': 'taste/기름진', 'button1_value': '좋아', 'button2_id': 'taste/-기름진', 'button2_value': '별로',
          },
          {
            'question': '기름진 안주는 어때?', 'button1_id': 'taste/기름진', 'button1_value': '좋아', 'button2_id': 'taste/-기름진', 'button2_value': '별로',
          },
          {
            'question': '치즈 들어간 안주 어때?', 'button1_id': 'taste/치즈', 'button1_value': '좋아', 'button2_id': 'taste/-치즈', 'button2_value': '별로',
          },
          {
            'question': '치즈 들어간 안주 좋아해?', 'button1_id': 'taste/치즈', 'button1_value': '좋아', 'button2_id': 'taste/-치즈', 'button2_value': '별로',
          },
          {
            'question': '안주로 매운음식은 어때?', 'button1_id': 'taste/매운', 'button1_value': '좋아', 'button2_id': 'taste/-매운', 'button2_value': '별로',
          },
          {
            'question': '매운음식 좋아해?', 'button1_id': 'taste/매운', 'button1_value': '좋아', 'button2_id': 'taste/-매운', 'button2_value': '별로',
          },
          {
            'question': '안주는 짭짤하거나 자극적인 맛 괜찮??', 'button1_id': 'taste/기름진', 'button1_value': '좋아', 'button2_id': 'taste/-기름진', 'button2_value': '별로',
          },
          {
            'question': '막 살찔것 같은... 안주도 괜찮아?ㅎㅎ', 'button1_id': 'taste/기름진', 'button1_value': '좋아', 'button2_id': 'taste/-기름진', 'button2_value': '별로',
          },
          {
            'question': '오늘 날씨가 추워?', 'button1_id': 'taste/기름진', 'button1_value': '추워', 'button2_id': 'taste/-기름진', 'button2_value': '안 추워',
          },
          {
            'question': '오늘 따뜻한 국물이 땡겨?', 'button1_id': 'taste/기름진', 'button1_value': '땡겨', 'button2_id': 'taste/-기름진', 'button2_value': '안 땡겨',
          },
        ];
        const qna_list_leng = qna_list.length;
        const qna_list_rand = Math.floor(qna_list_leng * Math.random());
        const user_drink_round = value.split('/')[1];
        index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  drink_round_3(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_drink_round(socket.id, '3');
        const qna_list = [
          {
            'question': '먹는거 SNS에 올리는거 좋아해?', 'button1_id': 'mood2/인스타', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/all', 'button2_value': 'ㄴㄴ',
          },
          {
            'question': 'SNS에 공유할만한 분위기로 추천해줘?', 'button1_id': 'mood2/인스타', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/all', 'button2_value': '굳이 그럴필요 없어ㅎㅎ',
          },
          {
            'question': '혹시 고급진 술집을 찾고 있니?', 'button1_id': 'mood2/고급진', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/-고급진', 'button2_value': '아니',
          },
          {
            'question': '시끌벅적한 분위기도 괜찮아? ', 'button1_id': 'mood2/향토적인', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/-향토적인', 'button2_value': '아니',
          },
        ];
        const qna_list_leng = qna_list.length;
        const qna_list_rand = Math.floor(qna_list_leng * Math.random());
        const user_drink_round = value.split('/')[1];
        if (user_drink_round === '2') {
          const chlist = [`간다간다~ 오늘 3차까지 간다~~`,`그럼 밥은 해결된거고... 술 위주로 추천해줄게!`,`밥메뉴 고를때도 외식코기! 술메뉴도 외식코기! 언제나 외식코기 포에버 외식코기!!! 🐕🐕🐕`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
        } else {
          const chlist = [`옹... 그 정신에 이 앱을 켰다고...? 대단한데ㅋㅋㅋㅋ`,`대단.... 대단쓰....`,`역시 한국인!!! 자랑스럽다 !!!`,`너...나의 수울메이트가 되지 않을래..?🥂`,`귀소본능 발휘해서 집 안전하게 들어가야돼...ㄷㄷㄷ`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  fake_qna(value, socket, user_data) {
    (async function () {
      try {
        const user_input_value = value.split('/')[1];
        if (value.includes('taste')) {
          await info_update.profile.update_taste(socket.id, user_input_value);
        } else if (value.includes('mood2')) {
          await info_update.profile.update_mood2(socket.id, user_input_value);
        }
        const qna_list = [
          {
            'question': '오늘 주량 (소주로 치면) 소최몇 예상?(소주 최대 몇병)🍾', 'button1_id': 'decide_final', 'button1_value': '1병 미만', 'button2_id': 'decide_final', 'button2_value': '2병', 'button3_id': 'decide_final', 'button3_value': '3병 이상',
          },
          {
            'question': '같이 먹는사람 혹시 술버릇 심해?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '아니/몰라/혼술이야',
          },
          {
            'question': '오늘 술이 달 것 같아? 쓸 것 같아?', 'button1_id': 'decide_final', 'button1_value': '달거같아♡', 'button2_id': 'decide_final', 'button2_value': '쓸거같아...',
          },
          {
            'question': '같이 먹는사람과의 친밀도는?', 'button1_id': 'decide_final', 'button1_value': '친하지', 'button2_id': 'decide_final', 'button2_value': '사실 별로 안친해/혼술',
          },
          {
            'question': '오늘의 스트레스 지수는?', 'button1_id': 'decide_final', 'button1_value': '기부니가 좋다!!', 'button2_id': 'decide_final', 'button2_value': '스트레스 만땅 ㅠㅠ',
          },
          {
            'question': '오늘의 피곤 지수는?', 'button1_id': 'decide_final', 'button1_value': '컨디션 최고!', 'button2_id': 'decide_final', 'button2_value': '피곤해 피곤해..',
          },
          {
            'question': '어제 잠 몇시간 잤어?', 'button1_id': 'decide_final', 'button1_value': '7시간 이상', 'button2_id': 'decide_final', 'button2_value': '7시간 미만',
          },
          {
            'question': '통금시간 있어?🕛🕒', 'button1_id': 'decide_final', 'button1_value': '통금 있어 ㅠㅠ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
          },
          {
            'question': '같이 먹는사람 몇 명이야?(너포함)', 'button1_id': 'decide_final', 'button1_value': '2명/혼술', 'button2_id': 'decide_final', 'button2_value': '3~5명','button2_id': 'decide_final', 'button2_value': '6명 이상',
          },
          {
            'question': '오늘 컨디션 어때?', 'button1_id': 'decide_final', 'button1_value': '컨디션 최고!', 'button2_id': 'decide_final', 'button2_value': '피곤해 피곤해..',
          },
          {
            'question': '술버릇이 있는 편이야?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
          },
          {
            'question': '술을 권하는 자리야?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
          },
        ];
        const qna_list_leng = qna_list.length;
        const qna_list_rand = Math.floor(qna_list_leng * Math.random());
        if (qna_list_rand === 0 || qna_list_rand === 8) {
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
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
        const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 오예 술먹는다술먹는다~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        const drink_rest_result = await info_update.drink.get_drink_restaurant(socket.id, user_data.subway, user_data.exit_quarter, user_data.mood2, user_data.taste, user_data.drink_round, user_data.drink_type);
        const rest_info = drink_rest_result.message;
        if (rest_info.length === 2) {
          await info_update.profile.update_rest2(user_data.kakao_id, rest_info[0].id, rest_info[1].id);
          const foods = await info_update.food.get_two_restaurant(socket.id, rest_info[0].id, rest_info[1].id);
          const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
          const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
          const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
          const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;

          const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].subway.slice(0, -1)} ${foods[0].res_name}`, `${foods[1].subway.slice(0, -1)} ${foods[1].res_name}`);

          if (drink_rest_result.try === 1) {
            await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
            await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
            if (image.res1 === 'no image') {
              await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
            } else {
              await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
            }
          } else if (drink_rest_result.try === 2) {
            await index.sendSocketMessage(socket.id, 'chat message button', `조건에 딱 맞는 식당이 ${user_data.subway} 선택한 출구에는 없네... 다른 출구에서 두 곳 보여줄게!`);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
            if (image.res1 === 'no image') {
              await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
            } else {
              await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
            }
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

  final(value, socket, user_data) {
    (async function () {
      try {
        if (user_data.drink_before === false) {
          await info_update.profile.update_drink_before(socket.id, 1);
        }
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

        index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!`
          + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>`, ['show_image', '사진 보기'],
        ['decide_final_again', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
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
          + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>`, ['show_image', '사진 보기'],
        ['decide_final_again', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
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

  decide_final_again(value, socket, user_data) {
    (async function () {
      try {
        const foods = await info_update.food.get_two_restaurant(socket.id, user_data.rest1, user_data.rest2);
        const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
        const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
        const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
        const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;
        const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].subway.slice(0, -1)} ${foods[0].res_name}`, `${foods[1].subway.slice(0, -1)} ${foods[1].res_name}`);

        await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
        await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
        if (image.res1 === 'no image') {
          await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
        } else {
          await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
        }

      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }


}

module.exports = Decide_drink;
