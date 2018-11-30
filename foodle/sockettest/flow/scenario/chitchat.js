/* jshint node: true, devel: true */
'use strict';

const info = require('../../info_update'),
      index = require('../../../server/index.js'),
      info_update = new info();
const request = require('request');


exports.chitchat = function(val, socket, user_data) {

      if(user_data.state === 'chitchat'){
        let info = {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            url: 'http://54.180.114.150:8888/engine/predict',
            json: {
	"content":val
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
};
