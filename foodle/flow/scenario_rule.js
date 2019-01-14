

const Info = require('../api/info_update');


const index = require('../server/index');


const info_update = new Info();


const scenario_flow = require('./scenario');

exports.scenario_rule = function (val, socket, msg) {
  (async function () {
    try {
      console.log(`scenario_rule에서 val : ${val}`)
      const user_data = await info_update.profile.load_user(socket.id);
      // console.log(user_data);
      if (val === 'get_started') {
        const chlist2 = ['그래 뭘 도와줄까?', '난 갈수록 다재다능해지고 있어ㅎㅎ', '세상의 모든 음식을 먹어보는게 내 목표야', '할 줄 아는 건 별로 없지만 골라봐',
          '아 배고프다', '기능 나와라(쭈우욱)', '우리나라는 정말 미식의 나라인듯! 맛있는게 너무 많아',
          '많고 많은 외식메뉴 중에 뭘 고를지 모를땐 나를 찾아줘', '앞으로 더 많은 기능을 추가할 예정이니 기다려줘~', '일단은 서울에 있는 맛집을 섭렵한 뒤에 전국으로 진출할 예정이야!(다음엔 해외로..?)', '배고파! 너도 배고프니까 날 불렀겠지?'];
        const leng2 = chlist2.length;
        const rand2 = Math.floor(leng2 * Math.random());
        await info_update.profile.update_state(socket.id, '100', 'init');
<<<<<<< HEAD
        index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2], ['decide_menu', '메뉴 고르기'], ['decide_place', '중간지점 찾기(서울)'], ['decide_history', '기록보기'], ['user_feedback', '개발팀에게 피드백하기'], ['chitchat', '외식코기랑 대화하기']);
=======
        if(user_data.registered==='-1'){
          index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2], ['decide_menu', '메뉴 고르기'], ['decide_place', '중간지점 찾기(서울)'], ['user_feedback', '개발팀에게 피드백하기'], ['chitchat', '푸들이랑 대화하기']);
        }
        else{
          index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2], ['decide_menu', '메뉴 고르기'], ['decide_place', '중간지점 찾기(서울)'], ['decide_history', '기록보기'], ['user_feedback', '개발팀에게 피드백하기'], ['chitchat', '푸들이랑 대화하기']);
        }
>>>>>>> origin/food_dev_unsigned
      } else {
        await info_update.profile.create_user_log(socket.id, user_data.scenario, user_data.state, msg);
        switch (user_data.scenario) {
          case '1': {
            (function () {
              return new scenario_flow.Decide_menu(val, socket, user_data);
            }());
            break;
          }
          case '2': {
            (function () {
              return new scenario_flow.Decide_place(val, socket, user_data);
            }());
            break;
          }
          case '3': {
            (function () {
              return new scenario_flow.User_feedback(val, socket, user_data);
            }());
            break;
          }
          case '4': {
            (function () {
              return new scenario_flow.Decide_history(val, socket, user_data);
            }());
            break;
          }
          case '5': {
            (function () {
              return new scenario_flow.Chitchat(val, socket, user_data);
            }());
            break;
          }
          case '100': {
            (function () {
              return new scenario_flow.Toolbox(val, socket, user_data);
            }());
            break;
          }
          default:
        }
      }
    } catch (e) {
      index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
      console.log(e);
    }
  }());
};
