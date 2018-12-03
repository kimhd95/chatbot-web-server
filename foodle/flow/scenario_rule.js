/* jshint node: true, devel: true */
'use strict';

const info = require('../api/info_update'),
      index = require('../server/index'),
      info_update = new info(),
      scenario_flow = require('./scenario');

exports.scenario_rule = function(val, socket) {
  info_update.profile.load_user(socket.id, function(err, user_data, log){
    if(err){
      console.log(err);
      return err;
    }else{
      if(val === 'get_started'){
        let chlist2 = [ '그래 뭘 도와줄까?', '난 갈수록 다재다능해지고 있어ㅎㅎ', '세상의 모든 음식을 먹어보는게 내 목표야','할 줄 아는 건 별로 없지만 골라봐',
            '아 배고프다', '기능 나와라(쭈우욱)', '우리나라는 정말 미식의 나라인듯! 맛있는게 너무 많아',
            '많고 많은 외식메뉴 중에 뭘 고를지 모를땐 나를 찾아줘', '앞으로 더 많은 기능을 추가할 예정이니 기다려줘~', '일단은 서울에 있는 맛집을 섭렵한 뒤에 전국으로 진출할 예정이야!(다음엔 해외로..?)', '배고파! 너도 배고프니까 날 불렀겠지?'];
        let leng2 = chlist2.length;
        let rand2 = Math.floor(leng2 * Math.random());
        info_update.profile.register(socket.id, function(err){
          if(err){
            console.log(err);
            return err;
          }else{
            return;
          }
        });
        index.sendSocketMessage(socket.id, 'chat message button', chlist2[rand2], ['decide_menu','메뉴 고르기'],['decide_place','중간지점 찾기(서울)'],['decide_history','기록보기'],['user_feedback','개발팀에게 피드백하기']);
      }else{
      switch (user_data.scenario){
        case '1':
          let decide_menu_scenario = new scenario_flow.decide_menu(val, socket, user_data);
        break;
        case '2':
          let decide_place_scenario = new scenario_flow.decide_place(val, socket, user_data);
        break;
        case '3':
          let user_feedback_scenario = new scenario_flow.user_feedback(val, socket, user_data);
        break;
        case '4':
          let decide_history_scenario = new scenario_flow.decide_history(val, socket, user_data);
        break;
        case '5':
          let chitchat_scenario = new scenario_flow.chitchat(val, socket, user_data);
        break;
        case '100':
          let toolbox_scenario = new scenario_flow.toolbox(val, socket, user_data);
        break;
      }
    }
      return;
    }
  });
};
