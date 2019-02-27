const Info = require('../../api/info_update');
const index = require('../../server/index');
const info_update = new Info();
const request = require('request');

class Chitchat {
  constructor(value, socket, user_data) {
    let key = value;

    if (user_data.state === 'chitchat_answer') {
      key = 'chitchat_answer';
    }

    this.strategies = {
      'chitchat': this.chitchat,
      'chitchat_answer': this.chitchat_answer,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.strategies[key] == null ? index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']) : this.strategies[key](value, socket, user_data);
  }

  update_state(id, scenario, state) {
    (async function () {
      try {
        await info_update.profile.update_state(id, scenario, state);
      } catch (e) {
        console.log(e);
      }
    }());
  }

  chitchat(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.update_state(socket.id, '5', 'chitchat_answer');
        index.sendSocketMessage(socket.id, 'chat message button', '안녕! 나는 외식코기야!<br>(메뉴로 가려면 "처음으로"를 입력해줘!)');
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  chitchat_answer(value, socket, user_data) {
    (async function () {
      try {
        if (value === '처음으로') {
          const chlist2 = ['그래 뭘 도와줄까?', '난 갈수록 다재다능해지고 있어ㅎㅎ', '세상의 모든 음식을 먹어보는게 내 목표야', '할 줄 아는 건 별로 없지만 골라봐',
            '아 배고프다', '기능 나와라(쭈우욱)', '우리나라는 정말 미식의 나라인듯! 맛있는게 너무 많아',
            '많고 많은 외식메뉴 중에 뭘 고를지 모를땐 나를 찾아줘', '앞으로 더 많은 기능을 추가할 예정이니 기다려줘~', '일단은 서울에 있는 맛집을 섭렵한 뒤에 전국으로 진출할 예정이야!(다음엔 해외로..?)', '배고파! 너도 배고프니까 날 불렀겠지?'];
          const leng2 = chlist2.length;
          const rand2 = Math.floor(leng2 * Math.random());
          await info_update.profile.update_state(socket.id, '100', 'init');
          index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2], ['decide_menu', '메뉴 고르기'], ['decide_drink', '술집 고르기'], ['decide_place', '중간지점 찾기(서울)'], ['decide_history', '기록보기'], ['user_feedback', '개발팀에게 피드백하기'], ['chitchat', '외식코기랑 대화하기']);
        } else if (value == 'recommend') {
          const verify_limit = await info_update.profile.verify_limit(socket.id, user_data.limit_cnt, user_data.decide_updated_at);
          const { result } = verify_limit;
          if(result === 'success') {
            await info_update.profile.update_state(socket.id, '1', 'decide_menu');
            const chlist = ['어디에서?', '어디에서 먹어?', '밥 먹을 장소를 말해줘', '밥 어디에서 먹어?',
              '어디에서 만나?', '어디에서 먹게?', '어디서 밥 먹는데?ㅎㅎ',
              '밥 어디에서 먹는데?(하하)'];
            const leng = chlist.length;
            const rand = Math.floor(leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button', `${chlist[rand]}<br>ex) 강남역,신촌역`);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', '30분에 메뉴를 5번만 고를 수 있어!', ['get_started', '처음으로 돌아가기'], ['continue', '계속 대화하기']);
          }

        } else {
          const bot_reply = await info_update.profile.chitchat(socket.id, value);
          const bot_answer = await bot_reply.answer;
          const intention_number = await bot_reply.intention_number;
          console.log(bot_reply);
          if (intention_number == 7){
            index.sendSocketMessage(socket.id, 'chat message button', "기다려방ㅎㅎ", ['recommend', '추천받기'], ['continue', '계속 대화하기']);
          } else {
            index.sendSocketMessage(socket.id, 'chat message button', bot_answer);
          }
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = Chitchat;
