const moment = require('moment');
const Info = require('../../api/info_update');
const index = require('../../server/index');
const info_update = new Info();

const error_msg = '오류가 발생했습니다.';
var wrong_subway_input_msg = (value) => {
  return `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`;
}
var check_subway = (subway) => {
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

class Decide_drink {
  constructor(value, socket, user_data) {
    let key = value;
    if (key === 'decide_drink') {
      key = 'decide_drink';
    } else if (key.startsWith('S1/')) {
      key = 'S1';
    } else if (user_data.state === 'S1' || key === 'S2_freq') {
      key = (user_data.drink_round === '1') ? 'S2_1' : 'S2_2';
    } else if (key.startsWith('S2_2/')) {
      key = 'S2_2';
    } else if (key.startsWith('S3/')) {
      key = 'S3';
    } else if (key.startsWith('S4/')) {
      key = 'S4';
    } else if (key.startsWith('S11/')) {
      key = 'S11';
    }

    this.strategies = {
      'decide_drink': this.decide_drink,
      'S1': this.S1__decide_subway,
      'S2_1': this.S2_1_decide_price_dinner,
      'S2_2': this.S2_2_decide_mood,
      'S3': this.S3__decide_drink_type,
      'S4': this.S4__ask_fake_question,
      'S10': this.S10__decide_final,
      'S10_1': this.S10_1_decide_final_others,
      'S10_2': this.S10_2_decide_final_similar,
      'S11': this.S11__final,
      'show_image': this.show_image,
      'geolocation_err': this.geolocation_err,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '6', key);
    this.strategies[key] == null ? index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기'])
                                 : this.strategies[key](value, socket, user_data);
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
        await info_update.profile.update_drink_start(socket.id);
        await info_update.profile.update_stack(socket.id, `{"state": "${user_data.state}", "value": "${value}"}`);
        const chlist = ['안녕!! 술 고플 땐 언제나 코기를 찾아줘😏😆',
                        '안녕? 술이 몹시 땡기는 하루구나🍾',
                        '역시 술집 추천하는 동물은 나밖에 없지?',
                        '코기 와쪄😝🐶 오늘은 어디 술집을 털러 가볼까나😈',
                        '밖에서 빙글빙글 돌지 말고 나한테 결정을 맡겨줘!ㅎㅎ',
                        '뿅🐕🐕 나왔다!!',
                        '꼭 불금 불토만 있는게 아니지! 불월 불화(?) 불수 불목 불일 언제든 가능하다구ㅎㅎ',
                        'Life is Alcohol!!'];
        const rand = Math.floor(chlist.length * Math.random());

        index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['S1/1', '1차 (술+밥)'], ['S1/2,3', '2차 이상'], ['S2_2/gps', '500m 이내 술집 찾기 (GPS 켜줘!)']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S1__decide_subway(value, socket, user_data) {
    (async function () {
      try {
        console.log("S1 value >> ", value);
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        const drink_round = value.split('/')[1];

        let revisit;
        if (drink_round === 'another') {
          revisit = null;
          await info_update.profile.update_freq_subway(socket.id, 'null');
        } else {
          revisit = user_data.freq_subway;
          await info_update.profile.update_drink_round(socket.id, drink_round);
        }
        // 자주가는 지하철역 o
        if (revisit != null) {
          const chlist = [`이번에도 ${revisit} 고고?`,
                          `이번에도 ${revisit}에서 술 마실거야?`,
                          `이번에도 ${revisit}에서 마시는거 맞지?`,
                          `오늘도 ${revisit}?`,
                          `오늘도 ${revisit}에서 골라볼까?`,
                          `이번에도 ${revisit}에서 정하는거 맞아맞아?`,
                          `오늘도 ${revisit}에서 정해볼까?`,
                          `이번에도 ${revisit}에서 마실 곳 찾는거야?`];
          const rand = Math.floor(chlist.length * Math.random());
          index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['S2_freq', '응 맞아'], ['S1/another','다른 곳이야!']);
        }
        // 자주가는 지하철역 x
        else {
          const chlist = ['약속장소에서 가까운 지하철역을 입력해줘🚋',
                          '어디 근처의 술집을 정해줄까?',
                          '이번엔 어디에서 마셔볼까🍾',
                          '오늘은 어디 술집을 털러 가볼까나😈',
                          '오늘 술자리는 어디야?',
                          '오늘은 어느 역 근처 술집을 털어볼까?',
                          '어느 역 근처 술집을 골라줄까?',
                          '술 어디에서 마실거야~?'];
          const rand = Math.floor(chlist.length * Math.random());
          index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S2_1_decide_price_dinner(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        console.log("S2_1 value >> ", value);

        // 자주 가는 지하철역으로 올 경우
        if (value === 'S2_freq') {
          await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
          await info_update.profile.update_subway(socket.id, user_data.freq_subway);
        }
        // 그 외
        else {
          let subway = value.replace(/ /gi, '');    // 입력값에서 공백제거
          subway = (subway.slice(-1) !== '역') ? check_subway(`${subway}역`) : check_subway(subway);

          const result = await info_update.food.verify_subway(socket.id, subway);
          if (result === 'success') {
              await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
              const user_info = await info_update.profile.load_user(socket.id);
              const db_subway = await user_info.subway;
              (subway === db_subway) ? await info_update.profile.update_freq_subway(socket.id, subway)
                                     : await info_update.profile.update_freq_subway(socket.id, 'null');
              await info_update.profile.update_subway(socket.id, subway);
          }
          else {
            await index.sendSocketMessage(socket.id, 'chat message button', wrong_subway_input_msg(value), ['S1', '다시 입력하기']);
            return;
          }
        }

        const chlist = ['원하는 술+밥집 키워드를 하나만 골라봐!'];
        const rand = Math.floor(chlist.length * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['S3/11', '가성비 좋은'], ['S3/12', '캐주얼한 식사/술'], ['S3/13', '고급진 요리/술'], ['S3/14', '아주 특별한 기념일$$$$'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S2_2_decide_mood(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        console.log("S2_2 value >> ", value);

        // 자주가는 지하철역으로 왔을경우
        if (value === 'S2_freq') {
          await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
          await info_update.profile.update_subway(socket.id, user_data.freq_subway);
        }
        // S0 500m내 에서 왔을경우
        else if (value.includes('gps')) {
          if (value.split('/')[1].includes('gps')) {
            const lat = value.split(':')[1].split(',')[0];
            const lng = value.split(':')[1].split(',')[1];
            await info_update.profile.update_lat(socket.id, lat);
            await info_update.profile.update_lng(socket.id, lng);
          }
        }

        // 그 외의 경우
        else {
          let subway = value.replace(/ /gi, '');    // 입력값에서 공백제거
          subway = (subway.slice(-1) !== '역') ? check_subway(`${subway}역`) : check_subway(subway);

          const result = await info_update.food.verify_subway(socket.id, subway);
          if (result === 'success') {
              await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
              const user_info = await info_update.profile.load_user(socket.id);
              const db_subway = await user_info.subway;
              (subway === db_subway) ? await info_update.profile.update_freq_subway(socket.id, subway)
                                     : await info_update.profile.update_freq_subway(socket.id, 'null');
              await info_update.profile.update_subway(socket.id, subway);
          }
          else {
            await index.sendSocketMessage(socket.id, 'chat message button', wrong_subway_input_msg(value), ['S1', '다시 입력하기']);
            return;
          }
        }
        const chlist = ['어떤 컨셉의 술집을 골라줄까?'];
        const rand = Math.floor(chlist.length * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['S3/21', '가성비 술집'], ['S3/22', '가볍게 수다떨며 한잔'], ['S3/23', '분위기 있게 한잔'], ['S3/24', '아주 특별한 기념일$$$$'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S3__decide_drink_type(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        console.log("S3 value >> ", value);
        const keyword = value.split('/')[1];
        switch (keyword) {
          case '11':
            await info_update.profile.update_price_level_dinner(socket.id, '!2,!3,!4');
            break;
          case '12':
            await info_update.profile.update_price_level_dinner(socket.id, '2');
            break;
          case '13':
            await info_update.profile.update_price_level_dinner(socket.id, '3');
            await info_update.profile.update_mood2(socket.id, '!허름');
            break;
          case '14':
            await info_update.profile.update_price_level_dinner(socket.id, '4');
            await info_update.profile.update_mood2(socket.id, '!허름');
            break;
          case '21':
            await info_update.profile.update_mood1(socket.id, '하');
            break;
          case '22':
            await info_update.profile.update_mood1(socket.id, '중');
            break;
          case '23':
            await info_update.profile.update_mood1(socket.id, '상');
            await info_update.profile.update_mood2(socket.id, '!허름');
            break;
          case '24':
            await info_update.profile.update_mood1(socket.id, '특');
            await info_update.profile.update_mood2(socket.id, '!허름');
            break;

          default:
            break;
        }
        const result = await info_update.drink.verify_drinktype_list(socket.id, user_data.id);
        console.log("Drink-Type List ==> ", result.message);
        // ['소주', '생맥주', '양주' , '와인'...]
        const drink_type_list = ['소주', '맥주', '사케', '전통주', '와인', '양주&칵테일'].filter(element => {
          return result.message.indexOf(element) != -1;
        });
        console.log("Available Option ==> ", drink_type_list);
        const optionArr = [['888', '상관없음']];
        drink_type_list.forEach(type => {
          optionArr.push([type, type]);
        })
        optionArr.push(['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
        optionArr.push(['S4/', '선택완료']);

        const chlist = ['땡기는 주종은 뭐야!! 말만해!!!',
                        '술 종류를 모두~~ 선택해줘🍻',
                        '오늘은 어떤 술이 땡겨?🍾',
                        '자 오늘의 주종을 선택해 봅시다!',
                        '어떤 술이 좋아?? 질문이 너무 어렵나..?💀',
                        '마시고 싶은 술 종류를 모두~~ 골라봐~~~👻'];
        const rand = Math.floor(chlist.length * Math.random());
        await index.sendSocketMessage(socket.id, 'chat message button checkbox array', chlist[rand], optionArr);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S4__ask_fake_question(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        console.log("S4 value >> ", value);
        const drink_type = value.split('/')[1];
        await info_update.profile.update_drink_type(socket.id, drink_type);
        if (drink_type === '사케' || drink_type === '전통주' || drink_type === '와인' || drink_type === '양주&칵테일') {
          let reaction_list;
          switch (drink_type) {
            case '사케':
              reaction_list = ['요새 이자카야 같은 사케 파는 집이 늘고 있는 것 같아!', '사케 혼모노는 사케만 마신다는데...'];
              break;
            case '전통주':
              reaction_list = ['ㅇㅇ우리 것이 좋은 것이여👍', '막걸리~ 동동주~ 복분자주~ 🍵🍵', '막걸리 진짜 맛있는데 숙취가... (그런데 막걸리가 제일 숙취가 깔끔하다는 인간도 봤음)'];
              break;
            case '와인':
              reaction_list = [`"와인은 신이 인간에게 준 최고의 선물이다"라고 플라톤 선생이 말씀하셨대🍷`, '이름은 몰라도 비쌀수록 맛있다는 와인!! 사실은 2~3만원대 인데 엄청 높은 평점의 와인도 꽤 많다고 해🍷', '와인은 노화방지에 좋다고 하니까 죄책감 없이 쭈욱 마셔 ㅎㅎ (악마의 속삭임)'];
              break;
            case '양주&칵테일':
              reaction_list = ['혹시 실례가 안 된다면 샷 하나만...🍸', '양주는 숙취가 많이 없대니까 쭈욱 마셔 (악마의 속삭임)'];
              break;
          }
          const r = Math.floor(reaction_list.length * Math.random());
          await index.sendSocketMessage(socket.id, 'chat message button', reaction_list[r]);
        }

        const questions = [{'question': '오늘 주량 (소주로 치면) 소최몇 예상? (소주 최대 몇병)', 'answer': ['1병 미만', '2병', '3병 이상']},
                           {'question': '같이 먹는 사람 혹시 술버릇 심해?', 'answer': ['ㅇㅇ', '아니', '몰라', '혼술이야']},
                           {'question': '오늘 술이 달 것 같아? 쓸 것 같아?', 'answer': ['달거같아♡', '쓸거같아...']},
                           {'question': '같이 먹는 사람과의 친밀도는?', 'answer': ['친하지', '사실 별로 안 친해', '혼술']},
                           {'question': '오늘의 스트레스 지수는?', 'answer': ['기부니가 좋다!!', '스트레스 만땅 ㅠㅠ', '아무 생각 없어']},
                           {'question': '오늘의 피곤 지수는?', 'answer': ['컨디션 최고!', '피곤해 피곤해..', '그냥 중간이야']},
                           {'question': '어제 잠 몇 시간 잤어?', 'answer': ['7시간 이상', '7시간 미만']},
                           {'question': '통금시간 있어?🕛🕒', 'answer': ['통금 있어 ㅠㅠ', '그런 거 없다']},
                           {'question': '같이 먹는 사람 몇 명이야? (너 포함)', 'answer': ['혼술', '2명', '3~5명', '6명 이상']},
                           {'question': '오늘 컨디션 어때?', 'answer': ['컨디션 최고!', '피곤해 피곤해..', '그냥 중간이야']},
                           {'question': '술버릇이 있는 편이야?', 'answer': ['ㅇㅇ', '그런 거 없다']},
                           {'question': '술을 권하는 자리야?', 'answer': ['ㅇㅇ', '그런 거 없다']}];

        const rand = Math.floor(questions.length * Math.random());
        setTimeout(() => {
          if (questions[rand].answer.length === 2) {
            index.sendSocketMessage(socket.id, 'chat message button', questions[rand].question, ['S10', questions[rand].answer[0]], ['S10', questions[rand].answer[1]], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
          } else if (questions[rand].answer.length === 3) {
            index.sendSocketMessage(socket.id, 'chat message button', questions[rand].question, ['S10', questions[rand].answer[0]], ['S10', questions[rand].answer[1]], ['S10', questions[rand].answer[2]], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
          } else if (questions[rand].answer.length === 4) {
            index.sendSocketMessage(socket.id, 'chat message button', questions[rand].question, ['S10', questions[rand].answer[0]], ['S10', questions[rand].answer[1]], ['S10', questions[rand].answer[2]], ['S10', questions[rand].answer[3]], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', 'Decide_drink S4 :: answer in questions array length error.', ['get_started', '처음으로 돌아가기']);
          }
        }, 800);

      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S10__decide_final(value, socket, user_data) {
    (async function () {
      try {
        console.log("S10 value >> ", value);
        await info_update.profile.update_limit_cnt(socket.id, user_data.limit_cnt + 1);
        const response = await info_update.drink.get_drink_restaurant(socket.id, user_data.subway, user_data.price_dinner, user_data.mood1, user_data.mood2, user_data.drink_round, user_data.drink_type, user_data.lat, user_data.lng);
        const results = response.message;
        if (response.success) {
          const chlist1 = ['기 다 료 방',
                          '두구두구두구...',
                          '열씨미찾는중🐕🐕',
                          '기다려봐~~ 오예 술먹는다술먹는다~~',
                          '기달려봥ㅎㅎ 지금 알아보는 중이야'];
          const chlist2 = ['두 개의 술집 중 당신의 선택은?!',
                           '2개 술집 중 더 가고싶은 곳을 골라줘!',
                           '두둥~ 나왔다!! 둘 중에 어디가고싶어?',
                           '요깄다! 어디가 더 마음에 들어?😄😝',
                           '자! 더 마음에 드는데를 골라봐📌📌',
                           '둘중에 어디 갈까!!(이것도 고르기 힘들면 내가 골라줌^___^)',
                           '어디가 더 가고싶어?? 골라골라'];
          const imglist = ['emoji/calculate.png', 'emoji/calculate2.png', 'emoji/letmesee.png', 'emoji/letmesee2.png', 'emoji/letmesee3.png', 'emoji/letmesee4.png'];
          const rand1 = Math.floor(chlist1.length * Math.random());
          const rand2 = Math.floor(chlist2.length * Math.random());
          const rand_img = Math.floor(imglist.length * Math.random());

          if (results.length === 2) {
            await info_update.profile.update_rest2(user_data.kakao_id, results[0].id, results[1].id);
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${results[0].subway} ${results[0].res_name}`;
            const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${results[1].subway} ${results[1].res_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${results[0].subway} ${results[0].res_name}&tab=1`;
            const second_map_url = `https://map.naver.com/index.nhn?query=${results[1].subway} ${results[1].res_name}&tab=1`;
            const image = await info_update.food.crawl_two_image(socket.id, `${results[0].subway.slice(0, -1)} ${results[0].res_name}`, `${results[1].subway.slice(0, -1)} ${results[1].res_name}`);

            await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘 알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button image', chlist1[rand1], imglist[rand_img]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2]);
            if (user_data.lat != null && user_data.lng != null) {
              const distance1 = results[0].distance;
              const distance2 = results[1].distance;
              (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image distance',
                                                                                    ['S1l/1', results[0].res_name],
                                                                                    ['S11/2', results[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [results[0].res_name, results[0].drink_type, results[0].food_name, first_url, first_map_url],
                                                                                    [results[1].res_name, results[1].drink_type, results[1].food_name, second_url, second_map_url],
                                                                                    distance1, distance2)
                                          : await index.sendSocketMessage(socket.id, 'chat message card distance',
                                                                                    ['S11/1', results[0].res_name],
                                                                                    ['S11/2', results[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [results[0].res_name, results[0].drink_type, results[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                    [results[1].res_name, results[1].drink_type, results[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]],
                                                                                    distance1, distance2);
            }
            else {
              (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image',
                                                                                    ['S11/1', results[0].res_name],
                                                                                    ['S11/2', results[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [results[0].res_name, results[0].drink_type, results[0].food_name, first_url, first_map_url],
                                                                                    [results[1].res_name, results[1].drink_type, results[1].food_name, second_url, second_map_url])
                                          : await index.sendSocketMessage(socket.id, 'chat message card',
                                                                                    ['S11/1', results[0].res_name],
                                                                                    ['S11/2', results[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [results[0].res_name, results[0].drink_type, results[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                    [results[1].res_name, results[1].drink_type, results[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
            }
          }
          // 1개만 있는 경우
          else if (results.length === 1) {
            await info_update.profile.update_rest2(user_data.kakao_id, results[0].id, 'null');
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${results[0].subway} ${results[0].res_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${results[0].subway} ${results[0].res_name}&tab=1`;
            const image = await info_update.food.crawl_two_image(socket.id, `${results[0].subway.slice(0, -1)} ${results[0].res_name}`, `네이버`);

            await index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 술집이 1곳 뿐이네! 이거라도 보여줄게 기다료바!!');
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button image', chlist1[rand1], imglist[rand_img]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2]);

            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image single',
                                                                                  ['S11/1', results[0].res_name],
                                                                                  ['get_started', '처음으로 돌아가기'],
                                                                                  [results[0].res_name, results[0].drink_type, results[0].food_name, first_url, first_map_url])
                                        : await index.sendSocketMessage(socket.id, 'chat message card single',
                                                                                  ['S11/1', results[0].res_name],
                                                                                  ['get_started', '처음으로 돌아가기'],
                                                                                  [results[0].res_name, results[0].drink_type, results[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]]);
          } else {
            // 결과 0개
            index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 술집이 없다... 빡치지 말고 릴렉스하고... 한번만 다시 해보자!!', 'emoji/hungry2.png',['get_started', '처음으로 돌아가기']);
          }
        } else {
          // response.success = false.
          index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 술집이 없다... 빡치지 말고 릴렉스하고... 한번만 다시 해보자!!', 'emoji/hungry4.png', ['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S10_1_decide_final_others(value, socket, user_data) {
    (async function () {
      try {
        console.log("S10_1 value >> ", value);
        const result = await info_update.drink.get_other_drink_restaurant(socket.id, user_data.id, user_data.rest1, user_data.rest2);
        const rests = await result.message;
        if (result.success) {
          const chlist = [`다른 술집 찾는 중`, `까다로워 증말...`, `다른 술집 찾는 중🐕🐕`, '아~~ 이번에는 맘에 들어씀 조케땅~~'];
          const rand = Math.floor(chlist.length * Math.random());

          // 결과 2개일때
          if (result.num === 2) {
            await info_update.profile.update_rest2(user_data.kakao_id, rests[0].id, rests[1].id);
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${rests[0].subway} ${rests[0].res_name}`;
            const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${rests[1].subway} ${rests[1].res_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${rests[0].subway} ${rests[0].res_name}&tab=1`;
            const second_map_url = `https://map.naver.com/index.nhn?query=${rests[1].subway} ${rests[1].res_name}&tab=1`;

            const image = await info_update.food.crawl_two_image(socket.id, `${rests[0].subway.slice(0, -1)} ${rests[0].res_name}`, `${rests[1].subway.slice(0, -1)} ${rests[1].res_name}`);

            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', '2개 술집 중에 더 가고싶은 곳을 골라줘!');
            if (user_data.lat != null && user_data.lng != null) {
              const distance1 = rests[0].distance;
              const distance2 = rests[1].distance;
              (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image distance',
                                                                                    ['S1l/1', rests[0].res_name],
                                                                                    ['S11/2', rests[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url],
                                                                                    [rests[1].res_name, rests[1].drink_type, rests[1].food_name, second_url, second_map_url],
                                                                                    distance1, distance2)
                                          : await index.sendSocketMessage(socket.id, 'chat message card distance',
                                                                                    ['S11/1', rests[0].res_name],
                                                                                    ['S11/2', rests[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                    [rests[1].res_name, rests[1].drink_type, rests[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]],
                                                                                    distance1, distance2);
            } else {
              (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image',
                                                                                    ['S11/1', rests[0].res_name],
                                                                                    ['S11/2', rests[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url],
                                                                                    [rests[1].res_name, rests[1].drink_type, rests[1].food_name, second_url, second_map_url])
                                          : await index.sendSocketMessage(socket.id, 'chat message card',
                                                                                    ['S11/1', rests[0].res_name],
                                                                                    ['S11/2', rests[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                    [rests[1].res_name, rests[1].drink_type, rests[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
            }
          }
          // 결과 1개일때
          else if (result.num === 1) {
            await info_update.profile.update_rest2(user_data.kakao_id, rests[0].id, 'null');
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${rests[0].subway} ${rests[0].res_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${rests[0].subway} ${rests[0].res_name}&tab=1`;

            const image = await info_update.food.crawl_two_image(socket.id, `${rests[0].subway.slice(0, -1)} ${rests[0].res_name}`, `네이버`);

            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 술집이 1곳 뿐이네! 이거라도 보여줄게 기다료바!!');
            if (user_data.lat != null && user_data.lng != null) {
              const distance1 = rests[0].distance;
              (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image single distance',
                                                                                    ['S1l/1', rests[0].res_name],
                                                                                    ['get_started', '처음으로 돌아가기'],
                                                                                    [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url],
                                                                                    distance1)
                                          : await index.sendSocketMessage(socket.id, 'chat message card single distance',
                                                                                    ['S11/1', rests[0].res_name],
                                                                                    ['get_started', '처음으로 돌아가기'],
                                                                                    [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                    distance1);
            } else {
              (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image single',
                                                                                    ['S11/1', rests[0].res_name],
                                                                                    ['get_started', '처음으로 돌아가기'],
                                                                                    [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url])
                                          : await index.sendSocketMessage(socket.id, 'chat message card single',
                                                                                    ['S11/1', rests[0].res_name],
                                                                                    ['get_started', '처음으로 돌아가기'],
                                                                                    [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]]);
            }
          }
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '여긴 다른 술집이 없네 ㅠㅠ... 힝힝.', 'emoji/disappointed.png',['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S10_2_decide_final_similar(value, socket, user_data) {
    (async function () {
      try {
        console.log("S10_2 value >> ", value);
        const result = await info_update.drink.get_similar_drink_restaurant(socket.id, user_data.rest_final);
        const rests = await result.message;
        if (result.success) {
          const chlist = [`비슷한 술집 찾는 중`, `비슷한 술집 찾는 중🐕🐕`];
          const rand = Math.floor(chlist.length * Math.random());

          // 결과 2개일때
          if (result.num === 2) {
            await info_update.profile.update_rest2(user_data.kakao_id, rests[0].id, rests[1].id);
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${rests[0].subway} ${rests[0].res_name}`;
            const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${rests[1].subway} ${rests[1].res_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${rests[0].subway} ${rests[0].res_name}&tab=1`;
            const second_map_url = `https://map.naver.com/index.nhn?query=${rests[1].subway} ${rests[1].res_name}&tab=1`;
            const image = await info_update.food.crawl_two_image(socket.id, `${rests[0].subway.slice(0, -1)} ${rests[0].res_name}`, `${rests[1].subway.slice(0, -1)} ${rests[1].res_name}`);

            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', '2개 술집 중에 더 가고싶은 곳을 골라줘!');
            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image',
                                                                                  ['S11/1', rests[0].res_name],
                                                                                  ['S11/2', rests[1].res_name],
                                                                                  ['S11/random', '코기가 골라주기'],
                                                                                  [],
                                                                                  [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url],
                                                                                  [rests[1].res_name, rests[1].drink_type, rests[1].food_name, second_url, second_map_url])
                                        : await index.sendSocketMessage(socket.id, 'chat message card',
                                                                                  ['S11/1', rests[0].res_name],
                                                                                  ['S11/2', rests[1].res_name],
                                                                                  ['S11/random', '코기가 골라주기'],
                                                                                  [],
                                                                                  [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                  [rests[1].res_name, rests[1].drink_type, rests[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
          }
          // 결과 1개일때
          else if (result.num === 1) {
            await info_update.profile.update_rest2(user_data.kakao_id, rests[0].id, 'null');
            const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${rests[0].subway} ${rests[0].res_name}`;
            const first_map_url = `https://map.naver.com/index.nhn?query=${rests[0].subway} ${rests[0].res_name}&tab=1`;
            const image = await info_update.food.crawl_two_image(socket.id, `${rests[0].subway.slice(0, -1)} ${rests[0].res_name}`, `네이버`);

            await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
            await index.sendSocketMessage(socket.id, 'chat message loader', 500);
            await index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 술집이 1곳 뿐이네! 이거라도 보여줄게 기다료바!!');
            (image.res1 === 'no image') ? await index.sendSocketMessage(socket.id, 'chat message card no image single',
                                                                                  ['S11/1', rests[0].res_name],
                                                                                  ['get_started', '처음으로 돌아가기'],
                                                                                  [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url])
                                        : await index.sendSocketMessage(socket.id, 'chat message card single',
                                                                                  ['S11/1', rests[0].res_name],
                                                                                  ['get_started', '처음으로 돌아가기'],
                                                                                  [rests[0].res_name, rests[0].drink_type, rests[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]]);
          }
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '여긴 비슷한 술집이 없네 ㅠㅠ... 힝힝.', 'emoji/disappointed.png',['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S11__final(value, socket, user_data) {
    (async function () {
      try {
        console.log("S11 value >> ", value);
        let final_value;
        const select = value.split('/')[1];
        // 코기가 골라주기
        if (select === 'random') {
          final_value = (Math.random() < 0.5) ? user_data.rest1 : user_data.rest2;
          await info_update.profile.update_rest_final(socket.id, final_value);

          const rest_info = await info_update.food.get_restaurant_info(socket.id, parseInt(final_value));
          index.sendSocketMessage(socket.id, 'chat message button', `코기의 선택 : ${rest_info[0].res_name}`);
        }
        else if (select === '1') {
          await info_update.profile.update_rest_final(socket.id, user_data.rest1);
          final_value = user_data.rest1;
        }
        else if (select === '2') {
          await info_update.profile.update_rest_final(socket.id, user_data.rest2);
          final_value = user_data.rest2;
        }
        else if (select === 'back') {
          final_value = user_data.rest_final;
        }
        else {
          index.sendSocketMessage(socket.id, 'chat message button', 'Wrong final/ value.', ['get_started', '처음으로 돌아가기']);
        }

        const food_value = await info_update.food.get_restaurant_info(socket.id, final_value);
        await info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, final_value, food_value[0].res_name, food_value[0].subway);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
        const chooseimglist = ['emoji/choose.png','emoji/choose2.png','emoji/choose3.png','emoji/goodchoice.png'];
        const rand2 = Math.floor(chooseimglist.length * Math.random());

        await index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].drink_type}집이야!<br>`
          + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`,
            `${chooseimglist[rand2]}`,  ['show_image', '사진 보기'], ['S10_2', '비슷한 술집 보기'], ['get_started', '처음으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  geolocation_err(value, socket, user_data) {
    (async function() {
      try {
        index.sendSocketMessage(socket.id, 'chat message button', '위치를 확인할수 없어 ㅠㅠ', ['get_started', '처음으로 돌아가기'])
      } catch(e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
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
          index.sendSocketMessage(socket.id, 'chat message button', `아직 ${food_value[0].subway} ${food_value[0].res_name}에 대한 사진이 없어..ㅠㅠㅠ`, ['S11/back', '이전으로'], ['get_started', '처음으로 돌아가기']);
        } else {
          image = image.res1;
          index.sendSocketMessage(socket.id, 'chat message image', '사진만 봐도 가고싶지 않아~~~?', ['S11/back', '이전으로'], ['get_started', '처음으로 돌아가기'], image[0], image.length, image.splice(1));
          return;
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = Decide_drink;
