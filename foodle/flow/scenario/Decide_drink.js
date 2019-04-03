

const moment = require('moment');
const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();

class Decide_drink {
  constructor(value, socket, user_data) {
    let key = value;
    if (key === 'decide_drink') {
      key = 'decide_drink';
    } else if (key.startsWith('S1/')) {
      key = 'S1';
    } else if (user_data.state === 'S1') {
      if (user_data.drink_round === '1')
        key = 'S2_1';
      else if (user_data.drink_round === '2,3')
        key = 'S2_2';
    } else if (key.startsWith('S2_2')) {
      key = 'S2_2';
    } else if (key.startsWith('S3/')) {
      key = 'S3';
    } else if (key.startsWith('S4/')) {
      key = 'S4';
    } else if (key.startsWith('S11/')) {
      key = 'S11';
    } else if (key === 'S10_2') {
    } else if (key === 'S10_3') {
    } else if (key === 'geolocation_err') {
      key = 'geolocation_err';
    }
    // else if (user_data.state === 'decide_drink') {
    //   key = 'exitnum';
    // } else if (key.includes('exit/')) {
    //   key = 'drink_type';
    // } else if (key.includes('drink_type/')) {
    //   key = 'drink_round';
    // } else if (key.includes('drink_round_3/')) {
    //   key = 'drink_round_3';
    // } else if (key.includes('mood2/') || key.includes('taste/')) {
    //   key = 'fake_qna';
    // } else if (key.includes('final/')) {
    //   key = 'final';
    // }

    this.strategies = {
      'decide_drink': this.decide_drink,
      // 'exitnum': this.exitnum,
      // 'drink_type': this.drink_type,
      // 'no_drink_type': this.no_drink_type,
      // 'drink_round': this.drink_round,
      // 'drink_round_3': this.drink_round_3,
      // 'drink_food': this.drink_food,
      // 'fake_qna': this.fake_qna,
      // 'decide_final': this.decide_final,
      // 'final': this.final,
      // 'final_info_direct': this.final_info_direct,
      // 'show_image': this.show_image,
      // 'decide_final_again': this.decide_final_again,

      'S1': this.S1__decide_subway,
      'S2_1': this.S2_1_decide_price_dinner,
      'S2_2': this.S2_2_decide_mood,
      'S3': this.S3__decide_drink_type,
      // 'S3_1': this.S3_1_decide_drink_type_reaction,
      'S4': this.S4__ask_fake_question,
      'S10': this.S10__decide_final,
      'S10_1': this.S10_1_decide_final_others,
      'S11': this.S11__final,
      'S10_2': this.S10_2_decide_final,
      'S10_3': this.S10_3_final,
      'geolocation_err': this.geolocation_err,
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
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
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
        await info_update.profile.update_drink_round(socket.id, drink_round);
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
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S2_1_decide_price_dinner(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        console.log("S2_1 value >> ", value);
        let subway = value.replace(/ /gi, '');    // 입력값에서 공백제거
        if (subway.slice(-1) !== '역') {
          subway = `${subway}역`;
        }
        switch (subway) {
          case '건대역':
          case '건국대역':
          case '건국대입구역':
          case '건국대학교역':
          case '건국대학교입구역':
          case '건입역':
            subway = '건대입구역';
            break;
          case '고대역':
          case '고려대학교역':
            subway = '고려대역';
            break;
          case '고터역':
            subway = '고속터미널역';
            break;
          case '남터역':
            subway = '남부터미널역';
            break;
          case '서울대역':
          case '서울대학교역':
          case '서울대학교입구역':
          case '설입역':
            subway = '서울대입구역';
            break;
          case '성대역':
          case '성대입구역':
          case '성신여대역':
            subway = '성신여대입구역';
            break;
          case '센텀역':
            subway = '센텀시티역';
            break;
          case '을입역':
            subway = '을지로입구역';
            break;
          case '이화여대역':
            subway = '이대역';
            break;
          case '홍대역':
          case '홍익대역':
          case '홍익대입구역':
          case '홍익대학교역':
          case '홍익대학교입구역':
          case '홍입역':
            subway = '홍대입구역';
            break;

          default:
            break;
        }

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
          await index.sendSocketMessage(socket.id, 'chat message button', `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`, ['S1', '다시 입력하기']);
          return;
        }

        const chlist = ['원하는 술+밥집 키워드를 하나만 골라봐!'];
        const rand = Math.floor(chlist.length * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['S3/11', '가성비 좋은'], ['S3/12', '캐주얼한 식사/술'], ['S3/13', '고급진 요리/술'], ['S3/14', '아주 특별한 기념일$$$$'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S2_2_decide_mood(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_stack(socket.id, user_data.stack + `,{"state": "${user_data.state}", "value": "${value}"}`);
        console.log("S2_2 value >> ", value);
        // S0 500m내 에서 왔을경우
        if(value.includes('gps')) {
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
          if (subway.slice(-1) !== '역') {
            subway = `${subway}역`;
          }
          switch (subway) {
            case '건대역':
            case '건국대역':
            case '건국대입구역':
            case '건국대학교역':
            case '건국대학교입구역':
            case '건입역':
              subway = '건대입구역';
              break;
            case '고대역':
            case '고려대학교역':
              subway = '고려대역';
              break;
            case '고터역':
              subway = '고속터미널역';
              break;
            case '남터역':
              subway = '남부터미널역';
              break;
            case '서울대역':
            case '서울대학교역':
            case '서울대학교입구역':
            case '설입역':
              subway = '서울대입구역';
              break;
            case '성대역':
            case '성대입구역':
            case '성신여대역':
              subway = '성신여대입구역';
              break;
            case '센텀역':
              subway = '센텀시티역';
              break;
            case '을입역':
              subway = '을지로입구역';
              break;
            case '이화여대역':
              subway = '이대역';
              break;
            case '홍대역':
            case '홍익대역':
            case '홍익대입구역':
            case '홍익대학교역':
            case '홍익대학교입구역':
            case '홍입역':
              subway = '홍대입구역';
              break;

            default:
              break;
          }

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
            await index.sendSocketMessage(socket.id, 'chat message button', `${value}가 어딘지 모르겠어 ㅠㅠ 다른 곳으로 입력해줄래?`, ['S1', '다시 입력하기']);
            return;
          }
        }
        const chlist = ['어떤 컨셉의 술집을 골라줄까?'];
        const rand = Math.floor(chlist.length * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['S3/21', '가성비 술집'], ['S3/22', '가볍게 수다떨며 한잔'], ['S3/23', '분위기 있게 한잔'], ['S3/24', '아주 특별한 기념일$$$$'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
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

        const chlist = ['땡기는 주종은 뭐야!! 말만해!!!',
                        '술 종류를 모두~~ 선택해줘🍻',
                        '오늘은 어떤 술이 땡겨?🍾',
                        '자 오늘의 주종을 선택해 봅시다!',
                        '어떤 술이 좋아?? 질문이 너무 어렵나..?💀',
                        '마시고 싶은 술 종류를 모두~~ 골라봐~~~👻'];
        const rand = Math.floor(chlist.length * Math.random());
        await index.sendSocketMessage(socket.id, 'chat message button checkbox', chlist[rand], ['888', '상관없음'], ['소주', '소주'], ['맥주', '맥주'], ['사케', '사케'], ['전통주', '전통주'], ['와인', '와인'], ['양주&칵테일', '양주&칵테일'], ['previous/' + user_data.stack.replace(/"/gi, "@"), '이전으로 돌아가기'], ['S4/', '선택완료']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
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
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
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
          const imglist = ['emoji/calculate.png', 'emoji/calculate2.png', 'emoji/letmesee.PNG', 'emoji/letmesee2.png', 'emoji/letmesee3.png', 'emoji/letmesee4.PNG'];
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
                                                                                    [results[0].res_name, results[0].food_type, results[0].food_name, first_url, first_map_url],
                                                                                    [results[1].res_name, results[1].food_type, results[1].food_name, second_url, second_map_url])
                                          : await index.sendSocketMessage(socket.id, 'chat message card',
                                                                                    ['S11/1', results[0].res_name],
                                                                                    ['S11/2', results[1].res_name],
                                                                                    ['S11/random', '코기가 골라주기'],
                                                                                    ['S10_1', '다른 술집 보기'],
                                                                                    [results[0].res_name, results[0].food_type, results[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]],
                                                                                    [results[1].res_name, results[1].food_type, results[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
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
                                                                                  [results[0].res_name, results[0].food_type, results[0].food_name, first_url, first_map_url])
                                        : await index.sendSocketMessage(socket.id, 'chat message card single',
                                                                                  ['S11/1', results[0].res_name],
                                                                                  ['get_started', '처음으로 돌아가기'],
                                                                                  [results[0].res_name, results[0].food_type, results[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]]);
          } else {
            // 결과 0개
            index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 술집이 없다... 빡치지 말고 릴렉스하고... 한번만 다시 해보자!!', 'emoji/hungry2.png',['get_started', '처음으로 돌아가기']);
          }
        } else {
          // response.success = false.
          index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 술집이 없다... 빡치지 말고 릴렉스하고... 한번만 다시 해보자!!', 'emoji/hungry4.png', ['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  // S10_1_decide_final(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       console.log("S10_1 value >> ", value);
  //
  //       const chlist1 = ['기 다 료 방',
  //                       '두구두구두구...',
  //                       '열씨미찾는중🐕🐕',
  //                       '기다려봐~~ 오예 술먹는다술먹는다~~',
  //                       '기달려봥ㅎㅎ 지금 알아보는 중이야'];
  //       const chlist2 = ['두 개의 술집 중 당신의 선택은?!',
  //                            '2개 술집 중 더 가고싶은 곳을 골라줘!',
  //                            '두둥~ 나왔다!! 둘 중에 어디가고싶어?',
  //                            '요깄다! 어디가 더 마음에 들어?😄😝',
  //                            '자! 더 마음에 드는데를 골라봐📌📌',
  //                            '둘중에 어디 갈까!!(이것도 고르기 힘들면 내가 골라줌^___^)',
  //                            '어디가 더 가고싶어?? 골라골라'];
  //       const rand1 = Math.floor(chlist1.length * Math.random());
  //       const rand2 = Math.florr(chlist2.length * Math.random());
  //
  //       await index.sendSocketMessage(socket.id, 'chat message button', chlist1[rand1]);
  //       await index.sendSocketMessage(socket.id, 'chat message loader', 500);
  //       await
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  S10_1_decide_final_others(value, socket, user_data) {
    (async function () {
      try {
        console.log("S10_1 value >> ", value);
        const result = await info_update.drink.get_other_drink_restaurant(socket.id, user_data.id, user_data.rest1, user_data.rest2);
        const rests = await result.message;
        if (result.success) {
          info_update.profile.update_rest2(user_data.kakao_id, rests[0].id, rests[1].id);
          const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${rests[0].subway} ${rests[0].res_name}`;
          const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${rests[1].subway} ${rests[1].res_name}`;
          const first_map_url = `https://map.naver.com/index.nhn?query=${rests[0].subway} ${rests[0].res_name}&tab=1`;
          const second_map_url = `https://map.naver.com/index.nhn?query=${rests[1].subway} ${rests[1].res_name}&tab=1`;

          const image = await info_update.food.crawl_two_image(socket.id, `${rests[0].subway.slice(0, -1)} ${rests[0].res_name}`, `${rests[1].subway.slice(0, -1)} ${rests[1].res_name}`);

          const chlist = [`다른 술집 찾는 중`, `까다로워 증말...`, `다른 술집 찾는 중🐕🐕`, '아~~ 이번에는 맘에 들어씀 조케땅~~'];
          const rand = Math.floor(chlist.length * Math.random());

          // 결과 2개일때
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
          // 결과 1개일때
        } else {
          index.sendSocketMessage(socket.id, 'chat message button image', '여긴 다른 술집이 없네 ㅠㅠ... 힝힝.', 'emoji/disappointed.PNG',['get_started', '처음으로 돌아가기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
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
        else {
          index.sendSocketMessage(socket.id, 'chat message button', 'Wrong final/ value.', ['get_started', '처음으로 돌아가기']);
        }

        const food_value = await info_update.food.get_restaurant_info(socket.id, final_value);
        await info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, final_value, food_value[0].res_name, food_value[0].subway);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
        const chooseimglist = ['emoji/choose.PNG','emoji/choose2.PNG','emoji/choose3.png','emoji/goodchoice.PNG'];
        const rand2 = Math.floor(chooseimglist.length * Math.random());

        await index.sendSocketMessage(socket.id, 'chat message button image', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name} 전문 ${food_value[0].drink_type}집이야!<br>`
          + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_self" href="#" onclick="location.href='tel:${food_value[0].phone}';"><i class="fa fa-phone"></i> 전화 걸기</a>`,
            `${chooseimglist[rand2]}`,  ['show_image/similar', '사진 보기'], ['get_started', '처음으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  S10_3_final(value, socket, user_data) {
    (async function () {
      try {
        console.log("S2_2 value >> ", value);
        let subway = value.replace(/ /gi, '');

        const chlist = ['어떤 컨셉의 술집을 골라줄까?'];
        const rand = Math.floor(chlist.length * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button', chlist[rand], ['S3/21', '가성비 술집'], ['S3/22', '가볍게 수다떨며 한잔'], ['S3/23', '분위기 있게 한잔'], ['S3/24', '아주 특별한 기념일$$$$']);
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

  // exitnum(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       let subway = value;
  //       if (value.slice(-1) !== '역') {
  //         subway = `${value}역`;
  //       }
  //       const subways = await info_update.food.get_all_subway(socket.id, '');
  //       const result = await info_update.food.verify_subway(socket.id, subway);
  //       if (result === 'success') {
  //         const chlist = [`${subway} 몇 번 출구쪽이 좋아??`,`${subway}에서 더 편한 출구가 있다면 골라줘!`,`${subway} 몇 번 출구쪽이 편해?`,`${subway} 몇 번 출구쪽이 좋아? 모르면 "상관없음"을 선택하면돼!`];
  //         const leng = chlist.length;
  //         const rand = Math.floor(leng * Math.random());
  //         await info_update.profile.update_subway(socket.id, subway);
  //         switch (subway) {
  //           case '강남역': {
  //             await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/강남역.png', ['999', '상관없어'], ['4', '1,2,3,4번'], ['3', '5,6,7,8번'], ['2', '9,10번'], ['1', '11,12번'], ['exit/', '선택완료']);
  //             break;
  //           }
  //           // case '서울대입구역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/서울대입구역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6번'], ['1', '7,8번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '성수역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/성수역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '신사역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/신사역.png', ['999', '상관없어'], ['4', '1,2,3번'], ['3', '4번'], ['2', '5번'], ['1', '6,7,8(가로수길)번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '신촌역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/신촌역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '서면역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/서면역.png', ['999', '상관없어'], ['3', '1,3,5,7번'], ['4', '2,4,6번'], ['1', '8,10,12번'], ['2', '9,11,13,15번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '센텀시티역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/센텀시티역.png', ['999', '상관없어'], ['4', '1,3,5번'], ['1', '2,4,6,8번'], ['3', '7,9,11,13번'], ['2', '10,12번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '건대입구역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/건대입구역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['3', '5,6번'], ['4', '롯데백화점 스타시티 방면'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '광화문역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/광화문역.png', ['999', '상관없어'], ['2', '1,7,8번'], ['1', '2,3,4,9번'], ['4', '5번'], ['3', '6번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '뚝섬역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/뚝섬역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '망원역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/망원역.png', ['999', '상관없어'], ['1', '1번'], ['2', '2번 (망리단길 방면)'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '사당역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/사당역.png', ['999', '상관없어'], ['4', '1,2,3번'], ['3', '4,5,6번'], ['2', '7,8,9,10번'], ['1', '11,12,13,14번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '삼성역': {
  //           //     await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/삼성역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6번(코엑스 방면)'], ['1', '7,8번'], ['exit/', '선택완료']);
  //           //     break;
  //           // }
  //           // case '선릉역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/선릉역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6,7번'], ['1', '8,9,10번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // // case '선정릉역': {
  //           // //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/선정릉역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
  //           // //   break;
  //           // // }
  //           // // case '여의도역': {
  //           // //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/여의도역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,4번 (IFC몰 방면)'], ['4', '5번'], ['3', '6번'], ['exit/', '선택완료']);
  //           // //   break;
  //           // // }
  //           // case '역삼역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/역삼역.png', ['999', '상관없어'], ['4', '1번'], ['3', '2,3번'], ['2', '4,5,6번'], ['1', '7,8번'], ['exit/', '선택완료']);
  //           //   break;
  //           //}
  //           // case '왕십리역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/왕십리역.png', ['999', '상관없어'], ['2', '1,2,3,4,5번 (성동구청 방면)'], ['1', '6,13번 (한양대 방면)'], ['3', '6-1,7,8,9,10,11,12번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '을지로입구역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/을지로입구역.png', ['999', '상관없어'], ['2', '1,1-1,2번'], ['1', '3,4번'], ['4', '5,6번'], ['3', '7,8번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '이태원역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/이태원역.png', ['999', '상관없어'], ['2', '1번'], ['1', '2번'], ['4', '3번'], ['3', '4번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '잠실역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/잠실역.png', ['999', '상관없어'], ['4', '1,2,2-1,10,11번(석촌호수 방면)'], ['3', '3,4번(롯데백화점, 롯데월드 방면)'], ['2', '5,6번'], ['1', '7,8,9번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '종각역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/종각역.png', ['999', '상관없어'], ['2', '1,2번'], ['1', '3,3-1번'], ['4', '4번'], ['3', '5,6번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '합정역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/합정역.png', ['999', '상관없어'], ['2', '1,2,9,10번'], ['1', '3,4,5,6번'], ['4', '7번'], ['3', '8번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '혜화역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/혜화역.png', ['999', '상관없어'], ['1', '1번'], ['4', '2번'], ['3', '3번'], ['2', '4번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           // case '홍대입구역': {
  //           //   await index.sendSocketMessage(socket.id, 'chat message button checkbox map', chlist[rand], `${subway}`, 'images/홍대입구역.png', ['999', '상관없어'], ['1', '1,2,3번 (연남동 방면)'], ['2', '4,5,6번(연남동 방면)'], ['3', '7,8,9번'], ['exit/', '선택완료']);
  //           //   break;
  //           // }
  //           default:
  //             //index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[${subways}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_drink', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
  //             index.sendSocketMessage(socket.id, 'chat message button', `지금 술집 고르기를 이용 가능한 곳은 서울[강남역]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_drink', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
  //               break;
  //         }
  //       } else {
  //         // await info_update.profile.update_state(socket.id, '1', 'decide_menu');
  //         //index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[${subways}]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_drink', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
  //         index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[강남역]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_drink', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
  //       }
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // no_exit(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       index.sendSocketMessage(socket.id, 'chat message button', '출구를 적어도 하나는 선택해줘!');
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // drink_type(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       let user_quarter = value.split('/')[1];
  //       if (value.includes('exit')) {
  //         await info_update.profile.update_exit_quarter(socket.id, user_quarter);
  //       }
  //       if (user_quarter === '999') {
  //         user_quarter = '1,2,3,4';
  //       }
  //       const chlist = [`땡기는 주종은 뭐야!! 말만해!!!(중복선택)`,`술 종류를 모두 다~~ 선택해줘🍻`,`오늘은 어떤 술이 땡겨?🍾(중복선택!!)`,`자 오늘의 주종을 선택해 봅시다!(중복선택)`,`어떤 술이 좋아?? 질문이 너무 어렵나..?💀(중복선택)`,`마시고 싶은 술 종류를 모두~~ 골라봐~~~👻(중복선택)`];
  //       const leng = chlist.length;
  //       const rand = Math.floor(leng * Math.random());
  //       let drink_type = await info_update.drink.find_subway_drink_type(socket.id, user_data.subway, user_quarter);
  //       index.sendSocketMessage(socket.id, 'chat message button dynamic checkbox', chlist[rand], ['상관없음', '상관없음'], drink_type, ['drink_type/', '선택완료']);
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // no_drink_type(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       index.sendSocketMessage(socket.id, 'chat message button', '술 종류를 적어도 하나는 선택해줘!');
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // drink_round(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       const user_drink_type = value.split('/')[1];
  //       await info_update.profile.update_drink_type(socket.id, user_drink_type);
  //       const qna_list = [
  //         {
  //           'question': '오늘 주량 (소주로 치면) 소최몇 예상?(소주 최대 몇병)🍾', 'button1_id': 'decide_final', 'button1_value': '1병 미만', 'button2_id': 'decide_final', 'button2_value': '2병', 'button3_id': 'decide_final', 'button3_value': '3병 이상',
  //         },
  //         {
  //           'question': '같이 먹는사람 혹시 술버릇 심해?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '아니/몰라/혼술이야',
  //         },
  //         {
  //           'question': '오늘 술이 달 것 같아? 쓸 것 같아?', 'button1_id': 'decide_final', 'button1_value': '달거같아♡', 'button2_id': 'decide_final', 'button2_value': '쓸거같아...',
  //         },
  //         {
  //           'question': '같이 먹는사람과의 친밀도는?', 'button1_id': 'decide_final', 'button1_value': '친하지', 'button2_id': 'decide_final', 'button2_value': '사실 별로 안친해/혼술',
  //         },
  //         {
  //           'question': '오늘의 스트레스 지수는?', 'button1_id': 'decide_final', 'button1_value': '기부니가 좋다!!', 'button2_id': 'decide_final', 'button2_value': '스트레스 만땅 ㅠㅠ',
  //         },
  //         {
  //           'question': '오늘의 피곤 지수는?', 'button1_id': 'decide_final', 'button1_value': '컨디션 최고!', 'button2_id': 'decide_final', 'button2_value': '피곤해 피곤해..',
  //         },
  //         {
  //           'question': '어제 잠 몇시간 잤어?', 'button1_id': 'decide_final', 'button1_value': '7시간 이상', 'button2_id': 'decide_final', 'button2_value': '7시간 미만',
  //         },
  //         {
  //           'question': '통금시간 있어?🕛🕒', 'button1_id': 'decide_final', 'button1_value': '통금 있어 ㅠㅠ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
  //         },
  //         {
  //           'question': '같이 먹는사람 몇 명이야?(너포함)', 'button1_id': 'decide_final', 'button1_value': '2명/혼술', 'button2_id': 'decide_final', 'button2_value': '3~5명', 'button3_id': 'decide_final', 'button3_value': '6명 이상',
  //         },
  //         {
  //           'question': '오늘 컨디션 어때?', 'button1_id': 'decide_final', 'button1_value': '컨디션 최고!', 'button2_id': 'decide_final', 'button2_value': '피곤해 피곤해..',
  //         },
  //         {
  //           'question': '술버릇이 있는 편이야?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
  //         },
  //         {
  //           'question': '술을 권하는 자리야?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
  //         },
  //       ];
  //       const qna_list_leng = qna_list.length;
  //       const qna_list_rand = Math.floor(qna_list_leng * Math.random());
  //       if (user_drink_type === '사케') {
  //         const chlist = [`요새 이자카야같은 사케 파는집이 늘고 있는것 같아!`,`사케 혼모노는 사케만 마신다는데...`];
  //         const leng = chlist.length;
  //         const rand = Math.floor(leng * Math.random());
  //         await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
  //         if (qna_list_rand === 0 || qna_list_rand === 8) {
  //           index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
  //         } else {
  //           index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //         }
  //       } else if (user_drink_type === '전통주') {
  //         const chlist = [`ㅇㅇ우리 것이 좋은 것이여👍 `,`막걸리~ 동동주~ 복분자주~ 🍵🍵`,`막걸리 진짜 맛있는데 숙취가... (그런데 막걸리가 제일 숙취가 깔끔하다는 인간도 봤음)`];
  //         const leng = chlist.length;
  //         const rand = Math.floor(leng * Math.random());
  //         await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
  //         if (qna_list_rand === 0 || qna_list_rand === 8) {
  //           index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
  //         } else {
  //           index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //         }
  //       } else if (user_drink_type === '와인') {
  //         const chlist = [`"와인은 신이 인간에게 준 최고의 선물이다"라고 플라톤 선생이 말씀하셨대🍷`,`이름은 몰라도 비쌀수록 맛있다는 와인!! 사실은 2~3만원대인데 엄청 높은 평점의 와인도 꽤 많다고 해🍷`,`와인은 노화방지에 좋다고 하니까 죄책감 없이 쭈욱 마셔 ㅎㅎ(악마의속삭임)`];
  //         const leng = chlist.length;
  //         const rand = Math.floor(leng * Math.random());
  //         await index.sendSocketMessage(socket.id, 'chat message button image', chlist[rand], 'emoji/wine.png');
  //         if (qna_list_rand === 0 || qna_list_rand === 8) {
  //           index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
  //         } else {
  //           index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //         }
  //       } else if (user_drink_type === '양주') {
  //         const chlist = [`혹시 실례가 안 된다면 샷 하나만...🍸`,`양주는 숙취가 많이 없대니까 쭈욱 마셔(악마의속삭임)`];
  //         const leng = chlist.length;
  //         const rand = Math.floor(leng * Math.random());
  //         await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
  //         if (qna_list_rand === 0 || qna_list_rand === 8) {
  //           index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
  //         } else {
  //           index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //         }
  //       } else if (user_drink_type.includes('소주') || user_drink_type.includes('맥주')) {
  //         const qna_list = [
  //           {
  //             'question': '지금 공복이야?', 'button1_id': 'drink_food', 'button1_value': '응 배고파', 'button2_id': 'drink_round_3/2', 'button2_value': '아니 밥먹고 왔지',
  //           },
  //           {
  //             'question': '지금 몇차야??', 'button1_id': 'drink_food', 'button1_value': '1차', 'button2_id': 'drink_round_3/2', 'button2_value': '2차', 'button3_id': 'drink_round_3/3', 'button3_value': '3차',
  //           },
  //           {
  //             'question': '혹시 배고파?', 'button1_id': 'drink_food', 'button1_value': '응 배고파', 'button2_id': 'drink_round_3/2', 'button2_value': '아니 배불러',
  //           },
  //           {
  //             'question': '빈속에서 술약속 시작이야??🍚', 'button1_id': 'drink_food', 'button1_value': '응 빈속이야', 'button2_id': 'drink_round_3/2', 'button2_value': '아니 밥은 먹었어!',
  //           },
  //         ];
  //         const qna_list_leng = qna_list.length;
  //         const qna_list_rand = Math.floor(qna_list_leng * Math.random());
  //           const imglist = ['emoji/ask.png','emoji/ask2.png','emoji/ask3.png','emoji/ask4.png'];
  //           const leng2 = imglist.length;
  //           const rand2 = Math.floor(leng2 * Math.random());
  //         if (qna_list_rand === 1) {
  //           index.sendSocketMessage(socket.id, 'chat message button image', qna_list[qna_list_rand].question, `${imglist[rand2]}`, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
  //         } else {
  //           index.sendSocketMessage(socket.id, 'chat message button image', qna_list[qna_list_rand].question, `${imglist[rand2]}`, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //         }
  //       } else {
  //         const qna_list = [
  //           {
  //             'question': '먹는거 SNS에 올리는거 좋아해?', 'button1_id': 'mood2/인스타', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/all', 'button2_value': 'ㄴㄴ',
  //           },
  //           {
  //             'question': 'SNS에 공유할만한 분위기로 추천해줘?', 'button1_id': 'mood2/인스타', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/all', 'button2_value': '굳이 그럴필요 없어ㅎㅎ',
  //           },
  //           // {
  //           //   'question': '혹시 고급진 술집을 찾고 있니?', 'button1_id': 'mood2/고급진', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/-고급진', 'button2_value': '아니',
  //           // },
  //           // {
  //           //   'question': '시끌벅적한 분위기도 괜찮아? ', 'button1_id': 'mood2/향토적인', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/-향토적인', 'button2_value': '아니',
  //           // },
  //         ];
  //         const qna_list_leng = qna_list.length;
  //         const qna_list_rand = Math.floor(qna_list_leng * Math.random());
  //         index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //       }
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // drink_food(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       await info_update.profile.update_drink_round(socket.id, '2 -3');
  //       const qna_list = [
  //         {
  //           'question': '안주로 기름진 음식 어때?', 'button1_id': 'taste/기름진', 'button1_value': '좋아', 'button2_id': 'taste/-기름진', 'button2_value': '별로',
  //         },
  //         {
  //           'question': '기름진 안주는 어때?', 'button1_id': 'taste/기름진', 'button1_value': '좋아', 'button2_id': 'taste/-기름진', 'button2_value': '별로',
  //         },
  //         {
  //           'question': '치즈 들어간 안주 어때?', 'button1_id': 'taste/치즈', 'button1_value': '좋아', 'button2_id': 'taste/-치즈', 'button2_value': '별로',
  //         },
  //         {
  //           'question': '치즈 들어간 안주 좋아해?', 'button1_id': 'taste/치즈', 'button1_value': '좋아', 'button2_id': 'taste/-치즈', 'button2_value': '별로',
  //         },
  //         // {
  //         //   'question': '안주로 매운음식은 어때?', 'button1_id': 'taste/매운', 'button1_value': '좋아', 'button2_id': 'taste/-매운', 'button2_value': '별로',
  //         // },
  //         // {
  //         //   'question': '매운음식 좋아해?', 'button1_id': 'taste/매운', 'button1_value': '좋아', 'button2_id': 'taste/-매운', 'button2_value': '별로',
  //         // },
  //         {
  //           'question': '안주는 짭짤하거나 자극적인 맛 괜찮??', 'button1_id': 'taste/기름진', 'button1_value': '좋아', 'button2_id': 'taste/-기름진', 'button2_value': '별로',
  //         },
  //         {
  //           'question': '막 살찔것 같은... 안주도 괜찮아?ㅎㅎ', 'button1_id': 'taste/기름진', 'button1_value': '좋아', 'button2_id': 'taste/-기름진', 'button2_value': '별로',
  //         },
  //         {
  //           'question': '오늘 날씨가 추워?', 'button1_id': 'taste/기름진', 'button1_value': '추워', 'button2_id': 'taste/-기름진', 'button2_value': '안 추워',
  //         },
  //         {
  //           'question': '오늘 따뜻한 국물이 땡겨?', 'button1_id': 'taste/기름진', 'button1_value': '땡겨', 'button2_id': 'taste/-기름진', 'button2_value': '안 땡겨',
  //         },
  //       ];
  //       const qna_list_leng = qna_list.length;
  //       const qna_list_rand = Math.floor(qna_list_leng * Math.random());
  //       const user_drink_round = value.split('/')[1];
  //       index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // drink_round_3(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       await info_update.profile.update_drink_round(socket.id, '3');
  //       const qna_list = [
  //         {
  //           'question': '먹는거 SNS에 올리는거 좋아해?', 'button1_id': 'mood2/인스타', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/all', 'button2_value': 'ㄴㄴ',
  //         },
  //         {
  //           'question': 'SNS에 공유할만한 분위기로 추천해줘?', 'button1_id': 'mood2/인스타', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/all', 'button2_value': '굳이 그럴필요 없어ㅎㅎ',
  //         },
  //         // {
  //         //   'question': '혹시 고급진 술집을 찾고 있니?', 'button1_id': 'mood2/고급진', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/-고급진', 'button2_value': '아니',
  //         // },
  //         // {
  //         //   'question': '시끌벅적한 분위기도 괜찮아? ', 'button1_id': 'mood2/향토적인', 'button1_value': 'ㅇㅇ', 'button2_id': 'mood2/-향토적인', 'button2_value': '아니',
  //         // },
  //       ];
  //       const qna_list_leng = qna_list.length;
  //       const qna_list_rand = Math.floor(qna_list_leng * Math.random());
  //       const user_drink_round = value.split('/')[1];
  //       if (user_drink_round === '2') {
  //         const chlist = [`간다간다~ 오늘 3차까지 간다~~`,`그럼 밥은 해결된거고... 술 위주로 추천해줄게!`,`밥메뉴 고를때도 외식코기! 술메뉴도 외식코기! 언제나 외식코기 포에버 외식코기!!! 🐕🐕🐕`];
  //         const leng = chlist.length;
  //         const rand = Math.floor(leng * Math.random());
  //         await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
  //         index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //       } else {
  //         const chlist = [`옹... 그 정신에 이 앱을 켰다고...? 대단한데ㅋㅋㅋㅋ`,`대단.... 대단쓰....`,`역시 한국인!!! 자랑스럽다 !!!`,`너...나의 수울메이트가 되지 않을래..?🥂`,`귀소본능 발휘해서 집 안전하게 들어가야돼...ㄷㄷㄷ`];
  //         const leng = chlist.length;
  //         const rand = Math.floor(leng * Math.random());
  //         await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
  //         index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //       }
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // fake_qna(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       const user_input_value = value.split('/')[1];
  //       if (value.includes('taste')) {
  //         await info_update.profile.update_taste(socket.id, user_input_value);
  //       } else if (value.includes('mood2')) {
  //         await info_update.profile.update_mood2(socket.id, user_input_value);
  //       }
  //       const qna_list = [
  //         {
  //           'question': '오늘 주량 (소주로 치면) 소최몇 예상?(소주 최대 몇병)🍾', 'button1_id': 'decide_final', 'button1_value': '1병 미만', 'button2_id': 'decide_final', 'button2_value': '2병', 'button3_id': 'decide_final', 'button3_value': '3병 이상',
  //         },
  //         {
  //           'question': '같이 먹는사람 혹시 술버릇 심해?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '아니/몰라/혼술이야',
  //         },
  //         {
  //           'question': '오늘 술이 달 것 같아? 쓸 것 같아?', 'button1_id': 'decide_final', 'button1_value': '달거같아♡', 'button2_id': 'decide_final', 'button2_value': '쓸거같아...',
  //         },
  //         {
  //           'question': '같이 먹는사람과의 친밀도는?', 'button1_id': 'decide_final', 'button1_value': '친하지', 'button2_id': 'decide_final', 'button2_value': '사실 별로 안친해/혼술',
  //         },
  //         {
  //           'question': '오늘의 스트레스 지수는?', 'button1_id': 'decide_final', 'button1_value': '기부니가 좋다!!', 'button2_id': 'decide_final', 'button2_value': '스트레스 만땅 ㅠㅠ',
  //         },
  //         {
  //           'question': '오늘의 피곤 지수는?', 'button1_id': 'decide_final', 'button1_value': '컨디션 최고!', 'button2_id': 'decide_final', 'button2_value': '피곤해 피곤해..',
  //         },
  //         {
  //           'question': '어제 잠 몇시간 잤어?', 'button1_id': 'decide_final', 'button1_value': '7시간 이상', 'button2_id': 'decide_final', 'button2_value': '7시간 미만',
  //         },
  //         {
  //           'question': '통금시간 있어?🕛🕒', 'button1_id': 'decide_final', 'button1_value': '통금 있어 ㅠㅠ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
  //         },
  //         {
  //           'question': '같이 먹는사람 몇 명이야?(너포함)', 'button1_id': 'decide_final', 'button1_value': '2명/혼술', 'button2_id': 'decide_final', 'button2_value': '3~5명','button3_id': 'decide_final', 'button3_value': '6명 이상',
  //         },
  //         {
  //           'question': '오늘 컨디션 어때?', 'button1_id': 'decide_final', 'button1_value': '컨디션 최고!', 'button2_id': 'decide_final', 'button2_value': '피곤해 피곤해..',
  //         },
  //         {
  //           'question': '술버릇이 있는 편이야?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
  //         },
  //         {
  //           'question': '술을 권하는 자리야?', 'button1_id': 'decide_final', 'button1_value': 'ㅇㅇ', 'button2_id': 'decide_final', 'button2_value': '그런 거 없다',
  //         },
  //       ];
  //       const qna_list_leng = qna_list.length;
  //       const qna_list_rand = Math.floor(qna_list_leng * Math.random());
  //       if (qna_list_rand === 0 || qna_list_rand === 8) {
  //         index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
  //       } else {
  //         index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value]);
  //       }
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // decide_final(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 오예 술먹는다술먹는다~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`];
  //       const leng = chlist.length;
  //       const rand = Math.floor(leng * Math.random());
  //
  //       console.log("subway: "+user_data.subway);
  //       console.log("exit_quarter: "+user_data.exit_quarter);
  //       console.log("mood2: "+user_data.mood2);
  //       console.log("taste: "+user_data.taste);
  //       console.log("drink_round: "+user_data.drink_round);
  //       console.log("drink_type: "+user_data.drink_type);
  //
  //       const drink_rest_result = await info_update.drink.get_drink_restaurant(socket.id, user_data.subway, user_data.exit_quarter, user_data.mood2, user_data.taste, user_data.drink_round, user_data.drink_type);
  //       const rest_info = drink_rest_result.message;
  //       console.log(rest_info);
  //       console.log(drink_rest_result.try);
  //       if (rest_info.length === 2) {
  //         await info_update.profile.update_limit_cnt_drink(socket.id, user_data.limit_cnt_drink + 1);
  //         await info_update.profile.update_rest2(user_data.kakao_id, rest_info[0].id, rest_info[1].id);
  //         const foods = await info_update.food.get_two_restaurant(socket.id, rest_info[0].id, rest_info[1].id);
  //         const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
  //         const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
  //         const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
  //         const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;
  //
  //         const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].subway.slice(0, -1)} ${foods[0].res_name}`, `${foods[1].subway.slice(0, -1)} ${foods[1].res_name}`);
  //
  //         if (drink_rest_result.try === 1) {
  //           await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
  //           await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
  //           await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
  //           await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
  //           if (image.res1 === 'no image') {
  //             await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
  //           } else {
  //             await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
  //           }
  //         } else if (drink_rest_result.try === 2) {
  //           await index.sendSocketMessage(socket.id, 'chat message button', `조건에 딱 맞는 술집이 ${user_data.subway} 선택한 출구에는 없네... 다른 출구에서 두 곳 보여줄게!`);
  //           await index.sendSocketMessage(socket.id, 'chat message loader', 2000);
  //           await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
  //           await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
  //           if (image.res1 === 'no image') {
  //             await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
  //           } else {
  //             await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
  //           }
  //         }
  //       } else {
  //         index.sendSocketMessage(socket.id, 'chat message button image', '조건에 맞는 술집이 아직 없어... 자자 침착하고... 다시 하자!ㅎㅎㅎ','emoji/angry2.PNG', ['get_started', '돌아가기']);
  //       }
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // final(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       if (user_data.drink_before === false) {
  //         await info_update.profile.update_drink_before(socket.id, 1);
  //       }
  //       const user_select = parseInt(value.split('/')[1]);
  //       let final_value;
  //       if (user_select === 1) {
  //         await info_update.profile.update_rest_final(socket.id, user_data.rest1);
  //         final_value = user_data.rest1;
  //       } else if (user_select === 2) {
  //         await info_update.profile.update_rest_final(socket.id, user_data.rest2);
  //         final_value = user_data.rest2;
  //       } else if (user_select === 3) {
  //         const user_select_value = [user_data.rest1, user_data.rest2];
  //         const rand_select = Math.floor(user_select_value.length * Math.random());
  //         await info_update.profile.update_rest_final(socket.id, user_select_value[rand_select]);
  //
  //         const food_val = await info_update.food.get_restaurant_info(socket.id, parseInt(user_select_value[rand_select]));
  //         index.sendSocketMessage(socket.id, 'chat message button', `챗봇의 선택 : ${food_val[0].res_name}`);
  //         final_value = user_select_value[rand_select];
  //       }
  //
  //       const food_value = await info_update.food.get_restaurant_info(socket.id, final_value);
  //       await info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, final_value, food_value[0].res_name, food_value[0].subway);
  //       const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
  //       const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
  //       if (food_value[0].food_type === null) {
  //         food_value[0].food_type = '';
  //       }
  //       index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!`
  //         + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_blank" href="tel://${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image', '사진 보기'],
  //       ['decide_final_again', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // final_info_direct(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       const food_value = await info_update.food.get_restaurant_info(socket.id, user_data.rest_final);
  //       const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
  //       const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;
  //       if (food_value[0].food_type === null) {
  //         food_value[0].food_type = '';
  //       }
  //       index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!`
  //         + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_blank" href="tel://${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image', '사진 보기'],
  //       ['decide_final_again', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // show_image(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       const food_value = await info_update.food.get_restaurant_info(socket.id, user_data.rest_final);
  //       let image = await info_update.food.crawl_image(socket.id, `${food_value[0].subway.slice(0, -1)} ${food_value[0].res_name}`);
  //
  //       if (image.res1 === 'no image') {
  //         index.sendSocketMessage(socket.id, 'chat message button', `아직 ${food_value[0].subway} ${food_value[0].res_name}에 대한 사진이 없어요..ㅠㅠㅠ`, ['final_info_direct', '돌아가기'], ['get_started', '처음으로 돌아가기']);
  //       } else {
  //         image = image.res1;
  //         index.sendSocketMessage(socket.id, 'chat message image', '사진만 봐도 가고싶지 않나요~~~?', ['final_info_direct', '돌아가기'], ['get_started', '처음으로 돌아가기'], image[0], image.length, image.splice(1));
  //         return;
  //       }
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }
  //
  // decide_final_again(value, socket, user_data) {
  //   (async function () {
  //     try {
  //       const foods = await info_update.food.get_two_restaurant(socket.id, user_data.rest1, user_data.rest2);
  //       const first_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[0].subway} ${foods[0].res_name}`;
  //       const second_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${foods[1].subway} ${foods[1].res_name}`;
  //       const first_map_url = `https://map.naver.com/index.nhn?query=${foods[0].subway} ${foods[0].res_name}&tab=1`;
  //       const second_map_url = `https://map.naver.com/index.nhn?query=${foods[1].subway} ${foods[1].res_name}&tab=1`;
  //       const image = await info_update.food.crawl_two_image(socket.id, `${foods[0].subway.slice(0, -1)} ${foods[0].res_name}`, `${foods[1].subway.slice(0, -1)} ${foods[1].res_name}`);
  //
  //       await index.sendSocketMessage(socket.id, 'chat message button', '오키 잘알겠어~ 2곳을 골라줄테니까 한 번 골라봐!');
  //       await index.sendSocketMessage(socket.id, 'chat message loader', 2500);
  //       if (image.res1 === 'no image') {
  //         await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
  //       } else {
  //         await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
  //       }
  //
  //     } catch (e) {
  //       index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
  //       console.log(e);
  //     }
  //   }());
  // }


}

module.exports = Decide_drink;
