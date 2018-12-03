/* jshint node: true, devel: true */
'use strict';

const info = require('../../api/info_update'),
      index = require('../../server/index'),
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

    user_feedback_end(value,socket,user_data){
      info_update.profile.create_user_feedback(user_data.kakao_id, null, null, null, value, function(err){
          if(err){
            console.log("error : "+err);
            index.sendSocketMessage(socket.id, 'chat message', "오류가 발생했어요.. 개발팀에게 전할 말을 다시 적어주세요!");
            return;
          }else{
            index.sendSocketMessage(socket.id, 'chat message button', "개발팀에게 소중한 의견이 전달되었어요!",['get_started','처음으로 돌아가기']);
            return;
        }
      });
    }


}

module.exports = User_feedback;
