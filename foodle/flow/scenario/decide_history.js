/* jshint node: true, devel: true */
'use strict';

const info = require('../../api/info_update'),
      index = require('../../server/index'),
      info_update = new info();


class Decide_history {
  constructor(value,socket,user_data) {
      let key;
      key = value;

      if(key.includes('history/')){
        key = 'history_subway_info';
      }else if(key.includes('previous_history/')){
        key = 'previous_history_info';
      }else if(key === 'previous_history/1'){
        key = 'previous_history1';
      }

      this.strategies = {
          'history_by_count': this.history_by_count,
          'history_by_subway': this.history_by_subway,
          'history_subway_info': this.history_subway_info,
          'previous_history1': this.previous_history1,
          'previous_history_info': this.previous_history_info,

      };
      this.execute(key,value,socket,user_data);

  }

    execute(key,value,socket,user_data) {
        this.update_state(socket.id,'4',key);
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

    history_by_count(value,socket,user_data){
      info_update.food.get_count_history(user_data.kakao_id, function(error, value){
        if(error){
          console.log("에러 : " + error);
          throw error;
        }else if(value.length === 0){
          index.sendSocketMessage(socket.id, 'chat message button', '아직 선택한 맛집이 아직 없어...! 다른 메뉴를 선택해줘!',['history_by_subway','지역별 기록 보기'],['previous_history1','최근 기록 보기'],['get_started','돌아가기']);
          return ;
        }else if(value.length < 5){
          let countHistory = '';
          for(let i = 0; i<value.length; i++){
            countHistory+= (value[i].subway +' ' +value[i].res_name + ' '+value[i].cnt + '회<br>');
          }
          index.sendSocketMessage(socket.id, 'chat message button', '선택 횟수 순으로 보여줄게!<br><br>'+countHistory+'<br>이야! 다른 기록도 보여줄까?',['마지막 선택 맛집 정보 보기','마지막 선택 맛집 정보 보기'],['history_by_subway','지역별 기록 보기'],['previous_history1','최근 기록 보기'],['get_started','돌아가기']);
          return ;
        }else{
          let countHistory = '';
          for(let i = 0; i<5; i++){
            countHistory+= (value[i].subway +' ' +value[i].res_name + ' '+value[i].cnt + '회<br>');
          }
          index.sendSocketMessage(socket.id, 'chat message button', '선택 횟수 순으로 보여줄게!<br><br>'+countHistory+'<br>이야! 다른 기록도 보여줄까?',['마지막 선택 맛집 정보 보기','마지막 선택 맛집 정보 보기'],['history_by_subway','지역별 기록 보기'],['previous_history1','최근 기록 보기'],['get_started','돌아가기']);
          return ;
        }
      });
    }

    history_by_subway(value,socket,user_data){
      index.sendSocketMessage(socket.id, 'chat message button', "지역별로 기록을 보여줄게! 어디가 궁금해?",['history/강남역','강남역'],['history/서울대입구역','서울대입구역'],['history/성수역','성수역'],['history/신사역','신사역'],['history/신촌역','신촌역'],['get_started','돌아가기']);
    }

    history_subway_info(value,socket,user_data){
      let history_subway = value.split('/')[1];
      info_update.food.get_subway_history(user_data.kakao_id, history_subway, function(error, value){
        if(error){
          console.log("에러 : " + error);
          throw error;
        }else if(value.length === 0){
          index.sendSocketMessage(socket.id, 'chat message button', history_subway+' 에서 선택한 맛집이 아직 없어...! 다른 메뉴를 선택해줘!',['history_by_subway','다른 지역 기록 보기'],['history_by_count','선택 횟수별 기록 보기'],['previous_history1','최근 기록 보기'],['get_started','돌아가기']);
          return ;
        }else{
          let subwayHistory = '';
          for(let i = 0; i<value.length; i++){
            let date = value[i].date;
            date = date.slice(4, 6) + '월' + date.slice(6, 8)+'일';
            subwayHistory+= (value[i].res_name + ' ' + date + '<br>');
          }
          index.sendSocketMessage(socket.id, 'chat message button', history_subway+' 에서 선택한 맛집은<br><br>'+subwayHistory+'<br>이야! 다른 기록도 보여줄까?',['history_by_subway','다른 지역 기록 보기'],['history_by_count','선택 횟수별 기록 보기'],['previous_history1','최근 기록 보기'],['get_started','돌아가기']);
          return ;
        }
      });
    }

    previous_history1(value,socket,user_data){
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
          index.sendSocketMessage(socket.id, 'chat message button','최근에 선택했던 '+history_count+'개의 맛집을 보여줄게!<br><br>'+todayHistory+'<br>다른 기록도 보여줄까?',['previous_history/2','이전 기록 보기'],['get_started','돌아가기']);
        }
          return ;
        }
      });
    }

    previous_history_info(value,socket,user_data){
      let previous_history_count = parseInt(value.split('/')[1]);

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
          let previous = 'previous_history/'+String(previous_history_count-1);
          let next = 'previous_history/'+String(previous_history_count+1);

          if(value.length < ((previous_history_count*10)+1)){
            index.sendSocketMessage(socket.id, 'chat message button','이전에 선택했던 '+history_count+'개의 맛집을 보여줄게!<br><br>'+todayHistory+'<br>',[previous,'다음 기록 보기'],['get_started','돌아가기']);
          }else{
            index.sendSocketMessage(socket.id, 'chat message button','이전에 선택했던 '+history_count+'개의 맛집을 보여줄게!<br><br>'+todayHistory+'<br>다른 기록도 보여줄까?',[next,'이전 기록 보기'],[previous,'다음 기록 보기'],['get_started','돌아가기']);
          }
          return ;
        }
      });
    }

}

module.exports = Decide_history;
