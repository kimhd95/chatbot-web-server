/* jshint node: true, devel: true */
'use strict';

const info = require('../info_update'),
      index = require('../../server/index.js'),
      info_update = new info(),
      Decide_menu = require('./scenario/decide_menu.js'),
      Toolbox = require('./scenario/toolbox.js'),
      User_feedback = require('./scenario/user_feedback.js'),
      scenario_flow = require('./scenario');

exports.scenario_rule = function(val, socket) {
  info_update.profile.load_user(socket.id, function(err, user_data, log){
    if(err){
      console.log(err);
      return err;
    }else{
      switch (user_data.scenario){
        case '1':
          let decide_menu_scenario = new Decide_menu(val, socket, user_data);
        break;
        case '2':
          scenario_flow.decide_place.decide_place(val, socket, user_data);
        break;
        case '3':
          let user_feedback_scenario = new User_feedback(val, socket, user_data);
        break;
        case '4':
          scenario_flow.decide_history.decide_history(val, socket, user_data);
        break;
        case '5':
          scenario_flow.chitchat.chitchat(val, socket, user_data);
        break;
        case '100':
          let toolbox_scenario = new Toolbox(val, socket, user_data);
        break;
      }
      return;
    }
  });
};
