/* jshint node: true, devel: true */
'use strict';

const info = require('../../info_update'),
      index = require('../../../server/index.js'),
      info_update = new info();

class Toolbox {
  constructor(value,socket,user_data) {
      let key;
      key = value;

      this.strategies = {
          'get_started': this.get_started,
          'decide_menu': this.decide_menu,
          'decide_place': this.decide_place,
          'decide_history': this.decide_history,
          'user_feedback': this.user_feedback,
          'chitchat': this.chitchat
      };
      this.execute(key,value,socket,user_data);

  }

    execute(key,value,socket,user_data) {
        // this.update_state(socket.id,'1',key);
        this.strategies[key] == null ? console.log("this strategy does not exist") : this.strategies[key](value,socket,user_data);
    }

    update_state(id, scenario, state){
      info_update.profile.update_state(id, scenario, state, function (err) {
          if(err){
              console.log("에러 : " + err);
              return err;
          }else{
          return;
        }
      });
    }

    get_started(value,socket,user_data){
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
    }

    decide_menu(value,socket,user_data){
      info_update.profile.update_state(socket.id, '1', 'decide_menu', function (err) {
          if(err){
              console.log("에러 : " + err);
              return err;
          }else{
          return;
        }
      });
      info_update.profile.verify_limit(socket.id, user_data.limit_cnt, user_data.decide_updated_at, function(error, value){
        if(error){
          console.log('에러 : ' + error);
          return error;
        }else{
          let result = value.result;
          if(result === 'success'){
            info_update.profile.update_state(socket.id, '1', 'decide_menu', function (err) {
                if(err){
                    console.log("에러 : " + err);
                    return err;
                }else{
                return;
              }
            });
            info_update.food.update_user_start(socket.id, function (error) {
                if(error){
                    console.log("에러 : " + error);
                    return error;
                }
                return;
            });
            let chlist = [ '어디에서?', '어디에서 먹어?', '밥 먹을 장소를 말해줘','밥 어디에서 먹어?',
                '어디에서 만나?', '어디에서 먹게?', '어디서 밥 먹는데?ㅎㅎ',
                '밥 어디에서 먹는데?(하하)'];
            let leng = chlist.length;
            let rand = Math.floor(leng * Math.random());
            index.sendSocketMessage(socket.id, 'chat message button', chlist[rand]+'<br>ex) 강남역,신촌역');
          }else{
            index.sendSocketMessage(socket.id, 'chat message button', '한 끼당 메뉴를 3번만 고를 수 있어!',['get_started','처음으로 돌아가기']);
          }
        }
      });
    }

    decide_place(value,socket,user_data){
      info_update.profile.update_state(socket.id, '2', 'init', function (err) {
          if(err){
              console.log("에러 : " + err);
              return err;
          }else{
          return;
        }
      });
      info_update.profile.update_place_start(user_data.kakao_id, function (error) {
          if(error){
              console.log("에러 : " + error);
              return error;
          }
          return;
      });
      index.sendSocketMessage(socket.id, 'chat message button', "너의 출발위치를 입력해줘!");
    }

    decide_history(value,socket,user_data){
      info_update.profile.update_state(socket.id, '4', 'decide_history', function (err) {
          if(err){
              console.log("에러 : " + err);
              return err;
          }else{
          return;
        }
      });
      index.sendSocketMessage(socket.id, 'chat message button', "맛집을 결정했던 기록을 볼 수 있어! 어떻게 보여줄까?",['선택 횟수별 기록 보기','선택 횟수별 기록 보기'],['지역별 기록 보기','지역별 기록 보기'],['이전 기록 보기/1','최근 기록 보기'],['get_started','돌아가기']);
    }

    user_feedback(value,socket,user_data){
      info_update.profile.update_state(socket.id, '3', 'user_feedback', function (err) {
          if(err){
              console.log("에러 : " + err);
              return err;
          }else{
          return;
        }
      });
      index.sendSocketMessage(socket.id, 'chat message button', '개발팀에게 불편한 점이나 건의사항을 보낼 수 있어!',['user_feedback_write','피드백하기'],['get_started','돌아가기']);
    }

    chitchat(value,socket,user_data){

    }



}

module.exports = Toolbox;
