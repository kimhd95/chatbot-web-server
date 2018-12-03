/* jshint node: true, devel: true */
'use strict';

const info = require('../../api/info_update'),
      index = require('../../server/index'),
      info_update = new info(),
      request = require('request');

class Chitchat {
  constructor(value,socket,user_data) {
      let key;
      key = value;

      if(user_data.state ==='chitchat'){
        key = 'chitchat';
      }

      this.strategies = {
          'chitchat': this.chitchat
      };
      this.execute(key,value,socket,user_data);

  }

    execute(key,value,socket,user_data) {
        this.update_state(socket.id,'5',key);
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

    chitchat(value,socket,user_data){
      if(user_data.state === 'chitchat'){
        let info = {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            url: 'http://54.180.114.150:8888/engine/predict',
            json: {
            	"content":value
            },

        };
        request(info, function (error, response, body) {
          if(error){
            console.log('Error at closedown_scheduler : ' + error);
          }else{
            index.sendSocketMessage(socket.id, 'chat message button', body);
          }
        });
      }
      return;
    }
}

module.exports = Chitchat;
