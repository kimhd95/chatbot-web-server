/* jshint node: true, devel: true */
'use strict';

const info = require('../../info_update'),
      index = require('../../../server/index.js'),
      info_update = new info();


class User_feedback {
  constructor(value,socket,user_data) {
      let key;
      key = value;

      if(user_data.state ==='user_feedback_write'){
        key = 'user_feedback_end';
      }

      this.strategies = {
          'user_feedback_write': this.user_feedback_write,
          'user_feedback_end': this.user_feedback_end
      };
      this.execute(key,value,socket,user_data);

  }

    execute(key,value,socket,user_data) {
        this.update_state(socket.id,'3',key);
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

    user_feedback_write(value,socket,user_data){
      index.sendSocketMessage(socket.id, 'chat message button', "개발팀에게 전할 말을 적어줘!");
    }



}

exports.decide_history = function(val, socket, user_data) {
       if (val === 'decide_history'){

        info_update.profile.update_state(socket.id, '4', 'decide_history', function (err) {
            if(err){
                console.log("에러 : " + err);
                return err;
            }else{
            return;
          }
        });
        index.sendSocketMessage(socket.id, 'chat message button', "맛집을 결정했던 기록을 볼 수 있어! 어떻게 보여줄까?",['선택 횟수별 기록 보기','선택 횟수별 기록 보기'],['지역별 기록 보기','지역별 기록 보기'],['이전 기록 보기/1','최근 기록 보기'],['get_started','돌아가기']);
      } else if (val === '선택 횟수별 기록 보기'){
        info_update.food.get_count_history(user_data.kakao_id, function(error, value){
          if(error){
            console.log("에러 : " + error);
            throw error;
          }else if(value.length === 0){
            index.sendSocketMessage(socket.id, 'chat message button', '아직 선택한 맛집이 아직 없어...! 다른 메뉴를 선택해줘!',['지역별 기록 보기','지역별 기록 보기'],['이전 기록 보기/1','최근 기록 보기'],['get_started','돌아가기']);
            return ;
          }else if(value.length < 5){
            let countHistory = '';
            for(let i = 0; i<value.length; i++){
              countHistory+= (value[i].subway +' ' +value[i].res_name + ' '+value[i].cnt + '회<br>');
            }
            index.sendSocketMessage(socket.id, 'chat message button', '선택 횟수 순으로 보여줄게!<br><br>'+countHistory+'<br>이야! 다른 기록도 보여줄까?',['마지막 선택 맛집 정보 보기','마지막 선택 맛집 정보 보기'],['지역별 기록 보기','지역별 기록 보기'],['이전 기록 보기/1','최근 기록 보기'],['get_started','돌아가기']);
            return ;
          }else{
            let countHistory = '';
            for(let i = 0; i<5; i++){
              countHistory+= (value[i].subway +' ' +value[i].res_name + ' '+value[i].cnt + '회<br>');
            }
            index.sendSocketMessage(socket.id, 'chat message button', '선택 횟수 순으로 보여줄게!<br><br>'+countHistory+'<br>이야! 다른 기록도 보여줄까?',['마지막 선택 맛집 정보 보기','마지막 선택 맛집 정보 보기'],['지역별 기록 보기','지역별 기록 보기'],['이전 기록 보기/1','최근 기록 보기'],['get_started','돌아가기']);
            return ;
          }
        });
      } else if (val === '지역별 기록 보기'){

        index.sendSocketMessage(socket.id, 'chat message button', "지역별로 기록을 보여줄게! 어디가 궁금해?",['history/강남역','강남역'],['history/서울대입구역','서울대입구역'],['history/성수역','성수역'],['history/신사역','신사역'],['history/신촌역','신촌역'],['get_started','돌아가기']);

      } else if (val.includes('history/')){

        let history_subway = val.split('/')[1];
        info_update.food.get_subway_history(user_data.kakao_id, history_subway, function(error, value){
          if(error){
            console.log("에러 : " + error);
            throw error;
          }else if(value.length === 0){
            index.sendSocketMessage(socket.id, 'chat message button', history_subway+' 에서 선택한 맛집이 아직 없어...! 다른 메뉴를 선택해줘!',['지역별 기록 보기','다른 지역 기록 보기'],['선택 횟수별 기록 보기','선택 횟수별 기록 보기'],['이전 기록 보기/1','최근 기록 보기'],['get_started','돌아가기']);
            return ;
          }else{
            let subwayHistory = '';
            for(let i = 0; i<value.length; i++){
              let date = value[i].date;
              date = date.slice(4, 6) + '월' + date.slice(6, 8)+'일';
              subwayHistory+= (value[i].res_name + ' ' + date + '<br>');
            }
            index.sendSocketMessage(socket.id, 'chat message button', history_subway+' 에서 선택한 맛집은<br><br>'+subwayHistory+'<br>이야! 다른 기록도 보여줄까?',['지역별 기록 보기','다른 지역 기록 보기'],['선택 횟수별 기록 보기','선택 횟수별 기록 보기'],['이전 기록 보기/1','최근 기록 보기'],['get_started','돌아가기']);
            return ;
          }
        });
      } else if (val === '이전 기록 보기/1'){

        let history_count = 10;
        info_update.food.get_all_history(user_data.kakao_id, function(error, value){
          if(error){
            console.log("에러 : " + error);
            throw error;
          }else if(value.length === 0){
            index.sendSocketMessage(socket.id, 'chat message button','선택한 맛집이 아직 없어...! 다른 메뉴를 선택해줘!',['get_started','돌아가기']);
            return ;
          }else{
            if(value.length < 10){
              history_count = value.length;
            }
            let todayHistory = '';
            for(let i = 0; i<history_count; i++){  //최근 1~10개
              let date = value[i].date;
              date = date.slice(4, 6) + '월' + date.slice(6, 8)+'일';
              todayHistory+= (value[i].subway +' ' +value[i].res_name + ' ' + date + '<br>');
            }
          if(value.length < 11){
            index.sendSocketMessage(socket.id, 'chat message button','최근에 선택했던 '+history_count+'개의 맛집을 보여줄게!<br><br>'+todayHistory+'<br>',['get_started','돌아가기']);
          }else{
            index.sendSocketMessage(socket.id, 'chat message button','최근에 선택했던 '+history_count+'개의 맛집을 보여줄게!<br><br>'+todayHistory+'<br>다른 기록도 보여줄까?',['이전 기록 보기/2','이전 기록 보기'],['get_started','돌아가기']);
          }
            return ;
          }
        });

      }
      else if (val.includes('이전 기록 보기/')){
        let previous_history_count = parseInt(val.split('/')[1]);

        let history_count = 10;
        info_update.food.get_all_history(user_data.kakao_id, function(error, value){
          if(error){
            console.log("에러 : " + error);
            throw error;
          }else{
            if(value.length < (previous_history_count*10)){
              history_count = value.length-((previous_history_count-1)*10);
            }
            let todayHistory = '';
            for(let i = ((previous_history_count-1)*10); i<value.length; i++){ //최근 10~20개
              let date = value[i].date;
              date = date.slice(4, 6) + '월' + date.slice(6, 8)+'일';
              todayHistory+= (value[i].subway +' ' +value[i].res_name + ' ' + date + '<br>');
            }
            let previous = '이전 기록 보기/'+String(previous_history_count-1);
            let next = '이전 기록 보기/'+String(previous_history_count+1);

            if(value.length < ((previous_history_count*10)+1)){
              index.sendSocketMessage(socket.id, 'chat message button','이전에 선택했던 '+history_count+'개의 맛집을 보여줄게!<br><br>'+todayHistory+'<br>',[previous,'다음 기록 보기'],['get_started','돌아가기']);
            }else{
              index.sendSocketMessage(socket.id, 'chat message button','이전에 선택했던 '+history_count+'개의 맛집을 보여줄게!<br><br>'+todayHistory+'<br>다른 기록도 보여줄까?',[next,'이전 기록 보기'],[previous,'다음 기록 보기'],['get_started','돌아가기']);
            }
            return ;
          }
        });
      }

      return;
};
