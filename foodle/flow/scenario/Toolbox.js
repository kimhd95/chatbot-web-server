

const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();

class Toolbox {
  constructor(value, socket, user_data) {
    console.log("toolbox에 들어옴");
    const key = value;

    this.strategies = {
      'get_started': this.get_started,
      'decide_menu': this.decide_menu,
      'decide_drink': this.decide_drink,
      'decide_cafe': this.decide_cafe,
      'decide_place': this.decide_place,
      'decide_history': this.decide_history,
      'user_feedback': this.user_feedback,
      'chitchat': this.chitchat,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    // this.update_state(socket.id,'1',key);
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

  get_started(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_state(socket.id, '100', 'init');
        const chlist2 = ['그래 뭘 도와줄까?', '난 갈수록 다재다능해지고 있어ㅎㅎ', '세상의 모든 음식을 먹어보는게 내 목표야', '할 줄 아는 건 별로 없지만 골라봐',
          '아 배고프다', '기능 나와라(쭈우욱)', '우리나라는 정말 미식의 나라인듯! 맛있는게 너무 많아',
          '많고 많은 외식메뉴 중에 뭘 고를지 모를땐 나를 찾아줘', '앞으로 더 많은 기능을 추가할 예정이니 기다려줘~', '일단은 서울에 있는 맛집을 섭렵한 뒤에 전국으로 진출할 예정이야!(다음엔 해외로..?)', '배고파! 너도 배고프니까 날 불렀겠지?'];
        const leng2 = chlist2.length;
        const rand2 = Math.floor(leng2 * Math.random());
        await info_update.profile.register(socket.id);
        if(user_data.registered==='-1'){
          index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2], ['decide_menu', '메뉴 고르기'], ['decide_drink', '술집 고르기'], ['decide_cafe', '카페 고르기'], ['user_feedback', '개발팀에게 피드백하기']);
        }
        else{
          index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2], ['decide_menu', '메뉴 고르기'], ['decide_drink', '술집 고르기'], ['decide_cafe', '카페 고르기'], ['user_feedback', '개발팀에게 피드백하기']);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_menu(value, socket, user_data) {
    (async function () {
      try {
        const user_info = await info_update.profile.load_user(socket.id);
        if (user_info.registered == -1){
          await index.sendSocketMessage(socket.id, 'chat message button', '안녕안녕 반가워! 나는 앞으로 너의 행복한 외식라이프를 책임질 외식코기야🍜🍖');
          index.sendSocketMessage(socket.id, 'chat message button', '70% 이상의 사람들이 메뉴를 고를 때 결정장애를 겪는대...🚋 이.제.부.턴.!! 내가 동물지능(?)으로 그날그날 너의 기분과 상황에 맞는 메뉴를 결정해줄게 렛츠고😆', ['decide_menu', '렛츠고!']);
          await info_update.profile.update_state(socket.id, '1', 'decide_menu');
        }
        else {
          const db_subway = await user_info.subway;
          if (db_subway === null) {
            await info_update.food.update_user_start(socket.id);
          }
          console.log(user_data.limit_cnt);
          const verify_limit = await info_update.profile.verify_limit(socket.id, user_data.limit_cnt, user_data.decide_updated_at);
          const { result } = verify_limit;
          if (result === 'success') {
            await index.sendSocketMessage(socket.id, 'chat message button', '안녕안녕 반가워! 나는 앞으로 너의 행복한 외식라이프를 책임질 외식코기야🍜🍖');
            index.sendSocketMessage(socket.id, 'chat message button', '70% 이상의 사람들이 메뉴를 고를 때 결정장애를 겪는대...🚋 이.제.부.턴.!! 내가 동물지능(?)으로 그날그날 너의 기분과 상황에 맞는 메뉴를 결정해줄게 렛츠고😆', ['decide_menu', '렛츠고!']);
            await info_update.profile.update_state(socket.id, '1', 'decide_menu');
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '한 끼당 메뉴를 5번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_drink(value, socket, user_data) {
    (async function () {
      try {
        if ((user_data.registered == -1) || (user_data.drink_before === false)){
          const verify_limit = await info_update.profile.verify_limit_drink(socket.id, user_data.limit_cnt_drink, user_data.decide_updated_at_drink);
          const { result } = verify_limit;
          if (result === 'success') {
            await index.sendSocketMessage(socket.id, 'chat message button', '안녕 나는 놀랍게도 국내최초 술집추천 서비스를 제공하고있는 외식코기야🍜🍖');
            await info_update.profile.update_state(socket.id, '6', 'init');
            index.sendSocketMessage(socket.id, 'chat message button', '보통 강아지는 술을 못 먹지만 나는 특별하니까...에헴\n이.제.부.턴.!! 내가 동물지능(?)으로 때로는 고상하게 때로는 개가되게!(?) 맞는 술집을 찾아줄게 렛츠고😆', ['decide_drink', '렛츠고!']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '한 끼당 메뉴를 5번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
          }
        }
        else {
          // const db_subway = await user_info.subway;
          // if (db_subway === null) {
          //   await info_update.food.update_user_start(socket.id);
          // }
          console.log(user_data.limit_cnt);
          const verify_limit = await info_update.profile.verify_limit_drink(socket.id, user_data.limit_cnt_drink, user_data.decide_updated_at_drink);
          const { result } = verify_limit;
          if (result === 'success') {
            await info_update.profile.update_drink_start(socket.id);
            const drink_chlist = ['안녕!! 술고플땐 언제나 코기를 찾아줘😏😆 오늘은 어디 근처의 술집을 정해줄까?', '안녕? 술이 몹시 땡기는 하루구나🍾 이번엔 어디에서 마실거야?', '역시 술집 추천하는 동물은 나밖에 없지? 이번엔 어디에서 마셔볼까🍾', '코기 와쪄😝🐶 오늘은 어디 술집을 털러 가볼까나😈',
              '밖에서 빙글빙글 돌지 말고 나한테 결정을 맡겨줘!ㅎㅎ 오늘 술자리는 어디야?', '뿅🐕🐕 나왔다!! 오늘은 어느 역 근처 술집을 털어볼까?', '꼭 불금 불토만 있는게 아니지! 불월 불화(?) 불수 불목 불일 언제든 가능하다구ㅎㅎ 어디서 마실래?',
              'Life is Alcohol!! 어느역 근처 술집을 골라줄까?'];
            const leng = drink_chlist.length;
            const rand = Math.floor(leng * Math.random());
            await info_update.profile.update_state(socket.id, '6', 'decide_drink');
            index.sendSocketMessage(socket.id, 'chat message button', drink_chlist[rand]);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '30분에 술집을 5번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_cafe(value, socket, user_data) {
    (async function () {
      try {
        if ((user_data.registered == -1) || (user_data.cafe_before === false)){
          const verify_limit = await info_update.profile.verify_limit_cafe(socket.id, user_data.limit_cnt_cafe, user_data.decide_updated_at_cafe);
          const { result } = verify_limit;
          if (result === 'success') {
            await index.sendSocketMessage(socket.id, 'chat message button', '안녕 나는 당 떨어지면 으르렁 으르렁대는 외식코기야😈🍭' );
            await info_update.profile.update_state(socket.id, '7', 'init');
            index.sendSocketMessage(socket.id, 'chat message button', '커피, 빙수, 마카롱, 케이크☕🍨🍰\n대한민국은 카페천국! 더욱 심해지는 결정장애!!!\n걱정마 내가 동물지능(?)으로 너의 취향저격 카페를 골라줄게 렛츠고😆', ['decide_cafe', '렛츠고!']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '한 끼당 카페를 5번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
          }
        }
        else {
          if(user_data.freq_subway_cafe !== null) {
            const verify_limit = await info_update.profile.verify_limit_cafe(socket.id, user_data.limit_cnt_cafe, user_data.decide_updated_at_cafe);
            const { result } = verify_limit;
            if (result === 'success') {
              await info_update.profile.update_cafe_start(socket.id);
              const revisit = user_data.freq_subway_cafe;
              const cafe_chlist = [`안녕 코기 와쪄~!🐕 이번에도 ${revisit}에서 카페 갈꺼야?`, `이번에도 ${revisit} 카페 정해줄까?`, `ㅎㅇㅎㅇ 이번에도 ${revisit} 고고?`, `커피~~디저트~~~! 이번에도 ${revisit} 카페 갈꺼야?`,
              `당 떨어진다...👻 이번에도 ${revisit} 카페 맞지?`, `어서와!! 카페 정하러 가자👽 오늘도 ${revisit}?`, `요즘 우리나라 디저트는 거의 이탈리아나 프랑스 급인거 같아... 없는 게 없어!! 오늘도 ${revisit}에서 카페 골라볼까?`, `커피 땡겨!!! 오늘도 ${revisit} 카페 맞아맞아?`,
              `밥먹고 나와서 또 어디갈까 방황하는 영혼들... 내가 구제해주지👻 오늘도 ${revisit}에서 카페 정해볼까?`, `결정장애는 부끄러운 게 아니고 충분히 치유 가능해!!! 내가 있다면😘 이번에도 ${revisit}에서 카페 찾는거야?`];
              const leng = cafe_chlist.length;
              const rand = Math.floor(leng * Math.random());
              await info_update.profile.update_state(socket.id, '7', 'decide_cafe');
              index.sendSocketMessage(socket.id, 'chat message button', cafe_chlist[rand], [`${revisit}`, '응 맞아!'], ['decide_cafe', '다른곳이야!']);
            } else {
              index.sendSocketMessage(socket.id, 'chat message button', '30분에 카페을 5번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
            }
          }
          else {
            const verify_limit = await info_update.profile.verify_limit_cafe(socket.id, user_data.limit_cnt_cafe, user_data.decide_updated_at_cafe);
            const { result } = verify_limit;
            if (result === 'success') {
              await info_update.profile.update_cafe_start(socket.id);
              const cafe_chlist = ['안녕!! 커피나 달달구리가 땡길땐 언제나 코기를 찾아줘😏😆 오늘은 어느 역 근처의 카페를 정해볼까?', '안녕? 커피 없이 버티기 힘든 하루구나😪 이번엔 어디에 있는 카페를 정해줄까?', '역시 카페 추천하는 동물은 나밖에 없지? 이번엔 어디에 있는 카페를 가볼까나🐕🐕',
               '코기 와쪄😝🐶 오늘은 어디에 있는 카페를 가볼까😈', '밖에서 빙글빙글 돌지 말고 나한테 결정을 맡겨줘!ㅎㅎ 어느 역 근처 카페가 좋아?', '뿅🐕🐕 나왔다!! 오늘은 어느 역 근처 카페를 가볼까?', '밥배와 커피배와 케이크배는 따로 있는듯... 오늘은 어느 역 근처 카페를 골라줄까?', '당은 우리의 몸과 마음을 모두 살찌우지. 좋다는 뜻이야.ㅎㅎ 오늘은 어느 역 근처 카페를 골라줄까?'];
              const leng = cafe_chlist.length;
              const rand = Math.floor(leng * Math.random());
              await info_update.profile.update_state(socket.id, '7', 'decide_cafe');
              index.sendSocketMessage(socket.id, 'chat message button', cafe_chlist[rand]);
            } else {
              index.sendSocketMessage(socket.id, 'chat message button', '30분에 카페을 5번만 고를 수 있어!', ['get_started', '처음으로 돌아가기']);
            }
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_place(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_state(socket.id, '2', 'init');
        await info_update.profile.update_place_start(user_data.kakao_id);
        index.sendSocketMessage(socket.id, 'chat message button', '너의 출발위치를 입력해줘!');
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  decide_history(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_state(socket.id, '4', 'decide_history');
        index.sendSocketMessage(socket.id, 'chat message button', '맛집을 결정했던 기록을 볼 수 있어! 어떻게 보여줄까?', ['history_by_count', '선택 횟수별 기록 보기'], ['history_by_subway', '지역별 기록 보기'], ['previous_history1', '최근 기록 보기'], ['get_started', '돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  user_feedback(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_state(socket.id, '3', 'user_feedback');
        index.sendSocketMessage(socket.id, 'chat message button', '개발팀에게 불편한 점이나 건의사항을 보낼 수 있어!', ['user_feedback_write', '피드백하기'], ['get_started', '돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  chitchat(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_state(socket.id, '5', 'init');
        index.sendSocketMessage(socket.id, 'chat message button', '나랑 얘기할래???', ['chitchat', '할래!'], ['get_started', '처음으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = Toolbox;
