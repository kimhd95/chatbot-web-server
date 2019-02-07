

const moment = require('moment');
const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();

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
    } else if (user_data.state === 'decide_subway') {
      key = 'exitnum';
    } else if (user_data.state === 'search') {
      key = 'before_decide';
    } else if (key.includes('decide_menu/')) {
      key = 'price';
    } else if (key.includes('price/')) {
      key = 'decide_subway';
    } else if (key.includes('exit/')) {
      key = 'decision_score';
    } else if (key.includes('final/')) {
      key = 'final';
    } else if (key.includes('decision/random')) {
      key = 'taste';
    } else if (key.includes('decision/filter')) {
        key = 'mood2';
    } else if (key.includes('decision/search')) {
        key = 'search';
    } else if (key.includes('mood2/')) {
      key = 'taste';
    } else if (key.includes('taste/')) {
      key = 'food_type';
    } else if (key.includes('food_type/')) {
      key = 'before_decide';
    }

    this.strategies = {
      'decide_menu': this.decide_menu,
      'price': this.price,
      'no_price': this.no_price,
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
      'decision_score': this.decision_score,
      'fake_qna': this.fake_qna,
      'search': this.search,
      'location': this.location,
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
        if (user_info.registered == -1) {
            const chlist = ['안녕!! 배고플땐 언제나 코기를 찾아줘😏😆', '안녕 배고프지? 얼렁 메뉴를 정해볼까...🍚', '배고프지? 오늘도 스겜하자ㅋㅋㅋ⚡', '코기 와쪄😝🐶',
                '식사시간엔 결국 나를 찾게 되어있지^~^', '뿅🐕🐕 나왔다!', '솔직히 나만큼 세상을 평화롭게 하는 강아지는 없을거야',
                '이왕 먹는 밥 스트레스 안받고 깔끔하게 정하자구','안녕 코기 와쪄~!🐕','ㅎㅇㅎㅇㅎㅇ','배고프다 배고파!','맛있는~게~ 너무~ 많아~~~ ',
                '메뉴 정하는 데 5분이 넘게 걸린다면 그건 비효율적인 삶이야','결정장애는 부끄러운게 아냐 충분히 치유 가능하니까!!! 내가 있다면😘',
                '어서와!! 메뉴 정하러 가자👽', '2시간이나 굶었더니 당 떨어진다...👻'];
            const leng = chlist.length;
            const rand = Math.floor(leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}`, ['decide_menu/lunch', '점심 고르기'], ['decide_menu/dinner', '저녁 고르기']); //TODO: 각 상황에 따라 price 반영
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
            index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}`, ['decide_menu/lunch', '점심 고르기'], ['decide_menu/dinner', '저녁 고르기']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '아... 너무 많이 말했더니 🐶피곤.... 30분만 자고 다시 올게😪🌙', ['get_started', '처음으로 돌아가기']);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }


  price(value, socket, user_data) {
      (async function () {
          try {
              //await info_update.profile.update_price(socket.id, 'price'); TODO: update_price api 만들기(완료)
              const price_list = ['식사 예산은 어느 정도 생각해?', '오늘 너의 텅장💸이 허락하는 한도는?? ', '식사 가격은 얼마 정도였으면 좋겠어?',
                  '이번 식사. 얼마면 돼?!💰', '오늘 식사의 가격 상한선은~~?','얼마까지 긁을 수 있어? 💳'];
              const price_leng = price_list.length;
              const price_rand = Math.floor(price_leng * Math.random());
              index.sendSocketMessage(socket.id, 'chat message button checkbox price', price_list[price_rand],
                  ['0', '~1만원 미만'], ['1', '1만원 대'], ['2', '2만원 대'], ['3', '3만원 대'], ['4', '4만원 이상'], ['price/', '선택완료']);
                  //todo:상관없음 뺀 체크박스 버튼으로 구현(완료)
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
              const location_leng = location_list.length;
              const location_rand = Math.floor(location_leng * Math.random());
              index.sendSocketMessage(socket.id, 'chat message button', location_list[location_rand],
                  ['location/0', '응 정헀어'], ['location/1', 'ㄴㄴ 코기가 정해줘!']); // TODO:['location/2', '현재 위치']);
          } catch (e) {
              index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
              console.log(e);
          }
      }());
  }

  decide_subway(value, socket, user_data) {
      (async function () {
          try {
              const user_price = value.split('/')[1];
              await info_update.profile.update_price(socket.id, user_price);
              //TODO: price 반영(완료)

              if (user_data.freq_subway !== null) {
                  const revisit = user_data.freq_subway;
                  const freq_list = [`이번에도 ${revisit}에서 메뉴를 정하면 될까?`, `이번에도 ${revisit} 고고?`, `이번에도 ${revisit}에서 밥 먹을거야?`,
                      `이번에도 ${revisit}에서 먹는거 맞지?`, `오늘도 ${revisit}?`, `오늘도 ${revisit}에서 골라볼까?`,
                      `이번에도 ${revisit}에서 정하는거 맞아맞아?`, `오늘도 ${revisit}에서 메뉴 정해볼까?`, `이번에도 ${revisit}에서 먹을 곳 찾는거야?`];
                  const freq_leng = freq_list.length;
                  const freq_rand = Math.floor(freq_leng * Math.random());
                  index.sendSocketMessage(socket.id, 'chat message button', freq_list[freq_rand], [`${revisit}`, '응 맞아!'], ['decide_subway', '다른 곳이야!']);
              } else { //todo: freq_subway 구현(완료)
                  const chlist = ['어느 역 근처의 메뉴를 정해줄까?', '밥 어디에서 먹을거야?🍚', '밥 어디에서 먹어?', '어느 역 근처 메뉴를 정해줄까?',
                      '위치가 어디야? 원하는 곳에서 가까운 지하철역을 입력해줘🚋', '밥 어디에서 먹어? 챱챱', '이번에는 어느 역 근처의 메뉴를 정해볼까?',
                      '오늘 메뉴는 어디에서 정할까?', '오늘 메뉴는 어느 역에서 정해볼까?'];
                  const leng = chlist.length;
                  const rand = Math.floor(leng * Math.random());
                  index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}<br>ex) 강남역,신촌역`);
              }

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
        console.log(result);
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
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/강남역.png', ['999', '상관없어'], ['4', '1,2,3,4번'], ['3', '5,6,7,8번'], ['2', '9,10번'], ['1', '11,12번'], ['exit/', '선택완료']);
              break;
            }
            case '삼성역': {
                await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/삼성역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6번(코엑스 방면)'], ['1', '7,8번'], ['exit/', '선택완료']);
                break;
            }
            case '선릉역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/선릉역.png', ['999', '상관없어'], ['4', '1,2번'], ['3', '3,4번'], ['2', '5,6,7번'], ['1', '8,9,10번'], ['exit/', '선택완료']);
              break;
            }
            case '역삼역': {
              await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/역삼역.png', ['999', '상관없어'], ['4', '1번'], ['3', '2,3번'], ['2', '4,5,6번'], ['1', '7,8번'], ['exit/', '선택완료']);
              break;
            }
            case '잠실역': {
                await index.sendSocketMessage(socket.id, 'chat message button checkbox map', `${subway} 몇 번 출구?`, `${subway}`, 'images/잠실역.png', ['999', '상관없어'], ['4', '1,2,2-1,10,11번(석촌호수 방면)'], ['3', '3,4번(롯데백화점, 롯데월드 방면)'], ['2', '5,6번'], ['1', '7,8,9번'], ['exit/', '선택완료']);
                break;
            }
            default:
              index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[강남역, 삼성역, 선릉역, 역삼역, 잠실역]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_subway', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
              break;
          }
        } else {
          // await info_update.profile.update_state(socket.id, '1', 'decide_menu');
          index.sendSocketMessage(socket.id, 'chat message button', `지금 외식코기를 이용 가능한 곳은 서울[강남역, 삼성역, 선릉역, 역삼역, 잠실역]이야. 다른 곳 식당도 열심히 가서 먹어보고 곧 알려줄게!`, ['decide_subway', '다시 장소 입력하기'], ['get_started', '처음으로 돌아가기']);
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
              if (value.includes('exit')) {
                  const user_quarter = value.split('/')[1];
                  // console.log(user_quarter);
                  await info_update.profile.update_exit_quarter(socket.id, user_quarter);
              }
              const qna_list = [
                  {
                      'question': '오늘의 메뉴결정장애 지수는 몇 점이야??', 'button1_id': 'decision/random', 'button1_value': '100점: 난 아무생각이 없다', 'button2_id': 'mood2', 'button2_value': '50점: 뭔가 떠오를듯 말듯...', 'button3_id': 'decision/search', 'button3_value': '0점: 식당/메뉴명으로 검색하기',
                  },
                  {
                      'question': '오늘의 메뉴결정장애 점수는 몇 점?', 'button1_id': 'decision/random', 'button1_value': '100점: 아무거나><', 'button2_id': 'mood2', 'button2_value': '50점: 딱 찝지는 못해도 호불호는 존재', 'button3_id': 'decision/search', 'button3_value': '0점: 식당/메뉴명으로 검색하기',
                  },
                  {
                      'question': '오늘의 결정장애 지수를 점수로 표현한다면?', 'button1_id': 'decision/random', 'button1_value': '100점: 아무거나 먹을랭~', 'button2_id': 'mood2', 'button2_value': '50점: 분명히 땡기는게 있는데 말로 표현불가', 'button3_id': 'decision/search', 'button3_value': '0점: 식당/메뉴명으로 검색하기',
                  },
                  {
                      'question': '오늘의 결정장애 지수는?', 'button1_id': 'decision/random', 'button1_value': '100점: 나한테 아무런 결정을 바라지 말아줘', 'button2_id': 'mood2', 'button2_value': '50점: 옵션 주면 고를수 있을듯?!', 'button3_id': 'decision/search', 'button3_value': '0점: 식당/메뉴명으로 검색하기',
                  },
                  {
                      'question': '어떤 방식으로 메뉴를 정해보까나', 'button1_id': 'decision/random', 'button1_value': '코기의 랜덤질문', 'button2_id': 'mood2', 'button2_value': '맛/음식종류/분위기 필터링', 'button3_id': 'decision/search', 'button3_value': '식당/메뉴명으로 검색',
                  },
                  {
                      'question': '혹시 조금이라도 땡긴다거나 하는 음식종류가 있어??', 'button1_id': 'decision/random', 'button1_value': '당연히 없지~헤헷', 'button2_id': 'mood2', 'button2_value': '뭔가 살짝 땡기기는 해', 'button3_id': 'decision/search', 'button3_value': '식당/메뉴명으로 검색하기',
                  },
              ];
              const qna_list_leng = qna_list.length;
              const qna_list_rand = Math.floor(qna_list_leng * Math.random());
                index.sendSocketMessage(socket.id, 'chat message button', qna_list[qna_list_rand].question, [qna_list[qna_list_rand].button1_id, qna_list[qna_list_rand].button1_value], [qna_list[qna_list_rand].button2_id, qna_list[qna_list_rand].button2_value], [qna_list[qna_list_rand].button3_id, qna_list[qna_list_rand].button3_value]);
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
        const mood2_list = ['혹시 원하는 식당 분위기가 있어?', '어떤 분위기의 식당을 골라줄까?', '특별히 원하는 식당 분위기가 있어?', '어떤 분위기의 약속 장소를 잡아줄까?', '혹시 원하는 식당 분위기가 있으면 골라줘!']
        const mood2_leng = mood2_list.length;
        const mood2_rand = Math.floor(mood2_leng * Math.random());
        index.sendSocketMessage(socket.id, 'chat message button checkbox', mood2_list[mood2_rand], ['998', '상관없음'], ['향토적인', '향토적인'], ['고급진', '고급진'], ['프랜차이즈', '프랜차이즈'], ['인스타', '#인스타감성'], ['이국적', '이국적/퓨전'], ['뷔페', '뷔페/무한리필'], ['mood2/', '선택완료']);
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
        console.log('with_mood: '+user_mood2);
        if (value.includes('random')) {
          await info_update.profile.update_with_mood(socket.id, '캐주얼');
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
        index.sendSocketMessage(socket.id, 'chat message button', type_data[type_rand].question, [String(type_rand)+type_data[type_rand].button1_id, type_data[type_rand].button1_value], [String(type_rand)+type_data[type_rand].button2_id, type_data[type_rand].button2_value], ['food_type/all', '상관없음']);
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

  before_decide(value, socket, user_data) {
    (async function () {
      try {
        // console.log('내가 찍은 역명: '+user_data.subway);
        // console.log('내가 찍은 출구: '+user_data.exit_quarter);
        // console.log('내가 찍은 분위기: '+user_data.with_mood);
        // console.log('내가 찍은 분위기2: '+user_data.mood2);
        // console.log('내가 찍은 맛: '+user_data.taste);
        // console.log('받은 값:'+value);
        let user_food_type=value.split('/')[1];

        // 어떤 질문이든지 관계없이 상관없음을 눌렀으면 그냥 pass,
        // 아니라면 질문에 따라 user_food_type 값을 바꿔줘야 함.
        if(user_food_type!=='all'){
          // 질문 id 맨 앞에 question index를 붙여서 전달했음, 앞에 3개 질문이 아닌 경우는 선택에 영향을 주면 안 되므로 all로 처리함.
          if(Number(value.charAt(0))>=3){
            user_food_type='all';
          }
        }
        await info_update.profile.update_food_type(socket.id, user_food_type);
        const foods = await info_update.food.get_restaurant(socket.id, user_data.price_level, user_data.subway, user_data.exit_quarter, user_data.with_mood, user_data.mood2, user_data.taste, user_food_type, 'x');
        const foods_info = foods.message;
        if (foods_info.length === 2) {
          await info_update.profile.update_rest2(user_data.kakao_id, foods_info[0].id, foods_info[1].id);
          if (foods.try === 1) {
            index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!', ['decide_final', '고고'], ['get_started', '안할래']);
          } else if (foods.try === 2) {
            index.sendSocketMessage(socket.id, 'chat message button', `그 출구에는 딱 이거다 하는 곳은 없구... ${user_data.subway} 전체에서 2곳을 골라줄테니까 한 번 골라봐!`, ['decide_final', '고고'], ['get_started', '안할래']);
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

        const chlist = [`기 다 료 방`,`두구두구두구...`,`열씨미찾는중🐕🐕`,`기다려봐~~ 오예 술먹는다술먹는다~~`,`기달려방ㅎㅎ 지금 알아보는 중이야`];
        const leng = chlist.length;
        const rand = Math.floor(leng * Math.random());
        if (image.res1 === 'no image') {
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          await index.sendSocketMessage(socket.id, 'chat message card no image', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url]);
        } else {
          await index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]);
          await index.sendSocketMessage(socket.id, 'chat message loader', 500);
          await index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
          await index.sendSocketMessage(socket.id, 'chat message card', ['final/1', foods[0].res_name], ['final/2', foods[1].res_name], ['final/3', '챗봇이 골라주기'], [foods[0].res_name, foods[0].food_type, foods[0].food_name, first_url, first_map_url, image.res1[0], image.res1[1], image.res1[2]], [foods[1].res_name, foods[1].food_type, foods[1].food_name, second_url, second_map_url, image.res2[0], image.res2[1], image.res2[2]]);
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
          index.sendSocketMessage(socket.id, 'chat message button', `챗봇의 선택 : ${food_val[0].res_name}`);
          final_value = user_select_value[rand_select];
        }

        const food_value = await info_update.food.get_restaurant_info(socket.id, final_value);
        await info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, final_value, food_value[0].res_name, food_value[0].subway);
        const naver_url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${food_value[0].subway} ${food_value[0].res_name}`;
        const map_url = `https://map.naver.com/index.nhn?query=${food_value[0].subway} ${food_value[0].res_name}&tab=1`;

        if (moment().format('HH') >= 10 && moment().format('HH') <= 15 && food_value[0].lunch_option === 1) {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!<br>(런치메뉴 있음)`
            + `<hr class="link-line"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_blank" href="tel:${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image', '사진 보기'],
          ['decide_final', '결승전 다시하기'], ['get_started', '처음으로 돌아가기']);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', `오늘의 선택: ${food_value[0].res_name}<br>${food_value[0].subway}에 있는 ${food_value[0].food_name}을 파는 ${food_value[0].food_type}집이야!`
            + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a target="_blank" class="card-link" href="tel:${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image', '사진 보기'],
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
          + `<hr class="link-line"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a><br><a class="card-link" target="_blank" href="tel:${food_value[0].phone}"><i class="fa fa-phone"></i> 전화 걸기</a>`, ['show_image', '사진 보기'],
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
          index.sendSocketMessage(socket.id, 'chat message image', '자 귀찮은 너를 위해 대신 구글링한 사진이야', ['final_info_direct', '돌아가기'], ['get_started', '처음으로 돌아가기'], image[0], image.length, image.splice(1));
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
