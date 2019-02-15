

const moment = require('moment');
const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();

class Decide_cafe {
  constructor(value, socket, user_data) {
    let key;
    key = value;
    if (key === 'decide_cafe') {
      key = 'decide_cafe';
    } else if (user_data.state === 'decide_cafe') {
      key = 'exitnum';
    } else if (key.includes('exit/')) {
      key = 'cafe_type';
    } else if (key.includes('cafe_type/')) {
      key = key.split('/')[1];
    } else if(key.includes('scenario4_2/')){
      key = 'scenario4_2';
    } else if(key.includes('fake/')){
      key = 'fake';
    } else if(key.includes('scenario10_4/')){
      key = 'scenario10_4';
    } else if(key.includes('scenario5_2/')){
      key = 'scenario5_2';
    } else if(key.includes('scenario5_3/')){
      key = 'scenario5_3';
    } else if(key.includes('scenario10_5/')){
      key = 'scenario10_5';
    } else if(key.includes('scenario10_7/')){
      key = 'scenario10_7';
    } else if(key.includes('scenario10_8/')){
      key = 'scenario10_8';
    } else if(key.includes('final/')){
      key = 'final';
    }

    this.strategies = {
      'decide_cafe': this.decide_cafe,
      'exitnum': this.exitnum,
      'cafe_type': this.cafe_type,

      'quality': this.quality,
      'scenario4_2': this.scenario4_2,
      'fake': this.fake,
      'scenario10_4': this.scenario10_4,
      'scenario10_6': this.scenario10_6,

      'comfort': this.comfort,
      'scenario5_2': this.scenario5_2,
      'scenario5_3': this.scenario5_3,
      'scenario10_5': this.scenario10_5,

      'meeting': this.meeting,

      'meal': this.meal,
      'scenario10_7': this.scenario10_7,

      'experience': this.experience,
      'scenario10_8': this.scenario10_8,

      'final': this.final,
      'final_info_direct': this.final_info_direct,
      'show_image': this.show_image,
      'decide_final_again': this.decide_final_again,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '7', key);
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

  decide_cafe(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_cafe_start(socket.id);
        index.sendSocketMessage(socket.id, 'chat message button', '오늘은 어디 카페로 가볼까? 원하는 지하철역을 입력해줘🚋');
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
          if(subway === user_data.subway_cafe) {
            await info_update.profile.update_freq_subway_cafe(socket.id, subway);
          } else {
            await info_update.profile.update_freq_subway_cafe(socket.id, 'null');
          }
          await info_update.profile.update_subway_cafe(socket.id, subway);
          const chlist = [`${subway} 몇 번 출구쪽이 좋아??`, `${subway}에서 더 편한 출구가 있다면 골라줘!`,`${subway} 몇 번 출구쪽이 편해?`,`${subway} 몇 번 출구쪽이 좋아? 모르면 "상관없음"을 선택하면돼!`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
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
              index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[${subways}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_cafe', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
              break;
          }
        } else {
          // await info_update.profile.update_state(socket.id, '1', 'decide_menu');
          index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[${subways}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_cafe', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
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

  cafe_type(value, socket, user_data) {
    (async function () {
      try {
        let user_quarter = value.split('/')[1];
        console.log(user_quarter);
        if (user_quarter === '999') {
          user_quarter = '1,2,3,4';
        }
        if (value.includes('exit')) {
          await info_update.profile.update_exit_quarter(socket.id, user_quarter);
        }
        const scenarioRand = Math.floor(Math.random() * 2) + 1;
        if(scenarioRand === 1) {
          const chlist = ['지금 고르는 카페에서 가장 우선순위는?', '지금 고르는 카페에서 뭐가 가장 중요해?', '방문할 카페에서 가장 중요하게 생각하는 점이 뭐야?', '오늘 고를 카페에서 가장 중요한 점은?', '이 중에 제일 우선순위가 뭐야?', '지금 고르는 카페에서 가장 중요한 점은?', '어떤 점이 잘 맞는 카페를 골라줄까?', '오늘 고르는 카페에서 "이건 절대 포기 못한다!"하는 것이 있다면?'];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
        //  let cafe_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
          index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['cafe_type/quality', '메뉴의 퀄리티'], ['cafe_type/comfort', '편하게 대화 가능한 곳'], ['cafe_type/meeting','독서와 과제, 비즈니스 미팅이 가능한'], ['cafe_type/meal','끼니 해결'], ['cafe_type/experience','이색 체험']);
          //index.sendSocketMessage(socket.id, 'chat message button dynamic checkbox', chlist[rand], ['상관없음', '상관없음'], drink_type, ['drink_type/', '선택완료']);
        }
        else {
          const chlist = ['카페 가서 뭐 할거야??? 하나만 고른다면!', '카페 방문의 주 목적이 뭐야?', '카페는~ 뭐하러~ 가는데~~?', '카페 가서 뭐하고 싶어?? 하나만 골라봐!', '카페에 가는 목적을 하나만 고른다면?ㅎㅎㅎ'];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
        //  let cafe_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
          index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['cafe_type/quality', '맛있는거 먹을거야'], ['cafe_type/comfort', '데이트/친구랑 편하게 얘기할거야'], ['cafe_type/meeting','독서/공부/업무상 미팅'], ['cafe_type/meal','끼니 해결'], ['cafe_type/experience','이색 체험']);
          //index.sendSocketMessage(socket.id, 'chat message button dynamic checkbox', chlist[rand], ['상관없음', '상관없음'], drink_type, ['drink_type/', '선택완료']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  quality(value, socket, user_data) {
    (async function () {
      try {
        //await info_update.profile.update_exit_quarter(socket.id, user_quarter);
        const chlist = ['역시 카페의 기본은 커피 맛, 디저트 맛이지!!', '인x타나 페x스북에 매일 뜨는 디저트 광고때문에 나는 살이 찐다', '맛있으면 0칼로리!!⚖', '쪼끄만 디저트가 칼로리는 엄청나지... 이게 바로 가성비 갑ㅎ', '맛있는거... 음 뭐가 있을까....', 'ㅎㅎ맛있는걸 추천해야 한다는 부담감이 쪼끔 드는데,,,!',
        '나도 맛있는거ㅠㅠㅠ 나 가방에 넣어가면 안 될까??', '우와ㅇㅏㅏㅏ 나두 나두 맛있는거 먹을래 ㅠㅠ'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
      //  let cafe_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
        await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
        await info_update.profile.update_state(socket.id, '7', 'quality');

        const qna_list = [
          {
            'question': '마실 거? 먹을거?', 'button1_id': 'scenario4_2/커피, 티', 'button1_value': '마실 거', 'button2_id': 'scenario4_2/디저트', 'button2_value': '먹을 거', 'button3_id': 'scenario4_2/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '마실 거 찾아줄까? 먹을 거 찾아줄까?', 'button1_id': 'scenario4_2/커피, 티', 'button1_value': '마실 거', 'button2_id': 'scenario4_2/디저트', 'button2_value': '먹을 거', 'button3_id': 'scenario4_2/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '후식은 마실 거? 아니면 먹을 거?', 'button1_id': 'scenario4_2/커피, 티', 'button1_value': '마실 거', 'button2_id': 'scenario4_2/디저트', 'button2_value': '먹을 거', 'button3_id': 'scenario4_2/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '단거 어때?', 'button1_id': 'fake/4_1/디저트', 'button1_value': '단거 좋아', 'button2_id': 'fake/4_1/커피, 티', 'button2_value': '단거 싫어', 'button3_id': 'fake/4_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '달달한 거 좋아해?', 'button1_id': 'fake/4_1/디저트', 'button1_value': '단거 좋아', 'button2_id': 'fake/4_1/커피, 티', 'button2_value': '단거 싫어', 'button3_id': 'fake/4_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '지금 단거 땡겨?', 'button1_id': 'fake/4_1/디저트', 'button1_value': '단거 좋아', 'button2_id': 'fake/4_1/커피, 티', 'button2_value': '단거 싫어', 'button3_id': 'fake/4_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '단거 좋아해?', 'button1_id': 'fake/4_1/디저트', 'button1_value': '단거 좋아', 'button2_id': 'fake/4_1/커피, 티', 'button2_value': '단거 싫어', 'button3_id': 'fake/4_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '커피 마실거야?', 'button1_id': 'scenario4_2/커피', 'button1_value': '무조건 커피', 'button2_id': 'scenario4_2/티, 디저트', 'button2_value': '커피 말고 다른거', 'button3_id': 'scenario4_2/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '커피 아니어도 괜찮아?', 'button1_id': 'scenario4_2/커피', 'button1_value': '무조건 커피', 'button2_id': 'scenario4_2/티, 디저트', 'button2_value': '커피 말고 다른거', 'button3_id': 'scenario4_2/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '카페 가면 커피 시키려구?', 'button1_id': 'scenario4_2/커피', 'button1_value': '무조건 커피', 'button2_id': 'scenario4_2/티, 디저트', 'button2_value': '커피 말고 다른거', 'button3_id': 'scenario4_2/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '혹시 지금 카페인이 필요한거야?ㅎㅎ', 'button1_id': 'scenario4_2/커피, 티', 'button1_value': '카페인 내놔', 'button2_id': 'scenario4_2/디저트', 'button2_value': '카페인 ㄴㄴ', 'button3_id': 'scenario4_2/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '커피나 카페인 음료를 찾고 있어?', 'button1_id': 'scenario4_2/커피, 티', 'button1_value': '카페인 내놔', 'button2_id': 'scenario4_2/디저트', 'button2_value': '카페인 ㄴㄴ', 'button3_id': 'scenario4_2/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '혹시 지금 배가 덜 찼어?', 'button1_id': 'fake/4_1/디저트', 'button1_value': '배고파...', 'button2_id': 'fake/4_1/디저트', 'button2_value': '좀 출출해', 'button3_id': 'fake/4_1/커피, 티', 'button3_value': '배불러!!', 'button4_id': 'fake/4_1/커피, 티, 디저트', 'button4_value': '상관없어',
          },
          {
            'question': '혹시 지금 배고파?', 'button1_id': 'fake/4_1/디저트', 'button1_value': '배고파...', 'button2_id': 'fake/4_1/디저트', 'button2_value': '좀 출출해', 'button3_id': 'fake/4_1/커피, 티', 'button3_value': '배불러!!', 'button4_id': 'fake/4_1/커피, 티, 디저트', 'button4_value': '상관없어',
          },
          {
            'question': '혹시 지금 출출해?', 'button1_id': 'fake/4_1/디저트', 'button1_value': '배고파...', 'button2_id': 'fake/4_1/디저트', 'button2_value': '좀 출출해', 'button3_id': 'fake/4_1/커피, 티', 'button3_value': '배불러!!', 'button4_id': 'fake/4_1/커피, 티, 디저트', 'button4_value': '상관없어',
          },
        ];
        const qna_list_leng = qna_list.length;
        const qna_list_rand = Math.floor(qna_list_leng * Math.random());
        if (qna_list_rand === 12 || qna_list_rand === 13 || qna_list_rand === 14) {
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button4_id, qna_list[qna_list_rand].button4_value], [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  scenario4_2(value, socket, user_data) {
    (async function () {
      try {
        if (value.includes('scenario4_2')) {
          let mainmenu_type = value.split('/')[1];
          await info_update.profile.update_mainmenu_type(socket.id, mainmenu_type);
        }
        const chlist = ['포장해서 갈거야? 아니면 매장에서 먹을거야?', '테이크아웃 할거야?', '테이크아웃이야? 앉아 있다가 갈거야?', '테이크아웃이야? 아님 먹고 갈거야?'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
      //  let cafe_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
        index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['scenario10_4/4_2/전체포함', '테이크아웃'], ['scenario10_4/4_2/포장만 제외', '매장에서 먹을거야'], ['scenario10_4/4_2/포장만 제외','모르겠어']);
        //index.sendSocketMessage(socket.id, 'chat message button dynamic checkbox', chlist[rand], ['상관없음', '상관없음'], drink_type, ['drink_type/', '선택완료']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  fake(value, socket, user_data) {
    (async function () {
      try {
        let preScenario = value.split('/')[1];
        if (preScenario === '4_1') {
          console.log("preScenario는 4_1");
          let mainmenu_type = value.split('/')[2];
          await info_update.profile.update_mainmenu_type(socket.id, mainmenu_type);
          const qna_list = await [
            {
              'question': '평소에 혼자서도 카페에 자주 가는 편이야?', 'button1_id': 'scenario10_4', 'button1_value': '자주 감', 'button2_id': 'scenario10_4', 'button2_value': '가끔', 'button3_id': 'scenario10_4', 'button3_value': '거의 안감',
            },
            {
              'question': '할인이나 적립쿠폰을 꾸준히 모으는 편이야?', 'button1_id': 'scenario10_4', 'button1_value': '꾸준히 모음', 'button2_id': 'scenario10_4', 'button2_value': '가끔', 'button3_id': 'scenario10_4', 'button3_value': '귀찮',
            },
            {
              'question': '커피 가격은 왜 밥값만큼 비쌀까?', 'button1_id': 'scenario10_4', 'button1_value': '원두값 때문에', 'button2_id': 'scenario10_4', 'button2_value': '임대료 때문에', 'button3_id': 'scenario10_4', 'button3_value': '인건비 때문에', 'button4_id': 'scenario10_4', 'button4_value': '브랜드 때문에',
              'button5_id': 'scenario10_4', 'button5_value': '전부 다', 'button6_id': 'scenario10_4', 'button6_value': '몰라', 'button7_id': 'scenario10_4', 'button7_value': '기타',
            },
            {
              'question': '하루에 커피를 몇 잔이나 마셔?', 'button1_id': 'scenario10_4', 'button1_value': '3잔 이상', 'button2_id': 'scenario10_4', 'button2_value': '2잔', 'button3_id': 'scenario10_4', 'button3_value': '1잔', 'button4_id': 'scenario10_4', 'button4_value': '생각날 때만',
              'button5_id': 'scenario10_4', 'button5_value': '거의 안마셔',
            },
            {
              'question': '쓴 커피가 좋아, 신 커피가 좋아?', 'button1_id': 'scenario10_4', 'button1_value': '쓴 커피', 'button2_id': 'scenario10_4', 'button2_value': '신 커피', 'button3_id': 'scenario10_4', 'button3_value': '둘다 좋아', 'button4_id': 'scenario10_4', 'button4_value': '둘다 싫어',
            },
            {
              'question': '음료 한잔을 끝내는 데 걸리는 시간은?', 'button1_id': 'scenario10_4', 'button1_value': '30초', 'button2_id': 'scenario10_4', 'button2_value': '30분', 'button3_id': 'scenario10_4', 'button3_value': '3시간',
            },
            {
              'question': '카페인에 두뇌활동을 많이 의존하는 편이야?', 'button1_id': 'scenario10_4', 'button1_value': '커피없인 못살아', 'button2_id': 'scenario10_4', 'button2_value': '가끔', 'button3_id': 'scenario10_4', 'button3_value': '카페인 필요없어',
            },
            {
              'question': '평소 밥 먹고 후식까지 챙겨먹는 편이야?', 'button1_id': 'scenario10_4', 'button1_value': '당연한걸 물어;', 'button2_id': 'scenario10_4', 'button2_value': '가끔', 'button3_id': 'scenario10_4', 'button3_value': '거의 안먹음',
            },
            {
              'question': '겨울한파에 아이스아메리카노를 마시는 사람을 본 너의 반응은?', 'button1_id': 'scenario10_4', 'button1_value': '맛있겠다', 'button2_id': 'scenario10_4', 'button2_value': '춥겠다', 'button3_id': 'scenario10_4', 'button3_value': '헐 야야 저사람 봐', 'button4_id': 'scenario10_4', 'button4_value': '무관심',
            },
            {
              'question': '만약 카페를 직접 차리게 된다면?', 'button1_id': 'scenario10_4', 'button1_value': '망할 것 같다', 'button2_id': 'scenario10_4', 'button2_value': '소소하게 벌 것 같다', 'button3_id': 'scenario10_4', 'button3_value': '대박날 것 같다',
            },
            {
              'question': '직원에게 주문하는 대신 키오스크(터치형 자동주문기계)를 사용하는 데 너의 생각은?', 'button1_id': 'scenario10_4', 'button1_value': '편하고 좋아', 'button2_id': 'scenario10_4', 'button2_value': '오히려 불편해', 'button3_id': 'scenario10_4', 'button3_value': '몰라',
            },
          ];
          const qna_list_leng = await qna_list.length;
          const qna_list_rand = await Math.floor(qna_list_leng * Math.random());
          if(qna_list_rand === 0 || qna_list_rand === 1 || qna_list_rand === 5 || qna_list_rand === 6 || qna_list_rand === 7 || qna_list_rand === 9 || qna_list_rand === 10) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
          } else if(qna_list_rand === 2) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button4_id, qna_list[qna_list_rand].button4_value],
            [qna_list[qna_list_rand].button5_id, qna_list[qna_list_rand].button5_value], [qna_list[qna_list_rand].button6_id, qna_list[qna_list_rand].button6_value], [qna_list[qna_list_rand].button7_id, qna_list[qna_list_rand].button7_value]);
          } else if(qna_list_rand === 3) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button4_id, qna_list[qna_list_rand].button4_value],
            [qna_list[qna_list_rand].button5_id, qna_list[qna_list_rand].button5_value]);
          } else if(qna_list_rand === 4 || qna_list_rand === 8) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button4_id, qna_list[qna_list_rand].button4_value]);
          }
        } else {
          console.log("preScenario는 6_1");
          let mood1 = value.split('/')[2];
          await info_update.profile.update_mood1(socket.id, mood1);
          const qna_list = await [
            {
              'question': '평소에 혼자서도 카페에 자주 가는 편이야?', 'button1_id': 'scenario10_6', 'button1_value': '자주 감', 'button2_id': 'scenario10_6', 'button2_value': '가끔', 'button3_id': 'scenario10_6', 'button3_value': '거의 안감',
            },
            {
              'question': '할인이나 적립쿠폰을 꾸준히 모으는 편이야?', 'button1_id': 'scenario10_6', 'button1_value': '꾸준히 모음', 'button2_id': 'scenario10_6', 'button2_value': '가끔', 'button3_id': 'scenario10_6', 'button3_value': '귀찮',
            },
            {
              'question': '커피 가격은 왜 밥값만큼 비쌀까?', 'button1_id': 'scenario10_6', 'button1_value': '원두값 때문에', 'button2_id': 'scenario10_6', 'button2_value': '임대료 때문에', 'button3_id': 'scenario10_6', 'button3_value': '인건비 때문에', 'button4_id': 'scenario10_6', 'button4_value': '브랜드 때문에',
              'button5_id': 'scenario10_6', 'button5_value': '전부 다', 'button6_id': 'scenario10_6', 'button6_value': '몰라', 'button7_id': 'scenario10_6', 'button7_value': '기타',
            },
            {
              'question': '하루에 커피를 몇 잔이나 마셔?', 'button1_id': 'scenario10_6', 'button1_value': '3잔 이상', 'button2_id': 'scenario10_6', 'button2_value': '2잔', 'button3_id': 'scenario10_6', 'button3_value': '1잔', 'button4_id': 'scenario10_6', 'button4_value': '생각날 때만',
              'button5_id': 'scenario10_6', 'button5_value': '거의 안마셔',
            },
            {
              'question': '쓴 커피가 좋아, 신 커피가 좋아?', 'button1_id': 'scenario10_6', 'button1_value': '쓴 커피', 'button2_id': 'scenario10_6', 'button2_value': '신 커피', 'button3_id': 'scenario10_6', 'button3_value': '둘다 좋아', 'button4_id': 'scenario10_6', 'button4_value': '둘다 싫어',
            },
            {
              'question': '음료 한잔을 끝내는 데 걸리는 시간은?', 'button1_id': 'scenario10_6', 'button1_value': '30초', 'button2_id': 'scenario10_6', 'button2_value': '30분', 'button3_id': 'scenario10_6', 'button3_value': '3시간',
            },
            {
              'question': '카페인에 두뇌활동을 많이 의존하는 편이야?', 'button1_id': 'scenario10_6', 'button1_value': '커피없인 못살아', 'button2_id': 'scenario10_6', 'button2_value': '가끔', 'button3_id': 'scenario10_6', 'button3_value': '카페인 필요없어',
            },
            {
              'question': '평소 밥 먹고 후식까지 챙겨먹는 편이야?', 'button1_id': 'scenario10_6', 'button1_value': '당연한걸 물어;', 'button2_id': 'scenario10_6', 'button2_value': '가끔', 'button3_id': 'scenario10_6', 'button3_value': '거의 안먹음',
            },
            {
              'question': '겨울한파에 아이스아메리카노를 마시는 사람을 본 너의 반응은?', 'button1_id': 'scenario10_6', 'button1_value': '맛있겠다', 'button2_id': 'scenario10_6', 'button2_value': '춥겠다', 'button3_id': 'scenario10_6', 'button3_value': '헐 야야 저사람 봐', 'button4_id': 'scenario10_6', 'button4_value': '무관심',
            },
            {
              'question': '만약 카페를 직접 차리게 된다면?', 'button1_id': 'scenario10_6', 'button1_value': '망할 것 같다', 'button2_id': 'scenario10_6', 'button2_value': '소소하게 벌 것 같다', 'button3_id': 'scenario10_6', 'button3_value': '대박날 것 같다',
            },
            {
              'question': '직원에게 주문하는 대신 키오스크(터치형 자동주문기계)를 사용하는 데 너의 생각은?', 'button1_id': 'scenario10_6', 'button1_value': '편하고 좋아', 'button2_id': 'scenario10_6', 'button2_value': '오히려 불편해', 'button3_id': 'scenario10_6', 'button3_value': '몰라',
            },
          ];
          const qna_list_leng = await qna_list.length;
          const qna_list_rand = await Math.floor(qna_list_leng * Math.random());
          if(qna_list_rand === 0 || qna_list_rand === 1 || qna_list_rand === 5 || qna_list_rand === 6 || qna_list_rand === 7 || qna_list_rand === 9 || qna_list_rand === 10) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
          } else if(qna_list_rand === 2) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button4_id, qna_list[qna_list_rand].button4_value],
            [qna_list[qna_list_rand].button5_id, qna_list[qna_list_rand].button5_value], [qna_list[qna_list_rand].button6_id, qna_list[qna_list_rand].button6_value], [qna_list[qna_list_rand].button7_id, qna_list[qna_list_rand].button7_value]);
          } else if(qna_list_rand === 3) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button4_id, qna_list[qna_list_rand].button4_value],
            [qna_list[qna_list_rand].button5_id, qna_list[qna_list_rand].button5_value]);
          } else if(qna_list_rand === 4 || qna_list_rand === 8) {
            index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button4_id, qna_list[qna_list_rand].button4_value]);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  scenario10_4(value, socket, user_data) {
    (async function () {
      try {
        const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 노는게 제일 좋아~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());

        function getResult(callback) {
          return new Promise(function (resolve, reject) {
            if(value.includes('scenario10_4/')){
              let mood1 = value.split('/')[2];
              info_update.profile.update_mood1(socket.id, mood1);
              const cafe_result = info_update.cafe.get_cafe2(socket.id, user_data.subway_cafe, user_data.exit_quarter, user_data.mainmenu_type, mood1);
              resolve(cafe_result);
            } else {
              const cafe_result = info_update.cafe.get_cafe2(socket.id, user_data.subway_cafe, user_data.exit_quarter, user_data.mainmenu_type, null);
              resolve(cafe_result);
            }
          });
        }

        getResult().then(async function (cafe_result){
          if (cafe_result.success) {
            const cafe_list = await cafe_result.result;
            if (cafe_result.message === '2') {
              await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
            } else if(cafe_result.message === '1') {
              await index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 로컬카페가 거의 없네... 프랜차이즈 카페도 포함해서 두 곳 추천해줄게!');
            } else {
              await index.sendSocketMessage(socket.id, 'chat message button', `조건에 맞는 카페가 해당 출구에는 없네... 다른 출구에서 두 곳 보여줄게!`);
            }
            await info_update.profile.update_limit_cnt_cafe(socket.id, user_data.limit_cnt_cafe + 1);
            await info_update.profile.update_cafe2(user_data.kakao_id, cafe_list[0].id, cafe_list[1].id);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[0].subway} ${cafe_list[0].cafe_name}`;
            const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[1].subway} ${cafe_list[1].cafe_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[0].subway} ${cafe_list[0].cafe_name}&tab=1`;
            const second_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[1].subway} ${cafe_list[1].cafe_name}&tab=1`;
            const image = await info_update.food.crawl_two_image(socket.id, `${cafe_list[0].subway.slice(0, -1)} ${cafe_list[0].cafe_name}`, `${cafe_list[1].subway.slice(0, -1)} ${cafe_list[1].cafe_name}`);
            if (image.res1 === 'no image') {
              await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', cafe_list[0].cafe_name], ['final/2',cafe_list[1].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0].cafe_name, cafe_list[0].mainmenu_type, cafe_list[0].drink_name, first_url, first_map_url], [cafe_list[1].cafe_name, cafe_list[1].mainmenu_type, cafe_list[1].drink_name, second_url, second_map_url]);
            } else {
              await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', cafe_list[0].cafe_name], ['final/2', cafe_list[1].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0].cafe_name, cafe_list[0].mainmenu_type, cafe_list[0].drink_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [cafe_list[1].cafe_name, cafe_list[1].mainmenu_type, cafe_list[1].drink_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
            }
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '아직 조건에 맞는 카페가 없어 ㅠㅠ', ['get_started', '처음으로 돌아가기']);
          }
        });
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  scenario10_6(value, socket, user_data) {
    (async function () {
      try {
        console.log("scenario10_6에 들어옴");
        const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 노는게 제일 좋아~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        const cafe_result = await info_update.cafe.get_cafe3(socket.id, user_data.subway_cafe, user_data.exit_quarter, user_data.mood1);
        console.log(cafe_result);
        if (cafe_result.success) {
          const cafe_list = await cafe_result.result;
          if (cafe_result.message === '2') {
            await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
          } else if(cafe_result.message === '1') {
            await index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 로컬카페가 거의 없네... 프랜차이즈 카페도 포함해서 두 곳 추천해줄게!');
          } else {
            await index.sendSocketMessage(socket.id, 'chat message button', `조건에 맞는 카페가 해당 출구에는 없네... 다른 출구에서 두 곳 보여줄게!`);
          }
          await info_update.profile.update_limit_cnt_cafe(socket.id, user_data.limit_cnt_cafe + 1);
          await info_update.profile.update_cafe2(user_data.kakao_id, cafe_list[0].id, cafe_list[1].id);
          await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
          const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[0].subway} ${cafe_list[0].cafe_name}`;
          const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[1].subway} ${cafe_list[1].cafe_name}`;
          const first_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[0].subway} ${cafe_list[0].cafe_name}&tab=1`;
          const second_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[1].subway} ${cafe_list[1].cafe_name}&tab=1`;
          const image = await info_update.food.crawl_two_image(socket.id, `${cafe_list[0].subway.slice(0, -1)} ${cafe_list[0].cafe_name}`, `${cafe_list[1].subway.slice(0, -1)} ${cafe_list[1].cafe_name}`);
          if (image.res1 === 'no image') {
            await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', cafe_list[0].cafe_name], ['final/2',cafe_list[1].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0].cafe_name, cafe_list[0].mainmenu_type, cafe_list[0].drink_name, first_url, first_map_url], [cafe_list[1].cafe_name, cafe_list[1].mainmenu_type, cafe_list[1].drink_name, second_url, second_map_url]);
          } else {
            await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', cafe_list[0].cafe_name], ['final/2', cafe_list[1].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0].cafe_name, cafe_list[0].mainmenu_type, cafe_list[0].drink_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [cafe_list[1].cafe_name, cafe_list[1].mainmenu_type, cafe_list[1].drink_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          }
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', '아직 조건에 맞는 카페가 없어 ㅠㅠ', ['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  comfort(value, socket, user_data) {
    (async function () {
      try {
        //await info_update.profile.update_exit_quarter(socket.id, user_quarter);
        const chlist = ['친구 많네,,, 쿨쩍,,,, 좋겠다,,', '카페에서 친구랑 떠드는게 소소한 행복 아니겠어...', '오히려 자주 보는 친구랑 할말이 더 많은것 같아', '오키오키!!', '도란도란 얘기할 수 있는 카페를 찾아줘야겠구만'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
      //  let cafe_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
        await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
        await info_update.profile.update_state(socket.id, '7', 'comfort');

        const qna_list = [
          {
            'question': '마실 거? 먹을거?', 'button1_id': 'scenario5_3/5_1/커피, 티, 초콜릿, 생과일음료', 'button1_value': '마실 거', 'button2_id': 'scenario5_3/5_1/디저트, 초콜릿, 와플, 빙수, 머핀', 'button2_value': '먹을 거', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '마실 거 찾아줄까? 먹을 거 찾아줄까?', 'button1_id': 'scenario5_3/5_1/커피, 티, 초콜릿, 생과일음료', 'button1_value': '마실 거', 'button2_id': 'scenario5_3/5_1/디저트, 초콜릿, 와플, 빙수, 머핀', 'button2_value': '먹을 거', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '후식은 마실 거? 아니면 먹을 거?', 'button1_id': 'scenario5_3/5_1/커피, 티, 초콜릿, 생과일음료', 'button1_value': '마실 거', 'button2_id': 'scenario5_3/5_1/디저트, 초콜릿, 와플, 빙수, 머핀', 'button2_value': '먹을 거', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '단거 어때?', 'button1_id': 'scenario5_3/5_1/디저트, 초콜릿, 와플', 'button1_value': '단거 좋아', 'button2_id': 'scenario5_3/5_1/커피, 티', 'button2_value': '단거 싫어', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '달달한 거 좋아해?', 'button1_id': 'scenario5_3/5_1/디저트, 초콜릿, 와플', 'button1_value': '단거 좋아', 'button2_id': 'scenario5_3/5_1/커피, 티', 'button2_value': '단거 싫어', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '지금 단거 땡겨?', 'button1_id': 'scenario5_3/5_1/디저트, 초콜릿, 와플', 'button1_value': '단거 좋아', 'button2_id': 'scenario5_3/5_1/커피, 티', 'button2_value': '단거 싫어', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '단거 좋아해?', 'button1_id': 'scenario5_3/5_1/디저트, 초콜릿, 와플', 'button1_value': '단거 좋아', 'button2_id': 'scenario5_3/5_1/커피, 티', 'button2_value': '단거 싫어', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '커피 마실거야?', 'button1_id': 'scenario5_2/5_1/커피', 'button1_value': '무조건 커피', 'button2_id': 'scenario5_3/5_1/티, 디저트, 초콜릿, 스무디, 주스', 'button2_value': '커피 말고 다른거', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '커피 아니어도 괜찮아?', 'button1_id': 'scenario5_2/5_1/커피', 'button1_value': '무조건 커피', 'button2_id': 'scenario5_3/5_1/티, 디저트, 초콜릿, 스무디, 주스', 'button2_value': '커피 말고 다른거', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '카페 가면 커피 시키려구?', 'button1_id': 'scenario5_2/5_1/커피', 'button1_value': '무조건 커피', 'button2_id': 'scenario5_3/5_1/티, 디저트, 초콜릿, 스무디, 주스', 'button2_value': '커피 말고 다른거', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '혹시 지금 카페인이 필요한거야?ㅎㅎ', 'button1_id': 'scenario5_2/5_1/커피, 티', 'button1_value': '카페인 내놔', 'button2_id': 'scenario5_3/5_1/디저트', 'button2_value': '카페인 ㄴㄴ', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '커피나 카페인 음료를 찾고 있어?', 'button1_id': 'scenario5_2/5_1/커피, 티', 'button1_value': '카페인 내놔', 'button2_id': 'scenario5_3/5_1/디저트', 'button2_value': '카페인 ㄴㄴ', 'button3_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button3_value': '상관없어',
          },
          {
            'question': '혹시 지금 배가 덜 찼어?', 'button1_id': 'scenario5_3/5_1/디저트, 와플', 'button1_value': '배고파...', 'button2_id': 'scenario5_3/5_1/디저트, 와플', 'button2_value': '좀 출출해', 'button3_id': 'scenario5_3/5_1/커피, 티', 'button3_value': '배불러!!', 'button4_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button4_value': '상관없어',
          },
          {
            'question': '혹시 지금 배고파?', 'button1_id': 'scenario5_3/5_1/디저트, 와플', 'button1_value': '배고파...', 'button2_id': 'scenario5_3/5_1/디저트, 와플', 'button2_value': '좀 출출해', 'button3_id': 'scenario5_3/5_1/커피, 티', 'button3_value': '배불러!!', 'button4_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button4_value': '상관없어',
          },
          {
            'question': '혹시 지금 출출해?', 'button1_id': 'scenario5_3/5_1/디저트, 와플', 'button1_value': '배고파...', 'button2_id': 'scenario5_3/5_1/디저트, 와플', 'button2_value': '좀 출출해', 'button3_id': 'scenario5_3/5_1/커피, 티', 'button3_value': '배불러!!', 'button4_id': 'scenario5_3/5_1/커피, 티, 디저트', 'button4_value': '상관없어',
          },
          {
            'question': '차가운 디저트 어때?', 'button1_id': 'scenario10_5/5_1/빙수, 아이스크림', 'button1_value': '찬거 좋아', 'button2_id': 'scenario10_5/5_1/커피, 티, 초콜릿, 디저트, 와플, 머핀', 'button2_value': '찬거 싫어', 'button3_id': 'scenario10_5/5_1/커피, 티, 초콜릿, 디저트, 와플, 머핀, 빙수, 아이스크림', 'button3_value': '상관없어',
          },
          {
            'question': '차가운거 괜찮아?', 'button1_id': 'scenario10_5/5_1/빙수, 아이스크림', 'button1_value': '찬거 좋아', 'button2_id': 'scenario10_5/5_1/커피, 티, 초콜릿, 디저트, 와플, 머핀', 'button2_value': '찬거 싫어', 'button3_id': 'scenario10_5/5_1/커피, 티, 초콜릿, 디저트, 와플, 머핀, 빙수, 아이스크림', 'button3_value': '상관없어',
          },
        ];
        const qna_list_leng = qna_list.length;
        const qna_list_rand = Math.floor(qna_list_leng * Math.random());
        //const qna_list_rand = Math.floor(Math.random() * 3) + 1;
        if (qna_list_rand === 12 || qna_list_rand === 13 || qna_list_rand === 14) {
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button4_id, qna_list[qna_list_rand].button4_value], [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  scenario5_2(value, socket, user_data) {
    (async function () {
      try {
        if (value.includes('scenario5_2')) {
          let mainmenu_type = value.split('/')[2];
          await info_update.profile.update_mainmenu_type(socket.id, mainmenu_type);
        }
        const chlist = ['조각케익도 먹을거야?', '조각케익도 시킬거야??ㅎㅎ'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['scenario10_5/5_2/케익', 'ㅇㅇ당연하지'], ['scenario10_5/5_2/null', '아니'], ['scenario10_5/5_2/null','모르겠어']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  scenario5_3(value, socket, user_data) {
    (async function () {
      try {
        if (value.includes('scenario5_3')) {
          let mainmenu_type = value.split('/')[2];
          await info_update.profile.update_mainmenu_type(socket.id, mainmenu_type);
        }
        const scenarioRand = Math.floor(Math.random() * 2) + 1;
        if(scenarioRand === 1) {
          const chlist = ['음식 나오면 사진을 찍는 편이야?', '먹는거 SNS에 올리는거 좋아해?'];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['scenario10_5/5_3/인스타', '그런 편이야'],
          ['scenario10_5/5_3/null', '아니'], ['scenario10_5/5_3/null', '가끔']);
        }
        else {
          const chlist = ['SNS에 공유할만한 분위기로 추천해줘?', '인테리어나 메뉴의 비주얼이 예쁜 곳으로 추천해줘??'];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['scenario10_5/5_3/인스타', '좋아좋아'], ['scenario10_5/5_3/null', '그럴 필요는 없어']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

scenario10_5 (value, socket, user_data) {
    (async function () {
      try {
        const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 노는게 제일 좋아~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());

        function getResult(callback) {
          return new Promise(function (resolve, reject) {
            const preScenario = value.split('/')[1];
            const token = value.split('/')[2];
            if (preScenario === '5_1'){
              info_update.profile.update_mainmenu_type(socket.id, token);
              const cafe_result = info_update.cafe.get_cafe4(socket.id, user_data.subway_cafe, user_data.exit_quarter, token, user_data.food_name, user_data.mood2);
              resolve(cafe_result);
            } else if(preScenario === '5_2'){
              info_update.profile.update_food_name(socket.id, token);
              const cafe_result = info_update.cafe.get_cafe4(socket.id, user_data.subway_cafe, user_data.exit_quarter, user_data.mainmenu_type, token, user_data.mood2);
              resolve(cafe_result);
            } else {
              info_update.profile.update_mood2(socket.id, token);
              const cafe_result = info_update.cafe.get_cafe4(socket.id, user_data.subway_cafe, user_data.exit_quarter, user_data.mainmenu_type, user_data.food_name, token);
              resolve(cafe_result);
            }
          });
        }

        getResult().then(async function (cafe_result){
          console.log(cafe_result);
          if (cafe_result.success) {
            const cafe_list = await cafe_result.result;
            if (cafe_result.message === '2') {
              await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
            } else if(cafe_result.message === '1') {
              await index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 로컬카페가 거의 없네... 프랜차이즈 카페도 포함해서 두 곳 추천해줄게!');
            } else {
              await index.sendSocketMessage(socket.id, 'chat message button', `조건에 맞는 카페가 해당 출구에는 없네... 다른 출구에서 두 곳 보여줄게!`);
            }
            await info_update.profile.update_limit_cnt_cafe(socket.id, user_data.limit_cnt_cafe + 1);
            await info_update.profile.update_cafe2(user_data.kakao_id, cafe_list[0].id, cafe_list[1].id);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[0].subway} ${cafe_list[0].cafe_name}`;
            const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[1].subway} ${cafe_list[1].cafe_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[0].subway} ${cafe_list[0].cafe_name}&tab=1`;
            const second_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[1].subway} ${cafe_list[1].cafe_name}&tab=1`;
            const image = await info_update.food.crawl_two_image(socket.id, `${cafe_list[0].subway.slice(0, -1)} ${cafe_list[0].cafe_name}`, `${cafe_list[1].subway.slice(0, -1)} ${cafe_list[1].cafe_name}`);
            if (image.res1 === 'no image') {
              await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', cafe_list[0].cafe_name], ['final/2',cafe_list[1].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0].cafe_name, cafe_list[0].mainmenu_type, cafe_list[0].drink_name, first_url, first_map_url], [cafe_list[1].cafe_name, cafe_list[1].mainmenu_type, cafe_list[1].drink_name, second_url, second_map_url]);
            } else {
              await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', cafe_list[0].cafe_name], ['final/2', cafe_list[1].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0].cafe_name, cafe_list[0].mainmenu_type, cafe_list[0].drink_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [cafe_list[1].cafe_name, cafe_list[1].mainmenu_type, cafe_list[1].drink_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
            }
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '아직 조건에 맞는 카페가 없어 ㅠㅠ', ['get_started', '처음으로 돌아가기']);
          }
        });
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  meeting(value, socket, user_data) {
    (async function () {
      try {
        //await info_update.profile.update_exit_quarter(socket.id, user_quarter);
        const chlist = ['멋져멋져!!', '카페에서 일하는 사람들 대부분이 A사 노트북을 쓰는듯... 착각인가?', '카페에서 일하면 그래도 좀 덜 답답한것 같아!!', '쉬엄쉬엄해! 화이팅🐶🐶', '집보다는 카페에서 뭐가 더 잘되는 느낌적인 느낌'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
      //  let cafe_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
        await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
        await info_update.profile.update_state(socket.id, '7', 'meeting');

        const qna_list = [
          {
            'question': '자유롭게 대화하는 곳이 좋아? 아니면 아예 조용한 곳으로?', 'button1_id': 'fake/6_1/노트북 && 수다', 'button1_value': '대화 가능한 곳', 'button2_id': 'fake/6_1/노트북', 'button2_value': '조용한 곳', 'button3_id': 'fake/6_1/노트북, 수다', 'button3_value': '상관없어',
          },
          {
            'question': '대화 가능한 곳이 좋아? 아니면 완전 스터디 분위기로?', 'button1_id': 'fake/6_1/노트북 && 수다', 'button1_value': '대화 가능한 곳', 'button2_id': 'fake/6_1/노트북', 'button2_value': '조용한 곳', 'button3_id': 'fake/6_1/노트북, 수다', 'button3_value': '상관없어',
          },
          {
            'question': '자유롭게 말할 수 있는 곳으로 찾아줄까? 아니면 조용한 스터디 공간으로 찾아줄까?', 'button1_id': 'fake/6_1/노트북 && 수다', 'button1_value': '대화 가능한 곳', 'button2_id': 'fake/6_1/노트북', 'button2_value': '조용한 곳', 'button3_id': 'fake/6_1/노트북, 수다', 'button3_value': '상관없어',
          },
          {
            'question': '마음껏 대화하는 분위기가 좋아? 아니면 말 없이 공부하는 분위기가 좋아?', 'button1_id': 'fake/6_1/노트북 && 수다', 'button1_value': '대화 가능한 곳', 'button2_id': 'fake/6_1/노트북', 'button2_value': '조용한 곳', 'button3_id': 'fake/6_1/노트북, 수다', 'button3_value': '상관없어',
          },
          {
            'question': '말할 수 있는 곳이 좋아? 아니면 조용한 곳이 좋아?', 'button1_id': 'fake/6_1/노트북 && 수다', 'button1_value': '대화 가능한 곳', 'button2_id': 'fake/6_1/노트북', 'button2_value': '조용한 곳', 'button3_id': 'fake/6_1/노트북, 수다', 'button3_value': '상관없어',
          },
          {
            'question': '적당한 소음이 있는 곳이 좋아? 아니면 모두 조용히 공부하는 곳이 좋아?', 'button1_id': 'fake/6_1/노트북 && 수다', 'button1_value': '대화 가능한 곳', 'button2_id': 'fake/6_1/노트북', 'button2_value': '조용한 곳', 'button3_id': 'fake/6_1/노트북, 수다', 'button3_value': '상관없어',
          },
        ];
        const qna_list_leng = qna_list.length;
        const qna_list_rand = Math.floor(qna_list_leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  meal(value, socket, user_data) {
    (async function () {
      try {
        const chlist = ['바빠도 너무 대충 먹지는 마', '밥 잘 챙겨먹고 다니는거지ㅠㅠ?', '끼니 거르면 안 돼~!!', '맞아 요샌 카페에서도 든든한 한끼를 챙길 수 있어🥗🥪', '요샌 카페에서 안 파는게 없어... 샐러드 샌드위치 핫도그 심지어 파스타까지!', '바쁜 현대인들에게 카페 식사는 일상이 되어가는것 같아', '유럽 사람들은 빵만 먹고 사는데 우리라고 못할게 뭐야', '뭐라도 잘 챙겨먹고 다녀'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
        await info_update.profile.update_state(socket.id, '7', 'meal');

        const qna_list = [
          {
            'question': '아예 브런치 식사를 할거야? 아니면 간단히 때우고 싶어?', 'button1_id': 'scenario10_7/7_1/브런치', 'button1_value': '브런치 식사', 'button2_id': 'scenario10_7/7_1/샌드위치, 빵, 핫도그', 'button2_value': '간단한 푸드', 'button3_id': 'scenario10_7/7_1/브런치,샌드위치, 빵, 핫도그', 'button3_value': '상관없어',
          },
          {
            'question': '브런치 식당을 골라줄까, 아니면 간단한 샌드위치나 빵같은 푸드도 괜찮아?', 'button1_id': 'scenario10_7/7_1/브런치', 'button1_value': '브런치 식사', 'button2_id': 'scenario10_7/7_1/샌드위치, 빵, 핫도그', 'button2_value': '간단한 푸드', 'button3_id': 'scenario10_7/7_1/브런치,샌드위치, 빵, 핫도그', 'button3_value': '상관없어',
          },
          {
            'question': '브런치 식당을 골라줄까, 아니면 간단한 푸드를 먹을 수 있는 카페를 골라줄까?', 'button1_id': 'scenario10_7/7_1/브런치', 'button1_value': '브런치 식사', 'button2_id': 'scenario10_7/7_1/샌드위치, 빵, 핫도그', 'button2_value': '간단한 푸드', 'button3_id': 'scenario10_7/7_1/브런치,샌드위치, 빵, 핫도그', 'button3_value': '상관없어',
          },
          {
            'question': '브런치 요리를 하는 식당을 골라줄까? 아니면 간단히 샌드위치나 빵으로 먹을래?', 'button1_id': 'scenario10_7/7_1/브런치', 'button1_value': '브런치 식사', 'button2_id': 'scenario10_7/7_1/샌드위치, 빵, 핫도그', 'button2_value': '간단한 푸드', 'button3_id': 'scenario10_7/7_1/브런치,샌드위치, 빵, 핫도그', 'button3_value': '상관없어',
          },
          {
            'question': '브런치 식당을 골라줄까, 아니면 간단한 푸드를 파는 카페를 골라줄까?', 'button1_id': 'scenario10_7/7_1/브런치', 'button1_value': '브런치 식사', 'button2_id': 'scenario10_7/7_1/샌드위치, 빵, 핫도그', 'button2_value': '간단한 푸드', 'button3_id': 'scenario10_7/7_1/브런치,샌드위치, 빵, 핫도그', 'button3_value': '상관없어',
          },
        ];
        const qna_list_leng = qna_list.length;
        const qna_list_rand = Math.floor(qna_list_leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value], [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  scenario10_7 (value, socket, user_data) {
      (async function () {
        try {
          const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 노는게 제일 좋아~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());

          function getResult(callback) {
            return new Promise(function (resolve, reject) {
              const token = value.split('/')[2];
              if (token === '브런치') {
                info_update.profile.update_mainmenu_type(socket.id, token);
                const cafe_result = info_update.cafe.get_cafe5(socket.id, user_data.subway_cafe, user_data.exit_quarter, token, user_data.food_name);
                resolve(cafe_result);
              } else if (token === '샌드위치, 빵, 핫도그') {
                info_update.profile.update_food_name(socket.id, token);
                const cafe_result = info_update.cafe.get_cafe5(socket.id, user_data.subway_cafe, user_data.exit_quarter, user_data.mainmenu_type, token);
                resolve(cafe_result);
              } else {
                const mainmenu_type = token.split(',')[0];
                const food_name = token.split(',')[1] + ',' + token.split(',')[2] + ',' + token.split(',')[3];
                info_update.profile.update_mainmenu_type(socket.id, mainmenu_type);
                info_update.profile.update_food_name(socket.id, food_name);
                const cafe_result = info_update.cafe.get_cafe5(socket.id, user_data.subway_cafe, user_data.exit_quarter, mainmenu_type, food_name);
                resolve(cafe_result);
              }
            });
          }

          getResult().then(async function (cafe_result){
            console.log(cafe_result);
            if (cafe_result.success) {
              const cafe_list = await cafe_result.result;
              if (cafe_result.message === '2') {
                await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
              } else if(cafe_result.message === '1') {
                await index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 로컬카페가 거의 없네... 프랜차이즈 카페도 포함해서 두 곳 추천해줄게!');
              } else {
                await index.sendSocketMessage(socket.id, 'chat message button', `조건에 맞는 카페가 해당 출구에는 없네... 다른 출구에서 두 곳 보여줄게!`);
              }
              await info_update.profile.update_limit_cnt_cafe(socket.id, user_data.limit_cnt_cafe + 1);
              await info_update.profile.update_cafe2(user_data.kakao_id, cafe_list[0].id, cafe_list[1].id);
              await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
              await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
              await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
              const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[0].subway} ${cafe_list[0].cafe_name}`;
              const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[1].subway} ${cafe_list[1].cafe_name}`;
              const first_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[0].subway} ${cafe_list[0].cafe_name}&tab=1`;
              const second_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[1].subway} ${cafe_list[1].cafe_name}&tab=1`;
              const image = await info_update.food.crawl_two_image(socket.id, `${cafe_list[0].subway.slice(0, -1)} ${cafe_list[0].cafe_name}`, `${cafe_list[1].subway.slice(0, -1)} ${cafe_list[1].cafe_name}`);
              if (image.res1 === 'no image') {
                await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', cafe_list[0].cafe_name], ['final/2',cafe_list[1].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0].cafe_name, cafe_list[0].mainmenu_type, cafe_list[0].drink_name, first_url, first_map_url], [cafe_list[1].cafe_name, cafe_list[1].mainmenu_type, cafe_list[1].drink_name, second_url, second_map_url]);
              } else {
                await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', cafe_list[0].cafe_name], ['final/2', cafe_list[1].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0].cafe_name, cafe_list[0].mainmenu_type, cafe_list[0].drink_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [cafe_list[1].cafe_name, cafe_list[1].mainmenu_type, cafe_list[1].drink_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
              }
            } else {
              index.sendSocketMessage(socket.id, 'chat message button', '아직 조건에 맞는 카페가 없어 ㅠㅠ', ['get_started', '처음으로 돌아가기']);
            }
          });
        } catch (e) {
          index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
          console.log(e);
        }
      }());
  }

  experience(value, socket, user_data) {
    (async function () {
      try {
        //await info_update.profile.update_exit_quarter(socket.id, user_quarter);
        const chlist = ['다양하고 많은 테마카페들이 생겼다가 없어졌다가를 반복하지 ㅋㅋㅋ', '실내데이트 장소로 테마카페만한 곳이 없어', '정말 별별 테마카페들이 있더라구', '오늘 뭐 하지 고민될 땐 테마카페가 답이야', '밥먹고 커피먹고 영화보고가 지겨울 땐 테마카페가 정답!'];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
        await info_update.profile.update_state(socket.id, '7', 'experience');
        let cafes = await info_update.cafe.verify_subway_thema(socket.id, user_data.subway_cafe);
        if(cafes.result === 'success') {
          const flag1 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(낮잠), 테마(닥터피쉬)");
          const flag2 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(고양이), 테마(강아지), 테마(양), 테마(토끼), 테마(앵무새), 테마(이색동물)");
          const flag3 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(상담), 테마(사주)");
          const flag4 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(공예)");
          const flag5 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(갤러리), 테마(사진)");
          const flag6 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(캐릭터), 테마(만화), 테마(키덜트)");
          const flag7 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(슬라임)");
          const flag8 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(보드게임)");
          const flag9 = await info_update.cafe.verify_subway_detail_thema(socket.id, user_data.subway_cafe, "테마(커플공예)");
          const themaExist = [];
          if (flag1.result === 'success') {
            themaExist.push(1);
          }
          if (flag2.result === 'success') {
            themaExist.push(2);
          }
          if (flag3.result === 'success') {
            themaExist.push(3);
          }
          if (flag4.result === 'success') {
            themaExist.push(4);
          }
          if (flag5.result === 'success') {
            themaExist.push(5);
          }
          if (flag6.result === 'success') {
            themaExist.push(6);
          }
          if (flag7.result === 'success') {
            themaExist.push(7);
          }
          if (flag8.result === 'success') {
            themaExist.push(8);
          }
          if (flag9.result === 'success') {
            themaExist.push(9);
          }
          console.log(themaExist);
          const rand = Math.floor(themaExist.length * Math.random());
          const scenarioRand = themaExist[rand];
          console.log(`rand : ${rand}, scenarioRand : ${scenarioRand}`);
          switch (scenarioRand) {
            case 1: {
              const sublist = ['지금 피곤한 상태야?', '요새 지치고 기운이 없어?', '요새 많이 피곤하고 그래?'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(낮잠), 테마(닥터피쉬)', '그런 것 같아'], ['scenario10_8/!테마(낮잠)', '아니']);
              break;
            }
            case 2: {
              const sublist = ['동물 좋아해?'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(고양이), 테마(강아지), 테마(양), 테마(토끼), 테마(앵무새), 테마(이색동물)', '응 좋아해'], ['scenario10_8/!테마(고양이), !테마(강아지), !테마(양), !테마(토끼), !테마(앵무새), !테마(이색동물)', '아니 별로']);
              break;
            }
            case 3: {
              const sublist = ['성격테스트나 심리테스트같은 거 좋아해?', '너 자신에 대해 더 알고 싶은 욕구가 있어?(뭐라는ㄱ...)'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(상담), 테마(사주)', '응응'], ['scenario10_8/!테마(상담), !테마(사주)', 'ㄴㄴ 별로']);
              break;
            }
            case 4: {
              const sublist = ['뭔가를 그리거나 만들기를 좋아하는 편이야?', '손재주가 있는 편이야?'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(공예)', '응응'], ['scenario10_8/!테마(공예)', 'ㄴㄴ 별로']);
              break;
            }
            case 5: {
              const sublist = ['공연이나 전시회에 자주 가는 편이야?'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(갤러리), 테마(사진)', '응응'], ['scenario10_8/!테마(갤러리), !테마(사진)', 'ㄴㄴ 별로']);
              break;
            }
            case 6: {
              const sublist = ['평소에 애 같다는 소리를 들은 적 있어?(얼굴 말고)', '웹툰이나 만화책 보는거 좋아해?'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(캐릭터), 테마(만화), 테마(키덜트)', '그런 것 같아'], ['scenario10_8/!테마(캐릭터), !테마(만화), !테마(키덜트)', '아니 별로']);
              break;
            }
            case 7: {
              const sublist = ['지금 아무 생각도 하기 싫어?'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(슬라임)', '응응'], ['scenario10_8/!테마(슬라임)', 'ㄴㄴ 별로']);
              break;
            }
            case 8: {
              const sublist = ['머리 쓰는거 괜찮아?'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(보드게임)', '응응'], ['scenario10_8/!테마(보드게임)', 'ㄴㄴ 별로']);
              break;
            }
            case 9: {
              const sublist = ['혹시 데이트야??'];
              const subleng = sublist.length;
              const subrand = Math.floor(subleng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', sublist[subrand], ['scenario10_8/테마(커플공예)', '응응'], ['scenario10_8/!테마(커플공예)', 'ㄴㄴ 별로']);
              break;
            }
            default: {
              const chlist = ['이 지역에는 이색카페가 없네 ㅠㅠ 대신 맛있는거 먹으러 가자!!', '여기엔 추천할 이색카페가 없어...(창업의 기회?!) 대신 맛있는거 먹으러 갈래???'];
              const leng = chlist.length;
              const rand = Math.floor(leng * Math.random());
              await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['quality', '좋아ㄱㄱ'], ['cafe_type', '처음으로 돌아가기']);
              break;
            }
          }
        } else {
          console.log("이 지역에는 테마가 없네ㅜㅜ");
          const chlist = ['이 지역에는 이색카페가 없네 ㅠㅠ 대신 맛있는거 먹으러 가자!!', '여기엔 추천할 이색카페가 없어...(창업의 기회?!) 대신 맛있는거 먹으러 갈래???'];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['quality', '좋아ㄱㄱ'], ['cafe_type', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  scenario10_8 (value, socket, user_data) {
      (async function () {
        try {
          const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 노는게 제일 좋아~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`];
          const leng = chlist.length;
          const rand = Math.floor(leng * Math.random());

          const mainmenu_type = await value.split('/')[1];
          await info_update.profile.update_mainmenu_type(socket.id, mainmenu_type);
          const cafe_result = await info_update.cafe.get_cafe(socket.id, user_data.subway_cafe, user_data.exit_quarter, mainmenu_type);
          console.log(cafe_result);

          if (cafe_result.success) {
            const cafe_list = await cafe_result.result;
            if (cafe_result.message === '2') {
              await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
            } else if(cafe_result.message === '1') {
              await index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 로컬카페가 거의 없네... 프랜차이즈 카페도 포함해서 두 곳 추천해줄게!');
            }
            await info_update.profile.update_limit_cnt_cafe(socket.id, user_data.limit_cnt_cafe + 1);
            await info_update.profile.update_cafe2(user_data.kakao_id, cafe_list[0][0].id, cafe_list[1][0].id);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[0][0].subway} ${cafe_list[0][0].cafe_name}`;
            const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_list[1][0].subway} ${cafe_list[1][0].cafe_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[0][0].subway} ${cafe_list[0][0].cafe_name}&tab=1`;
            const second_map_url = `https://map.naver.com/index.nhn?query=${cafe_list[1][0].subway} ${cafe_list[1][0].cafe_name}&tab=1`;
            const image = await info_update.food.crawl_two_image(socket.id, `${cafe_list[0][0].subway.slice(0, -1)} ${cafe_list[0][0].cafe_name}`, `${cafe_list[1][0].subway.slice(0, -1)} ${cafe_list[1][0].cafe_name}`);
            if (image.res1 === 'no image') {
              await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', cafe_list[0][0].cafe_name], ['final/2',cafe_list[1][0].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0][0].cafe_name, cafe_list[0][0].mainmenu_type, cafe_list[0][0].drink_name, first_url, first_map_url], [cafe_list[1][0].cafe_name, cafe_list[1][0].mainmenu_type, cafe_list[1][0].drink_name, second_url, second_map_url]);
            } else {
              await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', cafe_list[0][0].cafe_name], ['final/2', cafe_list[1][0].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe_list[0][0].cafe_name, cafe_list[0][0].mainmenu_type, cafe_list[0][0].drink_name, first_url, first_map_url, image.res1[0], image.res1[1][0], image.res1[2]], [cafe_list[1][0].cafe_name, cafe_list[1][0].mainmenu_type, cafe_list[1][0].drink_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
            }
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '아직 조건에 맞는 카페가 없어 ㅠㅠ', ['get_started', '처음으로 돌아가기']);
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
        if (user_data.cafe_before === false) {
          await info_update.profile.update_cafe_before(socket.id, 1);
        }
        const user_select = parseInt(value.split('/')[1]);
        let final_value;
        if (user_select === 1) {
          console.log("user_select 1");
          await info_update.profile.update_cafe_final(socket.id, user_data.cafe1);
          final_value = user_data.cafe1;
        } else if (user_select === 2) {
          console.log("user_select 2");
          await info_update.profile.update_cafe_final(socket.id, user_data.cafe2);
          final_value = user_data.cafe2;
        } else if (user_select === 3) {
          console.log("user_select 3");
          const user_select_value = [user_data.cafe1, user_data.cafe2];
          const rand_select = Math.floor(user_select_value.length * Math.random());
          await info_update.profile.update_cafe_final(socket.id, user_select_value[rand_select]);

          const cafe_val = await info_update.cafe.get_cafe_info(socket.id, parseInt(user_select_value[rand_select]));
          console.log(cafe_val);
          index.sendSocketMessage(socket.id, 'chat message button', `챗봇의 선택 : ${cafe_val[0].cafe_name}`);
          final_value = user_select_value[rand_select];
        }
        const cafe_value = await info_update.cafe.get_cafe_info(socket.id, final_value);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_value[0].subway} ${cafe_value[0].cafe_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${cafe_value[0].subway} ${cafe_value[0].cafe_name}&tab=1`;
        let component = [];
        if(cafe_value[0].phone != null && cafe_value[0].phone != '') {
          component.push(`매장전화 : ${cafe_value[0].phone}<br>`);
        }
        if(cafe_value[0].open_mf != null && cafe_value[0].close_mf != null) {
          component.push(`영업시간: 평일 ${cafe_value[0].open_mf}시 ~ ${cafe_value[0].close_mf}시<br>`);
        }
        if(cafe_value[0].open_sat != null && cafe_value[0].close_sat != null) {
          component.push(`토요일 : ${cafe_value[0].open_sat}시 ~ ${cafe_value[0].close_sat}시<br>`);
        }
        if(cafe_value[0].open_sun != null && cafe_value[0].close_sun != null) {
          component.push(`일요일 : ${cafe_value[0].open_sun}시 ~ ${cafe_value[0].close_sun}시<br>`);
        }
        if(cafe_value[0].last_order != null && cafe_value[0].last_order != '') {
          component.push(`주문마감 : ${cafe_value[0].last_order}시간전<br>`);
        }
        if(cafe_value[0].holiday != null && cafe_value[0].holiday != '') {
          component.push(`휴무일 : ${cafe_value[0].holiday}요일<br>`);
        }
        if(cafe_value[0].etc != null && cafe_value[0].etc != '') {
          component.push(`기타사항 : ${cafe_value[0].etc}<br>`);
        }
        console.log(component);
        var botAnswer = `오늘의 선택: ${cafe_value[0].cafe_name}<br>`;
        for (var i = 0; i < component.length; i++) {
          botAnswer += component[i];
        }
        botAnswer += `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>`;
        index.sendSocketMessage(socket.id, 'chat message button', botAnswer , ['show_image', '사진 보기'], ['decide_final_again', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  show_image(value, socket, user_data) {
    (async function () {
      try {
        const cafe_value = await info_update.cafe.get_cafe_info(socket.id, user_data.cafe_final);
        let image = await info_update.food.crawl_image(socket.id, `${cafe_value[0].subway.slice(0, -1)} ${cafe_value[0].cafe_name}`);
        if (image.res1 === 'no image') {
          index.sendSocketMessage(socket.id, 'chat message button', `아직 ${cafe_value[0].subway} ${cafe_value[0].cafe_name}에 대한 사진이 없어요..ㅠㅠㅠ`, ['final_info_direct', '돌아가기'], ['get_started', '처음으로 돌아가기']);
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

  final_info_direct(value, socket, user_data) {
    (async function () {
      try {
        const cafe_value = await info_update.cafe.get_cafe_info(socket.id, user_data.cafe_final);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe_value[0].subway} ${cafe_value[0].cafe_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${cafe_value[0].subway} ${cafe_value[0].cafe_name}&tab=1`;
        let component = [];
        if(cafe_value[0].phone != null && cafe_value[0].phone != '') {
          component.push(`매장전화 : ${cafe_value[0].phone}<br>`);
        }
        if(cafe_value[0].open_mf != null && cafe_value[0].close_mf != null) {
          component.push(`영업시간: 평일 ${cafe_value[0].open_mf}시 ~ ${cafe_value[0].close_mf}시<br>`);
        }
        if(cafe_value[0].open_sat != null && cafe_value[0].close_sat != null) {
          component.push(`토요일 : ${cafe_value[0].open_sat}시 ~ ${cafe_value[0].close_sat}시<br>`);
        }
        if(cafe_value[0].open_sun != null && cafe_value[0].close_sun != null) {
          component.push(`일요일 : ${cafe_value[0].open_sun}시 ~ ${cafe_value[0].close_sun}시<br>`);
        }
        if(cafe_value[0].last_order != null && cafe_value[0].last_order != '') {
          component.push(`주문마감 : ${cafe_value[0].last_order}시간전<br>`);
        }
        if(cafe_value[0].holiday != null && cafe_value[0].holiday != '') {
          component.push(`휴무일 : ${cafe_value[0].holiday}요일<br>`);
        }
        if(cafe_value[0].etc != null && cafe_value[0].etc != '') {
          component.push(`기타사항 : ${cafe_value[0].etc}<br>`);
        }
        console.log(component);
        var botAnswer = `오늘의 선택: ${cafe_value[0].cafe_name}<br>`;
        for (var i = 0; i < component.length; i++) {
          botAnswer += component[i];
        }
        botAnswer += `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>`;
        index.sendSocketMessage(socket.id, 'chat message button', botAnswer , ['show_image', '사진 보기'], ['decide_final_again', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_final_again(value, socket, user_data) {
    (async function () {
      try {
        const cafe1 = await info_update.cafe.get_cafe_info(socket.id, user_data.cafe1);
        const cafe2 = await info_update.cafe.get_cafe_info(socket.id, user_data.cafe2);
        console.log(cafe1);
        console.log(cafe2);
        const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe1[0].subway} ${cafe1[0].cafe_name}`;
        const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${cafe2[0].subway} ${cafe2[0].cafe_name}`;
        const first_map_url = `https://map.naver.com/index.nhn?query=${cafe1[0].subway} ${cafe1[0].cafe_name}&tab=1`;
        const second_map_url = `https://map.naver.com/index.nhn?query=${cafe2[0].subway} ${cafe2[0].cafe_name}&tab=1`;
        const image = await info_update.food.crawl_two_image(socket.id, `${cafe1[0].subway.slice(0, -1)} ${cafe1[0].cafe_name}`, `${cafe2[0].subway.slice(0, -1)} ${cafe2[0].cafe_name}`);
        await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
        await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
        if (image.res1 === 'no image') {
          await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', cafe1[0].cafe_name], ['final/2', cafe2[0].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe1[0].cafe_name, cafe1[0].mainmenu_type, cafe1[0].drink_name, first_url, first_map_url], [cafe2[0].cafe_name, cafe2[0].mainmenu_type, cafe2[0].drink_name, second_url, second_map_url]);
        } else {
          await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', cafe1[0].cafe_name], ['final/2', cafe2[0].cafe_name], ['final/3', '챗봇이 골라주기'], [cafe1[0].cafe_name, cafe1[0].mainmenu_type, cafe1[0].drink_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [cafe2[0].cafe_name, cafe2[0].mainmenu_type, cafe2[0].drink_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = Decide_cafe;
